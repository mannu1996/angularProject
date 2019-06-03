app.service('homeService', homeService);
homeService.$inject = [ '$http'];

function homeService( $http )   {
    return{
       submitData : submitData,
       getData : getData,
       deleteData : deleteData,
       editData : editData,
       updateData : updateData
    }

   function submitData (candidate)   {
        console.log("submit method called");
        return $http.post('api/vi/id',candidate);
    }

    //get Data
    function getData(){
        return $http.get('api/vi/get');
    }
    //delete method called
    function deleteData(deleteId){
       return $http.delete('/api/vi/delete/'+deleteId);

    }
    //retrieve method to edit data
    function editData(objectId){
        return  $http.get('/api/vi/edit/'+objectId);

    }
    //update data method
    function updateData(objectId , candidate){
        console.log("updatedata to update = "+candidate.name);
        console.log("update data =",objectId,candidate);
        return $http.put('/api/vi/update/'+objectId,candidate);

    }
   


}