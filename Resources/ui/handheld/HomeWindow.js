function HomeWindow(title) {
	var global = require('ui/common/globals');
	
	var self = global.createWindow(title);
	
	var Body = global.elements.SimpleView('vertical');
	
	
	Body.add(global.elements.SimpleLabel("This is the home page"));
	self.add(Body);
	
	
	global.outputHook(self);
	return self;
};

module.exports = HomeWindow;