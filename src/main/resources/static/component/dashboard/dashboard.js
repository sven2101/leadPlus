'use strict';

angular.module('app.dashboard', ['ngResource']);

angular.module('app.dashboard').controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = [];
function DashboardCtrl() {
    var tmpList = [];

    this.rawScreens = [
        [{
            icon: './img/icons/facebook.jpg',
            title: 'Facebook (a)',
            link: 'http://www.facebook.com'
        }, {
            icon: './img/icons/youtube.jpg',
            title: 'Youtube (a)',
            link: 'http://www.youtube.com'
        }, {
            icon: './img/icons/gmail.jpg',
            title: 'Gmail (a)',
            link: 'http://www.gmail.com'
        }, {
            icon: './img/icons/google+.jpg',
            title: 'Google+ (a)',
            link: 'http://plus.google.com'
        }, {
            icon: './img/icons/twitter.jpg',
            title: 'Twitter (a)',
            link: 'http://www.twitter.com'
        }, {
            icon: './img/icons/yahoomail.jpg',
            title: 'Yahoo Mail (a)',
            link: 'http://mail.yahoo.com'
        }, {
            icon: './img/icons/pinterest.jpg',
            title: 'Pinterest (a)',
            link: 'http://www.pinterest.com'
        }],
        [{
            icon: './img/icons/facebook.jpg',
            title: 'Facebook (b)',
            link: 'http://www.facebook.com'
        }, {
            icon: './img/icons/youtube.jpg',
            title: 'Youtube (b)',
            link: 'http://www.youtube.com'
        }, {
            icon: './img/icons/gmail.jpg',
            title: 'Gmail (b)',
            link: 'http://www.gmail.com'
        }, {
            icon: './img/icons/google+.jpg',
            title: 'Google+ (b)',
            link: 'http://plus.google.com'
        }, {
            icon: './img/icons/twitter.jpg',
            title: 'Twitter (b)',
            link: 'http://www.twitter.com'
        }, {
            icon: './img/icons/yahoomail.jpg',
            title: 'Yahoo Mail (b)',
            link: 'http://mail.yahoo.com'
        }, {
            icon: './img/icons/pinterest.jpg',
            title: 'Pinterest (b)',
            link: 'http://www.pinterest.com'
        }]
    ];

    this.list1 = this.rawScreens[0];
    this.list2 = this.rawScreens[1];


    this.sortingLog = [];

    this.sortableOptions = {
        placeholder: "app",
        connectWith: ".apps-container"
    };
    var vm = this;
    this.logModels = function () {
        vm.sortingLog = [];
        for (var i = 0; i < vm.rawScreens.length; i++) {
            var logEntry = vm.rawScreens[i].map(function (x) {
                return x.title;
            }).join(', ');
            logEntry = 'container ' + (i + 1) + ': ' + logEntry;
            vm.sortingLog.push(logEntry);
        }
    }
}

