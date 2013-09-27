function init()
{
    $("body").append("<script src='message-code/resources/js/Message.js' type='text/javascript'></script>");
    $("body").append("<script src='js/toastr.js' type='text/javascript'></script>");
}

function closemsg(data)
{
    console.log(data);
    var conn = createmessageconn();
    conn.deactivate(data, function() {
    });
}

function showMessages() {
    var conn = createmessageconn();
    conn.listMessages(5, function(data) {
        toastr.info(data, "", {
            "positionClass": "toast-top-right",
            "onclick" : closemsg (data)
        });
    });
};

$('#createmsg').submit(function(e) {
    e.preventDefault();

    var conn = createmessageconn();
    conn.createmessage($('#createmsg'), showMessages);

    return false;
});
