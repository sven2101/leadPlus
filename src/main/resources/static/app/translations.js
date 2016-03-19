function config($translateProvider) {

    $translateProvider
        .translations('de', {
            // Define all menu elements
            DASHBOARD_MENU: 'Dashboard',
            LEADS_MENU: 'Anfragen',
            ORDERS_MENU: 'Angebote',
            SALES_MENU: 'Verkäufe',
            STATISTIC_MENU: 'Statistiken',
            SETTINGS_MENU: 'Einstellungen'
        })
        .translations('en', {

            // Define all menu elements
            DASHBOARD_MENU: 'Dashboard',
            LEADS_MENU: 'Leads',
            ORDERS_MENU: 'Offers',
            SALES_MENU: 'Sales',
            STATISTIC_MENU: 'Statistics',
            SETTINGS_MENU: 'Settings'
        });

    $translateProvider.preferredLanguage('de');
    $translateProvider.fallbackLanguage('en');
}
'use strict';
angular
    .module('app')
    .config(config);
