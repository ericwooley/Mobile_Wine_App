function FriendsWindow(title) {
	var global = require('ui/common/globals');
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	self.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black.png';
	var view = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		top: 15,
		left: 10,
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
		title: 'Check for Facebook friends',
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
		hintText: 'Search for a friend by name or email',
		width: Ti.UI.FILL,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	Friend_view.add(email_field);
	var dropdown = require('ui/common/elements/dropdown');
	var search_results = null;
	var friend_list_selected = true;
	var search = function() {
		if(email_field.getValue().length < 1){
				
			return;
		}
		global.api.load_user_search_results(
			email_field.value,
			function(list){
				//search_results = list;
				if(friend_list_selected){
					view.remove(friend_list);
				}	
				else{
					view.remove(search_results);
				}
				friend_list_selected = false;
				search_results = list;
				view.add(search_results);
				var options = ['Friend List', 'Search For Friends'];
				var select_bar = global.TU.UI.createSelectBar ({
					width: Ti.UI.FILL,
					bottom: 0,
					backgroundColor: global.colors.dark,
					allow_deselect: false,
					borderRadius: 0,
					labels: options
				});
				select_bar.xsetSelectedIndex(1);
				select_bar.addEventListener ('TUchange', function (e) {
					//select_bar.visible = false;
					if(e.index == 0){
						friend_list_selected = true;
						view.remove(search_results);
						view.add(friend_list);
						
					}else if(e.index = 1){
						friend_list_selected = false;
						view.remove(friend_list);
						view.add(search_results);
					}
				});
				self.add(select_bar);
			},
			function(data){
				var fw = require('ui/handheld/FriendWindow');
				w = fw(data);
				w.containingTab = self.containingTab;
				self.containingTab.open(w);
			}
		);

	};
	dropdown(Friend_view, self, "Complete Search", "Search for Friends", "up", search);
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
							//view.remove(friend_list);
							/*global.api.load_friend_list(
								function(list){
									//friend_list = list;
									//view.add(list);
								},
								function(data){
									
									alert(JSON.stringify(data));
								}
							);*/
							load_fl();
						});
						//load_fl();
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
	function load_fl(){
		self.removeEventListener('focus', load_fl);
		if(friend_list)
			view.remove(friend_list);
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
	};
	 self.addEventListener('focus', load_fl);
	 

	// self.addEventListener('blur', function(){
		// self.addEventListener('focus', load_fl);
	// });
	
	global.outputHook(self);
	return self;
};

module.exports = FriendsWindow;