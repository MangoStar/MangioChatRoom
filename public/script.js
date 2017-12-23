$(document).ready(function() {
    let myName;
    let socket = io.connect();
    let $body = $('body');
    let $name = $('.name');
    let $submitName = $('#submit');
    let $nameContent = $('.getNameContent');
    let $chatBox = $('.chatBox');
    let $messageBox = $('.messageBox');
    let $message = $('.message');
    let $sendMessage = $('#send');
    let $userBox = $('.userBox');

    // When Submit button is presssed
    $submitName.click(function() {
        setBodyNone();
        setTimeout(function() { setBodyFull(); }, 1000);
    });

    // Sets body opacity to 0
    let setBodyNone = function() {
        $body.css('opacity', '0');
    };

    // Sets body opacity to 1 (full)
    let setBodyFull = function() {
        $nameContent.css('display', 'none');
        // Makes the title invisible
        $('#title').css('display', 'none');
        setChat();
        $body.css('opacity', '1');
    };

    // Sets chat box elements visible on the screen
    let setChat = function() {
        $chatBox.css('display', 'block');
        $messageBox.css('display', 'block');   
        $userBox.css('display', 'inline-block'); 
    };

    // On click, emit to the server to add username to list
    $submitName.click(function() {
        socket.emit('add user', $name.val());
    });

    // When send button is pressed, it emits data to the server
    $sendMessage.click(function() {
        socket.emit('send message', $message.val());
        $message.val('');
    });

    // On server event new message, it displays data passed from local emit
    socket.on('new message', function(data) {
        $chatBox.append('<p>' + myName + ": " + data + '</p>');
    });

    // On server event user added, log to the console the details
    socket.on('user added', function(data) {
        console.log('User updates: ' + data);
        $userBox.html('');
        for(let i = 0; i < data.length; i++) {
            $userBox.append(element(data, i));
        }
    });

    // Returns paragraph element including the value data (user)
    let element = function(data, index) {
        return ('<p>' + data[index] + '</p>');
    };
});
