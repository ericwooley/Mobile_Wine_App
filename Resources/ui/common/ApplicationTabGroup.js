function ApplicationTabGroup() {
	global = require('ui/common/globals');
	
	//create module instance
	var self = Ti.UI.createTabGroup(
		{
			exitOnClose: true
		}
	);
	
	//create app tabs
	var win1 = require('ui/handheld/HomeWindow')(' '),
		win2 = require('ui/handheld/DiscoverWindow')(' '),//new Window(L('Discover')),
		win3 = require('ui/handheld/CheckInsWindow')(' '),//new Window(L('Check-Ins'))
		win4 = require('ui/handheld/FriendsWindow')(' '),//new Window(L('Friends'))
		win5 = require('ui/handheld/ProfileWindow')(' ')//new Window(L('Profile'));
	
	var homeImage = Ti.Platform.osname == 'android' ? '/images/android_home_tab.png' : '/images/iphone_grapevine_tab.png';
	var tab1 = Ti.UI.createTab({
		title: 'Grapevine',
		icon: homeImage,
		backgroundColor: 'black',
		window: win1
	});
	win1.containingTab = tab1;
	
	var discoverImage = Ti.Platform.osname == 'android' ? '/images/android_discover_tab.png' : '/images/iphone_discover_tab.png';
	var tab2 = Ti.UI.createTab({
		title: 'Discover',
		icon: discoverImage,
		backgroundColor: 'black',
		window: win2
	});
	win2.containingTab = tab2;
	
	var checkinImage = Ti.Platform.osname == 'android' ? '/images/android_checkin_tab.png' : '/images/iphone_check-in_tab.png';
	var tab3 = Ti.UI.createTab({
		title: 'Check-In',
		icon: checkinImage,
		backgroundColor: 'black',
		window: win3
	});
	win3.containingTab = tab3;
	
	var friendsImage = Ti.Platform.osname == 'android' ? '/images/android_friends_tab.png' : '/images/iphone_friends_tab_new.png';
	var tab4 = Ti.UI.createTab({
		title: 'Friends',
		icon: friendsImage,
		backgroundColor: 'black',
		window: win4
	});
	win4.containingTab = tab4;
	
	var profileImage = Ti.Platform.osname == 'android' ? '/images/android_profile_tab.png' : '/images/iphone_profile_tab.png';
	var tab5 = Ti.UI.createTab({
		title: 'Profile',
		icon: profileImage,
		backgroundColor: 'black',
		window: win5
	});
	win5.containingTab = tab5;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	self.addTab(tab5);
	

	
	return self;
};

module.exports = ApplicationTabGroup;
