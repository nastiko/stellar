<?php
if ($_POST['email'] && $_POST['country'] && $_POST['firstName']) {
    mail(
        'jogarat367@marikuza.com',
        'Website form submission from `' . htmlspecialchars($_POST['email']) . ' (' . htmlspecialchars($_POST['country']) . ')',
        htmlspecialchars($_POST['firstName']) )
    );
    header("HTTP/1.1 200 OK");
    echo 'Thank you, you for has been submitted';
} else {
    header("HTTP/1.1 500 Server Error");
    echo 'Please check your form submission';
}