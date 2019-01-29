function newsController($scope,$http){
    
    $scope.news = [];
    //Appena viene iniettato il controller chiama il metodo get per prendere le news da visualizzare nel carousel
    $http.get("/backend/news")
      .success(function(response){
        console.log(response);
        $scope.news = response;
      })
      .error(function(response){
        console.log(response);
      })

}