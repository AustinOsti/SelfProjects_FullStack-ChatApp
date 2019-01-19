angular.module('app')
.service('UserSvc', function ($http, $location) {
  var svc = this
  // retrieve currently logged user details
  svc.getUser = function () {
    return $http.get('/api/users')
    .then(function (response) {
      return response.data
    })
  }
  //get a JWT
  svc.login = function (username, password) {
    return $http.post('/api/sessions', {
      username: username, password: password
    }).then(function (response) {
      svc.token = response.data
      $http.defaults.headers.common['X-Auth'] = response.data
      return svc.getUser()
    })
  }
  svc.register = function (username, password) {
    return $http.post('/api/users', {
      username: username, password: password
    }).then(function () {
      return svc.login(username, password)
    })
  }
	svc.logout = function() {
		delete $http.defaults.headers.common['X-Auth']
	}
})
