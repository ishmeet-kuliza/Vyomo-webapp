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

  $scope.sendForm = function() {
    var formData = $scope.formData;
    if(!$scope.otpSent) {
      doSignUp(formData);
    } else {
      verifyOtp(formData);
    }
  };

  function doSignUp(data) {
    auth.signup(data).then(function(resp) {
      $scope.errorMsg = '';
      if(resp.otpVerified) {
        goToHomePage();
      } else {
        $scope.otpSent = true;
        // $scope.formData.otp = resp.otp;
      }
    }, function(error) {
      $scope.errorMsg = error;
    });
  }

  function verifyOtp(data) {  //This is same as login, should be modular
    var user = auth.getUser();
    auth.verifyOtp(user.sessionToken, data.otp).then(function() {
      $scope.errorMsg = '';
      goToHomePage();
    },function(error){
      $scope.errorMsg = error;
    });
  }

  function goToHomePage() {
    $state.go('homePage');
  }

  $scope.resendOTP = function() {
    auth.resendOTP().then(function(){
      window.console.log('OTP Sent');
    });
  };

  $scope.changeDetails = function() {
    $scope.otpSent = false;
    $scope.formData = {};
    auth.clearUser();
  };

}]);//controller