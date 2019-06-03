var app = angular.module('sampleApp',[]);
app.component("homeComponent", {
    controller : ['$http','homeService', homeController],
    templateUrl : 'MainComponent/home.html',
    controllerAs: 'vm'
});
// homeController.$inject = [ '$http','homeService' ] ;
function homeController($http , homeService) {
    var vm  = this;
    //varible declaration
    vm.methodCall = false;
    vm.listCall = false;
    vm.list = [];
    vm.methodClick = "submit";  
    


    //method declaration
    vm.submitData = submitData;
    vm.getData = getData;   
    vm.deleteData = deleteData;
    vm.editData = editData;
    vm.updateData = updateData;
    vm.deleteConfirmation = deleteConfirmation;


    //method definitions

    //deleteConfirmation Method definition
    function deleteConfirmation(objectId){
            vm.deleteId = objectId;
   }

   function submitData(candidate){
        console.log("submit data called"+candidate);
        homeService.submitData(candidate);
        vm.getData();
   }

//getData method definitions
    function getData()  { 
        homeService.getData().then((res) => {
        vm.list = res.data;
       });
       
    };

    //deleteData method definition
    function deleteData(deleteId){
        homeService.deleteData(deleteId).then((res) => {
        console.log(res);
        getData();
        });	

    };


    //Edit api call
    function editData(objectId)	{
        vm.methodCall = true;
        vm.EditObjectId = objectId;
        window.scrollTo(0,150);
        homeService.editData(objectId).then(function(success, error)	{

            if(success)	{
            vm.candidate = success.data;
            vm.methodClick = "update";
            getData();     

            }else	{
            console.log(error);
         
            }
    })

    }

    //update api call
    function updateData(candidate)	{
        
        homeService.updateData(vm.EditObjectId,vm.candidate).then(function (success, error)	{

            if(success)	{
                console.log("data updated successfully",success);
                getData();
                vm.candidate = {};
                vm.methodCall = false;
                vm.listCall = true;
                vm.methodClick = "submit";
                window.scrollTo(0,400);
            }
            else{
                console.log(error);
            }

        })
    }
    
}


// service


