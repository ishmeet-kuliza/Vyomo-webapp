angular.module('Vyomo')
.controller("loginCtrl", ['$scope', 'auth', 'globals', '$state',  function($scope, auth, globals, $state) {
  var sessionUser = auth.getUser();
  $scope.formData = {};
  $scope.formData.selectedCity = sessionUser.selectedCity ? sessionUser.selectedCity : '';
  $scope.errorMsg = '';
  $scope.data = globals.getCities();
  $scope.otpNeeded = false;

  $scope.sendForm = function() {
    var data = $scope.formData;
    auth.authenticate(data.mobileNumber, data.password).then(function(resp) {
      if(resp.otpVerified) {
        goToCart();
      } else {  //Need to verify OTP
        $scope.otpNeeded = true;
        $scope.formData.otp = resp.otp;
        // verifyOtp(resp);
      } 
    }, function(error) {
      $scope.errorMsg = error;
    });
  };

  $scope.verifyOtp = function() {
    var user = auth.getUser();
    auth.verifyOtp(user.sessionToken, $scope.formData.otp).then(function() {
      $scope.errorMsg = '';
      goToCart();
    },function(error){
      $scope.errorMsg = error;
    });
  };

  function goToCart() {
    $state.go('checkoutCart');
  }

  $scope.showPasswordInput = function() {
    if($scope.formData.mobileNumber) {
      $scope.errorMsg = '';
      $scope.getPassword = true;
    } else {
      $scope.errorMsg = 'Please enter mobile number';
    }
  };

  $scope.registerNow = function() {
    $state.go('signup');
  };
}]);//controller