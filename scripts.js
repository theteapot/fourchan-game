
function makeRequest() {
    $.ajax({
        url: 'http://localhost:3001/',
        type: 'GET',
        data: {shortUrl: 'his'},
        contentType: 'jsonp',
        crossdomain: true,
        success: function (data, status, res) {
            console.log('Status: '+status);
            addButtons(data.threads);
        },
        error: function (res, status, error) {
            console.log(status, error);
        }
    });
}

function addButtons(threads) {
    
    var randIndex = Math.floor(Math.random() * threads.length);
    var correctThread = threads[randIndex]

    //console.log(JSON.stringify(correctThread));
    $('#promptText').text(correctThread.teaser);

    //console.log(threads);
    for (var index in threads) {
        //console.log(JSON.stringify(threads[index]))
        var thread = threads[index]
        var imgUrl = 'http://i.4cdn.org/his/' + thread.imgurl + 's.jpg'
        $('#pictureBlock').append("<div class=clickableImage id="+thread.id+"  ><img src="+imgUrl+" /> </div>");
    }
    imageHandler(correctThread.id);
};

function imageHandler (correctId) {
    $('.clickableImage').click(function () {
        if ($(this).attr('id') == correctId) {
            $(this).wrap("<div class='correctTint'></div>");
        }
        else {
            $(this).wrap("<div class='incorrectTint'></div>")
        }      
     });
}

$(document).on("click", "#goButton", function() {
    $('#pictureBlock').empty();
    makeRequest();
})


