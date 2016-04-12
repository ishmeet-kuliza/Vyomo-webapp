/*
** Some constants could go in here to be used by authentication service
*/

angular.module('Vyomo')

.factory('env', [ function() {
  return {
    BASE_URL: 'http://52.5.1.82:3001/web'
  };
}]);