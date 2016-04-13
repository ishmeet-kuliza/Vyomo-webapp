/*
** This file handles the sign up and otp verification
** author: @ishmeet
*/

/** TO_DO: Handle the case when logged in and otp not verified
**/
angular.module('Vyomo')
.controller("signUpCtrl", ['$scope', 'auth', 'globals', '$state', function($scope, auth, globals, $state) {
  var sessionUser = auth.getUser();
  $scope.formData = {};
  $scope.formData.selectedCity = sessionUser.selectedCity ? sessionUser.selectedCity : '';
  $scope.errorMsg = '';
  $scope.data = globals.getCities();
  $scope.otpSent = false;

  $scope.sendForm = function(forceQuery) {
    var formData = $scope.formData;
    if(!$scope.otpSent || forceQuery) {
      doSignUp(formData);
    } else {
      verifyOtp(formData);
    }
  };

  function doSignUp(data) {
    auth.signup(data).then(function(resp) {
      $scope.errorMsg = '';
      if(resp.otpVerified) {
        goToCart();
      } else {
        $scope.otpSent = true;
        $scope.formData.otp = resp.otp;
      }
    }, function(error) {
      $scope.errorMsg = error;
    });
  }

  function verifyOtp(data) {  //This is same as login, should be modular
    var user = auth.getUser();
    auth.verifyOtp(user.sessionToken, data.otp).then(function() {
      $scope.errorMsg = '';
      goToCart();
    },function(error){
      $scope.errorMsg = error;
    });
  }

  function goToCart() {
    $state.go('checkoutCart');
  }

}]);//controller