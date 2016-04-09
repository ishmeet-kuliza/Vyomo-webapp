/*
** Some constants could go in here to be used by authentication service
*/

angular.module('Vyomo')

.factory('env', [ function() {
  return {
    hello: 'Some keys/paramas'
  };
}]);