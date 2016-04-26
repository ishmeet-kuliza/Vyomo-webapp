/*
** This file handles the sign up and otp verification
** author: @ishmeet
*/

/** TO_DO: Handle the case when logged in and otp not verified
**/
angular.module('Vyomo')
.controller("signUpCtrl", ['$scope', 'auth', 'globals', '$state', '$rootScope', 
            function($scope, auth, globals, $state, $rootScope) {
  var sessionUser = auth.getUser();
  $scope.formData = {};
  $scope.formData.selectedCity = sessionUser.selectedCity ? sessionUser.selectedCity : '';
  $scope.errorMsg = '';
  $scope.data = globals.getCities();
  $scope.otpSent = false;
  $scope.resentOTP = false;

  $scope.sendForm = function() {
    var formData = $scope.formData;
    if(!$scope.otpSent) {
      doSignUp(formData);
    } else {
      verifyOtp(formData);
    }
  };

  function doSignUp(data) {
    $.blockUI({message: globals.blockUIMsg});
    auth.signup(data).then(function(resp) {
      $.unblockUI();
      $scope.errorMsg = '';
      if(resp.otpVerified) {
        goToHomePage();
      } else {
        $scope.otpSent = true;
        // $scope.formData.otp = resp.otp;
      }
    }, function(error) {
      $.unblockUI();
      $scope.errorMsg = error;
    });
  }

  function verifyOtp(data) {  //This is same as login, should be modular
    $.blockUI({message: globals.blockUIMsg});
    var user = auth.getUser();
    auth.verifyOtp(user.sessionToken, data.otp, $scope.formData.mobNumber).then(function() {
      $.unblockUI();
      $scope.errorMsg = '';
      goToHomePage();
    },function(error){
      $.unblockUI();
      $scope.errorMsg = error;
    });
  }

  function goToHomePage() {
    if($rootScope.previousState) {
      $state.go($rootScope.previousState);
    } else {
      $state.go('homePage');
    }
  }

  $scope.resendOTP = function() {
    $.blockUI({message: globals.blockUIMsg});
    auth.resendOTP().then(function(){
      $.unblockUI();
      $scope.resentOTP = true;
    });
  };

  $scope.changeDetails = function() {
    $scope.otpSent = false;
    $scope.resentOTP = false;
    $scope.formData = {};
    auth.clearUser();
  };

}]);//controller