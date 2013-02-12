function FriendsWindow(title) {
<<<<<<< HEAD
	var global = require('ui/common/globals');
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
=======
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor: global.colors.dark
	});
>>>>>>> Home-Aaron
	
	var button = Ti.UI.createButton({
		height:44,
		width:300,
<<<<<<< HEAD
		title:'Friends Window',
=======
		title:'Open Window',
>>>>>>> Home-Aaron
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
<<<<<<< HEAD
	global.outputHook(self);
=======
	
>>>>>>> Home-Aaron
	return self;
};

module.exports = FriendsWindow;