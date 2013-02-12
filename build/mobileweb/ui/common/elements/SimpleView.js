<<<<<<< HEAD
function SimpleView(layout){
	var global = require('ui/common/globals');
	var self = Ti.UI.createView({
		width: '100%',
		height: '100%',
		top: 20,
		left: 0,
		backgroundColor: 'transparent',
		layout: layout
=======
function SimpleView(){
	
	var self = Ti.UI.createView({
		width: 'auto',
		height: Ti.UI.SIZE,
		right: '5%',
		left: '5%',
		top: '5%',
		borderRadius: 3,
		outline: 2,
		outlineColor: 'black',
		padding: 10,
		backgroundColor: global.colors.lightest
>>>>>>> Home-Aaron
	});
	
	return self;
};

module.exports = SimpleView;
