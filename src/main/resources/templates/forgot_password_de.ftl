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
        Neues Passwort anfordern! 
        <br/>
        <br/>
        Damit Du ein neues Passwort verwenden kannst, musst Du untenstehenden Link verwenden. 
        Anschließend wirst du aufgefordert, ein neues Passwort zu wählen und dieses zu bestätigen. 
        <br/>
        <br/>
        War die Eingabe erfolgreich, kannst Du dich wie gewohnt mit Deinem neuen Passwort anmelden!
        </p>
        
        <div class="information">
            <h4><a href="https://${tenant.tenantKey}.${hostname}/password/forgot/reset?ID=${passwordForgot.randomKey}">Klicke hier</a>, um Dein neues Passwort festzulegen!</h4>
            Melde Dich mit Deinem Benutzernamen an <h4>${user.email}</h4>
        </div>

        <p>
        <b>Wir sind hier um Dir zur helfen!</b>
        <br/>
        Falls Du Hilfe benötigst, oder Fragen hast, sind wir stets zur Stelle.
        Melde Dich einfach bei mir und unser Support Team unterstütz Dich! 
        <br/>
        <br/>
        Regelmäßig stellen wir Dir zusätzliche Materialien, wichtige Neuerung und Best Practice Szenarien bereit, damit Du das meiste
        aus lead+ machst.
        </p>
        <br/>
        Beste Grüße,
        <br/>
        Max
        <br/>
        <br/>
		<img src="cid:employee" alt="Max Mustermann"/>
        <br/>
        <br/>
	</div>
	
</body>

</html>