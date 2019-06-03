const Nerd = require('./models/Nerd');
const ObjectID = require('mongodb').ObjectID;
module.exports = function(app) {
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/api/vi/default', function(req, res)	{
		res.sendfile('./public/index.html');
	})
    //API to send data to database
	app.post('/api/vi/id',function(req,res)	{
		 var info = {};
		 info['name'] = req.body.name;
		 info['city'] = req.body.city;
		 Nerd.create(info, (err, info) => {
	     console.log('In nerd call');
		 if(err)	{
		        console.log('In nerd error ==>', err);
				return err;
			}else{
				console.log('data has been submitted');
			}
		 });
		res.end(JSON.stringify(info));
	})
	
	
	//API to get the data from database
	app.get('/api/vi/get',function(req, res)	{
		console.log("get method called");
		
	    Nerd.find({}, function(err, list)	{
			if(err)
			res.send(err);
			res.json(list);

		});
	})

	//API to delete the data from database
	
	app.delete('/api/vi/delete/:id',function(req, res)	{

		Nerd.findByIdAndDelete(new ObjectID(req.params.id),function(error, Item)	{	
			if(!Item)	{
				res.send("data is not   found");
			}else	{
				res.send('data deleted successfully');
				
			}
		}); 

	});

	app.get('/api/vi/edit/:id',function(req,res)	{
		console.log("edit section");
		Nerd.findOne({_id:new ObjectID(req.params.id)},	function(error, success)	{
			console.log(req.params.id);
			
			if(success)	{
				
				  res.send(success);
				  
			}else{
				res.send("not be edited");

			}
		})
	})

	//update api
	app.put('/api/vi/update/:id',function(req,res)	{
		console.log('update section = ',req.body.name);
		 Nerd.updateOne({_id:new ObjectID(req.params.id)},{$set:{name: req.body.name, city: req.body.city}}, function(error,success)	{
	  	if(success)	{
				 res.send(success);
				 console.log("data updated",success)
			 }
			 else{
				 console.log("data not updated");
			 }
		 })
	})
	

};