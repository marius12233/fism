function normativaController($scope,$http,$window){
    $scope.normative = [];
    //Normativa Controller
  //To-DO: implementare di mandare il token
    var req = {
        method : 'GET',
        url : 'http://localhost/backend/normativa',
        headers : {
            'Authorization' : 'Bearer '+ window.localStorage.getItem("fismToken")
        }
    };
    
    $http(req)
        .success(function(response){
        console.log(response);
        $scope.normative = response;
        })
        .error(function(response){
        console.log(response);
        $window.location.href="./login.html";
        })
    

}