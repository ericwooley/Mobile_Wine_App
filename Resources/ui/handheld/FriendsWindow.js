function FriendsWindow(title) {
	var global = require('ui/common/globals');
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	self.barImage='images/iPhone_Nav_Bar_With_Bkgrd.png';
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
	var fb_integrate = Ti.UI.createButton({
		title: 'Integrate With Facebook',
		width: Ti.UI.Fill,
		height: 50
	});
	
	 var or_text = Ti.UI.createLabel({
	 	text: '-- or -- ',
	 	width: Ti.UI.SIZE,
	 	height: Ti.UI.SIZE,
	 	color: 'white'
	 });
	//if(!Ti.App.Properties.getBool('facebook')){
		Friend_view.add(fb_integrate);
		Friend_view.add(or_text);
	//}
	//else
	//	Ti.Facebook.authorize();
		
		
	var email_field = Ti.UI.createTextField({
		hintText: 'Search Friend By Email',
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
	function find_fb_friends(e){
		Ti.API.info('Facebook successfully logged into');
		Ti.App.fireEvent('raise_shade', {});
		Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e){
			if(e.success){
				var response = JSON.parse(e.result);
				Ti.API.info('Got user fb_id: '+ response.id);
				global.api.fb_integrate(response.id, function(data){
					Ti.API.info('Facebook integrated');
					Ti.App.Properties.setBool('facebook', true);
					Ti.Facebook.requestWithGraphPath('me/friends', {}, 'GET', function(e){
						var res = JSON.parse(e.result);
						global.api.find_fb_friends(res.data, function(data){
							view.remove(friend_list);
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
					
				});
			}
		});
	};
	
	fb_integrate.addEventListener('click', function(e){
		Ti.API.info('attempting facebook integration');
		if(Ti.Facebook.loggedIn)
		{
			find_fb_friends();
		}
		else
		{	
			Ti.Facebook.addEventListener('login', find_fb_friends);
			Ti.Facebook.authorize();	
		}
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
				var fw = require('ui/handheld/FriendWindow');
				w = fw(data);
				w.containingTab = self.containingTab;
				self.containingTab.open(w);
			}
		);
	});
	
	
	global.outputHook(self);
	return self;
};

module.exports = FriendsWindow;