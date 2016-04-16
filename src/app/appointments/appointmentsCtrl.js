angular.module('Vyomo')
.controller("appointmentsCtrl", ['$scope', 'auth', 'env', '$http',  function($scope, auth, env, $http) {
  var sessionUser = auth.getUser(),
      BASE_URL = env.BASE_URL;

  if(!Object.keys(sessionUser).length) {
    $scope.appointmentsAvailable = false;
  } else {
    var api = '/get_all_appointments';
    var params = {
      'access_token': 'QWthc2gxNDYwMjA0NDM2U2F0IEFwciAwOSAyMDE2IDE3OjUwOjM2IEdNVCswNTMwIChJU1Qp' //sessionUser.access_token
    };

    $http({method: 'POST', data: params, url: BASE_URL + api}).then(function(response){
      if(response && response.data && response.data.status_code === 200) {
        $scope.appointments = response.data.message['appointments'];
        $scope.appointments.forEach(function(appointment){
          appointment.isCollapsed = true;
        });
        $scope.appointmentsAvailable = true;
        $scope.appointments.push(JSON.parse(JSON.stringify($scope.appointments[0])));
        $scope.appointments.push(JSON.parse(JSON.stringify($scope.appointments[0])));
        $scope.appointments.push(JSON.parse(JSON.stringify($scope.appointments[0])));
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
      'access_token': 'QWthc2gxNDYwMjA0NDM2U2F0IEFwciAwOSAyMDE2IDE3OjUwOjM2IEdNVCswNTMwIChJU1Qp', //sessionUser.access_token
      'appointment_id': appointment.appointment_id
    };
    $http({method: 'POST', data: params, url: BASE_URL + '/cancel_appointment'}).then(function(response){
      if(response && response.data && response.data.status_code === 200) {
        deleteAppointment(appointment.appointment_id);     
      } else {
        $scope.appointments = [];
        $scope.appointmentsAvailable = false;
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
    $scope.appointments.splice(index, 1);
  }

}]);//controller