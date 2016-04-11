/*
** Some constants could go in here to be used by authentication service
*/

angular.module('Vyomo')

.factory('env', [ function() {
  return {
    BASE_URL: 'http://54.165.181.161:3001/web'
  };
}]);