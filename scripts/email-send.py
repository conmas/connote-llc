<?php
if(isset($_POST['submit'])){
    $to = "connor@connote.design";
    $from = $_POST['email'];
    $name = $_POST['name'];
    $subject = "Form submission";
    $message = $name . " wrote the following:" . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    mail($to,$subject,$message,$headers);
    echo "Thanks! Your email has been sent. We'll be in touch soon.";
    }
?>
