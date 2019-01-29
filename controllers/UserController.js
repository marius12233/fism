function userController($scope,$http){

    $scope.user = {username : null, password : null};

    $scope.login = function(){
        var req = {
            method : 'POST',
            url : '/backend/login/user',
            data : $scope.user
        };
        $http(req)
        .success(function(response){
            window.localStorage.setItem("fismToken",response.accessToken);
            $scope.user.isAdmin = response.isAdmin;
            console.log(response);
        })
        .error(function(response){
            console.log(response);
        });
    }

}