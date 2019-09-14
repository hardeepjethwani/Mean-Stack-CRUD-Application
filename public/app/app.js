angular.module('userApp', ['appRoutes','userControllers','userServices','ngAnimate','mainController','authServices','associateServices','associateControllers','updateControllers'])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AttachToken');
    
});


//,'associateServices','associateControllers'