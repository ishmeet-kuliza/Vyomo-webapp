angular.module('Vyomo')
.controller("loginCtrl", ['$scope', 'auth', 'globals', '$state', '$rootScope',  function($scope, auth, globals, $state, $rootScope) {
  var sessionUser = auth.getUser(),
      access_token = '';
  $scope.formData = {};
  $scope.formData.selectedCity = sessionUser.selectedCity ? sessionUser.selectedCity : '';
  $scope.errorMsg = '';
  $scope.data = globals.getCities();
  $scope.otpNeeded = false;

  $scope.sendForm = function() {
    if($scope.forgotPassword) {
      return;
    }
    var data = $scope.formData;
    auth.authenticate(data.mobileNumber, data.password).then(function(resp) {
      if(resp.otpVerified) {
        goToHomePage();
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
      goToHomePage();
    },function(error){
      $scope.errorMsg = error;
    });
  };

  $scope.toggleForgotPassword = function() {
    $.blockUI({message: globals.blockUIMsg});
    auth.forgotPassword($scope.formData.mobileNumber).then(function(resp){
      $scope.forgotPassword = true;
      $scope.formData.otp = resp.otp;
      access_token = resp.access_token;
      $scope.errorMsg = '';
      $.unblockUI();
    }, function(error) {
      $scope.errorMsg = error;
      $.unblockUI();
    });
  };

  $scope.setNewPassword = function() {
    var params = {
      otp: $scope.formData.otp,
      access_token: access_token,
      password: $scope.formData.newPassword
    };

    $.blockUI({message: globals.blockUIMsg});
    auth.resetPassword(params).then(function() {
      $.unblockUI();
      $scope.errorMsg = '';
      goToHomePage();
    }, function(error){
      $scope.errorMsg = error;
      $.unblockUI();
    });
  };

  function goToHomePage() {
    if($rootScope.previousState) {
      $state.go($rootScope.previousState);
    } else {
      $state.go('homePage');
    }
    
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


  // $rootScope.$on('$stateChangeStart', function(event, toState) {
  //   if(toState.name !== 'login') {
  //     $rootScope.previousState = toState.name;
  //   }
  // });


}]);//controller