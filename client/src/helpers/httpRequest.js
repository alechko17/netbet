
const httpRequest = async (url, reqBody, method = 'GET') => {
    const requestData = {
        method: method.toUpperCase(), 
        headers: {
            'Content-Type': 'application/json'
          }
    }
    if (method.toUpperCase() === 'POST' && Object.keys(reqBody).length !== 0){
        requestData.body = JSON.stringify(reqBody)
    }
    const response = await fetch(url, requestData);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
};

export default httpRequest