angular.module('Vyomo')
.controller("loginCtrl", ['$scope', 'auth', 'globals', function($scope, auth, globals) {
  var sessionUser = auth.getUser();
  $scope.formData = {};
  $scope.formData.selectedCity = sessionUser.selectedCity ? sessionUser.selectedCity : '';
  $scope.errorMsg = '';
  $scope.data = globals.getCities();

  $scope.sendForm = function() {
    var data = $scope.formData;

    auth.authenticate(data.userName, data.password).then(function() {
        //Handle this
        window.console.log('Oh it did login');
    }, function(error) {
      $scope.errorMsg = error;
    });
  };

  $scope.showPasswordInput = function() {
    if($scope.formData.mobileNumber) {
      $scope.errorMsg = '';
      $scope.getPassword = true;
    } else {
      $scope.errorMsg = 'Please enter mobile number';
    }
  };
}]);//controller