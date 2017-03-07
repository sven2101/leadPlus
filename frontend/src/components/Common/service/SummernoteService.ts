const SummernoteServiceId: string = "SummernoteService";

class SummernoteService {

    private $inject = [$rootScopeId, $translateId, toasterId, TemplateServiceId, $timeoutId];
    rootScope;
    translate;
    toaster;
    templateService: TemplateService;
    summernoteLanguage: string;
    summernoteBeforePreviewContent: string;
    previewMode: boolean = false;
    timeout;
    currentTimeout;

    constructor($rootScope, $translate, toaster, TemplateService, $timeout) {
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.toaster = toaster;
        this.templateService = TemplateService;
        this.summernoteLanguage = $rootScope.language;
        this.timeout = $timeout;
    }

    resetSummernoteConfiguration() {
        this.previewMode = false;
        this.summernoteBeforePreviewContent = "";
        this.summernoteLanguage = this.rootScope.language;
        this.timeout.cancel(this.currentTimeout);
    }

    getDefaultOptions(): any {
        let options = {
            lang: "en-US",
            maximumImageFileSize: "512000",
            prettifyHtml: true,
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
            maximumImageFileSize: "512000",
            prettifyHtml: true,
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
                ["templateDefault", ["languageDropdown", "formOfAddress", "orderList", "delivery", "ending"]],
                ["templateButtonGroup", ["workflowDropdown", "customerDropdown", "orderDropdown", "userDropdown"]],
                ["generateTemplate", ["preview"]]
            ],
            buttons: {
                formOfAddress: this.getSingleTemplateButton(self.translate.instant("COMMON_FORM_OF_ADDRESS"), self.getFormOfAddressTemplate, "fa fa-user", true),
                ending: this.getSingleTemplateButton(self.translate.instant("SUMMERNOTE_ENDING"), self.getEndingTemplate, "fa fa-handshake-o", true),
                orderList: this.getSingleTemplateButton(self.translate.instant("SUMMERNOTE_ORDER_LIST"), self.getOrderListTemplate, "fa fa-shopping-cart", true),
                delivery: this.getSingleTemplateButton(self.translate.instant("SUPPLY"), self.getDeliveryTemplate, "fa fa-truck", true),
                preview: this.getPreviewContentButton(self.translate.instant("SUMMERNOTE_TEMPLATE_PREVIEW"), "fa fa-cogs"),
                languageDropdown: this.getLanguageDropdown(),
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

    getFormOfAddressTemplate(self): string {
        return self.translate.instant("SUMMERNOTE_DEAR", "", "", self.summernoteLanguage) + " <#if customer.title?has_content &amp;&amp; customer.title == 'MR' &amp;&amp; customer.lastname?has_content> " + self.translate.instant("SUMMERNOTE_MR", "", "", self.summernoteLanguage) + " ${customer.lastname}<#elseif customer.title?has_content &amp;&amp; customer.title == 'MS' &amp;&amp; customer.lastname?has_content> " + self.translate.instant("SUMMERNOTE_MS", "", "", self.summernoteLanguage) + " ${customer.lastname}<#else> " + self.translate.instant("SUMMERNOTE_SIR_OR_MADAM", "", "", self.summernoteLanguage) + "&lt;/#if>,";
    }

    getEndingTemplate(self): string {
        return self.translate.instant("SUMMERNOTE_REGARDS", "", "", self.summernoteLanguage) + "<br><br><#if user.firstname?has_content&amp;&amp;user.lastname?has_content>${user.firstname} ${user.lastname}<#if user.job?has_content><br>${user.job}&lt;/#if&gt;<#else>" + self.translate.instant("SUMMERNOTE_SALESTEAM", "", "", self.summernoteLanguage) + "&lt;/#if&gt;<br><br><br><#if user.email?has_content>E-Mail.:  ${user.email}<br>&lt;/#if&gt;<#if user.phone?has_content>Tel.:  ${user.phone}<br>&lt;/#if&gt;<#if user.fax?has_content>Fax.: ${user.fax}<br>&lt;/#if&gt;<#if user.skype?has_content>Skype.: ${user.skype}&lt;/#if&gt;";
    }

    getOrderListTemplate(self): string {
        return "<#if orderPositions?has_content &amp;&amp; orderPositions?size != 0>"
            + "<table style='width: 90%;'>"
            + "<thead><tr><th style='border: 1px solid #e7eaec; background-color: whitesmoke;font-weight: bold;line-height: 1.42857;padding: 8px;vertical-align: top;'>" + self.translate.instant("COMMON_PRODUCT_DESCRIPTION", "", "", self.summernoteLanguage) + "</th><th style='border: 1px solid #e7eaec; background-color: whitesmoke;font-weight: bold;line-height: 1.42857;padding: 8px;vertical-align: top;'>" + self.translate.instant("COMMON_PRODUCT_AMOUNT", "", "", self.summernoteLanguage) + "</th><th style='border: 1px solid #e7eaec; background-color: whitesmoke;font-weight: bold;line-height: 1.42857;padding: 8px;vertical-align: top;'>" + self.translate.instant("COMMON_PRODUCT_SINGLE_PRICE", "", "", self.summernoteLanguage) + "</th><th style='border: 1px solid #e7eaec; background-color: whitesmoke;font-weight: bold;line-height: 1.42857;padding: 8px;vertical-align: top;'>" + self.translate.instant("COMMON_PRODUCT_ENTIRE_PRICE", "", "", self.summernoteLanguage) + "</th></tr></thead>"
            + "<tbody style='border-top: 2px solid #ddd;'><!--<#assign sum = 0> &lt;#list orderPositions as orderPosition&gt; <#assign sum = sum + (orderPosition.amount)! * (orderPosition.netPrice)!>-->"
            + "<tr'><td style='border: 1px solid #e7eaec;line-height: 1.42857;padding: 8px;vertical-align: top;'>${(orderPosition.product.name)!}</td><td style='border: 1px solid #e7eaec;line-height: 1.42857;padding: 8px;vertical-align: top;text-align: center;'>${(orderPosition.amount)!}</td>"
            + "<td style='border: 1px solid #e7eaec;line-height: 1.42857;padding: 8px;vertical-align: top;'>${((orderPosition.netPrice)!)?string('#,##0.00;;roundingMode=halfUp')}  " + self.translate.instant("COMMON_CURRENCY") + "</td><td style='border: 1px solid #e7eaec;line-height: 1.42857;padding: 8px;vertical-align: top;'>${((orderPosition.amount)! * (orderPosition.netPrice)!)?string('#,##0.00;;roundingMode=halfUp')} " + self.translate.instant("COMMON_CURRENCY", "", "", self.summernoteLanguage) + "</td>"
            + "</tr><!--&lt;/#list&gt;--></tbody>"
            + "<tfoot><tr><td> </td><td> </td><td style='font-weight: bold; background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;'> " + self.translate.instant("COMMON_PRODUCT_ENTIRE_PRICE", "", "", self.summernoteLanguage) + "</td><td style='font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;'><#if workflow.netPrice?has_content>${(workflow.netPrice - workflow.deliveryCosts)?string('#,##0.00;;roundingMode=halfUp')}<#else>${((sum)!)?string('#,##0.00;;roundingMode=halfUp')}&lt;/#if&gt; " + self.translate.instant("COMMON_CURRENCY", "", "", self.summernoteLanguage) + "</td></tr>"
            + "<tr><td> </td><td> </td><td style='font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;'>+ " + self.translate.instant("COMMON_PRODUCT_DELIVERYCOSTS", "", "", self.summernoteLanguage) + "</td><td style='font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;'>${((workflow.deliveryCosts)!)?string('#,##0.00;;roundingMode=halfUp')} " + self.translate.instant("COMMON_CURRENCY", "", "", self.summernoteLanguage) + "</td></tr>"
            + "<tr><td> </td><td> </td><td style='font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;'>= <#if workflow.netPrice?has_content &amp;&amp; workflow.vat?has_content>" + self.translate.instant("COMMON_PRODUCT_ENTIRE_PRICE_INKL", "", "", self.summernoteLanguage) + " ${(workflow.vat)!}% " + self.translate.instant("COMMON_PRODUCT_VAT", "", "", self.summernoteLanguage) + "<#else>" + self.translate.instant("COMMON_PRODUCT_ENTIRE_PRICE", "", "", self.summernoteLanguage) + " " + self.translate.instant("COMMON_PRODUCT_INCL_DELIVERY_COSTS", "", "", self.summernoteLanguage) + "&lt;/#if&gt;</td><td style='font-weight: bold;background-color: whitesmoke;line-height: 1.42857;padding: 8px;vertical-align: top;'><#if workflow.netPrice?has_content &amp;&amp; workflow.vat?has_content> ${((workflow.netPrice) *(1 + (workflow.vat)! / 100))?string('#,##0.00;;roundingMode=halfUp')}<#else>${((sum+(workflow.deliveryCosts)!)!)?string('#,##0.00;;roundingMode=halfUp')}&lt;/#if&gt; " + self.translate.instant("COMMON_CURRENCY", "", "", self.summernoteLanguage) + "</td></tr></tfoot>"
            + "</table>&lt;/#if&gt;";
    }

    getDeliveryTemplate(self) {
        return self.translate.instant("SUMMERNOTE_DELIVERY", "", "", self.summernoteLanguage) + "<#if workflow.deliveryAddress?has_content> " + self.translate.instant("SUMMERNOTE_DELIVERY_TO", "", "", self.summernoteLanguage) + " ${(workflow.deliveryAddress)!}&lt;/#if&gt;<#if workflow.deliveryDate?has_content> " + self.translate.instant("SUMMERNOTE_DELIVERY_AT", "", "", self.summernoteLanguage) + " ${(workflow.deliveryDate)!}&lt;/#if&gt;.";
    }

    getSingleTemplateButton(buttonName: string, insertText, fa: string, asHtml: boolean = false): any {
        let self = this;
        let editorInvoke = "editor.insertText";
        if (asHtml === true) {
            editorInvoke = "editor.pasteHTML";
        }
        let templateButton = function (context) {
            let ui = (<any>$).summernote.ui;
            let button = ui.button({
                contents: "<i class='" + fa + "'/> " + buttonName,
                click: function () {
                    context.invoke(editorInvoke, insertText(self));
                }
            });
            return button.render();
        };
        return templateButton;
    }

    getPreviewContentButton(buttonName: string, fa: string): any {
        let self = this;
        let templateButton = function (context) {
            let ui = (<any>$).summernote.ui;
            let button = ui.button({
                contents: "<i class='" + fa + "'/> " + buttonName,
                click: function () {
                    let buttonSelf = this;
                    let plainText = $(context.code()).text();
                    if (self.previewMode === false) {
                        self.summernoteBeforePreviewContent = context.code();
                        context.code("<div class='cog-loader'>"
                            + "<i class='fa-spin fa fa-cog'></i>"
                            + "<i class='fa-spin fa-spin-reverse fa fa-cog'></i>"
                            + "<i class='fa-spin fa fa-cog'></i></div><div class='text-center' style='font-size: 1.5em;color: gray; font-weight: bold'>" + self.translate.instant("SUMMERNOTE_TEMPLATE_PREVIEW_GENERATE") + "</div>");
                        self.addPreviewMode(buttonSelf, context);
                        if (plainText !== null && plainText !== undefined && plainText !== "") {
                            self.templateService.testTemplate(self.templateService.getCurrentEditTemplate(), new WorkflowTemplateObject(), new Notification()).then(function (result: Notification) {
                                self.currentTimeout = self.timeout(function () {
                                    if (self.previewMode === true) {
                                        context.code(result.content);
                                    }
                                }, 600);
                            }).catch(function (error) {
                                self.currentTimeout = self.timeout(function () {
                                    context.code(self.summernoteBeforePreviewContent);
                                    self.removePreviewMode(buttonSelf, context);
                                    self.showTemplateErrorMessage(error);
                                }, 600);
                            });
                        } else {
                            self.currentTimeout = self.timeout(function () {
                                if (self.previewMode === true) {
                                    context.code(self.summernoteBeforePreviewContent);
                                }
                            }, 600);
                        }
                    } else if (self.previewMode === true) {
                        self.timeout.cancel(self.currentTimeout);
                        self.removePreviewMode(buttonSelf, context);
                        context.code(self.summernoteBeforePreviewContent);
                    }
                }
            });
            return button.render();
        };
        return templateButton;
    }

    isInPreviewMode(): boolean {
        return this.previewMode;
    }

    removePreviewMode(buttonSelf, context) {
        context.enable();
        $($(buttonSelf).parent().parent()[0]).find("button.note-btn").each(function () {
            $(this).removeClass("disabled active");
            $(this).attr("disabled", null);
        });
        $(buttonSelf).css("background-color", "white");
        $(buttonSelf).css("border-color", "#e7eaec");
        this.previewMode = false;
    }

    addPreviewMode(buttonSelf, context) {
        context.disable();
        $($(buttonSelf).parent().parent()[0]).find("button.note-btn").each(function () {
            $(this).addClass("disabled");
            $(this).attr("disabled", "disabled");
        });
        $(buttonSelf).removeClass("disabled");
        $(buttonSelf).addClass("active");
        $(buttonSelf).css("background-color", "#d4d4d4");
        $(buttonSelf).attr("disabled", null);
        this.previewMode = true;
    }

    showTemplateErrorMessage(error) {
        if (error.data != null && error.data.exception !== "dash.templatemanagement.business.TemplateCompilationException") {
            return this.toaster.pop("error", "", this.translate.instant("EMAIL_TEMPLATE_ERROR"));
        }
        let errorMessage = error == null || error.data == null ? "" : ": " + error.data.message;
        if (error != null && error.data != null && error.data.message != null && error.data.message.substring(0, 6) !== "Syntax") {
            this.toaster.pop("error", "", this.translate.instant("EMAIL_TEMPLATE_ERROR") + errorMessage);
            return;
        }
        errorMessage = error == null || error.data == null ? "" : ": " + error.data.message.substring(36);
        this.toaster.pop("error", "", this.translate.instant("EMAIL_TEMPLATE_ERROR") + errorMessage);
    }

    getLanguageDropdown(): any {
        let self = this;
        return function dropdownExample(context) {
            let ui = (<any>$).summernote.ui;
            let templateVarButtonGroup = ui.buttonGroup([
                self.getTemplateButton(ui, context, self.translate.instant("SUMMERNOTE_TEMPLATE_LANGUAGE")),
                self.getLanguageTemplateDropdown(ui, context, self.getLanguageTemplateVar()),
            ]);
            return templateVarButtonGroup.render();
        };
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

    getLanguageTemplateDropdown(ui: any, context: any, templateVar: string): any {
        let self = this;
        return ui.dropdown({
            className: "dropdown-menu note-check template-dropdown",
            contents: templateVar,
            callback: function ($dropdown) {
                $dropdown.find("li a").each(function () {
                    $(this).click(function () {
                        context.invoke("editor.restoreRange");
                        context.invoke("editor.focus");
                        self.summernoteLanguage = $(this)[0].attributes[0].nodeValue;
                        $dropdown.find("li a i").each(function () {
                            let language = $(this).parent()[0].attributes[0].nodeValue;
                            if (self.summernoteLanguage === language) {
                                $(this).css("visibility", "visible");
                            }
                            else {
                                $(this).css("visibility", "hidden");
                            }
                        });
                    });
                });
            }
        });
    }

    getLanguageTemplateVar(): string {
        let visibleDE = "hidden";
        let visibleEN = "visible";
        if (this.summernoteLanguage === "DE") {
            visibleDE = "visible";
            visibleEN = "hidden";
        } else if (this.summernoteLanguage === "EN") {
            visibleDE = "hidden";
            visibleEN = "visible";
        }
        return "<li><a template-value='DE'>Deutsch (DE) <i class='fa fa-check' aria-hidden='true' style='color:black;visibility:" + visibleDE + ";'></i></a></li>" +
            "<li ><a template-value='EN'>English (EN)  <i class='fa fa-check' aria-hidden='true' style='color:black;visibility:" + visibleEN + ";'></i></a></li>";
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
            "<li><a template-value='${(customer.firstname)!}'>" + this.translate.instant("COMMON_FIRSTNAME") + "</a></li>" +
            " <li><a template-value='${(customer.lastname)!}'>" + this.translate.instant("COMMON_LASTNAME") + "</a></li>" +
            "<li><a template-value='${(customer.company)!}'>" + this.translate.instant("COMMON_COMPANY") + "</a></li>" +
            "<li><a template-value='${(customer.email)!}'>" + this.translate.instant("COMMON_EMAIL") + "</a></li>" +
            "<li><a template-value='${(customer.phone)!}'>" + this.translate.instant("COMMON_PHONE") + "</a></li>" +
            "<li><a template-value='${(customer.phone)!}'>" + this.translate.instant("COMMON_FAX") + "</a></li>" +
            "<li><a template-value='${(customer.phone)!}'>" + this.translate.instant("COMMON_MOBILE") + "</a></li>" +
            "<li><a template-value='${(customer.customerNumber)!}'>" + this.translate.instant("CUSTOMER_NUMBER") + "</a></li>" +
            "<li><a template-value='<#if customer.billingAddress.street?has_content>${(customer.billingAddress.street)!} ${(customer.billingAddress.number)!}<br>&lt;/#if&gt; <#if customer.billingAddress.zip?has_content || customer.billingAddress.city?has_content>${(customer.billingAddress.zip)!} ${(customer.billingAddress.city)!}<br>&lt;/#if&gt; <#if customer.billingAddress.state?has_content>${(customer.billingAddress.state)!}<br>&lt;/#if&gt; <#if customer.billingAddress.country?has_content>${(customer.billingAddress.country)!}&lt;/#if&gt;'>" + this.translate.instant("SUMMERNOTE_BILLING_ADDRESS_BLOCK") + "</a></li>" +
            "<li><a template-value='<#if customer.billingAddress.street?has_content>${(customer.billingAddress.street)!} ${(customer.billingAddress.number)!},&lt;/#if&gt; <#if customer.billingAddress.zip?has_content || customer.billingAddress.city?has_content>${(customer.billingAddress.zip)!} ${(customer.billingAddress.city)!},&lt;/#if&gt; <#if customer.billingAddress.state?has_content>${(customer.billingAddress.state)!},&lt;/#if&gt; <#if customer.billingAddress.country?has_content>${(customer.billingAddress.country)!}&lt;/#if&gt;'>" + this.translate.instant("SUMMERNOTE_BILLING_ADDRESS_LINE") + "</a></li>" +
            "<li><a template-value='<#if customer.deliveryAddress.street?has_content>${(customer.deliveryAddress.street)!} ${(customer.deliveryAddress.number)!}<br>&lt;/#if&gt; <#if customer.deliveryAddress.zip?has_content || customer.deliveryAddress.city?has_content>${(customer.deliveryAddress.zip)!} ${(customer.deliveryAddress.city)!}<br>&lt;/#if&gt; <#if customer.deliveryAddress.state?has_content>${(customer.deliveryAddress.state)!}<br>&lt;/#if&gt; <#if customer.deliveryAddress.country?has_content>${(customer.deliveryAddress.country)!}&lt;/#if&gt;'>" + this.translate.instant("SUMMERNOTE_DELIVERY_ADDRESS_BLOCK") + "</a></li>" +
            "<li><a template-value='<#if customer.deliveryAddress.street?has_content>${(customer.deliveryAddress.street)!} ${(customer.deliveryAddress.number)!},&lt;/#if&gt; <#if customer.deliveryAddress.zip?has_content || customer.deliveryAddress.city?has_content>${(customer.deliveryAddress.zip)!} ${(customer.deliveryAddress.city)!},&lt;/#if&gt; <#if customer.deliveryAddress.state?has_content>${(customer.deliveryAddress.state)!},&lt;/#if&gt; <#if customer.deliveryAddress.country?has_content>${(customer.deliveryAddress.country)!}&lt;/#if&gt;'>" + this.translate.instant("SUMMERNOTE_DELIVERY_ADDRESS_LINE") + "</a></li>";
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
