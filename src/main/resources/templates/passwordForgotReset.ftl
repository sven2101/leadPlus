<html>
	<head>
		<meta charset=utf-8>
		<meta name=viewport content="width=device-width, initial-scale=1.0">
		<meta http-equiv=X-UA-Compatible content="IE=edge">
		<title>LeadPlus</title>
		<link rel=icon type=image/png sizes=16x16 href=/assets/img/favicon.ico>
		<link href=/assets/assets.css rel=stylesheet>
		<link href=/assets/font-awesome.min.css rel=stylesheet>
		<link href=/assets/bootstrap.min.css rel=stylesheet>
		<link href=/assets/style.css rel=stylesheet>
		<style>
			input::-webkit-outer-spin-button,
			input::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
			#outer-language ul.nav .open > a, ul.nav .open > a:hover, ul.nav .open > a:focus{
				background: transparent !important;
			}
			.desc {
				font-style:normal;
				color:#BF472C;
			}
			.center {
				text-align:center;
			}
			.logo-name {
				color: #e6e6e6;
				font-size: 100px;
				font-weight: 800;
				letter-spacing: -10px;
				margin-bottom: 0;
			}
		</style>
	</head>
	<body>
	<div id="loginscreen">
		<div class="container">
			<div class="middle-box text-center animated fadeInDown" style="margin-top: -40px;">
				<div class="row">
					<h1 class="logo-name" style="color:white">lead+</h1>
					<h3 style="color:white;" id="heading"></h3>
					<p style="color:white;" id="subheading"></p>
					<form id="formCheckPassword">
						<div class="alert alert-success" id="success">
							<i class="icon-check"></i>
							<strong id="successHeader"></strong>
							<br>
							<p id="successMessage"></p>
						</div>
						<div class="alert alert-danger" id="error">
							<i class="icon-warning-sign"></i>
							<strong id="errorHeader"></strong>
							<br>
							<p id="errorMessage"></p>
						</div>
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Email" id="email" name="email" autocomplete="off">
							<br/>
							<input type="password" class="form-control" placeholder="New Password" id="password" name="password">
							<br>
							<input type="password" class="form-control" placeholder="Confirm new Password" id="cfmPassword" name="cfmPassword">
						</div>
						<div id="request">
							<button type="button" class="btn btn-success block full-width m-b" id="reset">
								<div id="en_reset">
									<strong>Reset Password</strong>
								</div>
								<div id="de_reset">
									<strong>Passwort zurücksetzen</strong>
								</div>
							</button>
						</div>
						<div id=login>
							<a href="/#/login" id=userLogin class="btn btn-success block full-width m-b"><strong id="loginMessage"></strong></a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	</body>
	<script type="text/javascript" src="/assets/js/unbundled/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="/assets/js/unbundled/jquery.validation-1.16.0.js"></script>
	<script type="text/javascript" src="/assets/js/unbundled/sjcl.js"></script>
	<script type="text/javascript" >
	$(document).ready(function () {
		$("#success").hide();
		$("#error").hide();
		$("#login").hide();
		$("#notify").hide();
		$("#reset").attr("disabled", "disabled");
		
		// internationalization
		var heading = "Reset your Password";
		var subheading = "Almost done. Enter your new password, and you're good to go.";
		
		var successHeader ="Success!";
		var successMessage = "We've successfully updated your password. Login now with your new password!";
		var errorHeader = "Error!";
		var errorMessage = "There occurred an Error. Please contact us or send an email to support@leadplus.io.";
		
		var email = "Your Email";
		var password = "Password";
		var cfmPassword = "Confirm your Password";
		
		var loginMessage = "Return to login";
		
		$("#de_reset").hide();
		$("#en_reset").show();
		
		var language = navigator.language || navigator.userLanguage;
		if (language.indexOf("de") !== -1) {
			heading = "Passwort zurücksetzen?";
			subheading = "Du hast es beinahe geschafft. Gebe Dein neues Passwort ein und Du kannst loslegen.";
			successHeader = "Erfolgreich!";
			successMessage = "Wir haben Dein Passwort erfolgreich zurückgesetzt. Du kannst es direkt ausprobieren!";
			errorHeader = "Fehler!";
			errorMessage = "Es ist ein Fehler aufgetreten. Bitte kontaktiere uns, oder sende uns eine Email an support@leadplus.io.";
			
			email = "Deine Email";
			password = "Passwort";
			cfmPassword = "Wiederhole dein Passwort";
			
			loginMessage = "Zurück zum Login";
			
			$("#de_reset").show();
			$("#en_reset").hide();
		}
		
		$("#heading").text(heading);
		$("#subheading").text(subheading);
		$("#successHeader").text(successHeader);
		$("#successMessage").text(successMessage);
		$("#errorHeader").text(errorHeader);
		$("#errorMessage").text(errorMessage);
		$("#email").prop("placeholder", email);
		$("#password").prop("placeholder", password);
		$("#cfmPassword").prop("placeholder", cfmPassword);
		$("#loginMessage").text(loginMessage);

		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === "ID") {
				$.ajax({
				  url: "/password/forgot/requests/"+sParameterName[1],
				  headers: {
						"Content-Type": "application/json"  
				  },
				  success: function(result) {
					  continueWithReset(result, sParameterName[1]);
				  }, 
				  error: function(result) {
					  errorHandling(result);
				  }
				});
			}
		}
				
		function errorHandling(result){
			  $("#error").show();
			  $("#email").attr("disabled", "disabled");
			  $("#password").attr("disabled", "disabled");
			  $("#cfmPassword").attr("disabled", "disabled");
		}
		
		function continueWithReset(email, id){

			$('#email').on('keyup blur', function() {
	    	if ($("#formCheckPassword").valid()) {
					$('#reset').attr('disabled', false);  
				} else {
					$('#reset').attr('disabled', 'disabled');
				}
			});
			
			$('#password').on('keyup blur', function() {
	    	if ($("#formCheckPassword").valid()) {
					$('#reset').attr('disabled', false);  
				} else {
					$('#reset').attr('disabled', 'disabled');
				}
			});
	
			$('#cfmPassword').on('keyup blur', function() {
	    	if ($("#formCheckPassword").valid()) {
					$('#reset').attr('disabled', false);  
				} else {
					$('#reset').attr('disabled', 'disabled');
				}
			});

			$("#formCheckPassword").validate({
	           rules: {
	               password: { 
	                 required: true,
	                    minlength: 6,
	                    maxlength: 15,
	               }, 
				   cfmPassword: { 
					equalTo: "#password",
						minlength: 6,
						maxlength: 15
	               },
	               email: {
						required: true,
						email: true
					}
				},
				errorClass: "desc",
				messages:{
					password: { 
						required:"the password is required"
					}
				}
			});
		
			$("#request").click(function(){
				$("#formCheckPassword").valid();	
				var oldPassword = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2($('#password').val(), $('#email').val(), 10000));

				var data = {
					password: oldPassword,
					email: $('#email').val()
			    }
				$.ajax({
					url: "/password/forgot/requests/reset?ID="+id,
					type:"POST",
					headers: {
						"Content-Type": "application/json",   
						"X-TenantID": $(location).attr("hostname")
					},
					data : JSON.stringify(data),
					success : function(result) {
						$("#success").show( "slow", function() {
							$("#email").attr("readonly", true);
							$("#password").hide();
							$("#cfmPassword").hide();
							$("#request").hide();
							$("#login").show();
						});
					},
					error: function(xhr, resp, text) {
						$("#error").show( "slow", function() {
						});
					}
				})
			});
		}
		
	});
	</script>
</html>