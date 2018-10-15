var app = angular.module('app');

app.directive('hideNotAvailableFlights', function () {
    return {
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            flights: '=',
            weekDates: '=',
        },
        controller: 'hideNotAvailableFlightsController'
    }
});


app.controller('hideNotAvailableFlightsController', ['$scope', 'utils', hideNotAvailableFlightsController]);

function hideNotAvailableFlightsController($scope, utils) {
    var vm = this;


    $scope.$watch(angular.bind(this, function () {

        return vm.weekDates;

    }), function (newWeekDates) {

        setFlightsAvailabilityForThisWeek();

    }, true);

    function setFlightsAvailabilityForThisWeek() {
        _.forEach(vm.flights, function (segment) {
            var flight = segment.flights[0],
                flightsAtThisWeek = [];

            if (!flight) {
                return;
            }

            _.forEach(vm.weekDates, function (currentWeekDate, weekDayNum) {

                flightsAtThisWeek.push(
                    checkActiveFlightDay(flight.days, weekDayNum,
                        currentWeekDate.date, flight.begin_date, flight.end_date)
                )
            });


            flight.isAvailableAtThisWeek = !!flightsAtThisWeek.filter(function (item) {
                return item;
            }).length;

            segment.isAvailableAtThisWeek = !!segment.flights.filter(function (flight) {
                return flight.isAvailableAtThisWeek;
            }).length;

        });
    }


    function checkActiveFlightDay(weekDaysStr, weekDaynum, currentDate, flightBeginDate, flightEndDate) {
        return (
            weekDaysStr.indexOf("" + (weekDaynum + 1)) !== -1 &&
            utils.isDateInPeriod(currentDate, flightBeginDate, flightEndDate)
        );
    }
}


