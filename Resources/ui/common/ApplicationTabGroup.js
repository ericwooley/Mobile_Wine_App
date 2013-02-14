function ApplicationTabGroup() {
	global = require('ui/common/globals');
	
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	var win1 = require('ui/handheld/HomeWindow')('Home'),
		win2 = require('ui/handheld/DiscoverWindow')('Discover'),//new Window(L('Discover')),
		win3 = require('ui/handheld/CheckInsWindow')('Check-In'),//new Window(L('Check-Ins'))
		win4 = require('ui/handheld/FriendsWindow')('Friends'),//new Window(L('Friends'))
		win5 = require('ui/handheld/ProfileWindow')('Profile')//new Window(L('Profile'));
	
	var tab1 = Ti.UI.createTab({
		title: 'Home',
		icon: '/images/home_tab_reg.png',
		backgroundColor: global.colors.dark,
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: 'Discover',
		icon: '/images/discover_tab.png',
		backgroundColor: global.colors.dark,
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: 'Check-In',
		icon: '/images/check-in_tab.png',
		backgroundColor: global.colors.dark,
		window: win3
	});
	win3.containingTab = tab3;
	
	var tab4 = Ti.UI.createTab({
		title: 'Friends',
		icon: '/images/friends_tab.png',
		backgroundColor: global.colors.dark,
		window: win4
	});
	win4.containingTab = tab4;
	
	var tab5 = Ti.UI.createTab({
		title: 'Profile',
		icon: '/images/profile_tab.png',
		backgroundColor: global.colors.dark,
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
