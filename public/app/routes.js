var app = angular.module('appRoutes',['ngRoute'])

.config(function ($routeProvider,$locationProvider) {
    $routeProvider
    
    .when('/',{
        templateUrl: 'app/views/pages/home.html'
    })

    .when('/about',{
        templateUrl: 'app/views/pages/about.html',
        authenticated:true
    })

    .when('/register',{
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register' ,
        authenticated:false
    })

    .when('/logout',{
        templateUrl: 'app/views/pages/users/logout.html',
        authenticated:true
    })

    .when('/profile',{
        templateUrl: 'app/views/pages/users/profile.html',
        authenticated:true
    })

    .when('/viewAssociate',{
        templateUrl: 'app/views/pages/associate/viewAssociate.html',
        controller: 'associateCtrl',
        controllerAs: 'asso' ,
        authenticated:true

    })

    .when('/addAssociate',{
        templateUrl: 'app/views/pages/associate/addAssociate.html',
        controller: 'associateCtrl',
        controllerAs: 'asso' ,
        authenticated:true

    })

    .when('/editAssociate',{
        templateUrl: 'app/views/pages/associate/editAssociate.html',
        controller: 'updateCtrl',
        controllerAs: 'update' ,
        authenticated:true
    })

    

    .when('/login',{
        templateUrl: 'app/views/pages/users/login.html',
        // controller: 'regCtrl',
        // controllerAs: 'register' 
        authenticated:false
    })


    .otherwise({ redirectTo : '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });// removing the hash from url
    
})

app.run(['$rootScope','Auth','$location', function($rootScope, Auth, $location){
    $rootScope.$on('$routeChangeStart',function(event,next,current){

        if(next.$$route.authenticated == true){
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/');
            }
        }else if(next.$$route.authenticated == false){
            if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/profile');
            }
            console.log("dont needs to be auth")
        }
        // console.log(Auth.isLoggedIn);
    })
}])



        
