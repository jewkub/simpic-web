$("#contactForm").validator().on("submit", function (event) ***REMOVED***
    if (event.isDefaultPrevented()) ***REMOVED***
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
***REMOVED*** else ***REMOVED***
        // everything looks good!
        event.preventDefault();
        submitForm();
***REMOVED***
});


function submitForm()***REMOVED***
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    $.ajax(***REMOVED***
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
        success : function(text)***REMOVED***
            if (text == "success")***REMOVED***
                formSuccess();
        ***REMOVED*** else ***REMOVED***
                formError();
                submitMSG(false,text);
        ***REMOVED***
    ***REMOVED***
***REMOVED***);
}

function formSuccess()***REMOVED***
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError()***REMOVED***
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function()***REMOVED***
        $(this).removeClass();
***REMOVED***);
}

function submitMSG(valid, msg)***REMOVED***
    if(valid)***REMOVED***
        var msgClasses = "h3 text-center tada animated text-success";
***REMOVED*** else ***REMOVED***
        var msgClasses = "h3 text-center text-danger";
***REMOVED***
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}