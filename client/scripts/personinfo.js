/**
 * Created by aronthomas on 11/11/15.
 */
myApp.directive('personInfo', function(){
    return {
        restrict: "E",
        scope: {
            info: '=',
            personClick: "&"
        },
        templateUrl: '/assets/views/personinfo.html'
    }
});