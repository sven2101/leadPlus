<style type="text/css">

.body{
	margin-top:-200px;
	font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

h1 {
	font-size:15px;
}
h2 {
	font-size:14px;
}
h3 {
	font-size:13px;
}
h4 {
	font-size:12px;
}

.heading{
	font-size:16px;
}

td{
	font-size:12px;
}

.tableHead{
	border: 1px solid #e7eaec;
	background-color: whitesmoke;
	font-weight: bold;
	line-height: 1.42857;
	vertical-align: top;
}
.table{
	padding-bottom:10px;
	width: 100%;
}
.info{
	width:50%;
}
.overview{
	width:25%;
}

</style>
<div style="font-size:12px; text-align:right;">${(.now?string["dd.MM.yyyy"])!}</div>
<table class="table">
	<tr>
		<td class="tableHead">Bearbeiter</td>
		<td class="tableHead">Kontaktdaten</td>
	</tr>
	<tr>
		<td class="info">
			<#if workflow.processor??>
				<table>
					<tr>
						<td class="overview"><b>Name</b></td>
						<td class="overview">
							<#if workflow.processor.firstname?has_content>${workflow.processor.firstname}<#else></#if>
						 	<#if workflow.processor.lastname?has_content>${workflow.processor.lastname}<#else></#if>
						</td>
						<td class="overview"><b>Telefon</b></td>
						<td class="overview"><#if workflow.processor.phone?has_content>${workflow.processor.phone}<#else></#if></td>
					</tr>
					<tr>
						<td class="overview"><b>Mobil</b></td>
						<td class="overview"><#if workflow.processor.mobile?has_content>${workflow.processor.mobile}<#else></#if></td>
						<td class="overview"><b>Skype</b></td>
						<td class="overview"><#if workflow.processor.skype?has_content>${workflow.processor.skype}<#else></#if></td>
					</tr>
					<tr>
						<td class="overview"><b>Email</b></td>
						<td class="overview"><#if workflow.processor.email?has_content>${workflow.processor.email}<#else></#if></td>
						<td class="overview"><b>Fax</b></td>
						<td class="overview"><#if workflow.processor.fax?has_content>${workflow.processor.fax}<#else></#if></td>
					</tr>
					<tr>
						<td class="overview"></td>
						<td class="overview"></td>
						<td class="overview"></td>
						<td class="overview"></td>
					</tr>
					<tr>
						<td class="overview"></td>
						<td class="overview"></td>
						<td class="overview"></td>
						<td class="overview"></td>
					</tr>
				</table>
			<#else></#if>
		</td>
		<td class="info">
			<#if workflow.customer??>
				<table>
					<tr>
						<td class="overview"><b>Vorname</b></td>
						<td class="overview"><#if workflow.customer.firstname?has_content>${workflow.customer.firstname}<#else></#if></td>
						<td class="overview"><b>Nachname</b></td>
						<td class="overview"><#if workflow.customer.lastname?has_content>${workflow.customer.lastname}<#else></#if></td>
					</tr>
					<tr>
						<td class="overview"><b>Telefon</b></td>
						<td class="overview"><#if workflow.customer.phone?has_content>${workflow.customer.phone}<#else></#if></td>
						<td class="overview"><b>Fax</b></td>
						<td class="overview"><#if workflow.customer.fax?has_content>${workflow.customer.fax}<#else></#if></td>
					</tr>
					<tr>
						<td class="overview"><b>Mobil</b></td>
						<td class="overview"><#if workflow.customer.mobile?has_content>${workflow.customer.mobile}<#else></#if></td>
						<td class="overview"><b>Kontaktnr.</b></td>
						<td class="overview"><#if workflow.customer.customerNumber?has_content>${workflow.customer.customerNumber}<#else></#if></td>
					</tr>
					<tr>
						<td class="overview"><b>Firma</b></td>
						<td class="overview" colspan="3"><#if workflow.customer.company?has_content>${workflow.customer.company}<#else></#if></td>
					</tr>
					<tr>
						<td class="overview"><b>Email</b></td>
						<td class="overview" colspan="3"><#if workflow.customer.email?has_content>${workflow.customer.email}<#else></#if></td>
					</tr>
				</table>
			<#else></#if>
		</td>
	</tr>
</table>

<table class="table" >
	<thead>
		<tr>
			<td class="tableHead">Bezeichnung</td>
			<td class="tableHead">Zustand</td>
			<td class="tableHead">Menge</td>
			<td class="tableHead">Einzelpreis</td>
			<td class="tableHead">Gesamtpreis</td>
		</tr>
	</thead>
	<tbody style="border-top: 2px solid #ddd;">
		<#list workflow.orderPositions as orderPosition>
			<tr>
				<td>${(orderPosition.product.name)!}</td>
				<td>${(orderPosition.product.productStateGermanTranslation)!}</td>
				<td>${(orderPosition.amount)!}</td>
				<td>${((orderPosition.netPrice)!)?string('#,##0.00;;roundingMode=halfUp')}  €</td>
				<td>${((orderPosition.amount)! * (orderPosition.netPrice)!)?string('#,##0.00;;roundingMode=halfUp')} €</td>
			</tr>
		</#list>
	</tbody>
	<tfoot>
		<tr>
			<td> </td>
			<td> </td>
			<td> </td>
			<td><b>Summe</b></td>
			<td><b>${workflow.sumOrderpositions?string('#,##0.00;;roundingMode=halfUp')}€</b></td>
		</tr>
	</tfoot>
</table>

<table class="table">
	<tr>
		<td colspan="2" class="tableHead">Rechnung an:</td>
		<td colspan="2" class="tableHead">Lieferung an:</td>
	</tr>
	<tr>
		<#if workflow.billingAddress.number?has_content>
			<td><b>Hausnummer</b></td>
			<td>${workflow.billingAddress.number}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.deliveryAddress.number?has_content>
			<td><b>Hausnummer</b></td>
			<td>${workflow.deliveryAddress.number}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.billingAddress.street?has_content>
			<td><b>Straße</b></td>
			<td>${workflow.billingAddress.street}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.deliveryAddress.street?has_content>
			<td><b>Straße</b></td>
			<td>${workflow.deliveryAddress.street}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.billingAddress.city?has_content>
			<td><b>Stadt</b></td>
			<td>${workflow.billingAddress.city}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.deliveryAddress.city?has_content>
			<td><b>Stadt</b></td>
			<td>${workflow.deliveryAddress.city}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.billingAddress.state?has_content>
			<td><b>Staat</b></td>
			<td>${workflow.billingAddress.state}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.deliveryAddress.state?has_content>
			<td><b>Staat</b></td>
			<td>${workflow.deliveryAddress.state}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.billingAddress.zip?has_content>
			<td><b>PLZ</b></td>
			<td>${workflow.billingAddress.zip}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.deliveryAddress.zip?has_content>
			<td><b>PLZ</b></td>
			<td>${workflow.deliveryAddress.zip}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.billingAddress.country?has_content>
			<td><b>Land</b></td>
			<td>${workflow.billingAddress.country}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.deliveryAddress.country?has_content>
			<td><b>Land</b></td>
			<td>${workflow.deliveryAddress.country}</td>
		<#else><td></td><td></td></#if>
	</tr>
</table>

<table class="table">
	<tr>
		<td class="tableHead" style="width:33%;">Lieferbedingungen</td>
		<td class="tableHead" style="width:33%;">Lieferdatum</td>
		<td class="tableHead" style="width:33%;">Lieferkosten</td>
	</tr>
	<tr>
		<td class="info" style="width:33%;"><#if workflow.deliveryTerm?has_content>${workflow.deliveryTerm}<#else></#if></td>
		<td class="info" style="width:33%;"><#if workflow.deliveryDate?has_content>${workflow.deliveryDate}<#else></#if></td>
		<td class="info" style="width:33%;"><#if workflow.deliveryCosts?has_content>${workflow.deliveryCosts?string('#,##0.00;;roundingMode=halfUp')} €</#if></td>
	</tr>
</table>

<h2>Nachricht:</h2>
<#if workflow.message?has_content>
	${workflow.message}	
<#else>Keine Nachricht vorhanden</#if>

