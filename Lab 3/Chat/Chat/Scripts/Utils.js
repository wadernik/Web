$(function () {
    var chat = $.connection.chatHub;
    chat.client.addMessage = function (name, message) {
        $('#chatroom').append('<p><b>' + htmlEncode(name)
        + '</b>: ' + htmlEncode(message) + '</p>');
    };

    chat.client.onConnected = function (id, userName, allUsers) {

        $('#hdId').val(id);

        for (i = 0; i < allUsers.length; i++) {
            AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
        }
    }

    chat.client.onNewUserConnected = function (id, userName) {
        AddUser(id, userName);
    }

    chat.client.onUserDisconnected = function (id, userName) {
        
        $('#' + id).remove();
    }

    $.connection.hub.start().done(function () {
        alert($('#username').val());
        chat.server.connect($('#username').val());
        $('#sendmessage').click(function () {
            chat.server.send($('#username').val(), $('#message').val());
            $('#message').val('');
            //chat.server.connect($('#username').val());
        });
    });
});

function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}

function AddUser(id, name) {
    var userId = $('#hdId').val();
    $("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
}