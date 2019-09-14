angular.module('associateServices', ['authServices'])

    //service to create Associate
    .factory('Associate', function ($http) {
        associateFactory = {};
        //associate.create(regData)
        associateFactory.create = function (assoData) {
            return $http.post('/api/newAssociate', assoData)
        }
        return associateFactory;
    })

    //Service to get associate Details
    .factory('listAssociate', function (Auth, $http) {
        listAssociateFactory = {};
        listAssociateFactory.getList = function () {
            if (Auth.isLoggedIn()) {
                return $http.post('/api/listAssociate',"");
            } else {
                return 'User doesnt have token';
            }
        }
        return listAssociateFactory;
    })

    //service to update Associate Details
    .factory('updAssociate', function($http){
        updAssociateFactory = {};
        vvvv={};
        updAssociateFactory.saveAssociateData = function(data){
            // console.log(data);
            updAssociateFactory.empid=data.empid;
            vvvv=data;
            return "abc";
           
        } 

        updAssociateFactory.getAssociateData = function(){
            // console.log(vvvv);
            return vvvv;
        }

        updAssociateFactory.editDetails = function(updData){
            console.log(updData);
            return $http.post('/api/updateDetails', updData)
        }

        return updAssociateFactory;
    })


    //Service to delete any Associate
    .factory('deleteAssociate', function($http){
        deleteAssociateFactory = {};
        deleteAssociateFactory.delete = function (data) {
            console.log(data);
            return $http.post('/api/deleteAssociate', data)
        }
        return deleteAssociateFactory;


    })



