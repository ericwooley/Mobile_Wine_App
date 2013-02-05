function HomeWindow(title) {
	var global = require('ui/common/globals');
	
	var self = Ti.UI.createWindow({
		title:title,
		barColor: global.colors.dark,
		backgroundColor: global.colors.lightest
	});
	
	var Body = global.elements.SimpleView('vertical');
	Body.add(global.elements.SimpleLabel("This is the home page"));

	self.add(Body);
	
	return self;
};

module.exports = HomeWindow;