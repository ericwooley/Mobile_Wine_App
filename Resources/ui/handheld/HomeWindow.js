function HomeWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		//backgroundColor: global.colors.dark
	});
	
	self = global.elements.SetTitleBar(self);
	
	var pageTitle = Ti.UI.createLabel({
		text: 'This is the home page'
	});
	//Head.add(pageTitle);
	
	var Body = global.elements.SimpleView();
	Body.add(pageTitle);
	Body.add(global.elements.SimpleLabel("This is the Home Content."));
	
	self.add(Body);
	
	//self.add(Head);	
	
	return self;
};

module.exports = HomeWindow;