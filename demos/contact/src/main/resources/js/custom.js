function init()
{
    $("body").append("<script src='role-code/resources/js/Contact.js' type='text/javascript'></script>");
}

function showStatus(msg)
{
    $('#message').empty();
    $('#message').append(msg);
};

function closeEnquiry(data)
{
    console.log(data);
    var conn = createContactconn();
    conn.sessionId = $('#demosession').val();
    conn.closeEnquiry(data, function() {
        showEnquiries();
    });
}

function showEnquiries() {
    var conn = createContactconn();
    conn.sessionId = $('#demosession').val();
    $('#enquiries').empty();
    conn.listEnquires(5, function(id, name, email, phone, subject, msg) {
        var tbody = $('#enquiries');

        var td1 = $('<td/>');
        var td2 = $('<td/>');
        var td3 = $('<td/>');
        var td4 = $('<td/>');
        var td5 = $('<td/>');
        var td6 = $('<td/>');
        td1.append(name);
        td2.append(email);
        td3.append(phone);
        td4.append(subject);
        td5.append(msg);

        var btn = $('<a/>', {
           'class':'btn btn-general' ,
           'text':'Close',
           'href':'javascript:closeEnquiry("' + id + '")'
        });

        td6.append(btn);
        var tr = $('<tr/>');
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tr.append(td6);
        tbody.append(tr);
    });
};

$('#createcontact').submit(function(e) {
    e.preventDefault();

    var conn = createContactconn();
    conn.sessionId = $('#demosession').val();
    conn.create($('#createcontact'), function() {
        showStatus("Created Contact");
    });

    return false;
});

$('#enquire').submit(function(e) {
    e.preventDefault();

    var conn = createContactconn();
    //this is a unauthenticated call
    conn.sessionId = '';

    var name = $('#name').val();
    var cname = $('#cname').val();
    var ph = $('#phone').val();
    var email = $('#email').val();
    var sub = $('#subject').val();
    var msg = $('#cmessage').val();

    conn.enquire(cname, name, sub, msg, email, ph, function(data) {
        showStatus('Sent Enquiry');
    });

    return false;
});

$('#showenquiries').click(function() {
    showEnquiries();
});

function setupSession(user, sess)
{
    var opt = $("<option/>", {
        'text': user,
        'value' : sess
    });
    $('#demosession').append(opt);
    $('#user').val('');
    $('#password').val('');
}

$('#login').submit(function(e) {
    e.preventDefault();
    var form = $('#login');
    var user = $('#user').val();
    form.attr("action", "checklogin.php")
    form.ajaxSubmit({
        success: function(data)
        {
            if (data == 'Error')
            {
                showStatus("Wrong User/Password");
            }
            else
            {
                setupSession(user, data);
                showStatus('Successfully logged in');
            }
        },
        error: function(msg)
        {
            showStatus(msg);
        }
    });
    return false;
});
