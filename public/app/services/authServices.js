angular.module('authServices',[])
.factory('Auth',function($http, JWTtoken,$q){
    authFactory={};


    authFactory.login = function(loginData){
        return $http.post('/api/authenticate',loginData).then(function(data){
            JWTtoken.setToken(data.data.token);  //set the token that we got from response
            return data;
        });
    }

    //Check if user id logged in or not using the token
    authFactory.isLoggedIn = function(){
        if(JWTtoken.getToken()){
            return true;
        }else{
            return false;
        }
    }

    //get the details of current user
    authFactory.getUser = function(){
        if(JWTtoken.getToken()){
            return $http.post('/api/currentUser')
        }
        else{
            $q.reject({message:"User has no Token"})
        }
    }
    //Auth.logout
    authFactory.logout = function(){
        JWTtoken.setToken();
    }

    return authFactory;
})

.factory('JWTtoken',function($window){
    var jwtTokenFactory ={};

    jwtTokenFactory.setToken = function(token){
        if(token){
            $window.localStorage.setItem('token', token)
        }else{
            $window.localStorage.removeItem('token', token)
        }
    }

    jwtTokenFactory.getToken = function(){
        return $window.localStorage.getItem('token')
    }

    return jwtTokenFactory;
})


.factory('AttachToken',function(JWTtoken){
    var attachTokenFactory ={};

    attachTokenFactory.request =function(config){
        var token = JWTtoken.getToken();
        if(token){
            config.headers['x-access-token'] = token;
        }
        return config;
    }
    return attachTokenFactory;

})



