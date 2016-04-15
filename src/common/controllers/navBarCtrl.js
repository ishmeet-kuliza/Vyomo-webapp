

angular.module('Vyomo').controller('headerController', ['$scope', '$log', 'auth', '$cookies', '$state',
                                function($scope, $log, auth, $cookies, $state){

    $scope.status = {
        isopen: false
    };

    $scope.number = false;

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.$on('$stateChangeSuccess', function(){
        $scope.number = auth.getUser().number;
    });

    $scope.logout = function() {
        $cookies.remove('userObj');
        window.location.reload();
    };

    $scope.goToLogin = function() {
        $state.go('login');
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
}]);

