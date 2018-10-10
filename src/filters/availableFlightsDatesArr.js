var app = angular.module('app');

app.filter('availabilityArray', function () {
    return function (flights, dates) {
        console.log(flights, dates);
    }
});