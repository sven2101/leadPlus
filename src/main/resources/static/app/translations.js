function config($translateProvider) {

    $translateProvider
        .translations('de', {
            // Define all menu elements
            DASHBOARD_MENU: 'Dashboard',
            LEADS_MENU: 'Anfragen',
            ORDERS_MENU: 'Angebote',
            SALES_MENU: 'Verkäufe',
            STATISTIC_MENU: 'Statistiken',
            SETTINGS_MENU: 'Einstellungen',

            //Define common elements
            COMMON_TITLE: 'Anrede',
            COMMON_TITLE_MR: 'Herr',
            COMMON_TITLE_MS: 'Frau',
            COMMON_FIRSTNAME: 'Vorname',
            COMMON_LASTNAME: 'Nachname',
            COMMON_NAME: 'Name',
            COMMON_DATE: 'Datum',
            COMMON_STATUS: 'Status',
            COMMON_COMPANY: 'Firma',
            COMMON_EMAIL: 'E-Mail',
            COMMON_PHONE: 'Telefon',
            COMMON_CANCEL: 'Abbrechen',
            COMMON_SAVE: 'Speichern',
            COMMON_REFRESH: 'Aktualisieren',
            COMMON_CHILDROW_ADDITONAL_TITLE: 'Zusätzliche Informationen',
            COMMON_CONTAINER: 'Container',
            COMMON_CONTAINER_DESC: 'Container Beschreibung',
            COMMON_CONTAINER_AMOUNT: 'Menge',
            COMMON_CONTAINER_SINGLE_PRICE: 'Einzelpreis',
            COMMON_CONTAINER_ENTIRE_PRICE: 'Gesamtpreis',
            COMMON_CONTAINER_DESTINATION: 'Lieferort',
            COMMON_NOTE:'Noitz',
            COMMON_COMMENTS: 'Kommentare',
            COMMON_COMMENTS_LAST: 'Letzter Kommentar',
            COMMON_COMMENTS_ENTER: 'Kommentar eingeben',
            COMMON_COMMENTS_ADD: 'Kommentar senden',
            COMMON_COMMENTS_HISTORY: 'Verlauf...',
            COMMON_COMMENTS_MODAL_HISTORY: 'Kommentar Verlauf',
            COMMON_VALIDATE_MAX: 'Nicht mehr als ',
            COMMON_VALIDATE_MAX_END: ' Zeichen gültig!',
            COMMON_VALIDATE_REQ: 'Feld benötigt ',
            COMMON_VALIDATE_REQ_NUMBER: 'Eingabe darf nicht negativ sein oder ungültige Zeichen enthalten',
            COMMON_VALIDATE_EMAIL: 'E-Mail ungültig!',
            COMMON_TOAST_SUCCESS_ADD_LEAD: 'Eine neue Anfrage wurde angelegt',
            COMMON_TOAST_SUCCESS_NEW_OFFER:'Ein neues Angebot wurde erstellt',
            COMMON_TOAST_SUCCESS_CLOSE_LEAD:'Die Anfrage wurde geschlossen',
            COMMON_TOAST_SUCCESS_OPEN_LEAD:'Die Anfrage wurde geöffnet',
            COMMON_TOAST_SUCCESS_UPDATE_LEAD:'Die Anfrage wurde bearbeitet',
            COMMON_TOAST_SUCCESS_DELETE_LEAD:'Die Anfrage wurde gelöscht',

            // Define all lead elements
            LEAD_LEADS: 'Anfragen',
            LEAD_MANAGE_LEADS: 'Anfragen verwalten',
            LEAD_ADD_LEAD: 'Neue Anfrage',
            LEAD_ADD_LEAD_MODAL: 'Anfrage erstellen',
            LEAD_EDIT_LEAD_MODAL: 'Anfrage bearbeiten',
            LEAD_SHOW_ALL_LEADS: 'Alle Anfragen',
            LEAD_FOLLOW_UP: 'Angebot erstellen',
            LEAD_OPEN_LEAD: 'Anfrage öffnen',
            LEAD_CLOSE_LEAD: 'Anfrage schließen',
            LEAD_EDIT_LEAD: 'Anfrage bearbeiten',
            LEAD_DELETE_LEAD: 'Anfrage löschen'
        })
        .translations('en', {
            // Define all menu elements
            DASHBOARD_MENU: 'Dashboard',
            LEADS_MENU: 'Leads',
            ORDERS_MENU: 'Offers',
            SALES_MENU: 'Sales',
            STATISTIC_MENU: 'Statistics',
            SETTINGS_MENU: 'Settings',

            //Define common elements
            COMMON_TITLE: 'Title',
            COMMON_TITLE_MR: 'Mr',
            COMMON_TITLE_MS: 'Ms',
            COMMON_FIRSTNAME: 'Firstname',
            COMMON_LASTNAME: 'Lastname',
            COMMON_NAME: 'Name',
            COMMON_DATE: 'Date',
            COMMON_STATUS: 'Status',
            COMMON_COMPANY: 'Company',
            COMMON_EMAIL: 'E-Mail',
            COMMON_PHONE: 'Phone',
            COMMON_CANCEL: 'Cancel',
            COMMON_SAVE: 'Save',
            COMMON_REFRESH: 'Refresh',
            COMMON_CHILDROW_ADDITONAL_TITLE: 'Additional informationen',
            COMMON_CONTAINER: 'Container',
            COMMON_CONTAINER_DESC: 'Container description',
            COMMON_CONTAINER_AMOUNT: 'Amount',
            COMMON_CONTAINER_SINGLE_PRICE: 'Unit price',
            COMMON_CONTAINER_ENTIRE_PRICE: 'Entire price',
            COMMON_CONTAINER_DESTINATION: 'Place of delivery',
            COMMON_NOTE:'Note',
            COMMON_COMMENTS: 'Comments',
            COMMON_COMMENTS_LAST: 'Last comment',
            COMMON_COMMENTS_ENTER: 'Enter comment',
            COMMON_COMMENTS_ADD: 'Send comment',
            COMMON_COMMENTS_HISTORY: 'History...',
            COMMON_COMMENTS_MODAL_HISTORY: 'Comment history',
            COMMON_VALIDATE_MAX: 'Only ',
            COMMON_VALIDATE_MAX_END: ' letters are allowed',
            COMMON_VALIDATE_REQ: 'Field required ',
            COMMON_VALIDATE_REQ_NUMBER: 'Negative numbers and invalid characters are restricted',
            COMMON_VALIDATE_EMAIL: 'Enter a valid email',
            COMMON_TOAST_SUCCESS_ADD_LEAD: 'A new lead was generated',
            COMMON_TOAST_SUCCESS_NEW_OFFER:'A new offer was generated',
            COMMON_TOAST_SUCCESS_CLOSE_LEAD:'The lead was locked',
            COMMON_TOAST_SUCCESS_OPEN_LEAD:'The lead was unlocked',
            COMMON_TOAST_SUCCESS_UPDATE_LEAD:'The lead was edited',
            COMMON_TOAST_SUCCESS_DELETE_LEAD:'The lead was deleted',


            // Define all lead elements
            LEAD_LEADS: 'Leads',
            LEAD_MANAGE_LEADS: 'Manage leads',
            LEAD_ADD_LEAD: 'New lead',
            LEAD_ADD_LEAD_MODAL: 'Create lead',
            LEAD_EDIT_LEAD_MODAL: 'Edit lead',
            LEAD_SHOW_ALL_LEADS: 'Total leads',
            LEAD_FOLLOW_UP: 'Create offer ',
            LEAD_OPEN_LEAD: 'Unlock lead',
            LEAD_CLOSE_LEAD: 'Lock lead',
            LEAD_EDIT_LEAD: 'Edit lead',
            LEAD_DELETE_LEAD: 'Delete lead'

        });

    $translateProvider.preferredLanguage('de');
    $translateProvider.fallbackLanguage('en');
}
'use strict';
angular
    .module('app')
    .config(config);
