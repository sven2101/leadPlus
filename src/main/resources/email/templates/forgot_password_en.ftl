<!DOCTYPE html>

<html lang="en">

<style type= text/css>
.top{
	width:100%;
	height:70px;
	background-color:#1A92E2;
}
.head{
	text-align: right;
	margin-right:20px;
	margin-left:auto;
	vertical-align:middle;
}
.content{
    color:#202020 !important; 
    display:block;
    text-align: justify;
    font-family:Arial; 
    font-size:15px; 
    font-weight:normal; 
    line-height:100%;
    text-align:left; 
    width:70%;
    margin:auto;
    margin-top:50px;
}
.heading{
    text-align:center;
}
.information{
    width:95%;
    margin:auto;
}
.footer{
    font-size:15px;
    text-align:left; 
}
</style>
<body >

	<div class="head">
		<img src="cid:logo" alt="lead+"/>
	</div>
	
    <div class="content">
        <h3 class="heading">Hallo ${user.firstname} ${user.lastname},</h3>
		<p>
        Request a new Password! 
        <br/>
        <br/>
        To create a new password you need to use the link below. 
        Afterwards you will be prompted to type in a new password and to confirm it. 
        <br/>
        <br/>
        After your successful forgot password request you can use lead+ with your new password! 
        </p>
        
        <div class="information">
            <h4><a href="https://${tenant.tenantKey}.leadplus.io/Password.Reset.html?ID=${passwordForgot.randomKey}">Click here</a> to set a new password!</h4>
            Sign in with your username <h4>${user.email}</h4>
        </div>

        <p>
        <b>We're here to help!</b>
        <br/>
        If there's ever anything I can do to help just let me know and our support team will make sure you get the data you need!
        <br/>
        <br/>
        We'll be in touch periodically with additional resources, important updates and best practices to help you
        get the most out of lead+.
        </p>
        <br/>
        Cheers,
        <br/>
        Andreas
        <br/>
        <br/>
		<img src="cid:employee" alt="Andreas Foitzik"/>
        <br/>
        <br/>
        <div class="footer">
            Andreas Foitzik 
            <br/>
            CEO
            <br/>
            <br/>
            <a href="http://leadplus.io">www.leadplus.io</a> <br/>
            eviarc UG (haftungsbeschränkt) i.G. <br/>
            Hauptstrasse 55 <br/>
            76133 Karlsruhe <br/>
            Germany <br/>
            <br/>
            +49 123 456 789 00
        </div>
	</div>
	
</body>

</html>