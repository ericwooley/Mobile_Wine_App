function SimpleLabel(text){
	var global = require('ui/common/globals');
	var self = Ti.UI.createLabel({
		text: text,
		left: 5,
		right: 5,
		top: 5,
		color: global.colors.dark,
		font: {fontSize:18}
	});
	
	return self;
}

module.exports = SimpleLabel;