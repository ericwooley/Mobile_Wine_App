function FriendsWindow(title) {
	var global = require('ui/common/globals');
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	
	var button = Ti.UI.createButton({
		height:44,
		width:300,
		title:'Friends Window',
		color: 'black',
		top:20,
		borderColor: 'black',
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: global.colors.lightest,
		backgroundImage: 'none'
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: global.colors.light
		}));
	});
	global.outputHook(self);
	return self;
};

module.exports = FriendsWindow;