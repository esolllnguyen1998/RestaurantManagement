export function uploadFile(base64) {
    var fileName = Date.now.toString();
    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify({
            key: "32fe4697821ecf1cb1b5e059647c9ad1",
            image: base64,
            name: fileName
        })
    }
    try {
        const response = fetch('https://api.imgbb.com/1/upload', requestOption);
        console.log(response);
        return response;
    }
    catch (ex) {
        console.log(ex);
    }
}
