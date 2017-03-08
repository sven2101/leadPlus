<!DOCTYPE html>

<html lang="en">

<style type= text/css>
.head{
	text-align: right;
	margin-right:20px;
	margin-left:auto;
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
		<img alt="lead+" src="${imgAsBase64Logo}" />
	</div>
	
    <div class="content">
        <h3 class="heading">Hi ${user.firstname} ${user.lastname},</h3>

        <p>
        Welcome to lead+! 
        <br/>
        <br/>
        My name is Andreas, I'm one of the co-founders of lead+.
        We are looking forward to add value to your daily Sales Process.
        <br/>
        Here is some important information about your new account. You should save this email, so you can refer to it later. 
        </p>
        
        <div class="information">
            <h4>Your lead+ entry point <a href="https://${tenant.tenantKey}.leadplus.me">https://${tenant.tenantKey}.leadplus.me</a></h4>
            <h4>Login with your username ${user.email}</h4>
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
        <img alt="Andreas Foitzik" src="${imgAsBase64Employee}" />
        <br/>
        <br/>
        <div class="footer">
            Andreas Foitzik 
            <br/>
            CEO
            <br/>
            <br/>
            <a href="http://leadplus.io">www.leadplus.io</a> <br/>
            Hauptstrasse 55 <br/>
            76133 Karlsruhe <br/>
            Germany <br/>
            <br/>
            +49 123 456 789 00
        </div>
	</div>
	
</body>

</html>