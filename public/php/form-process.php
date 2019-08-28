<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) ***REMOVED***
    $errorMSG = "Name is required ";
} else ***REMOVED***
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) ***REMOVED***
    $errorMSG .= "Email is required ";
} else ***REMOVED***
    $email = $_POST["email"];
}

// MSG SUBJECT
if (empty($_POST["msg_subject"])) ***REMOVED***
    $errorMSG .= "Subject is required ";
} else ***REMOVED***
    $msg_subject = $_POST["msg_subject"];
}


// MESSAGE
if (empty($_POST["message"])) ***REMOVED***
    $errorMSG .= "Message is required ";
} else ***REMOVED***
    $message = $_POST["message"];
}


$EmailTo = "armanmia7@gmail.com";
$Subject = "New Message Received";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Subject: ";
$Body .= $msg_subject;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == "")***REMOVED***
   echo "success";
}else***REMOVED***
    if($errorMSG == "")***REMOVED***
        echo "Something went wrong :(";
***REMOVED*** else ***REMOVED***
        echo $errorMSG;
***REMOVED***
}

?>