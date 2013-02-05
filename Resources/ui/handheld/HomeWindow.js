function HomeWindow(title) {
	var global = require('ui/common/globals');
	
	var self = Ti.UI.createWindow({
		title:title,
		barColor: global.colors.dark,
		backgroundColor: global.colors.lightest
	});
	//Head.add(pageTitle);
	
	var Body = global.elements.SimpleView();
	//Body.add(global.elements.SimpleLabel("This is the Home Content."));
	
	Body.add(global.elements.SimpleLabel("This is some home content"));
	
	Body.add(global.elements.SimpleLabel("This is some More content"));
	
	
	self.add(Body);	
	
	return self;
};

module.exports = HomeWindow;