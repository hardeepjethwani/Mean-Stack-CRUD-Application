angular.module('updateControllers',['associateServices'])

.controller('updateCtrl',function($http,$location,$timeout,updAssociate){
    var app=this;


    newData = updAssociate.getAssociateData()
    app.empid= newData.empid;
    app.email = newData.email;
    app.contact = newData.contact;
    app.name = newData.name;
    app.skills = newData.skills;



    this.updateDetails = function (updData) {
        app.loading=true;
        app.errorMsg=false;
        app.successMsg=false;
       //console.log("form submitted");
        //console.log(this.regData);
        updAssociate.editDetails(app.updData).then(function(data){
            // console.log(data.data.success);
            // console.log(data.data.message);
            if(data.data.success){
                app.loading=false;
                //creating a success message and redirect to home
                app.successMsg = data.data.message + "......Redirecting";

                //now we needto go to the home page after successful registration. So we will use location.path of angular
                $timeout(function(){
                    $location.path('/viewAssociate');
                },2000);
            }else{
                app.loading=false;
                //creating a error message
                app.errorMsg = data.data.message;
            }
        });
    };


});