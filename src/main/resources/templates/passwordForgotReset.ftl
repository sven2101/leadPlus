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
		<div class="container">
			<div class="middle-box text-center animated fadeInDown" style="margin-top: -40px;">
				<div class="row">
					<h1 class="logo-name" style="color:white">lead+</h1>
					<h3 style="color:white;">Reset your Password</h3>
					<p style="color:white;">Almost done. Enter your new password, and you're good to go.</p>
					<form id="formCheckPassword">
						<div class="alert alert-success" id="success">
							<i class="icon-check"></i>
							<strong>Success!</strong>
							<br>We've successfully updated your password. Login now with your new password!
						</div>
						<div class="alert alert-danger" id="error">
							<i class="icon-warning-sign"></i>
							<strong>Error!</strong>
							<br>There occured an Error. Please contact us or send an email to support@leadplus.io.
						</div>
						<div class="form-group">
							<input type="password" class="form-control" placeholder="New Password" id="password" name="password">
							<br>
							<input type="password" class="form-control" placeholder="Confirm new Password" id="cfmPassword" name="cfmPassword">
						</div>
						<div id="request">
							<button type="button" class="btn btn-success block full-width m-b" id="reset">Reset Password</button>
						</div>
						<div id=login>
							<a href="/#/login" class="btn btn-success block full-width m-b">Return to login</a>
						</div>
					</form>
					©eviarc 2017 All Rights Reserved.
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
		$("#login").hide();
		$("#notify").hide();
		$("#reset").attr("disabled", "disabled");

		var id = getUrlParameter("ID");
		function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');

				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}			
		};

		if (typeof id === "undefined") {
    		$("#error").show();
		}

		$('#password').on('keyup blur', function() {
    	if ($("#formCheckPassword").valid()) {
				$('#reset').attr('disabled', false);  
			} else {
				$('#reset').attr('disabled', 'disabled');
			}
		});

		$('#cfmPassword').on('blur', function() {
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
			var password = $('#password').val();
			
			$.ajax({
				url: "/api/rest/password/forgot/reset?ID="+id,
				type:"POST",
				headers: {
					"Content-Type": "application/json",   
					"X-TenantID": $(location).attr("hostname")
				},
				data : '"'.concat(password).concat('"'),
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
					console.log(xhr, resp, text);
				}
			})
		});
	});
	</script>
</html>