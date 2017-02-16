const SummernoteServiceId: string = "SummernoteService";

class SummernoteService {

    private $inject = [$rootScopeId, $translateId];
    rootScope;
    translate;

    constructor($rootScope, $translate, ) {
        this.rootScope = $rootScope;
        this.translate = $translate;
    }

    getDefaultOptions(): any {
        let options = {
            lang: "en-US",
            toolbar: [
                ["edit", ["undo", "redo"]],
                ["headline", ["style"]],
                ["style", ["bold", "italic", "underline", "superscript", "subscript", "strikethrough", "clear"]],
                ["fontface", ["fontname"]],
                ["textsize", ["fontsize"]],
                ["fontclr", ["color"]],
                ["alignment", ["ul", "ol", "paragraph", "lineheight"]],
                ["height", ["height"]],
                ["table", ["table"]],
                ["insert", ["link", "picture", "hr"]],
                ["view", ["fullscreen", "codeview"]],
            ]
        };

        if (this.rootScope.language === Language[Language.DE]) {
            options.lang = "de-DE";
            this.loadSummernoteGerman();
        }
        return options;
    }

    getTemplateOptions(): any {
        let self = this;
        let options = {
            lang: "en-US",
            toolbar: [
                ["edit", ["undo", "redo"]],
                ["headline", ["style"]],
                ["style", ["bold", "italic", "underline", "superscript", "subscript", "strikethrough", "clear"]],
                ["fontface", ["fontname"]],
                ["textsize", ["fontsize"]],
                ["fontclr", ["color"]],
                ["alignment", ["ul", "ol", "paragraph", "lineheight"]],
                ["height", ["height"]],
                ["table", ["table"]],
                ["insert", ["link", "picture", "hr"]],
                ["view", ["fullscreen", "codeview"]],
                ["templateDefault", ["formOfAddress", "orderList", "delivery", "ending"]],
                ["templateButtonGroup", ["workflowDropdown", "customerDropdown", "orderDropdown", "userDropdown"]]
            ],
            buttons: {
                formOfAddress: this.getSingleTemplateButton(self.translate.instant("COMMON_FORM_OF_ADDRESS"), self.getFormOfAddressTemplate(), "fa fa-user", true),
                ending: this.getSingleTemplateButton(self.translate.instant("SUMMERNOTE_ENDING"), self.getEndingTemplate(), "fa fa-handshake-o", true),
                orderList: this.getSingleTemplateButton(self.translate.instant("SUMMERNOTE_ORDER_LIST"), self.getOrderListTemplate(), "fa fa-shopping-cart", true),
                delivery: this.getSingleTemplateButton(self.translate.instant("SUPPLY"), self.getDeliveryTemplate(), "fa fa-truck", true),
                workflowDropdown: this.getWorkflowDropdown(),
                customerDropdown: this.getCustomerDropdown(),
                orderDropdown: this.getOrderDropdown(),
                userDropdown: this.getUserDropdown()
            }
        };
        if (this.rootScope.language === Language[Language.DE]) {
            options.lang = "de-DE";
            this.loadSummernoteGerman();
        }
        return options;
    }

    getFormOfAddressTemplate(): string {
        return this.translate.instant("SUMMERNOTE_DEAR") + " <#if customer.title?has_content &amp;&amp; customer.title == 'MR' &amp;&amp; customer.lastname?has_content> " + this.translate.instant("SUMMERNOTE_MR") + " ${customer.lastname}<#elseif customer.title?has_content &amp;&amp; customer.title == 'MS' &amp;&amp; customer.lastname?has_content> " + this.translate.instant("SUMMERNOTE_MS") + " ${customer.lastname}<#else> " + this.translate.instant("SUMMERNOTE_SIR_OR_MADAM") + "&lt;/#if>,";
    }

    getEndingTemplate(): string {
        return this.translate.instant("SUMMERNOTE_REGARDS") + "<br><br><#if user.firstname?has_content&amp;&amp;user.lastname?has_content>${user.firstname} ${user.lastname}<#if user.job?has_content><br>${user.job}&lt;/#if&gt;<#else>" + this.translate.instant("SUMMERNOTE_SALESTEAM") + "&lt;/#if&gt;<br><br><br><#if user.email?has_content>E-Mail.:  ${user.email}<br>&lt;/#if&gt;<#if user.phone?has_content>Tel.:  ${user.phone}<br>&lt;/#if&gt;<#if user.fax?has_content>Fax.: ${user.fax}<br>&lt;/#if&gt;<#if user.skype?has_content>Skype.: ${user.skype}&lt;/#if&gt;";
    }

    getOrderListTemplate(): string {
        return "<#if orderPositions?has_content &amp;&amp; orderPositions?size != 0>"
            + "<div class='divTable' style='width: 80%;'>"
            + "<div class='divTableHeading'><div class='divTableHead'>" + this.translate.instant("COMMON_PRODUCT_DESCRIPTION") + "</div><div class='divTableHead'>" + this.translate.instant("COMMON_PRODUCT_AMOUNT") + "</div><div class='divTableHead'>" + this.translate.instant("COMMON_PRODUCT_SINGLE_PRICE") + "</div><div class='divTableHead'>" + this.translate.instant("COMMON_PRODUCT_ENTIRE_PRICE") + "</div></div>"
            + "<div class='divTableBody'>&lt;#list orderPositions as orderPosition&gt;"
            + "<div class='divTableRow'><div class='divTableCell'>${(orderPosition.product.name)!}</div><div class='divTableCell'>${(orderPosition.amount)!}</div>"
            + "<div class='divTableCell'>${((orderPosition.netPrice)!)?string('#,##0.00')}  " + this.translate.instant("COMMON_CURRENCY") + "</div><div class='divTableCell'>${((orderPosition.amount)! * (orderPosition.netPrice)!)?string('#,##0.00')} " + this.translate.instant("COMMON_CURRENCY") + "</div>"
            + "</div>&lt;/#list&gt;</div>"
            + "<div class='divTableFooting'><div class='divTableRow'><div class='divTableFootNone'> </div><div class='divTableFootNone'> </div><div class='divTableFoot'> " + this.translate.instant("COMMON_PRODUCT_ENTIRE_PRICE") + "</div><div class='divTableFoot'>${((workflow.netPrice)! - (workflow.deliveryCosts)!)?string('#,##0.00')} " + this.translate.instant("COMMON_CURRENCY") + "</div></div>"
            + "<div class='divTableRow'><div class='divTableFootNone'> </div><div class='divTableFootNone'> </div><div class='divTableFoot'>+ " + this.translate.instant("COMMON_PRODUCT_DELIVERYCOSTS") + "</div><div class='divTableFoot'>${((workflow.deliveryCosts)!)?string('#,##0.00')} " + this.translate.instant("COMMON_CURRENCY") + "</div></div>"
            + "<div class='divTableRow'><div class='divTableFootNone'> </div><div class='divTableFootNone'> </div><div class='divTableFoot'>= " + this.translate.instant("COMMON_PRODUCT_ENTIRE_PRICE_INKL") + " ${(workflow.vat)!}% " + this.translate.instant("COMMON_PRODUCT_VAT") + "</div><div class='divTableFoot'>${((workflow.netPrice)! *(1 + (workflow.vat)! / 100))?string('#,##0.00')} " + this.translate.instant("COMMON_CURRENCY") + "</div></div></div>"
            + "</div>&lt;/#if&gt;";
    }

    getDeliveryTemplate() {
        return this.translate.instant("SUMMERNOTE_DELIVERY") + "<#if workflow.deliveryAddress?has_content> " + this.translate.instant("SUMMERNOTE_DELIVERY_TO") + " ${(workflow.deliveryAddress)!}&lt;/#if&gt;<#if workflow.deliveryDate?has_content> " + this.translate.instant("SUMMERNOTE_DELIVERY_AT") + " ${(workflow.deliveryDate)!}&lt;/#if&gt;.";
    }

    getSingleTemplateButton(buttonName: string, insertText: string, fa: string, asHtml: boolean = false): any {
        let editorInvoke = "editor.insertText";
        if (asHtml === true) {
            editorInvoke = "editor.pasteHTML";
        }
        let templateButton = function (context) {
            let ui = (<any>$).summernote.ui;
            let button = ui.button({
                contents: "<i class='" + fa + "'/> " + buttonName,
                click: function () {
                    context.invoke(editorInvoke, insertText);
                }
            });
            return button.render();
        };
        return templateButton;
    }

    getWorkflowDropdown(): any {
        let self = this;
        return function dropdownExample(context) {
            let ui = (<any>$).summernote.ui;
            let templateVarButtonGroup = ui.buttonGroup([
                self.getTemplateButton(ui, context, self.translate.instant("SUMMERNOTE_WORKFLOW_TEMPLATE_BUTTON")),
                self.getTemplateDropdown(ui, context, self.getWorkflowTemplateVar()),
            ]);
            return templateVarButtonGroup.render();
        };
    }

    getCustomerDropdown(): any {
        let self = this;
        return function dropdownExample(context) {
            let ui = (<any>$).summernote.ui;
            let templateVarButtonGroup = ui.buttonGroup([
                self.getTemplateButton(ui, context, self.translate.instant("SUMMERNOTE_CUSTOMER_TEMPLATE_BUTTON")),
                self.getTemplateDropdown(ui, context, self.getCustomerTemplateVar()),
            ]);
            return templateVarButtonGroup.render();
        };
    }

    getOrderDropdown(): any {
        let self = this;
        return function dropdownExample(context) {
            let ui = (<any>$).summernote.ui;
            let templateVarButtonGroup = ui.buttonGroup([
                self.getTemplateButton(ui, context, self.translate.instant("SUMMERNOTE_ORDER_TEMPLATE_BUTTON")),
                self.getTemplateDropdown(ui, context, self.getOrderTemplateVar()),
            ]);
            return templateVarButtonGroup.render();
        };
    }

    getUserDropdown(): any {
        let self = this;
        return function dropdownExample(context) {
            let ui = (<any>$).summernote.ui;
            let templateVarButtonGroup = ui.buttonGroup([
                self.getTemplateButton(ui, context, self.translate.instant("SUMMERNOTE_USER_TEMPLATE_BUTTON")),
                self.getTemplateDropdown(ui, context, self.getUserTemplateVar()),
            ]);
            return templateVarButtonGroup.render();
        };
    }

    getTemplateButton(ui: any, context: any, buttonName: string): any {
        return ui.button({
            className: "dropdown-toggle",
            contents: buttonName + " <span class='caret'</span>",
            data: {
                toggle: "dropdown"
            },
            click: function () {
                context.invoke("editor.saveRange");
            }
        });
    }

    getTemplateDropdown(ui: any, context: any, templateVar: string): any {
        let self = this;
        return ui.dropdown({
            className: "dropdown-menu note-check template-dropdown",
            contents: templateVar,
            callback: function ($dropdown) {
                $dropdown.find("li a").each(function () {
                    $(this).click(function () {
                        context.invoke("editor.restoreRange");
                        context.invoke("editor.focus");
                        context.invoke("editor.insertText", $(this)[0].attributes[0].nodeValue);
                    });
                });
            }
        });
    }

    getWorkflowTemplateVar(): string {
        return "<li><a template-value='${(workflow.netPrice)!}'>" + this.translate.instant("PRODUCT_PRICE") + "</a></li>" +
            "<li><a template-value='${(workflow.vat)!}'>" + this.translate.instant("CALCULATION_VAT") + "</a></li>" +
            " <li><a template-value='${(workflow.deliveryCosts)!}'>" + this.translate.instant("COMMON_PRODUCT_DELIVERYCOSTS") + "</a></li>" +
            "<li><a template-value='${(workflow.deliveryAddress)!}'>" + this.translate.instant("COMMON_PRODUCT_DESTINATION") + "</a></li>" +
            "<li><a template-value='${(workflow.deliveryDate)!}'>" + this.translate.instant("COMMON_DELIVERY_TIME") + "</a></li>" +
            "<li><a template-value='${(workflow.message)!}'>" + this.translate.instant("EMAIL_MESSAGE") + "</a></li>";
    }

    getCustomerTemplateVar(): string {
        return "<li><a template-value='${(customer.title)!}'>" + this.translate.instant("COMMON_TITLE") + "</a></li>" +
            "<li><a template-value='${(customer.firstname)!}'>" + this.translate.instant("Vorname") + "</a></li>" +
            " <li><a template-value='${(customer.lastname)!}'>" + this.translate.instant("Nachname") + "</a></li>" +
            "<li><a template-value='${(customer.company)!}'>" + this.translate.instant("COMMON_COMPANY") + "</a></li>" +
            "<li><a template-value='${(customer.email)!}'>" + this.translate.instant("COMMON_EMAIL") + "</a></li>" +
            "<li><a template-value='${(customer.phone)!}'>" + this.translate.instant("COMMON_PHONE") + "</a></li>" +
            "<li><a template-value='${(customer.address)!}'>" + this.translate.instant("COMMON_ADDRESS") + "</a></li>" +
            "<li><a template-value='${(customer.customerNumber)!}'>" + this.translate.instant("CUSTOMER_NUMBER") + "</a></li>";
    }

    getOrderTemplateVar(): string {
        return "<li><a template-value='${(orderPosition.product.name)!}'>" + this.translate.instant("PRODUCT_PRODUCTNAME") + "</a></li>" +
            "<li><a template-value='${(orderPosition.product.description)!}'>" + this.translate.instant("PRODUCT_DESCRIPTION") + "</a></li>" +
            " <li><a template-value='${(orderPosition.netPrice)!}'>" + this.translate.instant("PRODUCT_PRICE") + "</a></li>" +
            "<li><a template-value='${(orderPosition.discount)!}'>" + this.translate.instant("PRODUCT_DISCOUNT") + "</a></li>" +
            "<li><a template-value='${(orderPosition.amount)!}'>" + this.translate.instant("COMMON_PRODUCT_AMOUNT") + "</a></li>" +
            "<li><a template-value='${(orderPosition.product.netPrice)!}'> " + this.translate.instant("Originalpreis") + "</a></li>" +
            "<li><a template-value='${(orderPosition.product.productState)!}'>" + this.translate.instant("PRODUCT_PRODUCT_STATE") + "</a></li>" +
            "<li><a template-value='${(orderPosition.product.productNumber)!}'>" + this.translate.instant("PRODUCT_NUMBER") + "</a></li>";
    }

    getUserTemplateVar(): string {
        return "<li><a template-value='${(user.firstname)!}'>" + this.translate.instant("COMMON_FIRSTNAME") + "</a></li>" +
            "<li><a template-value='${(user.lastname)!}'>" + this.translate.instant("COMMON_LASTNAME") + "</a></li>" +
            " <li><a template-value='${(user.email)!}'>" + this.translate.instant("COMMON_EMAIL") + "</a></li>" +
            "<li><a template-value='${(user.phone)!}'>" + this.translate.instant("COMMON_PHONE") + "</a></li>" +
            "<li><a template-value='${(user.fax)!}'>" + this.translate.instant("COMMON_FAX") + "</a></li>" +
            "<li><a template-value='${(user.skype)!}'>" + this.translate.instant("COMMON_SKYPE") + "</a></li>" +
            "<li><a template-value='${(user.job)!}'>" + this.translate.instant("COMMON_JOB") + "</a></li>";
    }

    loadSummernoteGerman() {
        (<any>$).extend((<any>$).summernote.lang, this.getGermanTranslation());
    }

    getGermanTranslation() {
        return {
            "de-DE": {
                font: {
                    bold: "Fett",
                    italic: "Kursiv",
                    underline: "Unterstreichen",
                    clear: "Zurücksetzen",
                    height: "Zeilenhöhe",
                    strikethrough: "Durchgestrichen",
                    size: "Schriftgröße"
                },
                image: {
                    image: "Grafik",
                    insert: "Grafik einfügen",
                    resizeFull: "Originalgröße",
                    resizeHalf: "Größe 1/2",
                    resizeQuarter: "Größe 1/4",
                    floatLeft: "Linksbündig",
                    floatRight: "Rechtsbündig",
                    floatNone: "Kein Textfluss",
                    shapeRounded: "Rahmen: Abgerundet",
                    shapeCircle: "Rahmen: Kreisförmig",
                    shapeThumbnail: "Rahmen: Thumbnail",
                    shapeNone: "Kein Rahmen",
                    dragImageHere: "Ziehen Sie ein Bild mit der Maus hierher",
                    selectFromFiles: "Wählen Sie eine Datei aus",
                    maximumFileSize: "Maximale Dateigröße",
                    maximumFileSizeError: "Maximale Dateigröße überschritten",
                    url: "Grafik URL",
                    remove: "Grafik entfernen"
                },
                video: {
                    video: "Video",
                    videoLink: "Video Link",
                    insert: "Video einfügen",
                    url: "Video URL?",
                    providers: "(YouTube, Vimeo, Vine, Instagram, DailyMotion oder Youku)"
                },
                link: {
                    link: "Link",
                    insert: "Link einfügen",
                    unlink: "Link entfernen",
                    edit: "Editieren",
                    textToDisplay: "Anzeigetext",
                    url: "Ziel des Links?",
                    openInNewWindow: "In einem neuen Fenster öffnen"
                },
                table: {
                    table: "Tabelle"
                },
                hr: {
                    insert: "Eine horizontale Linie einfügen"
                },
                style: {
                    style: "Stil",
                    p: "p",
                    blockquote: "Zitat",
                    pre: "Quellcode",
                    h1: "Überschrift 1",
                    h2: "Überschrift 2",
                    h3: "Überschrift 3",
                    h4: "Überschrift 4",
                    h5: "Überschrift 5",
                    h6: "Überschrift 6"
                },
                lists: {
                    unordered: "Aufzählung",
                    ordered: "Nummerierung"
                },
                options: {
                    help: "Hilfe",
                    fullscreen: "Vollbild",
                    codeview: "HTML-Code anzeigen"
                },
                paragraph: {
                    paragraph: "Absatz",
                    outdent: "Einzug vergrößern",
                    indent: "Einzug verkleinern",
                    left: "Links ausrichten",
                    center: "Zentriert ausrichten",
                    right: "Rechts ausrichten",
                    justify: "Blocksatz"
                },
                color: {
                    recent: "Letzte Farbe",
                    more: "Mehr Farben",
                    background: "Hintergrundfarbe",
                    foreground: "Schriftfarbe",
                    transparent: "Transparenz",
                    setTransparent: "Transparenz setzen",
                    reset: "Zurücksetzen",
                    resetToDefault: "Auf Standard zurücksetzen"
                },
                shortcut: {
                    shortcuts: "Tastenkürzel",
                    close: "Schließen",
                    textFormatting: "Textformatierung",
                    action: "Aktion",
                    paragraphFormatting: "Absatzformatierung",
                    documentStyle: "Dokumentenstil"
                },
                history: {
                    undo: "Rückgängig",
                    redo: "Wiederholen"
                }
            }
        };
    }


}
angular.module(moduleSummernoteService, [moduleSummernote]).service(SummernoteServiceId, SummernoteService);
