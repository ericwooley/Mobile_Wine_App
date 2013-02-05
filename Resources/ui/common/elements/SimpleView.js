function SimpleView(){
	var global = require('ui/common/globals');
	var self = Ti.UI.createView({
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		backgroundColor: 'transparent',
		layout: 'vertical'
	});
	
	return self;
};

module.exports = SimpleView;
