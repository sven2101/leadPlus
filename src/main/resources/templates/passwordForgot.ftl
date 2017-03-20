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
	<div class="container">
	<div class="middle-box text-center animated fadeInDown" style="margin-top: -40px;">
		<div class="row">
			<h1 class="logo-name" style="color:white;">lead+</h1>
			<h3 style="color:white;">Reset Your Password?</h3>
			<p style="color:white;">Fear not. We’ll email you instructions to reset your password. If you don’t have access to your email anymore, just contact us.</p>
				<form id="forgotPassword">
					<div class="alert alert-success" id="success">
						<i class="icon-check"></i> 
						<strong>Success!</strong>
						<br>We've sent an email to your address with password reset instructions.
					</div>
					<div class="alert alert-danger" id="error">
						<i class="icon-warning-sign"></i>
						<strong>Error!</strong>
						<br>We haven't sent an email to your address with password reset instructions.
					</div>
					<div class="alert alert-warning" id="notify">
						<strong>General!</strong>
						<br>If the email doesn't show up soon, check your spam folder. We sent it from <b>support@leadplus.io</b>.
						<strong>Otherwise text us.</strong>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Email" id="email" name="email" autocomplete="off">
						<div class="reset">We'll email you a password reset link.</div>
					</div>
					<div id="request">
						<button type="button" class="btn btn-success block full-width m-b" id="reset" disabled="true">
						Reset Password
						<span id="spinner" style="float: left;margin-left: -5px;padding-right:2px;padding-top: 2px ">
                            <div class="spinner-white"></div>
                        </span>
					</button>
					</div>
					
					<div id="login">
						<a href=/#/login class="btn btn-primary block full-width m-b">Return to login</a>
					</div>
				</form>
				<p>©eviarc 2017 All Rights Reserved.</p>
			</div>
		</div>
	</div>
	</body>
	<script src=https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js></script>
	<script src=https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js></script>
	<script>
	$(document).ready(function () {
		$("#success").hide();
		$("#error").hide();
		$("#notify").hide();
		$("#login").hide();
		$("#spinner").hide();
		$("#email").attr("readonly", false);
		
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
				url: "/api/rest/password/forgot",
				type:"POST",
				headers: {
					"Content-Type": "application/json",   
					"X-TenantID": $(location).attr("hostname")
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
					$("#notify").show( "slow", function() {
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