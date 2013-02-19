function FriendsWindow(title) {
	var global = require('ui/common/globals');
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	var view = Ti.UI.createView({
		height: '100%',
		width: '100%',
		top: 0,
		left: 0,
		layout: 'vertical'
	});
	var Friend_view = Ti.UI.createView({
		width: '100%',
		height: Ti.UI.SIZE,
		top: 30,
		layout: 'horizontal'
	});
	
	var email_field = Ti.UI.createTextField({
		hintText: 'A new friends Email',
		left: 10,
		width: '60%',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var button = Ti.UI.createButton({
		height:35,
		width: Ti.UI.FILL,
		left: 10,
		right: 10,
		title:'follow',
		color: 'black',
		borderColor: 'black',
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: global.colors.dark,
		backgroundImage: 'none',
		color:'white'
	});
	Friend_view.add(email_field);
	Friend_view.add(button);
	view.add(Friend_view);
	self.add(view);
	var friend_list;
	self.addEventListener('open', function(e){
		global.api.load_friend_list(
			function(list){
				friend_list = list;
				view.add(list);
			}
		);
	});
	button.addEventListener('click', function() {
		global.api.befriend(email_field.value, function(result){
			Ti.API.info('Removing old friend list');
			view.remove(friend_list);
			email_field.setValue('');
			global.api.load_friend_list(
				function(list){
					friend_list = list;
					view.add(list);
				}
			);
		});
	});
	
	
	global.outputHook(self);
	return self;
};

module.exports = FriendsWindow;