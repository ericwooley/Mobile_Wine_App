function FriendsWindow(title) {
	var global = require('ui/common/globals');
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	var view = addFriend_view = Ti.UI.createView({
		width: '100%',
		size: Ti.UI.SIZE,
		top: 30,
		layout: 'horizontal'
	});
	var email_field = Ti.UI.createTextField({
		hintText: 'A new friends Email',
		left: 10,
		width: 'auto',
		height: 35,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	});
	var button = Ti.UI.createButton({
		height:35,
		width: 100,
		left: 10,
		title:'follow',
		color: 'black',
		borderColor: 'black',
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: global.colors.light,
		backgroundImage: 'none',
		color:'white'
	});
	addFriend_view.add(email_field);
	addFriend_view.add(button);
	
	self.add(addFriend_view);
	
	button.addEventListener('click', function() {
		global.api.befriend(email_field.value, function(result){
			Ti.API.info('Got this: '+result);
			alert(result);
		});
	});
	global.outputHook(self);
	return self;
};

module.exports = FriendsWindow;