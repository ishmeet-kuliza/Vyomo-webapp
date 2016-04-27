angular.module('Vyomo')
.controller("appointmentsCtrl", ['$scope', 'auth', 'env', '$http', '$state', '$timeout', 'globals',
            function($scope, auth, env, $http, $state, $timeout, globals) {
  var sessionUser = auth.getUser(),
      BASE_URL = env.BASE_URL;

  // confirm msg coming from viewCart state
  // contains confirmation msg after final checkout else is null
  $scope.confirmBookingMsg = $state.current.confirmBookingMsg;
  if($scope.confirmBookingMsg){
    // set value to null after 5 secs so that it vanishes after coming back to this state
    window.setTimeout(function(){
      $state.current.confirmBookingMsg = null;
      //Test /to be remove (Gaurav)
      $scope.confirmBookingMsg = null;
    },5000); // 5000 = 5 secs
  }

  if(!Object.keys(sessionUser).length) {
    $scope.appointmentsAvailable = false;
  } else {
    var api = '/get_all_appointments';
    var params = {
      'access_token': sessionUser.sessionToken
    };
    $.blockUI({message: globals.blockUIMsg});
    $http({method: 'POST', data: params, url: BASE_URL + api}).then(function(response){
      $.unblockUI();
      if(response && response.data && response.data.status_code === 200) {
        $scope.appointments = response.data.message['appointments'];
        if(!$scope.appointments.length) {
          $scope.appointmentsAvailable = false;
          return;
        } 
        $scope.appointmentsAvailable = true;
        $scope.appointments.forEach(function(appointment){
          appointment.isCollapsed = true;
        });
        $scope.appointmentsAvailable = true;
        $scope.appointments[0].isCollapsed = false; //open the first appointment
      } else {
        $scope.appointments = [];
        $scope.appointmentsAvailable = false;
      }
    });
  }

  $scope.toggleCollapse = function(appointment) {
    appointment.isCollapsed = !appointment.isCollapsed; 
  };

  $scope.cancelAppointment = function(appointment) {
    var params = {
      'access_token': sessionUser.sessionToken,
      'appointment_id': appointment.appointment_id
    };
    $.blockUI({message: globals.blockUIMsg});
    $http({method: 'POST', data: params, url: BASE_URL + '/cancel_appointment'}).then(function(response){
      $.unblockUI();
      if(response && response.data && response.data.status_code === 200) {
        deleteAppointment(appointment.appointment_id); 
        $timeout(function(){
          $scope.errorMessage = '';
        });    
      } else {
        $timeout(function(){
          $scope.errorMessage = response.data.error_message;
        });
      }
    });
  };

  function deleteAppointment(id) {
    var index;
    $scope.appointments.forEach(function(appointment, i){
      if(appointment.appointment_id === id) {
        index = i;
      }
    });
    $timeout(function(){
      $scope.appointments[index].appointment_status = 'Cancelled';
    });
  }

}]);//controller