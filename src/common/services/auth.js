/*
** This service is used to authenticate users 
** author: @ishmeet-kuliza
*/
angular.module('Vyomo')
.factory('auth', ['$http', '$q', 'env', '$cookies', function($http, $q, env, $cookies) {

  var userObj = $cookies.getObject('userObj') ? $cookies.getObject('userObj') : {},
      BASE_URL = env.BASE_URL;
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

  function _generateUserObj(data, mobNumber) {
    return {
      sessionToken: data.access_token,
      otpVerified: data.otp_verified,
      otp: data.otp, //For testing purposes
      number: mobNumber
    };
  }

  function authenticate(number, password) {
    var deferred = $q.defer();
    // login call to server.
    var authUrl = BASE_URL + '/signin';

    $http.post(authUrl, { number: number, password: password }).then(function(response) {
      if (response && response.data && response.data.status_code === 200){
        setDefaultHeaders();
        userObj = _generateUserObj(response.data.message, number);
        storeInCookie(userObj);
        deferred.resolve(userObj);
      } else {
        deferred.reject(response.data.error_message);
      }
    }, function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  }

  function storeInCookie(userObj) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);
    $cookies.putObject('userObj', userObj, {expires: expireDate});
  }

  function getUser() {
    var sessionUser = $cookies.getObject('userObj');
    return sessionUser ? sessionUser : {};
  }

  function signup(data) {
    var deferred = $q.defer();
    // login call to server.
    var authUrl = BASE_URL + '/signup';

    var params = {
      name: data.custName,
      phone_no: data.mobNumber,
      gender: data.gender,
      email: data.email,
      password: data.password,
      city: data.selectedCity.toLowerCase()
    };

    $http.post(authUrl, params).then(function(response) {
      if (response && response.data && response.data.status_code === 200){
        setDefaultHeaders();
        userObj = _generateUserObj(response.data.message, params.phone_no);
        storeInCookie(userObj);
        deferred.resolve(userObj);
      } else {
        deferred.reject(response.data.error_message);
      }
    }, function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  }

  function verifyOtp(sessionToken, otp) {
    var deferred = $q.defer();
    // login call to server.
    var authUrl = BASE_URL + '/validate_otp';

    $http.post(authUrl, { access_token: sessionToken, otp: otp }).then(function(response) {
      if (response && response.data && response.data.status_code === 200){
        deferred.resolve(userObj);
      } else {
        deferred.reject(response.data.error_message);
      }
    });
    return deferred.promise;
  }

  function isAuthenticated() {
    return !!Object.keys(getUser()).length;
  }

  return {
    authenticate: authenticate,
    getUser: getUser,
    signup: signup,
    verifyOtp: verifyOtp,
    isAuthenticated: isAuthenticated
  };

}]);