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
		</style>
	</head>
	<body>
	<div id="loginscreen">
		<div class="container">
		<div class="middle-box text-center animated fadeInDown" style="margin-top: -40px;">
			<div class="row">
				<h1 class="logo-name" style="color:white;">lead+</h1>
				<h3 style="color:white;">Register your Company</h3>
				<p style="color:white;">Start with lead+ and an create an Account for your company as well as your initial user. </p>
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
										<div class="input-group-addon">.leaplus.io</div>
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
										<label style="color:white;text-align:center;">
											<input type="checkbox" id="terms" name="terms" class="input">
											Ich stimme den <a href='https://www.leadplus.io/agb/' target='_blank'>Allgemeinen Geschäftsbedingungen</a> und der <a href='https://www.leadplus.io/datenschutzerklaerung/' target='_blank'>Datenschutzerklärung</a> zu
										</label>
									</div>
									<br/>
									<br/>
									<div class="errorTxt"></div>
									<button type="button" class="btn btn-success block full-width m-b" disabled id="register" name="register">
										<strong>Register</strong>
									</button>
								</div>	
							</div>
						</div>
						<p style="color:white;text-align:center;">©eviarc 2017 All Rights Reserved.</p>
					</form>
				</div>
			</div>
		</div>
	</div>
	</body>
	<script type="text/javascript" src=https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js></script>
	<script type="text/javascript" src=https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js></script>
	<script type="text/javascript">
	$(document).ready(function () {
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
	    	$("#tenantKey").valid();
		});
		$('#firstname').on('keyup blur', function() {
	    	$("#firstname").valid();
		});
		$('#lastname').on('keyup blur', function() {
	    	$("#lastname").valid();
		});
		$('#email').on('keyup blur', function() {
	    	$("#email").valid();
		});
		$('#password').on('keyup blur', function() {
	    	$("#password").valid();
		});
		$('#password2').on('keyup blur', function() {
	    	$("#password2").valid();
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
	
	});
	</script>
</html>