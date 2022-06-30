const { response } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const NodeCache = require( "node-cache" );
const cache = new NodeCache();

var data = cache.get("dbData");

if( data == undefined ){
  data = require('./data.json');
  cache.set( "dbData", data, 10000 );
}

var filter, sort, page, rows, search;

app.get('/api/todos', (req, res) => {

  filter = req.query.filter;
  sort = req.query.sort;
  page = req.query.page;
  rows = req.query.rows;
  search = req.query.fastSearch;

  let resData = filterData(data, filter, sort, page, rows, search)

  res.send(resData);
});


app.post('/api/todos/update', (req, res) => {
  
  data.map(row => {
    if (row.id == req.body.id){
      row.status = req.body.status
    }
  })

  //cache.flushAll()
  cache.set( "dbData", data, 10000 );

  let resData = filterData(data, filter, sort, page, rows, search)

  res.send(resData);
});



const filterData = (data, filter, sort, page, rows, search) => {


  if( filter || search){
    
    const filters = filter.split("|")
    
    data = data.filter( todo => {
      
      if(search){
        console.log((todo.title + todo.content))
        if((todo.title + todo.content).search(search) == -1 ){
          return false;
        }
      }
      
      if(filter){
        for(let i = 0; i < filters.length; i++){
            let filter = filters[i].split(":")
            if(todo[filter[0]].toLocaleLowerCase() != filter[1]){
              return false;
            }
         }
      }

      return true;

    })
      
  }

  if( sort == 'asc' ){
    data.sort( (a,b) => {
      return a.creationTime - b.creationTime
    })
  }else if( sort == 'desc' ){
    data.sort( (a,b) => {
      return b.creationTime - a.creationTime
    })
  }


  let pageNum = parseInt(page)
  const rowsPerPage = parseInt(rows)
  const maxPagesAvalible = Math.ceil( data.length / rowsPerPage )
  pageNum = pageNum > maxPagesAvalible ? maxPagesAvalible : pageNum
  const startLimit = pageNum > 1 ?  (pageNum - 1) * rowsPerPage  : 0;
  const endLimit = startLimit + rowsPerPage;

  resData = {
    totalRows: data.length,
    todoData: data.slice(startLimit, endLimit)
  }

  return resData;

}

app.listen(port, () => console.log(`Listening on port ${port}`));