angular.module('userControllers',['userServices'])

.controller('regCtrl',function($http,$location,$timeout,User){
    var app=this;
    this.regUser = function (regData) {
        app.loading=true;
        app.errorMsg=false;
        app.successMsg=false;


        //console.log("form submitted");
        //console.log(this.regData);
        User.create(app.regData).then(function(data){
            // console.log(data.data.success);
            // console.log(data.data.message);
            if(data.data.success){
                app.loading=false;
                //creating a success message and redirect to home
                app.successMsg = data.data.message + "......Redirecting";

                //now we needto go to the home page after successful registration. So we will use location.path of angular
                $timeout(function(){
                    $location.path('/');
                },2000);
            }else{
                app.loading=false;
                //creating a error message
                app.errorMsg = data.data.message;
            }
        });
    };
});