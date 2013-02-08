function SimpleView(layout){
	var global = require('ui/common/globals');
	var self = Ti.UI.createView({
		width: '100%',
		height: '100%',
		top: 20,
		left: 0,
		backgroundColor: 'transparent',
		layout: layout
	});
	
	return self;
};

module.exports = SimpleView;
