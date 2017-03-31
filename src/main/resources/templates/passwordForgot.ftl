<html>
	<head>
		<meta charset=utf-8>
		<meta name=viewport content="width=device-width, initial-scale=1.0"
		><meta http-equiv=X-UA-Compatible content="IE=edge">
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
		</style>
	</head>
	<body>
	<div id="loginscreen">
		<div class="container">
		<div class="middle-box text-center animated fadeInDown" style="margin-top: -40px;">
			<div class="row">
				<h1 class="logo-name" style="color:white;">lead+</h1>
				<h3 style="color:white;" id="heading"></h3>
				<p style="color:white;" id="subheading"></p>
					<form id="forgotPassword">
						<div class="alert alert-success" id="success">
							<i class="icon-check"></i> 
							<strong id = "successHeader"></strong>
							<br>
							<p id="successMessage"></p>
						</div>
						<div class="alert alert-danger" id="error">
							<i class="icon-warning-sign"></i>
							<strong id="errorHeader"></strong>
							<br>
							<p id="errorMessage"></p>
						</div>
						<div class="alert alert-warning" id="notify">
							<strong id="generalHeader">General!</strong>
							<br>
							<p id="generalMessage"></p>
						</div>
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Email" id="email" name="email" autocomplete="off">
							<div class="reset" id="resetMessage"></div>
						</div>
						<div id="request">
							<button type="button" class="btn btn-success block full-width m-b" id="reset" disabled>
								<strong id="en_reset">Reset Password</strong>
								<strong id="de_reset">Passwort zurücksetzen</strong>
								<span id="spinner" style="float: left;margin-left: -5px;padding-right:2px;padding-top: 2px ">
	                            	<div class="spinner-white"></div>
	                        	</span>
						</button>
						</div>
						
						<div id="login">
							<a href="/#/login" id=userLogin class="btn btn-primary block full-width m-b"><strong id="loginMessage"></strong></a>
						</div>
					</form>
					<p>©eviarc 2017 All Rights Reserved.</p>
				</div>
			</div>
		</div>
	</div>
	
	</body>
	<script type="text/javascript" src="/assets/js/unbundled/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="/assets/js/unbundled/jquery.validation-1.16.0.js"></script>
	<script>
	$(document).ready(function () {
		$("#success").hide();
		$("#error").hide();
		$("#notify").hide();
		$("#login").hide();
		$("#spinner").hide();
		$("#email").attr("readonly", false);

		// internationalization
		var heading = "Reset Your Password?";
		var subheading = "Fear not. We’ll email you instructions to reset your password. If you don’t have access to your email anymore, just contact us.";
		
		var successHeader ="Success!";
		var successMessage = "We've sent an email to your address with password reset instructions.";
		var errorHeader = "Error!";
		var errorMessage = "We haven't sent an email to your address with password reset instructions.";
		var generalHeader = "General!";
		var generalMessage = "If the email doesn't show up soon, check your spam folder. We sent it from support@leadplus.io. Otherwise text us.";
		var resetMessage = "We'll email you a password reset link.";
		var loginMessage = "Return to login";
		
		$("#de_reset").hide();
		$("#en_reset").show();
		
		var language = navigator.language || navigator.userLanguage;
		if (language.indexOf("de") !== -1) {
			heading = "Passwort zurücksetzen?";
			subheading = "Keine Angst. Wir senden Dir eine Email, mit welcher Du Dein Passwort zurücksetzen kannst. Wenn Du keinen Zugriff auf Deine Emails hast, kontaktiere uns.";
			successHeader = "Erfolgreich!";
			successMessage = "Wir haben Dir eine Email gesendet, wie Du Dein Passwort vollends zurücksetzen kannst.";
			errorHeader = "Fehler!";
			errorMessage = "Wir konnten Dir keine Email senden.";
			generalHeader = "Allgemein!";
			generalMessage = "Falls Du die Email nicht zeitnah erhälst, solltest Du in Deinen Spam-Ordner schauen. Die Email wurde von support@leadplus.io versendet. Ansonsten kontaktiere uns.";
			resetMessage = "Wir senden Dir deinen Link zum Passwort zurücksetzen";
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
		$("#generalHeader").text(generalHeader);
		$("#generalMessage").text(generalMessage);
		$("#loginMessage").text(loginMessage);

		$('#forgotPassword').validate({
			rules: {
				email: {
					required: true,
					email: true
				}
			},
			errorClass: "desc"
		});

		$("#email").on('keyup blur', function() {
    	if ($("#forgotPassword").valid()) {
				$('#reset').prop('disabled', false);  
			} else {
				$('#reset').prop('disabled', 'disabled');
			}
		});

		$("#reset").click( function(){
			$("#forgotPassword").valid();
			$("#spinner").show();

			var email = $('#email').val();
			$.ajax({
				url: "/password/forgot/requests",
				type:"POST",
				headers: {
					"Content-Type": "application/json"
				},
				data : '"'.concat(email).concat('"'),
				dataType: "json",
				success : function(result) {
					$("#success").show( "slow", function() {
						$("#email").attr("readonly", true);
						$("#request").hide();
						$("#login").show();
					});
					$("#notify").show( "slow", function() {
					});
				},
				error: function(xhr, resp, text) {
					$("#error").show( "slow", function() {
					});
				},
				complete: function(){
					$("#spinner").hide();
		      	}
			})
		}
      );

	});
</script>
</html>