function HomeWindow(title) {
	var global = require('ui/common/globals');
	
	var self = global.createWindow(title);
	
	var Body = global.elements.SimpleView('vertical');
	Body.add(global.elements.SimpleLabel("This is the home page"));
	var settingsButton = Ti.UI.createView({
		right: 0,
		bottom: 0,
		height: 50,
		width: 50
	});
	
	settingsButton.add(Ti.UI.createImageView(
		{
			image: 'images/gearIconCrop.png',
			backgroundColor: 'transparent'
		}
	))
	self.add(Body);
	Body.add(settingsButton);
	return self;
};

module.exports = HomeWindow;