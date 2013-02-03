function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:Ti.Locale.getString('dark')
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:300,
		title:'Open Window',
		color: 'black',
		top:20,
		borderColor: 'black',
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: Ti.Locale.getString('lightest'),
		backgroundImage: 'none'
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});
	
	return self;
};

module.exports = ApplicationWindow;
