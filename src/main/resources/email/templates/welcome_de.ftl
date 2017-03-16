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
        Willkommen bei lead+! 
        <br/>
        <br/>
        Mein Name ist Andreas und ich bin einer der Gründer von lead+.
        Wir freuen uns darauf, Dich und Dein Team im täglichen Vertrieb zu untersützen.
        <br/> 
        Hier sind ein paar Informationen für Deinen Account. 
        Am besten speicherst Du diese Email, damit Du die Informationen später noch besitzt. 
        </p>
        
        <div class="information">
            Dein Link für Deinen lead+ Account <h4><a href="https://${tenant.tenantKey}.leadplus.io">https://${tenant.tenantKey}.leadplus.io</a></h4>
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