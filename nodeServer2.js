http.get('http://boards.4chan.org/his/catalog', function(res) {

    let error;
    if (res.statusCode !== 200) {
        error = new Error('Request Failed. Status Code: '+res.statusCode);
    } else if (!/text\/html/.test(res.headers['content-type'])) {
        error = new Error('Invalid content type. Expected text/html but recieved '+res.headers['content-type']);
    }
    if (error) {
        console.log(error.message);
        res.resume();
        return;
    } 

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        try {
            parseHtml(rawData);
        } catch (e) {
            console.log(e.message);
        }
    });
});

function parseHtml (rawData) {
    jsdom.env ( 
        rawData, 
        function (err, window) {
            window = window;
            document = window.document;
            showLinks(document);
        }
    )
}

function showLinks (document) {  
        
    //console.log('Document doctype: '+document.body.innerHTML);
    var catalogScript = document.querySelectorAll('script')[2].text;
    var jsonBegin = catalogScript.indexOf('var catalog = ')+'var catalog = '.length
    var jsonEnd = catalogScript.indexOf('var style_group = ')-1
    console.log('Starting JSON parsing');
    var jsonData = JSON.parse(catalogScript.slice(jsonBegin, jsonEnd))
    
    jsonSelection(jsonData)

    startServer(jsonData)
}





