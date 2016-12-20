
$.ajax('http://localhost:3001/', {
    success: function (data, status, res) {
        console.log(status, res);
        addButtons(data.threads);
    },
    error: function (res, status, error) {
        console.log(status, error);
    }
});

function addButtons(threads) {
    
    var randIndex = Math.floor(Math.random() * threads.length);
    $('#promptText').append(threads[randIndex].teaser);

    console.log(threads);
    for (var index in threads) {
        console.log(JSON.stringify(threads[index]))
        var thread = threads[index]
        var imgUrl = 'http://i.4cdn.org/his/' + thread.imgurl + 's.jpg'
        $('#pictureBlock').append("<img src="+imgUrl+" />");
    }
};

