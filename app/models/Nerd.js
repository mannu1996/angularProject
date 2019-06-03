// grab the mongoose module
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
	name: {
		type: String
	},
	city: {
	type: String
	}
});

// define our nerd model
// module.exports allows us to pass this to other files when it is called
const Nerd = mongoose.model('Nerd', schema);
module.exports = Nerd;
