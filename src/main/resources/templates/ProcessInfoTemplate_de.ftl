<style type="text/css">

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
	padding: 8px;
	vertical-align: top;
}
.table{
	padding-bottom:20px;
}
</style>

<h1 class="heading">Übersicht</h1>

<h2>Bearbeiter:</h2>
<table class="table">
	<#if workflow.processor??>
		<tr>
			<td><b>Name</b></td>
			<td>
				<#if workflow.processor.firstname?has_content>${workflow.processor.firstname}<#else></#if>
			 	<#if workflow.processor.lastname?has_content>${workflow.processor.lastname}<#else></#if>
			</td>
		</tr>
	<#else></#if>
	<#if workflow.processor.phone?has_content>
		<tr>
			<td><b>Telefon</b></td>
			<td>${workflow.processor.phone}</td>
		</tr>
	<#else></#if>
	<#if workflow.processor.skype?has_content>
		<tr>
			<td><b>Firma</b></td>
			<td>${workflow.processor.skype}</td>
		</tr>
	<#else></#if>
	<#if workflow.processor.email?has_content>
		<tr>
			<td><b>Email</b></td>
			<td>${workflow.processor.email}</td>
		</tr>
	<#else></#if>
	<#if workflow.processor.fax?has_content>
		<tr>
			<td><b>Fax</b></td>
			<td>${workflow.processor.fax}</td>
		</tr>
	<#else></#if>
</table>

<h2>Kontaktdaten:</h2>
<table class="table">
	<#if workflow.customer.firstname?has_content>
		<tr>
			<td><b>Vorname</b></td>
			<td>${workflow.customer.firstname}</td>
		</tr>
	<#else></#if>
	<#if workflow.customer.lastname?has_content>
		<tr>
			<td><b>Nachname</b></td>
			<td>${workflow.customer.lastname}</td>
		</tr>
	<#else></#if>
	<#if workflow.customer.company?has_content>
		<tr>
			<td><b>Firma</b></td>
			<td>${workflow.customer.company}</td>
		</tr>
	<#else></#if>
	<#if workflow.customer.email?has_content>
		<tr>
			<td><b>Email</b></td>
			<td>${workflow.customer.email}</td>
		</tr>
	<#else></#if>
	<#if workflow.customer.phone?has_content>
		<tr>
			<td><b>Telefon</b></td>
			<td>${workflow.customer.phone}</td>
		</tr>
	<#else></#if>
	<#if workflow.customer.fax?has_content>
		<tr>
			<td><b>Fax</b></td>
			<td>${workflow.customer.fax}</td>
		</tr>
	<#else></#if>
	<#if workflow.customer.mobile?has_content>
		<tr>
			<td><b>Mobil</b></td>
			<td>${workflow.customer.mobile}</td>
		</tr>
	<#else></#if>
	<#if workflow.customer.customerNumber?has_content>
		<tr>
			<td><b>Kontaktnummer</b></td>
			<td>${workflow.customer.customerNumber}</td>
		</tr>
	<#else></#if>
</table>

<table class="table" style="width: 100%;">
	<tr>
		<td colspan="2" class="tableHead">Rechnungsadresse des Kontakts</td>
		<td colspan="2" class="tableHead">Lieferadresse des Kontakts</td>
	</tr>
	<tr>
		<#if workflow.customer.billingAddress.number?has_content>
			<td><b>Hausnummer</b></td>
			<td>${workflow.customer.billingAddress.number}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.customer.deliveryAddress.number?has_content>
			<td><b>Hausnummer</b></td>
			<td>${workflow.customer.deliveryAddress.number}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.customer.billingAddress.street?has_content>
			<td><b>Straße</b></td>
			<td>${workflow.customer.billingAddress.street}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.customer.deliveryAddress.street?has_content>
			<td><b>Straße</b></td>
			<td>${workflow.customer.deliveryAddress.street}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.customer.billingAddress.city?has_content>
			<td><b>Stadt</b></td>
			<td>${workflow.customer.billingAddress.city}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.customer.deliveryAddress.city?has_content>
			<td><b>Stadt</b></td>
			<td>${workflow.customer.deliveryAddress.city}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.customer.billingAddress.state?has_content>
			<td><b>Staat</b></td>
			<td>${workflow.customer.billingAddress.state}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.customer.deliveryAddress.state?has_content>
			<td><b>Staat</b></td>
			<td>${workflow.customer.deliveryAddress.state}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.customer.billingAddress.zip?has_content>
			<td><b>PLZ</b></td>
			<td>${workflow.customer.billingAddress.zip}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.customer.deliveryAddress.zip?has_content>
			<td><b>PLZ</b></td>
			<td>${workflow.customer.deliveryAddress.zip}</td>
		<#else><td></td><td></td></#if>
	</tr>
	<tr>
		<#if workflow.customer.billingAddress.country?has_content>
			<td><b>Land</b></td>
			<td>${workflow.customer.billingAddress.country}</td>
		<#else><td></td><td></td></#if>
		<#if workflow.customer.deliveryAddress.country?has_content>
			<td><b>Land</b></td>
			<td>${workflow.customer.deliveryAddress.country}</td>
		<#else><td></td><td></td></#if>
	</tr>
</table>

<h2>Bestellliste:</h2>

<table class="table" style="width: 100%;">
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
				<td style="border: 1px solid #e7eaec;line-height: 1.42857;padding: 8px;vertical-align: top;">${(orderPosition.product.name)!}</td>
				<td style="border: 1px solid #e7eaec;line-height: 1.42857;padding: 8px;vertical-align: top;">${(orderPosition.product.productStateGermanTranslation)!}</td>
				<td style="border: 1px solid #e7eaec;line-height: 1.42857;padding: 8px;vertical-align: top;text-align: center;">${(orderPosition.amount)!}</td>
				<td style="border: 1px solid #e7eaec;line-height: 1.42857;padding: 8px;vertical-align: top;">${((orderPosition.netPrice)!)?string('#,##0.00;;roundingMode=halfUp')}  €</td>
				<td style="border: 1px solid #e7eaec;line-height: 1.42857;padding: 8px;vertical-align: top;">${((orderPosition.amount)! * (orderPosition.netPrice)!)?string('#,##0.00;;roundingMode=halfUp')} €</td>
			</tr>
		</#list>
	</tbody>
	<tfoot>
		<tr>
			<td> </td>
			<td> </td>
			<td> </td>
			<td style="font-weight: bold; background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;"> Gesamtpreis</td>
			<td style="font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;">${workflow.sumOrderpositions?string('#,##0.00;;roundingMode=halfUp')}€</td>
		</tr>
		<tr>
			<td> </td>
			<td> </td>
			<td> </td>
			<td style="font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;">+ Lieferkosten</td>
			<td style="font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;"><#if workflow.deliveryCosts?has_content>${workflow.deliveryCosts?string('#,##0.00;;roundingMode=halfUp')} €</#if></td>
		</tr>
		<tr>
			<td> </td>
			<td> </td>
			<td> </td>
			<td style="font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;"><#if workflow.grossPrice?has_content> Gesamtpreis zzgl. ${(workflow.vat)!}% MwSt.<#else>Gesamtpreis inkl. Lieferkosten </#if></td>
			<td style="font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;"><#if workflow.grossPrice?has_content> ${workflow.grossPrice?string('#,##0.00;;roundingMode=halfUp')} <#else> ${workflow.orderpositionsAndDelivery?string('#,##0.00;;roundingMode=halfUp')}</#if> €</td>
		</tr>
	</tfoot>
</table>

<table class="table" style="width: 100%;">
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

<h2>Lieferung:</h2>
<table class="table">
	<#if workflow.deliveryTerm?has_content>
		<tr>
			<td><b>Lieferbedingungen</b></td>
			<td>${workflow.deliveryTerm}</td>
		</tr>
	<#else></#if>
	<#if workflow.deliveryDate?has_content>
		<tr>
			<td><b>Lieferdatum</b></td>
			<td>${workflow.deliveryDate}</td>
		</tr>
	<#else></#if>
</table>

<h2>Allgemein:</h2>
<table class="table">
	<#if workflow.message?has_content>
		<tr>
			<td><b>Nachricht</b></td>
			<td>${workflow.message}</td>
		</tr>
	<#else></#if>
</table>
