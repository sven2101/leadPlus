
function register() {

	$(document.registration).ready(function () {

	    $('#contact-form').validate({
	        rules: {
	            name: {
	                minlength: 2,
	                required: true
	            },
	            email: {
	                required: true,
	                email: true
	            },
	            message: {
	                minlength: 2,
	                required: true
	            }
	        },
	        highlight: function (element) {
	            $(element).closest('.control-group').removeClass('success').addClass('error');
	        },
	        success: function (element) {
	            element.text('OK!').addClass('valid')
	                .closest('.control-group').removeClass('error').addClass('success');
	        }
	    });

	});
	
	
	
	var username 	= document.registration.username.value;
	var email 		= document.registration.email.value;
	var password 	= document.registration.password.value;

	console.log("username: ", username);
	console.log("email: ", email);
	console.log("password: ", password);
		
	/*
	 * Username Validation
	 */		
	
	if( username == null || username == "") {
		alert("Username must be filled out");
		return false;
	}
	
	if( username.length < 7 ) {
		alert("Username length must be longer than 7 chars.");
		return false;
	}
	
	/*
	 * Email Address Validation
	 */
	
	var atpos=email.indexOf("@");
	var dotpos=email.lastIndexOf(".");
	
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
		alert("Not a valid e-mail address");
		return false;
	}

	/*
	 * Password Validation
	 */
	
	if( password == null || password == "") {
		alert("Password must be filled out");
		return false;
	}
	
	if( password.length < 7 ) {
		alert("Password length must be longer than 7 chars.");
		return false;
	}
	
	var xmlhttp = new XMLHttpRequest();  
	xmlhttp.open("POST", "/application/registrations");
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(	{
									    "username": username,
									    "email": email,
									    "password": password
									 }
								));
	
}
	