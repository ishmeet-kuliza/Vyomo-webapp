angular.module('Vyomo')
.controller("appointmentsCtrl", ['$scope', 'auth', 'env', '$http',  function($scope, auth, env, $http) {
  var sessionUser = auth.getUser(),
      BASE_URL = env.BASE_URL;
  $scope.appointmentsAvailable= true;

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
      } else {
        $scope.appointments = [];
        $scope.appointmentsAvailable = false;
      }
    });
  }

}]);//controller