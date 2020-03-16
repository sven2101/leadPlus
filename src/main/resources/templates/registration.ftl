<html lang="en">
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
		<style type="text/css">
			.desc {
				font-style:normal;
				color:#BF472C;
			}
			.errorTxt{
				min-height: 20px;
				width:100%;
				margin-bottom: 20px;
				text-align:center;
			}
			#outer-language ul.nav .open > a, ul.nav .open > a:hover, ul.nav .open > a:focus{
				background: transparent !important;
			}
			
		</style>
	</head>
	<body>
	<div id="loginscreen">
		<div class="container">
			<div>
				<div class="middle-box text-center animated fadeInDown" style="margin-top: -40px;">
					<div class="row">
						<h1 class="logo-name" style="color:white;">lead+</h1>
						<h3 style="color:white;" id="heading"></h3>
						<p style="color:white;" id="subheading"></p>
						<div class="alert alert-success" id="success">
							<strong id="successHeader"></strong>
							<br/>
							<p id="successMessage"></p>
						</div>
						<div class="alert alert-danger" id="error">
							<i class="icon-warning-sign"></i>
							<strong id="errorHeader"></strong>
							<br>
							<p id="errorMessage"></p>
						</div>
					</div>
				</div>
				<div class="animated fadeInDown">
					<div class="row">
						<form id="registrationForm">
						
							<!-- Sitename -->
							<div class="row">
								<div class="col-md-4 col-md-offset-4">
									<div class="form-group">
										<div class="input-group">
											<input type="text" class="form-control input" id="tenantKey" name="tenantKey" placeholder="Your personal subdomain" >
											<div id="hostname" class="input-group-addon">.leaplus.io</div>
										</div>
									</div>
								</div>
							</div>
					
							<!-- fullname -->
							<div class="row">
								<div class="col-md-2 col-md-offset-4">
									<div class="form-group">
										<input type="text" class="form-control input" id="firstname" name="firstname" placeholder="Firstname">
									</div>
								</div>
								<div class="col-md-2">
									<div class="form-group">
										<input type="text" class="form-control input" id="lastname" name="lastname" placeholder="Lastname">
									</div>
								</div>
							</div>
					
							<!-- Email -->
							<div class="row">
								<div class="col-md-4 col-md-offset-4">
									<div class="form-group" >
										<input type="email" id="email" name="email" class="form-control input" placeholder="Your Email">
									</div>
								</div>
							</div>
					
							<!-- Password -->
							<div class="row">
								<div class="col-md-4 col-md-offset-4">
									<div class="form-group">
										<input type="password" class="form-control input" id="password" name="password" placeholder="Password">
									</div>
								</div> 
							</div>
					
							<!-- Password Confirm -->
							<div class="row">
								<div class="col-md-4 col-md-offset-4">
									<div class="form-group" >
										<input type="password" class="form-control input" id="password2" name="password2" placeholder="Confirm your Password">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-4 col-md-offset-4">
									<div class="form-group">
										<div class="input-group">
											<label style="color:white;text-align:center;" id="legal">
												<input type="checkbox" id="terms" name="terms" class="input">
												<text id="en_terms">
													I agree to the <a href='https://www.leadplus.io/agb/' target='_blank'>General Conditions</a> and the <a href='https://www.leadplus.io/datenschutzerklaerung/' target='_blank'>Data Protection</a>.
												</text>
												<text id="de_terms">
													Ich stimme den <a href='https://www.leadplus.io/agb/' target='_blank'>Allgemeinen Geschäftsbedingungen</a> und der <a href='https://www.leadplus.io/datenschutzerklaerung/' target='_blank'>Datenschutzerklärung</a> zu
												</text>
											</label>
										</div>
										<br/>
										<br/>
										<div class="errorTxt"></div>
										<div id="request">
											<button type="button" class="btn btn-success block full-width m-b" disabled id="register" name="register">
												<strong id="en_register">Register</strong>
												<strong id="de_register">Registrieren</strong>
												<span id="spinner" style="float: left;margin-left: -5px;padding-right:2px;padding-top: 2px ">
						                            <div class="spinner-white"></div>
						                        </span>
											</button>
										</div>
										<div id=login>
											<a href="#" id=userLogin class="btn btn-primary block full-width m-b"><strong id="loginMessage"></strong></a>
										</div>
									</div>	
								</div>
							</div>
							<p style="color:white;text-align:center;">©eviarc 2017 All Rights Reserved.</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	</body>
	<script type="text/javascript" src="/assets/js/unbundled/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="/assets/js/unbundled/jquery.validation-1.16.0.js"></script>
	<script type="text/javascript" src="/assets/js/unbundled/sjcl.js"></script>
	
	<script type="text/javascript">
	$(document).ready(function () {
		
		var heading = "Register your Company";
		var subheading = "Start with lead+ and an create an Account for your company as well as your initial user.";
		
		var successHeader = "Success!";
		var successMessage = "We've successfully created an account for you and your company.You've received an email with further instructions. But for now you are good to go and start using lead+";
		var errorHeader = "Error!";
		var errorMessage = "There occurred an Error. Please contact us or send an email to support@leadplus.io.";
		
		var tenantKey = "Your personal subdomain";
		var firstname = "Firstname";
		var lastname = "Lastname";
		var email = "Your Email";
		var password = "Password";
		var password2 = "Confirm your password";
		
		var loginMessage = "Login now!";

		$("#de_terms").hide();
		$("#en_terms").show();
		$("#de_register").hide();
		$("#en_register").show();
		
		var language = navigator.language || navigator.userLanguage;
		if (language.indexOf("de") !== -1) {
			// GERMAN 
			
			heading = "Registriere Dein Unternehmen";
			subheading = "Registriere Dich und Dein Unternehmen und starte durch mit lead+";
			
			successHeader = "Registrierung erfolgreich!";
			successMessage = "Wir haben Deinen Account angelegt und Dir eine Getting Started Email zukommen lassen. Jetzt kannst Du direkt loslegen!";
			errorHeader = "Registrierung fehlgeschlagen!";
			errorMessage = "Fehler aufgetreten. Bitte kontaktiere uns, oder schreibe uns eine Email an support@leadplus.io.";

			tenantKey = "Deine persönliche Subdomain";
			firstname = "Vorname";
			lastname = "Nachname";
			email = "Deine Email";
			password = "Passwort";
			password2 = "Wiederhole dein Passwort";
			
			loginMessage = "Jetzt anmelden!";
			
			$("#en_terms").hide();
			$("#de_terms").show();
			$("#de_register").show();
			$("#en_register").hide();
	    } 

		$("#heading").text(heading);
		$("#subheading").text(subheading);
		$("#successHeader").text(successHeader);
		$("#successMessage").text(successMessage);
		$("#errorHeader").text(errorHeader);
		$("#errorMessage").text(errorMessage);
		$("#tenantKey").prop("placeholder", tenantKey);
		$("#firstname").prop("placeholder", firstname);
		$("#lastname").prop("placeholder", lastname);
		$("#email").prop("placeholder", email);
		$("#password").prop("placeholder", password);
		$("#password2").prop("placeholder", password2);
		$("#loginMessage").text(loginMessage);

		$("#success").hide();
		$("#error").hide();
		$("#login").hide();
		$("#spinner").hide();
		$('#register').prop('disabled', 'disabled');
		
		$('#registrationForm').validate({
			rules: {
				tenantKey: {
					required: true,
					minlength: 3,
	                maxlength: 20,
	                uniqueTenantKey: true, 
	                regex: "^[a-z]+$"
				},
				email: {
					required: true,
					email: true
				},
				firstname: {
					required: true,
					minlength: 2,
	                maxlength: 20,
				},
				lastname: {
					required: true,
					minlength: 2,
	                maxlength: 20,
				},
				password: { 
	                required: true,
                   	minlength: 6,
	                maxlength: 15,
               	}, 
			   	password2: { 
					equalTo: "#password",
					minlength: 6,
					maxlength: 15
               	},
               	terms: {
                    required : true
                }
			},
			errorClass: "desc",
		    errorElement : 'div',
		    errorLabelContainer: '.errorTxt'
		});
		
		$.validator.addMethod(
		       	"regex",
		        function(value, element, regexp) {
		            var re = new RegExp(regexp);
		            return this.optional(element) || re.test(value);
		        },
		        "Only use letters from a-z. "
		);
		
		$.validator.addMethod(
	       	"uniqueTenantKey",
	        function(value, element) {
   				var tenant = $('#tenantKey').val();
   				var data = {
   					tenantKey: tenant
   				}
   				var validation;
   				$.ajax({
   				  url: "/tenants/unique/key",
   				  async: false,
   				  headers: {
   						"Content-Type": "application/json"  
   				  },
   				  dataType: 'json',
   				  data : JSON.stringify(data),
   				  type: 'POST',
   				  success: function(result) {
   					  validation = result.validation;
   				  }, 
   				  error: function(result) {
   					  console.log(result);
   				  }
   				});
   				
   				return validation;
	        },
	        "This subdomain is already in use."
		);
		
		// validate each input field on key up or blur
		$('#tenantKey').on('keyup blur', function() {
	    	if (!$("#tenantKey").valid()){
	    		$('#register').attr('disabled', 'disabled');
	    	}
		});
		$('#firstname').on('keyup blur', function() {
	    	if (!$("#firstname").valid()){
	    		$('#register').attr('disabled', 'disabled');
	    	}
		});
		$('#lastname').on('keyup blur', function() {
	    	if (!$("#lastname").valid()){
	    		$('#register').attr('disabled', 'disabled');
	    	}
		});
		$('#email').on('keyup blur', function() {
	    	if (!$("#email").valid()){
	    		$('#register').attr('disabled', 'disabled');
	    	}
		});
		$('#password').on('keyup blur', function() {
	    	if (!$("#password").valid()){
	    		$('#register').attr('disabled', 'disabled');
	    	}
		});
		$('#password2').on('keyup blur', function() {
	    	if (!$("#password2").valid()){
	    		$('#register').attr('disabled', 'disabled');
	    	}
		});
			
		// validate all input fields and enable register button if form is valid
		$('.input').on('keyup blur change', function() {		
			if ($('#tenantKey').val() != "" && 
				$('#firstname').val() != "" && 
				$('#lastname').val() != "" && 
				$('#email').val() != "" && 
				$('#password').val() != "" && 
				$('#password2').val() != "" &&
				$('#terms').prop('checked')){
					if ($("#registrationForm").valid()){
						$('#register').attr('disabled', false);
			    	} else {
			    		$('#register').attr('disabled', 'disabled');
			    	}
			}
		});
		
		$('#terms').on('change', function() {			
			if (!$("#terms").valid()){
	    		$('#register').attr('disabled', 'disabled');
	    	}
		});
		
		// create the tenant 
		$("#register").click(function(){	
			$("#registrationForm").valid();	
			
			$("#spinner").show();

			$("#tenantKey").attr("readonly", true);
			$("#firstname").attr("readonly", true);
			$("#lastname").attr("readonly", true);
			$("#email").attr("readonly", true);
			$("#password").attr("readonly", true);
			$("#password2").attr("readonly", true);

			var newPassword = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2($('#password').val(), $('#email').val(), 10000));

			var data = {
				tenantKey: $('#tenantKey').val(),
				enabled: true,
				license: {
					licenseType: "BASIC"
				},
				registration: {
					email: $('#email').val(),
					firstname: $('#firstname').val(),
					lastname: $('#lastname').val(),
					password: newPassword,
					password2: newPassword,
					language: "DE"
				}
		    }
			$.ajax({
				url: "tenants",
				type:"POST",
				headers: {
					"Content-Type": "application/json"   
				},
				data : JSON.stringify(data),
				success : function(result) {
					$("#success").show( "slow", function() {
						$("#request").hide();
						$("#tenantKey").hide();
						$("#firstname").hide();
						$("#lastname").hide();
						$("#email").hide();
						$("#password").hide();
						$("#password2").hide();
						$("#terms").hide();
						$("#hostname").hide();
						$("#legal").hide();

						$("#login").show();
					
						var host = $(location).attr('host');
						var hostnameParts = host.split(".");
						var topLevelDomain = hostnameParts.pop();
						var subHost = hostnameParts.join(".");
						var secondLevelDomain = subHost.split(".").pop();
						
						$("#userLogin").prop("href", "http://"+$('#tenantKey').val()+"."+ secondLevelDomain +"."+ topLevelDomain +"/#/login")
					});
				},
				error: function(xhr, resp, text) {
					$("#error").show( "slow", function() {
						$("#tenantKey").attr("readonly", false);
						$("#firstname").attr("readonly", false);
						$("#lastname").attr("readonly", false);
						$("#email").attr("readonly", false);
						$("#password").attr("readonly", false);
						$("#password2").attr("readonly", false);
					});
				},
				complete: function(){
					$("#spinner").hide();
		      	}
			})
		});
	
	});
	</script>
</html>