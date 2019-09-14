angular.module('mainController',['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope){
    var app=this;
     app.myVar=true;
    app.loadme =false;

    
    $rootScope.$on('$routeChangeStart',function(){
        
        if(Auth.isLoggedIn()){  // calling the login function from auth service
            // console.log('Success : User is Logged in');
            app.isLoggedIn=true;

            Auth.getUser().then(function(data){
                // console.log(data.data.username);
                app.username = data.data.username;
                app.useremail = data.data.email;
                app.loadme =true;
            })
        }else{
            // console.log('Failure : User is  not Logged in');
            app.isLoggedIn=false;

            app.username="";
            app.loadme =true;
        }
        
    });


    this.doLogin = function (loginData) {
        
        app.loading=true;
        app.errorMsg=false;
        app.successMsg=false;
    
    
        //console.log("form submitted");
        //console.log(this.loginData);
        Auth.login(app.loginData).then(function(data){
            // console.log(data.data.success);
            // console.log(data.data.message);
            if(data.data.success){
                app.loading=false;

                app.successMsg = data.data.message + "......Redirecting";  //creating a success message and redirect to home
    
                $timeout(function(){   //now we needto go to the home page after successful registration. So we will use location.path of angular
                    $location.path('/profile');
                    app.loginData ="";
                    app.successMsg = false;
                },2000);
            }else{
                app.loading=false;
               
                app.errorMsg = data.data.message;  //creating a error message
            }
        });
    };

    
    this.logout =function(){
        Auth.logout();// calling the logout function from auth service
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
        },2000)
    }
});
