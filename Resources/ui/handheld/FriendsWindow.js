function FriendsWindow(title) {
	var global = require('ui/common/globals');
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	var view = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		top: 15,
		left: 0,
		layout: 'vertical'
	});
	var Friend_view = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		left: 10,
		right: 10,
		layout: 'vertical'
	});
	
	var email_field = Ti.UI.createTextField({
		hintText: 'A new friends Email',
		left: 10,
		width: Ti.UI.FILL,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	Friend_view.add(email_field);
	var dropdown = require('ui/common/elements/dropdown');
	
	dropdown(Friend_view, self, "Add Friend", "Find Friend", "up", function() {
		if(email_field.getValue().length < 1){
				
			return;
		}
		global.api.befriend(email_field.value, function(result){
			
			
			Ti.API.info('Removing old friend list');
			view.remove(friend_list);
			email_field.setValue('');
			global.api.load_friend_list(
				function(list){
					friend_list = list;
					view.add(list);
				},
				function(data){
					alert(JSON.stringify(data));
				}
			);
		});

	});
	
	self.add(view);
	var friend_list;
	self.addEventListener('open', function(e){
		global.api.load_friend_list(
			function(list){
				friend_list = list;
				view.add(list);
			},
			function(data){
				alert(data);
			}
		);
	});
	
	
	global.outputHook(self);
	return self;
};

module.exports = FriendsWindow;