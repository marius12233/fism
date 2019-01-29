function scuoleController($scope,$http,$window){

    $scope.schools = [];
    $scope.isAdding=false;
    $scope.province = ["Salerno", "Napoli", "Benevento", "Caserta","Avellino"];
    $scope.selectedSchool = {},
    $scope.viewingSchool=false,
    $scope.scuola = {
        idscuola: null,
        name: null, 
        email:null,
        city: null,
        address: null, 
        responsabile: null,
        coordinatore: null,
        num_sezioni: null,
        num_insegnanti: null,
        servizi: null,
        num_handicap: null,
        paritaria: false,
        provincia: null,
        telefono: null,
        cellulare: null
    };
    $scope.userSchool = {
        username : null,
        password : null,
        scuola : null
    };

    $scope.setSelectedSchool = function(school){
        $scope.selectedSchool = school;
        $scope.viewingSchool=true;
        $window.scrollTo(0, document.getElementById("scuola").offsetTop);
        
    };

    $scope.closeView = function(){
        $scope.viewingSchool=false;
    };


    $scope.creaScuola = function(){
        var req = {
            method:'POST',
            url:'../backend/school/create',
            data : $scope.scuola,
            headers:{
                'Authorization' : 'Bearer '+ window.localStorage.getItem("fismToken")
            }
        };
        $http(req)
        .success(function(response){
            console.log(response);
            $scope.scuola = response;
            $scope.creaUserScuola();
            $scope.getSchools();
            $scope.isAdding = false;
        })
        .error(function(response){
            console.log(response);
    
        });

    }

    /**
     * Crea l'utente associato alla scuola appena creata
     */
    $scope.creaUserScuola = function(){
        var user = $scope.userSchool;
        var school = $scope.scuola;
        user.username = school.email;
        user.school = school.idscuola;
        var req = {
            method:'POST',
            url:'../backend/user/create',
            data : $scope.userSchool,
            headers:{
                'Authorization' : 'Bearer '+ window.localStorage.getItem("fismToken")
            }
        };
        $http(req)
        .success(function(response){
            console.log(response);
        })
        .error(function(response){
            console.log(response);
    
        });

    }

    //Questo metodo elimina la scuola 
    $scope.deleteSchool = function(id){
        console.log(id);
        continuos = confirm("Sicura di voler eliminare la scuola?");
        if(continuos){
            var req = {
                method:'DELETE',
                url:"../backend/school/delete?id="+id,
                data : $scope.userSchool,
                headers:{
                    'Authorization' : 'Bearer '+ window.localStorage.getItem("fismToken")
                }
            };
            $http(req)
            .success(function(response){
                console.log(response);
                $scope.getSchools();
            })
            .error(function(response){
                console.log(response);
        
            });

        }
    };


    $scope.toggleIsAdding = function() {
        $scope.isAdding = !$scope.isAdding;
    };


    //Prendo tutte le scuole
    $scope.getSchools = function(){
        var req = {
            method:'GET',
            url:'../backend/school',
            headers:{
                'Authorization' : 'Bearer '+ window.localStorage.getItem("fismToken")
            }
        };
        $http(req)
        .success(function(response){
            console.log(response);
            $scope.schools = response;
        })
        .error(function(response){
            console.log(response);

        });
    }

    //Ogni volta che viene chiamato il Controller faccio una richiesta per ottenere le scuole

    $scope.getSchools();




    





}