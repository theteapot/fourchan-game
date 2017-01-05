var http = require('http');

function getData(shortUrl, callback) {
    http.get('http://boards.4chan.org/' + shortUrl + '/catalog', function(res) {

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
                jsdom.env ( rawData, function (err, window) {
                window = window;
                document = window.document;
                var catalogScript = document.querySelectorAll('script')[2].text;
                var jsonBegin = catalogScript.indexOf('var catalog = ')+'var catalog = '.length
                var jsonEnd = catalogScript.indexOf('var style_group = ')-1
                console.log('Starting JSON parsing');
                var jsonData = JSON.parse(catalogScript.slice(jsonBegin, jsonEnd))
                
                
                var threadId = []
                var selectThreads = []   

                for (var thread in jsonData.threads) {
                    threadId.push(thread);
                }                 

                for (var i = 0; i < 5; i++) {
                    var index = Math.floor(Math.random() * (threadId.length));
                    selectThreads.push( threadId.splice(index, 1).toString() );
                }

                var jsonResponse = []

                //console.log('Selected thread ids: '+ selectThreads);
                var threadsObj = {threads: []}

                for (var thread  in selectThreads) {
                    var threadObj  = jsonData.threads[selectThreads[thread]];
                    console.log(JSON.stringify(threadObj));
                    var newThread = {
                        id: threadObj.lr.id,
                        imgurl: threadObj.imgurl,
                        sub: threadObj.sub,
                        teaser: threadObj.teaser
                    }
                    threadsObj.threads.push(newThread);           
                }

                console.log('Threads object: '+JSON.stringify(threadsObj))
                
                callback(threadsObj)

                })
            } catch (e) {
                console.log(e.message);
            }
        });
    });
}

function startServer () {
    console.log('Starting Server');
    http.createServer(function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
    }).listen(3001);
    console.log('Server is running at 3001');
}

startServer();
