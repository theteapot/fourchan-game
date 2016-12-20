
$.ajax('http://localhost:3001/', {
    success: function (data, status, res) {
        console.log('Status: '+status);
        addButtons(data.threads);
    },
    error: function (res, status, error) {
        console.log(status, error);
    }
});

function addButtons(threads) {
    
    var randIndex = Math.floor(Math.random() * threads.length);
    var correctThread = threads[randIndex]

    //console.log(JSON.stringify(correctThread));
    $('#promptText').append(correctThread.teaser);

    //console.log(threads);
    for (var index in threads) {
        //console.log(JSON.stringify(threads[index]))
        var thread = threads[index]
        var imgUrl = 'http://i.4cdn.org/his/' + thread.imgurl + 's.jpg'
        $('#pictureBlock').append("<div class=clickableImage id="+thread.id+ "><img src="+imgUrl+" /> </div>");
    }
    imageHandler(correctThread.id);
};

function imageHandler (correctId) {
        $('.clickableImage').click(function () {
            if ($(this).attr('id') == correctId) {
                alert('You have chosen well');
            }
            else {
                alert('You have chosen poorly');
            }
        //alert($(this).attr('id') + 'handler for clickable image called');
    });
};


/*$('.clickableImage').on('click', function () {
        if ( $(this).attr('id') === correctThread.id ) {
            console.log('Chose correct: '+$(this).attr('id')+'=='+correctThread.id);
        } else {
            console.log('Chose incorrect: '+$(this).attr('id')+'=='+correctThread.id)
        }
});*/

