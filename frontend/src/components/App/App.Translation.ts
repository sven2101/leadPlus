/// <reference path="../User/Model/Language.Model.ts" />
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
"use strict";

function config($translateProvider) {
    let pageTitle = "test";
    let pageLogo = pageTitle + "+";

    $translateProvider
        .translations(Language[Language.DE], {
            // GENERAL
            TITLE: pageTitle,
            LOGO: pageLogo,

            // Define all menu elements
            DASHBOARD_MENU: "Dashboard",
            LEADS_MENU: "Anfragen",
            OFFERS_MENU: "Angebote",
            SALES_MENU: "Verkäufe",
            STATISTIC_MENU: "Statistiken",
            SETTINGS_MENU: "Einstellungen",
            PROFILE_MENU: "Profil",
            PRODUCT_MENU: "Produkte",
            CUSTOMER_MENU: "Kunden",
            CUSTOMER_DETAIL_MENU: "Kundendetails",

            LOGIN: "Anmelden",
            LOGOUT: "Abmelden",
            LANGUAGE: "Sprache",

            // Define login elements
            LOGIN_WELCOME: "Willkommen bei " + pageTitle,
            LOGIN_WELCOME_DESCRIPTION: pageTitle + " Lead Management System",
            LOGIN_NO_ACCOUNT: "Noch keinen Account?",
            LOGIN_CREATE_ACCOUNT: "Registrieren",
            LOGIN_ERROR: "Anmeldung fehlgeschlagen",

            // Define signup elements
            SIGNUP_REGISTER_WELCOME: "Registrieren Sie sich bei " + pageLogo,
            SIGNUP_CREATE_ACCOUNT: "Erstellen Sie sich ein Account",
            SIGNUP_LOGIN_AFTER: "Melden Sie sich nach der Registrierung an",
            SIGNUP_TO_LOGIN: "Zur Anmeldung",
            SIGNUP_SUCCESS: "Willkommen bei " + pageLogo,
            SIGNUP_ERROR: "Registrierung fehlgeschlagen",
            SIGNUP_FIRSTNAME: "Vorname",
            SIGNUP_LASTNAME: "Nachname",
            SIGNUP_VALIDATE_FIRSTNAME_TO_SHORT: "Vorname muss mindestens 2 Zeichen enthalten",
            SIGNUP_VALIDATE_LASTNAME_TO_SHORT: "Nachname muss mindestens 2 Zeichen enthalten",
            SIGNUP_VALIDATE_USER_IN_USE: "Benutzername schon vergeben",
            SIGNUP_VALIDATE_USER_TO_SHORT: "Benutzername muss mindestens 2 Zeichen enthalten",
            SIGNUP_VALIDATE_USER_TO_LONG: "Benutzername darf höchstens 20 Zeichen enthalten",
            SIGNUP_VALIDATE_EMAIL_IN_USE: "E-Mail schon vergeben",
            SIGNUP_VALIDATE_PASSWORD_TO_LONG: "Passwort darf höchstens 20 Zeichen enthalten",


            // Define common elements
            MR: "Herr",
            MS: "Frau",
            DAILY: "Heute",
            WEEKLY: "Woche",
            MONTHLY: "Monat",
            YEARLY: "Jahr",
            ALL: "Alle",


            COMMON_LOAD_MORE: "weitere laden",
            COMMON_CURRENCY: "€",
            COMMON_UPLOAD_NEW_IMAGE: "Neues Bild hochladen",
            COMMON_RESET: "Zurücksetzen",
            COMMON_SEND: "Senden",
            COMMON_CONTINUE_AND_SENDING: "Senden und fortfahren",
            COMMON_CONTINUE_WITHOUT_SENDING: "Fortfahren ohne zu senden",
            COMMON_DELETE: "Löschen",
            COMMON_DELETE_SUCCESS: "Löschen erfolgreich",
            COMMON_DELETE_ERROR: "Löschen fehlgeschlagen",
            COMMON_DETAILS: "Details",
            COMMON_FOLLOWUP: "Follow Up Mail",
            COMMON_ACTIVATED: "Aktiviert",
            COMMON_DEACTIVATED: "Deaktiviert",
            COMMON_DEACTIVATE: "Deaktivieren",
            COMMON_CREATED: "Erstellt",
            COMMON_TITLE: "Anrede",
            COMMON_TITLE_MR: "Herr",
            COMMON_TITLE_MS: "Frau",
            COMMON_FIRSTNAME: "Vorname",
            COMMON_LASTNAME: "Nachname",
            COMMON_USERNAME: "Benutzername",
            COMMON_DESCRIPTION: "Beschreibung",
            COMMON_PASSWORD: "Passwort",
            COMMON_USER: "Benutzer",
            COMMON_ADMIN: "Administrator",
            COMMON_SUPERADMIN: "Superadmin",
            COMMON_ROLE: "Rolle",
            COMMON_NAME: "Name",
            COMMON_DATE: "Datum",
            COMMON_STATUS: "Status",
            COMMON_COMPANY: "Firma",
            COMMON_EMAIL: "E-Mail",
            COMMON_PHONE: "Telefon",
            COMMON_CANCEL: "Abbrechen",
            COMMON_SAVE: "Speichern",
            COMMON_REFRESH: "Aktualisieren",
            COMMON_PROCESSOR: "Bearbeiter",
            COMMON_CHILDROW_ADDITONAL_TITLE: "Zusätzliche Informationen",
            COMMON_PRODUCT_AMOUNT: "Menge",
            COMMON_PRODUCT_SINGLE_PRICE: "Einzelpreis",
            COMMON_PRODUCT_BASE_PRICE: "Grundpreis",
            COMMON_PRODUCT_ENTIRE_PRICE: "Gesamtpreis",
            COMMON_PRODUCT_INCL_DELIVERY_COSTS: "inkl. Lieferkosten",
            COMMON_PRODUCT_OFFER_PRICE: "Angebotspreis",
            COMMON_PRODUCT_DESTINATION: "Lieferort",
            COMMON_PRODUCT_DELIVERYCOSTS: "Lieferkosten",
            COMMON_PRODUCT_SALE_TURNOVER: "Umsatz",
            COMMON_PRODUCT_SALE_PROFIT: "Gewinn",
            COMMON_PRODUCT_CALCULATION: "Preiskalkulation",
            COMMON_DELIVERY_TIME: "Lieferdatum",
            COMMON_SALE_RETURN: "Umsatz",
            COMMON_SALE_PROFIT: "Gewinn",
            COMMON_CONVERSIONRATE: "Conversionrate",
            COMMON_NOTE: "Nachricht",
            COMMON_COMMENTS: "Kommentare",
            COMMON_COMMENTS_LAST: "Letzter Kommentar",
            COMMON_COMMENTS_ENTER: "Kommentar eingeben",
            COMMON_COMMENTS_ADD: "Kommentar senden",
            COMMON_COMMENTS_HISTORY: "Verlauf...",
            COMMON_COMMENTS_MODAL_HISTORY: "Kommentar Verlauf",
            COMMON_VALIDATE_MAX_FILE_SIZE: "Das Bild darf nicht größer als 4MB sein",
            COMMON_VALIDATE_MAX: "Nicht mehr als ",
            COMMON_VALIDATE_MAX_END: " Zeichen gültig!",
            COMMON_VALIDATE_REQ: "Feld benötigt ",
            COMMON_VALIDATE_REQ_NUMBER: "Eingabe darf nicht negativ sein oder ungültige Zeichen enthalten",
            COMMON_VALIDATE_EMAIL: "E-Mail ungültig!",
            COMMON_NEW_PASSWORD: "Neues Passwort",
            COMMON_VALIDATE_PASSWORD: "Passwort muss mindestens 6 Zeichen lang sein",
            COMMON_VALIDATE_PASSWORD_NOT_MATCH: "Passwörter stimmen nicht überein",
            COMMON_TOAST_SUCCESS_ADD_LEAD: "Eine neue Anfrage wurde angelegt",
            COMMON_TOAST_SUCCESS_NEW_OFFER: "Ein neues Angebot wurde erstellt",
            COMMON_TOAST_SUCCESS_NEW_SALE: "Glückwunsch zum Verkauf!",
            COMMON_TOAST_SUCCESS_CLOSE_LEAD: "Die Anfrage wurde geschlossen",
            COMMON_TOAST_SUCCESS_OPEN_LEAD: "Die Anfrage wurde geöffnet",
            COMMON_TOAST_SUCCESS_UPDATE_LEAD: "Die Anfrage wurde bearbeitet",
            COMMON_TOAST_SUCCESS_DELETE_LEAD: "Die Anfrage wurde gelöscht",
            COMMON_TOAST_FAILURE_DELETE_LEAD: "Die Anfrage konnte nicht gelöscht werden",
            COMMON_TOAST_SUCCESS_ADD_OFFER: "Ein neues Angebot wurde angelegt",
            COMMON_TOAST_SUCCESS_CLOSE_OFFER: "Das Angebot wurde geschlossen",
            COMMON_TOAST_SUCCESS_OPEN_OFFER: "Das Angebot wurde geöffnet",
            COMMON_TOAST_SUCCESS_UPDATE_OFFER: "Das Angebot wurde bearbeitet",
            COMMON_TOAST_SUCCESS_DELETE_OFFER: "Das Angebot wurde gelöscht",
            COMMON_TOAST_FAILURE_DELETE_OFFER: "Das Angebot konnte nicht gelöscht werden",
            COMMON_TOAST_SUCCESS_UPDATE_SALE: "Der Verkauf wurde bearbeitet",
            COMMON_TOAST_SUCCESS_DELETE_SALE: "Der Verkauf wurde gelöscht",
            COMMON_TOAST_FAILURE_DELETE_SALE: "Der Verkauf konnte nicht gelöscht werden",
            COMMON_TOAST_SUCCESS_ADD_SALE: "Ein neuer Verkauf wurde angelegt",
            COMMON_TOAST_SUCCESS_FOLLOW_UP: "Angebot wurde auf Follow up gesetzt",
            COMMON_TOAST_ROLLBACK_OPEN_TO_LEAD: "Angebot wurde erfolgreich auf eine Anfrage zurückgesetzt",
            COMMON_TOAST_ROLLBACK_OPEN_TO_LEAD_ERROR: "Angebot konnte nicht auf eine Anfrage zurückgesetzt werden",
            COMMON_STATUS_OPEN: "Offen",
            COMMON_STATUS_OFFER: "Angebot",
            COMMON_STATUS_FOLLOW_UP: "Follow up",
            COMMON_STATUS_SALE: "Verkauf",
            COMMON_STATUS_CLOSED: "Geschlossen",
            COMMON_EMPTY_PROCESSOR: "Niemand",

            // Define dashboard elements
            DASHBOARD_MANAGE_LEADS: "Anfragen verwalten",
            DASHBOARD_DRAG_INFO: "Ziehen Sie die Elemente per Drag\"n\"Drop",
            DASHBOARD_REFRESH: "Aktualisieren",
            DASHBOARD_OPEN_LEADS: "Offene Anfragen",
            DASHBOARD_OPEN_OFFERS: "Angebote",
            DASHBOARD_LATEST_SALES: "Letzte Verkäufe",
            DASHBOARD_INFO_BUTTON: "Info",
            DASHBOARD_GOTO_BUTTON: "Go to",
            DASHBOARD_COMPLETION: "Abschlüsse",

            // Define profile elements
            PROFILE_PROFILE_INFORMATION: "Profilinformationen",
            PROFILE_DEFAULT_LANGUAGE: "Standard Sprache",
            PROFILE_PASSWORD_MANAGEMENT: "Passwortverwaltung",
            PROFILE_OLD_PASSWORD: "Altes Passwort",
            PROFILE_VALIDATE_OLD_PASSWORD: "Altes Passwort wird benötigt",
            PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS: "Profilinformationen wurden aktualisiert",
            PROFILE_TOAST_PROFILE_INFORMATION_ERROR: "Profilinformationen konnten nicht aktualisiert werden",
            PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS: "Passwort wurde geändert",
            PROFILE_TOAST_PASSWORD_CHANGE_ERROR: "Passwort konnte nicht geändert werden",
            PROFILE_PICTURE_MANAGEMENT: "Profilbildverwaltung",

            // Define all lead elements
            LEAD_LEADS: "Anfragen",
            LEAD_MANAGE_LEADS: "Anfragen verwalten",
            LEAD_ADD_LEAD: "Neue Anfrage",
            LEAD_ADD_LEAD_MODAL: "Anfrage erstellen",
            LEAD_EDIT_LEAD_MODAL: "Anfrage bearbeiten",
            LEAD_SHOW_ALL_LEADS: "Alle Anfragen",
            LEAD_FOLLOW_UP: "Angebot erstellen",
            LEAD_PIN: "Zuweisen",
            LEAD_OPEN_LEAD: "Anfrage öffnen",
            LEAD_CLOSE_LEAD: "Anfrage schließen",
            LEAD_EDIT_LEAD: "Anfrage bearbeiten",
            LEAD_DELETE_LEAD: "Anfrage löschen",
            LEAD_EDIT_SELECT_PRODUCT: "Produkt wählen",


            // Define all offer elements
            OFFER_OFFERS: "Angebote",
            OFFER_MANAGE_OFFERS: "Angebote verwalten",
            OFFER_ADD_OFFER: "Neues Angebot",
            OFFER_ADD_OFFER_MODAL: "Angebot erstellen",
            OFFER_EDIT_OFFER_MODAL: "Angebot bearbeiten",
            OFFER_SHOW_ALL_OFFERS: "Alle Angebote",
            OFFER_CREATE_SALE: "Verkauf abschließen",
            OFFER_FOLLOW_UP: "Follow up",
            OFFER_OPEN_OFFER: "Angebot öffnen",
            OFFER_CLOSE_OFFER: "Angebot schließen",
            OFFER_EDIT_OFFER: "Angebot bearbeiten",
            OFFER_DELETE_OFFER: "Angebot löschen",
            OFFER_TAB_OFFERS: "Angebot - Angebote",
            OFFER_TAB_FILES: "Angebote - Dateien",
            OFFER_TAB_TEMPLATES: "Angebote - Vorlagen",
            OFFER_GENERATION_AND_SENDING: "Angebot generieren und versenden",
            OFFER_ROLLBACK: "Zurücksetzen zu Anfrage",

            // Define all offer elements
            SALE_SALES: "Verkäufe",
            SALE_MANAGE_SALES: "Verkäufe verwalten",
            SALE_ADD_SALE: "Verkauf hinzufügen",
            SALE_EDIT_SALE: "Verkauf bearbeiten",
            SALE_ADD_SALE_MODAL: "Verkauf hinzufügen",
            SALE_EDIT_SALE_MODAL: "Verkauf bearbeiten",
            SALE_SHOW_ALL_SALES: "Alle Verkäufe",
            SALE_DELETE_SALE: "Verkauf löschen",
            SALE_ROLLBACK: "Zurücksetzen zu Angebot",

            // Define setting elements
            SETTING_USER: "Benutzer",
            SETTING_USER_MANAGEMENT: "Benutzer Einstellungen",
            SETTING_EMAIL: "Email",
            SETTING_EMAIL_MANAGEMENT: "Email Einstellungen",
            SETTING_EMAIL_MANAGEMENT_SENDER: "Absendername",
            SETTING_EMAIL_MANAGEMENT_EMAIL: "Email",
            SETTING_EMAIL_MANAGEMENT_SERVER: "Server",
            SETTING_EMAIL_MANAGEMENT_USERNAME: "Benutzername",
            SETTING_EMAIL_MANAGEMENT_PASSWORD: "Passwort",
            SETTING_EMAIL_MANAGEMENT_ENCRYPTION: "Verschlüsselung",
            SETTING_EMAIL_MANAGEMENT_PORT: "Port",
            SETTING_EMAIL_MANAGEMENT_CONNECTION_TEST: "Verbindung testen",
            SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST: "Verbindung zum SMTP Server erfolgreich. ",
            SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST_ERROR: "Verbindung zum SMTP Server fehlgeschlagen. ",
            SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE: "Speichern der SMTP Server Verbindung erfolgreich. ",
            SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE_ERROR: "Speichern der SMTP Server Verbindung fehlgeschlagen. ",
            SETTING_EMAIL_TEMPLATES_MANAGEMENT: "Email Templates",
            SETTING_ACCESS_MANAGEMENT: "Benutzer freischalten",
            SETTING_ACTIVATE_USER: "Freischalten",
            SETTING_DEACTIVATE_USER: "Deaktivieren",
            SETTING_ROLE_MANAGEMENT: "Benutzerrollen verwalten",
            SETTING_TOAST_ACCESS_GRANTED: "Der Benutzer wurde freigeschalten",
            SETTING_TOAST_ACCESS_GRANTED_ERROR: "Der Benutzer konnte nicht freigeschaltet werden",
            SETTING_TOAST_ACCESS_REVOKED: "Der Benutzer wurde deaktiviert",
            SETTING_TOAST_ACCESS_REVOKED_ERROR: "Der Benutzer konnte nicht deaktiviert werden",
            SETTING_TOAST_SET_ROLE: "Die Rolle wurde geändert",
            SETTING_TOAST_SET_ROLE_ERROR: "Die Rolle konnte nicht geändert werden",
            SETTING_EMAIL_TEMPLATE_CREATE: "Email Template erstellen",
            SETTING_EMAIL_TEMPLATE_DELETE: "Email Template löschen",
            SETTING_EMAIL_TEMPLATE_DELETE_CONFIRMATION_1: "Möchten Sie sicher das Email Template ",
            SETTING_EMAIL_TEMPLATE_DELETE_CONFIRMATION_2: "löschen ",
            SETTING_EMAIL_TEMPLATE_EDIT: "Email Template bearbeiten",
            SETTING_EMAIL_TEMPLATE_TEXT: "Template",
            SETTING_TOAST_EMAIL_TEMPLATE_SAVE: "Email Template wurde erfolgreich erstellt",
            SETTING_TOAST_EMAIL_TEMPLATE_SAVE_ERROR: "Fehler beim Erstellen des Email Templates",
            SETTING_TOAST_EMAIL_TEMPLATE_UPDATE: "Email Template wurde erfolgreich verändert",
            SETTING_TOAST_EMAIL_TEMPLATE_UPDATE_ERROR: "Fehler beim Verändern des Email Templates",
            SETTING_TOAST_EMAIL_TEMPLATE_DELETE: "Email Template wurde erfolgreich gelöscht",
            SETTING_TOAST_EMAIL_TEMPLATE_DELETE_ERROR: "Fehler beim Löschen des Email Templates",

            // Define statistic elements
            STATISTIC_PERIOD: "Zeitraum",
            STATISTIC_PERIOD_TODAY: "Heute",
            STATISTIC_PERIOD_WEEK: "Woche",
            STATISTIC_PERIOD_MONTH: "Monat",
            STATISTIC_PERIOD_YEAR: "Jahr",
            STATISTIC_PERIOD_ALL: "Alle",
            STATISTIC_PERIOD_LAST_30_DAYS: "Letzte 30 Tage",
            STATISTIC_SINGLE_STATISTIC: "Einzelstatistik",
            STATISTIC_GENERAL_STATISTIC: "Gesamtstatistik",
            STATISTIC_USER_STATISTIC: "Benutzer Statistik",
            STATISTIC_PROFIT: "Gewinn",
            STATISTIC_TURNOVER: "Umsatz",
            STATISTIC_SALES: "Abschlüsse",
            STATISTIC_SALES_OF_LEADS: "Verkäufe aus Anfragen",
            STATISTIC_SALES_OF_LEADS_Y_AXIS: "Abschlüsse in %",
            STATISTIC_SALES_OF_OFFERS: "Verkäufe aus Angeboten",
            STATISTIC_SALES_OF_OFFERS_Y_AXIS: "Abschlüsse in %",
            STATISTIC_PROFIT_ON_SALES: "Umsatzrentabilität",
            STATISTIC_PROFIT_PER_SALE: "Gewinn pro Verkauf",
            STATISTIC_CONVERSIONRATE: "Conversionrate",
            STATISTIC_PARTS: "Anteile",
            STATISTIC_PROFIT_AND_RETURN: "Gewinn und Umsatz",
            STATISTIC_PROFIT_AND_RETURN_Y_AXIS: "Gewinn/Umsatz in €",
            STATISTIC_LEADS_OFFERS_SALES: "Anfragen/Angebote/Verkäufe",
            STATISTIC_LEADS_OFFERS_SALES_Y_AXIS: "Anzahl",
            STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE: "Nicht verfügbar",
            STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE_MESSAGE: "Die Gesamtstatistiken sind nur für Woche, Monat, Jahr und Alle verfügbar",
            STATISTIC_TOP_SELL: "Top Verkäufe",

            // Define detail statistic
            DETAIL_STATISTIC_PRODUCTSTATISTIC: "Produktstatistik",
            DETAIL_STATISTIC_REALISED_TURNOVER: "Erzielter Umsatz",
            DETAIL_STATISTIC_GUARANTEED_DISCOUNT: "Gewährter Rabatt",
            DETAIL_STATISTIC_SALES_PRICE: "Verkaufspreis",
            DETAIL_STATISTIC_ADVERTISED_PRICE: "Angezeigter Preis",
            DETAIL_STATISTIC_TOOLTIP: "<span>Das Produkt {{productname}} wurde <b>{{count}}x</b> in {{workflow}} verwendet.</span>",

            // Define all week and month names
            SUNDAY: "Sonntag",
            MONDAY: "Montag",
            TUESDAY: "Dienstag",
            WEDNESDAY: "Mittwoch",
            THURSDAY: "Donnerstag",
            FRIDAY: "Freitag",
            SATURDAY: "Samstag",

            JANUARY: "Januar",
            FEBRUARY: "Februar",
            MARCH: "März",
            APRIL: "April",
            MAY: "Mai",
            JUNE: "Juni",
            JULY: "Juli",
            AUGUST: "August",
            SEPTEMBER: "September",
            OCTOBER: "Oktober",
            NOVEMBER: "November",
            DECEMBER: "Dezember",

            // Define product elements
            PRODUCT_PRODUCTS: "Produkte",
            PRODUCT_PRODUCT: "Produkt",
            PRODUCT_MANAGE_PRODUCTS: "Produkte verwalten",
            PRODUCT_CREATE: "Neues Produkt",
            PRODUCT_PRODUCTNAME: "Produktname",
            PRODUCT_DESCRIPTION: "Beschreibung",
            PRODUCT_PRICE: "Preis",
            PRODUCT_IMAGE: "Bild",
            PRODUCT_EDIT: "Produkt bearbeiten",
            PRODUCT_DEACTIVATED: "Deaktivieren",
            PRODUCT_CREATED: "Erstellt",
            PRODUCT_PRODUCT_STATE_NEW: "Neu",
            PRODUCT_PRODUCT_STATE_USED: "Gebraucht",
            PRODUCT_DISCOUNT: "Rabatt",
            PRODUCT_TOAST_SAVE: "Produkt wurde erfolgreich angelegt",
            PRODUCT_TOAST_SAVE_ERROR: "Produkt konnte nicht angelegt werden",
            PRODUCT_TOAST_UPDATE: "Produkt wurde erfolgreich aktuallisiert",
            PRODUCT_TOAST_UPDATE_ERROR: "Produkt konnte nicht aktuallisiert werden",

            // Define customer elements
            CUSTOMER_MANAGE_CUSTOMER: "Kunden verwalten",
            CUSTOMER_CREATE: "Neuer Kunde",
            CUSTOMER_EDIT: "Kunde bearbeiten",
            CUSTOMER_DEACTIVATED: "Deaktivieren",
            CUSTOMER_CREATED: "Erstellt",
            CUSTOMER_DETAIL_LEAD: "Anfrage",
            CUSTOMER_DETAIL_OFFER: "Angebot",
            CUSTOMER_DETAIL_SALE: "Verkauf",
            CUSTOMER_DETAIL_TIMELINE: "Kunden Timeline",
            CUSTOMER_DETAIL_CREATED: "wurde erstellt",

            TODO_TODOS: "ToDos",
            TODO_NO_TODOS: "Keine Todos vorhanden",

            // Define calculation elements 
            CALCULATION_NET: "Netto",
            CALCULATION_GROSS: "Brutto",
            CALCULATION_VAT: "Mehrwertsteuer"

        })
        .translations(Language[Language.EN], {
            // GENERAL
            TITLE: pageTitle,
            LOGO: pageLogo,

            // Define all menu elements
            DASHBOARD_MENU: "Dashboard",
            LEADS_MENU: "Leads",
            OFFERS_MENU: "Offers",
            SALES_MENU: "Sales",
            STATISTIC_MENU: "Statistics",
            SETTINGS_MENU: "Settings",
            PROFILE_MENU: "Profile",
            PRODUCT_MENU: "Products",
            CUSTOMER_MENU: "Customer",
            CUSTOMER_DETAIL_MENU: "Customer details",

            LOGIN: "Login",
            LOGOUT: "Logout",
            LANGUAGE: "Language",

            // Define login elements
            LOGIN_WELCOME: "Welcome to " + pageLogo,
            LOGIN_WELCOME_DESCRIPTION: pageTitle + " Lead Management System",
            LOGIN_NO_ACCOUNT: "Do not have an account?",
            LOGIN_CREATE_ACCOUNT: "Register",
            LOGIN_ERROR: "Login failed",

            // Define signup elements
            SIGNUP_REGISTER_WELCOME: "Register to " + pageLogo,
            SIGNUP_CREATE_ACCOUNT: "Create an account",
            SIGNUP_LOGIN_AFTER: "Login after your Signed Up",
            SIGNUP_TO_LOGIN: "Go to login",
            SIGNUP_SUCCESS: "Welcome to " + pageLogo,
            SIGNUP_ERROR: "Registration failed",
            SIGNUP_FIRSTNAME: "Firstname",
            SIGNUP_LASTNAME: "Lastname",
            SIGNUP_VALIDATE_FIRSTNAME_TO_SHORT: "Firstname has to contain 2 or more characters",
            SIGNUP_VALIDATE_LASTNAME_TO_SHORT: "Lastname has to contain 2 or more characters",
            SIGNUP_VALIDATE_USER_IN_USE: "Username already in use",
            SIGNUP_VALIDATE_USER_TO_SHORT: "Username has to contain 2 or more characters",
            SIGNUP_VALIDATE_USER_TO_LONG: "Username has to contain 20 or less characters",
            SIGNUP_VALIDATE_EMAIL_IN_USE: "E-Mail already in use",
            SIGNUP_VALIDATE_PASSWORD_TO_LONG: "Password have to contain 20 or less characters",

            // Define common elements
            MR: "Mr.",
            MS: "Ms.",
            DAILY: "Today",
            WEEKLY: "Week",
            MONTHLY: "Month",
            YEARLY: "Year",
            ALL: "All",

            COMMON_LOAD_MORE: "more",
            COMMON_UPLOAD_NEW1_IMAGE: "Upload new image",
            COMMON_CURRENCY: "€",
            COMMON_RESET: "Reset",
            COMMON_SEND: "Send",
            COMMON_CONTINUE_AND_SENDING: "Sending and continue",
            COMMON_CONTINUE_WITHOUT_SENDING: "Continue without Sending",
            COMMON_DELETE: "Delete",
            COMMON_DELETE_SUCCESS: "Successfully deleted",
            COMMON_DELETE_ERROR: "Delete failed",
            COMMON_DETAILS: "Details",
            COMMON_FOLLOWUP: "Follow Up Mail",
            COMMON_ACTIVATED: "Activated",
            COMMON_DEACTIVATED: "Deactivated",
            COMMON_DEACTIVATE: "Deactivate",
            COMMON_CREATED: "Created",
            COMMON_TITLE: "Title",
            COMMON_TITLE_MR: "Mr",
            COMMON_TITLE_MS: "Ms",
            COMMON_FIRSTNAME: "Firstname",
            COMMON_LASTNAME: "Lastname",
            COMMON_USERNAME: "Username",
            COMMON_DESCRIPTION: "Description",
            COMMON_PASSWORD: "Password",
            COMMON_USER: "User",
            COMMON_ADMIN: "Administrator",
            COMMON_SUPERADMIN: "Superadmin",
            COMMON_ROLE: "Role",
            COMMON_NAME: "Name",
            COMMON_DATE: "Date",
            COMMON_STATUS: "Status",
            COMMON_COMPANY: "Company",
            COMMON_EMAIL: "E-Mail",
            COMMON_PHONE: "Phone",
            COMMON_CANCEL: "Cancel",
            COMMON_SAVE: "Save",
            COMMON_REFRESH: "Refresh",
            COMMON_PROCESSOR: "Processor",
            COMMON_CHILDROW_ADDITONAL_TITLE: "Additional informationen",
            COMMON_PRODUCT_AMOUNT: "Amount",
            COMMON_PRODUCT_SINGLE_PRICE: "Unit price",
            COMMON_PRODUCT_BASE_PRICE: "Base price",
            COMMON_PRODUCT_ENTIRE_PRICE: "Entire price",
            COMMON_PRODUCT_INCL_DELIVERY_COSTS: "incl. delivery costs",
            COMMON_PRODUCT_OFFER_PRICE: "Offer price",
            COMMON_PRODUCT_DESTINATION: "Place of delivery",
            COMMON_PRODUCT_DELIVERYCOSTS: "Delivery costs",
            COMMON_PRODUCT_SALE_TURNOVER: "Turnover",
            COMMON_PRODUCT_SALE_PROFIT: "Profit",
            COMMON_PRODUCT_CALCULATION: "Price calculation",
            COMMON_DELIVERY_TIME: "Delivery date",
            COMMON_SALE_RETURN: "Turnover",
            COMMON_SALE_PROFIT: "Profit",
            COMMON_CONVERSIONRATE: "Conversionrate",
            COMMON_NOTE: "Note",
            COMMON_COMMENTS: "Comments",
            COMMON_COMMENTS_LAST: "Last comment",
            COMMON_COMMENTS_ENTER: "Enter comment",
            COMMON_COMMENTS_ADD: "Send comment",
            COMMON_COMMENTS_HISTORY: "History...",
            COMMON_COMMENTS_MODAL_HISTORY: "Comment history",
            COMMON_VALIDATE_MAX_FILE_SIZE: "The image may not exceed 4MB",
            COMMON_VALIDATE_MAX: "Only ",
            COMMON_VALIDATE_MAX_END: " letters are allowed",
            COMMON_VALIDATE_REQ: "Field required ",
            COMMON_VALIDATE_REQ_NUMBER: "Negative numbers and invalid characters are restricted",
            COMMON_VALIDATE_EMAIL: "Enter a valid email",
            COMMON_VALIDATE_NEW_PASSWORD: "New password",
            COMMON_VALIDATE_PASSWORD: "Password have to be 6 characters long",
            COMMON_VALIDATE_PASSWORD_NOT_MATCH: "Password doesn\"t match",
            COMMON_TOAST_SUCCESS_ADD_LEAD: "A new lead was generated",
            COMMON_TOAST_SUCCESS_NEW_OFFER: "A new offer was generated",
            COMMON_TOAST_SUCCESS_NEW_SALE: "Congratulation for your sale!",
            COMMON_TOAST_SUCCESS_CLOSE_LEAD: "The lead was locked",
            COMMON_TOAST_SUCCESS_OPEN_LEAD: "The lead was unlocked",
            COMMON_TOAST_SUCCESS_UPDATE_LEAD: "The lead was edited",
            COMMON_TOAST_SUCCESS_DELETE_LEAD: "The lead was deleted",
            COMMON_TOAST_FAILURE_DELETE_LEAD: "The lead cannot be deleted",
            COMMON_TOAST_SUCCESS_ADD_OFFER: "A new offer was generated",
            COMMON_TOAST_SUCCESS_ADD_SALE: "A new sale was created",
            COMMON_TOAST_SUCCESS_CLOSE_OFFER: "The offer was locked",
            COMMON_TOAST_SUCCESS_OPEN_OFFER: "The offer was unlocked",
            COMMON_TOAST_SUCCESS_UPDATE_OFFER: "The offer was edited",
            COMMON_TOAST_SUCCESS_DELETE_OFFER: "The offer was deleted",
            COMMON_TOAST_FAILURE_DELETE_OFFER: "The offer cannot be deleted",
            COMMON_TOAST_SUCCESS_UPDATE_SALE: "The sale was edited",
            COMMON_TOAST_SUCCESS_DELETE_SALE: "The sale was deleted",
            COMMON_TOAST_FAILURE_DELETE_SALE: "The sale cannot be deleted",
            COMMON_TOAST_SUCCESS_FOLLOW_UP: "Offer is set to follow up",
            COMMON_TOAST_ROLLBACK_OPEN_TO_LEAD: "Succesfull rollback of Offer to Lead",
            COMMON_TOAST_ROLLBACK_OPEN_TO_LEAD_ERROR: "Unsuccesfull rollback of Offer to Lead",
            COMMON_STATUS_OPEN: "Open",
            COMMON_STATUS_OFFER: "Offer",
            COMMON_STATUS_FOLLOW_UP: "Follow up",
            COMMON_STATUS_SALE: "Sale",
            COMMON_STATUS_CLOSED: "Closed",
            COMMON_EMPTY_PROCESSOR: "Nobody",

            // Define dashboard elements
            DASHBOARD_MANAGE_LEADS: "Manage leads",
            DASHBOARD_DRAG_INFO: "Drag elements between list",
            DASHBOARD_REFRESH: "Refresh",
            DASHBOARD_OPEN_LEADS: "Open leads",
            DASHBOARD_OPEN_OFFERS: "Open offers",
            DASHBOARD_LATEST_SALES: "Latest sales",
            DASHBOARD_INFO_BUTTON: "Info",
            DASHBOARD_GOTO_BUTTON: "Go to",
            DASHBOARD_COMPLETION: "Sales statements",

            // Define notification elements
            NOTIICATION_SEND: "Notification successfully send",
            NOTIICATION_SEND_ERROR: "Error sending Notification",

            // Define profile elements
            PROFILE_PROFILE_INFORMATION: "Profile information",
            PROFILE_DEFAULT_LANGUAGE: "Default language",
            PROFILE_PASSWORD_MANAGEMENT: "Password management",
            PROFILE_OLD_PASSWORD: "Old password",
            PROFILE_VALIDATE_OLD_PASSWORD: "Old password is required",
            PROFILE_TOAST_PROFILE_INFORMATION_SUCCESS: "Profil changed",
            PROFILE_TOAST_PROFILE_INFORMATION_ERROR: "Profil cannot be saved",
            PROFILE_TOAST_PASSWORD_CHANGE_SUCCESS: "Password changed",
            PROFILE_TOAST_PASSWORD_CHANGE_ERROR: "Password cannot be saved",
            PROFILE_PICTURE_MANAGEMENT: "Profile picture management",

            // Define all lead elements
            LEAD_LEADS: "Leads",
            LEAD_MANAGE_LEADS: "Manage leads",
            LEAD_ADD_LEAD: "New lead",
            LEAD_ADD_LEAD_MODAL: "Create lead",
            LEAD_EDIT_LEAD_MODAL: "Edit lead",
            LEAD_SHOW_ALL_LEADS: "Total leads",
            LEAD_FOLLOW_UP: "Create offer ",
            LEAD_PIN: "Assign to me",
            LEAD_OPEN_LEAD: "Unlock lead",
            LEAD_CLOSE_LEAD: "Lock lead",
            LEAD_EDIT_LEAD: "Edit lead",
            LEAD_DELETE_LEAD: "Delete lead",
            LEAD_EDIT_SELECT_PRODUCT: "Choose product",

            // Define all offer elements
            OFFER_OFFERS: "Offers",
            OFFER_MANAGE_OFFERS: "Manage offers",
            OFFER_ADD_OFFER: "New offer",
            OFFER_ADD_OFFER_MODAL: "Create offer",
            OFFER_EDIT_OFFER_MODAL: "Edit offer",
            OFFER_SHOW_ALL_OFFERS: "Total offers",
            OFFER_CREATE_SALE: "Make sale",
            OFFER_FOLLOW_UP: "Follow up",
            OFFER_OPEN_OFFER: "Unlock offer",
            OFFER_CLOSE_OFFER: "Lock offer",
            OFFER_EDIT_OFFER: "Edit offer",
            OFFER_DELETE_OFFER: "Delete offer",
            OFFER_TAB_OFFERS: "Offer - Offers",
            OFFER_TAB_FILES: "Offer - Files",
            OFFER_TAB_TEMPLATES: "Offer - Templates",
            OFFER_GENERATION_AND_SENDING: "Generate and Send Offer",
            OFFER_ROLLBACK: "Reset to lead",

            // Define all sale elements
            SALE_SALES: "Sales",
            SALE_MANAGE_SALES: "Manage sales",
            SALE_ADD_SALE: "Add sale",
            SALE_EDIT_SALE: "Edit sale",
            SALE_ADD_SALE_MODAL: "Create sale",
            SALE_EDIT_SALE_MODAL: "Edit sale",
            SALE_SHOW_ALL_SALES: "Total sales",
            SALE_DELETE_SALE: "Delete sale",
            SALE_ROLLBACK: "Reset to Offer",

            // Define setting elements
            SETTING_USER_MANAGEMENT: "User Management",
            SETTING_EMAIL_MANAGEMENT: "Email Management",
            SETTING_EMAIL_MANAGEMENT_SENDER: "Sender-Name",
            SETTING_EMAIL_MANAGEMENT_EMAIL: "Email",
            SETTING_EMAIL_MANAGEMENT_SERVER: "Server",
            SETTING_EMAIL_MANAGEMENT_USERNAME: "Username",
            SETTING_EMAIL_MANAGEMENT_PASSWORD: "Password",
            SETTING_EMAIL_MANAGEMENT_ENCRYPTION: "Encryption",
            SETTING_EMAIL_MANAGEMENT_PORT: "Port",
            SETTING_EMAIL_MANAGEMENT_CONNECTION_TEST: "Testing Connection",
            SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST: "Connection to SMTP Server successful.  ",
            SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_TEST_ERROR: "Connection to SMTP Server failed. ",
            SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE: "Successfully saved SMTP Server Connection. ",
            SETTING_TOAST_EMAIL_MANAGEMENT_CONNECTION_SAVE_ERROR: "Error saving SMTP Server Connection. ",
            SETTING_ACCESS_MANAGEMENT: "Activate user",
            SETTING_ACTIVATE_USER: "Activate",
            SETTING_DEACTIVATE_USER: "Deactivate",
            SETTING_ROLE_MANAGEMENT: "Manage user roles",
            SETTING_TOAST_ACCESS_GRANTED: "User is activated",
            SETTING_TOAST_ACCESS_GRANTED_ERROR: "User cannot be activated",
            SETTING_TOAST_ACCESS_REVOKED: "User is deactivated",
            SETTING_TOAST_ACCESS_REVOKED_ERROR: "User cannot be deactivated",
            SETTING_TOAST_SET_ROLE: "Role has changed",
            SETTING_TOAST_SET_ROLE_ERROR: "Role cannot be changed",
            SETTING_EMAIL_TEMPLATE_CREATE: "Create Email Template",
            SETTING_EMAIL_TEMPLATE_DELETE: "Delete Email Template",
            SETTING_EMAIL_TEMPLATE_DELETE_CONFIRMATION_1: "Sure you want to delete Email Template ",
            SETTING_EMAIL_TEMPLATE_DELETE_CONFIRMATION_2: " ",
            SETTING_EMAIL_TEMPLATE_EDIT: "Edit Email Template",
            SETTING_EMAIL_TEMPLATE_TEXT: "Template",
            SETTING_TOAST_EMAIL_TEMPLATE_SAVE: "Email Template successfully created",
            SETTING_TOAST_EMAIL_TEMPLATE_SAVE_ERROR: "Error creating Email Template",
            SETTING_TOAST_EMAIL_TEMPLATE_UPDATE: "Email Template successfully updated",
            SETTING_TOAST_EMAIL_TEMPLATE_UPDATE_ERROR: "Error updating Email Template",
            SETTING_TOAST_EMAIL_TEMPLATE_DELETE: "Email Template successfully deleted",
            SETTING_TOAST_EMAIL_TEMPLATE_DELETE_ERROR: "Error deleting Email Template",

            // Define statistic elements
            STATISTIC_PERIOD: "Period",
            STATISTIC_PERIOD_TODAY: "Today",
            STATISTIC_PERIOD_WEEK: "Week",
            STATISTIC_PERIOD_MONTH: "Month",
            STATISTIC_PERIOD_YEAR: "Year",
            STATISTIC_PERIOD_ALL: "All",
            STATISTIC_PERIOD_LAST_30_DAYS: "Last 30 days",
            STATISTIC_SINGLE_STATISTIC: "Single Statistic",
            STATISTIC_GENERAL_STATISTIC: "General Statistic",
            STATISTIC_USER_STATISTIC: "User Statistic",
            STATISTIC_PROFIT: "Profit",
            STATISTIC_TURNOVER: "Turnover",
            STATISTIC_SALES: "Sales",
            STATISTIC_SALES_OF_LEADS: "Sales of Leads",
            STATISTIC_SALES_OF_LEADS_Y_AXIS: "Sales in %",
            STATISTIC_SALES_OF_OFFERS: "Sales of Offers",
            STATISTIC_SALES_OF_OFFERS_Y_AXIS: "Sales in %",
            STATISTIC_PROFIT_ON_SALES: "Profit on Sales",
            STATISTIC_PROFIT_PER_SALE: "Profit per Sale",
            STATISTIC_CONVERSIONRATE: "Conversionrate",
            STATISTIC_PARTS: "Parts",
            STATISTIC_PROFIT_AND_RETURN: "Profit and Return",
            STATISTIC_PROFIT_AND_RETURN_Y_AXIS: "Profit/Return in €",
            STATISTIC_LEADS_OFFERS_SALES: "Leads/Offers/Sales",
            STATISTIC_LEADS_OFFERS_SALES_Y_AXIS: "Amount",
            STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE: "Not available",
            STATISTIC_ENTIRE_STATISTICS_NOT_AVAILABLE_MESSAGE: "The entire statistics only available for week, month, year and all",
            STATISTIC_TOP_SELL: "Top sells",

            // Define detail statistic
            DETAIL_STATISTIC_PRODUCTSTATISTIC: "Productstatistic",
            DETAIL_STATISTIC_REALISED_TURNOVER: "Realised turnover",
            DETAIL_STATISTIC_GUARANTEED_DISCOUNT: "Guaranteed discount",
            DETAIL_STATISTIC_SALES_PRICE: "Sales price",
            DETAIL_STATISTIC_ADVERTISED_PRICE: "Advertised Price",
            DETAIL_STATISTIC_TOOLTIP: "<span>The product {{productname}} is used <b>{{count}}x</b> in {{workflow}}.</span>",

            // Define all week and month names
            SUNDAY: "Sunday",
            MONDAY: "Monday",
            TUESDAY: "Tuesday",
            WEDNESDAY: "Wednesday",
            THURSDAY: "Thursday",
            FRIDAY: "Friday",
            SATURDAY: "Saturday",

            JANUARY: "January",
            FEBRUARY: "February",
            MARCH: "March",
            APRIL: "April",
            MAY: "May",
            JUNE: "June",
            JULY: "July",
            AUGUST: "August",
            SEPTEMBER: "September",
            OCTOBER: "October",
            NOVEMBER: "November",
            DECEMBER: "December",

            // Define product elements
            PRODUCT_PRODUCTS: "Products",
            PRODUCT_PRODUCT: "Product",
            PRODUCT_MANAGE_PRODUCTS: "Manage Products",
            PRODUCT_CREATE: "New product",
            PRODUCT_PRODUCTNAME: "Product Name",
            PRODUCT_DESCRIPTION: "Description",
            PRODUCT_PRICE: "Price",
            PRODUCT_IMAGE: "Image",
            PRODUCT_EDIT: "Edit Product",
            PRODUCT_DEACTIVATED: "Deactivate",
            PRODUCT_CREATED: "Created",
            PRODUCT_PRODUCT_STATE_NEW: "New",
            PRODUCT_PRODUCT_STATE_USED: "Used",
            PRODUCT_DISCOUNT: "Discount",
            PRODUCT_TOAST_SAVE: "Creating product was successful",
            PRODUCT_TOAST_SAVE_ERROR: "Creating product was unsuccessful",
            PRODUCT_TOAST_UPDATE: "Updating product was successful",
            PRODUCT_TOAST_UPDATE_ERROR: "Updating product was unsuccessful",

            // Define customer elements
            CUSTOMER_MANAGE_CUSTOMER: "Manage Customer",
            CUSTOMER_CREATE: "New Customer",
            CUSTOMER_EDIT: "Edit cCstomer",
            CUSTOMER_DEACTIVATED: "Deactivate",
            CUSTOMER_CREATED: "Created",
            CUSTOMER_DETAIL_LEAD: "Lead",
            CUSTOMER_DETAIL_OFFER: "Offer",
            CUSTOMER_DETAIL_SALE: "Sale",
            CUSTOMER_DETAIL_TIMELINE: "Customer Timeline",
            CUSTOMER_DETAIL_CREATED: "has been created",

            TODO_TODOS: "ToDos",
            TODO_NO_TODOS: "No todos existing",

            // Define calculation elements 
            CALCULATION_NET: "Net",
            CALCULATION_GROSS: "Gross",
            CALCULATION_VAT: "Value-added tax"

        });

    $translateProvider.preferredLanguage(Language[Language.DE]);
    $translateProvider.fallbackLanguage(Language[Language.EN]);

}
"use strict";
angular.module("app").config(config);
