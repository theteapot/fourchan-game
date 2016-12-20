
$.ajax('http://localhost:3001/', {
    success: function (data, status, res) {
        console.log(data, status, res);
    },
    error: function (res, status, error) {
        console.log(status, error);
    }
});
