/*
** This service is used to authenticate users 
** author: @ishmeet-kuliza
*/
angular.module('Vyomo')
.factory('auth', ['$http', '$q', 'env', function($http, $q, env) {

	/**
  * Set common request headers
  */
  function setDefaultHeaders () {
    // set default headers for all outgoing requests
    // needed this for patch.. as in angular patch does not have content-type set by default
    $http.defaults.headers.common['Content-Type'] = 'text/plain;charset=utf-8';
    $http.defaults.headers.common['Accept'] = 'text/plain';
    window.console.log('THis is env', env.hello);
  }

  setDefaultHeaders();

	return {
    // getUser: getUser,
    // isAuthenticated: isAuthenticated,
    // authenticate: authenticate,
    // switchLogin: switchLogin,
    // updateSession: updateSession,
    // deleteSession: deleteSession,
    // isDemoUser: isDemoUser,
    // isUserInUse: isUserInUse,
    // isDemo2UserInUse: isDemo2UserInUse,
    // isSuperUser: isSuperUser,
    // isOpsifyUser: isOpsifyUser,
    // isKnownDemoUser: isKnownDemoUser,
    // setEntryURL: setEntryURL,
    // getEntryURL: getEntryURL
    hello: 'HI this is ishmeet'
  };

}]);