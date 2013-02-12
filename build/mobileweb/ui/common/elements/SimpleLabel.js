function SimpleLabel(text){
<<<<<<< HEAD
	var global = require('ui/common/globals');
=======
>>>>>>> Home-Aaron
	var self = Ti.UI.createLabel({
		text: text,
		left: 5,
		right: 5,
<<<<<<< HEAD
		top: 5,
		color: global.colors.dark,
		font: {fontSize:18}
=======
		top: 5
>>>>>>> Home-Aaron
	});
	
	return self;
}

module.exports = SimpleLabel;