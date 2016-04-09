/*
** This service is used to authenticate users 
** author: @ishmeet-kuliza
*/
angular.module('Vyomo')
.factory('auth', ['$http', '$q', 'env', function($http, $q, env) {

  var userObj;
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

  function _generateUserObj(data) {
    return {
      userName: data.user.userName,
      sessionToken: data.sessionToken,
      expiry: data.expiration
    };
  }

  function authenticate(userName, password) {
    var deferred = $q.defer();
    // login call to server.
    var authUrl = ''; //FIX_ME, enter API url

    $http.post(authUrl, { userName: userName, password: password }).then(function(response) {
      if (response && response.data){
        setDefaultHeaders();
        userObj = _generateUserObj(response.data);
        // persist in session storage so this is available for page refreshes.
        window.sessionStorage.userObj = JSON.stringify(userObj);
        deferred.resolve(userObj);
      } else {
        deferred.reject('Something went wrong with your login, please try again.');
      }
    }, function(err) {
      if (err.status === 401) {
        deferred.reject('Incorrect login, please try again.');
      } else {
       deferred.reject('Something went wrong with your login, please try again.');
      }
    });
    return deferred.promise;
  }

  function getUser() {
    return userObj ? userObj : {};
  }

  return {
    authenticate: authenticate,
    getUser: getUser,
    // isAuthenticated: isAuthenticated,
    
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