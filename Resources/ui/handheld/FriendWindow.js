//	***********************************************
//	WINE LIFE
//	PROFILE WINDOW  - ProfileWindow.js
//	
//	MEN+1
//	Programmer:  David Wells
//	***********************************************

function FriendWindow(friend) {
	var global = require('ui/common/globals');
	var dropdown = require('ui/common/elements/dropdown');

	Ti.API.info(JSON.stringify(friend));
	
	// Creates the default window with global color scheme
	var self = global.createWindow(' ');
	self.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black.png';
		
	// Creates back button
	var back = Ti.UI.createButton({ title: "Back" });
	
 	back.addEventListener("click", function() 
	{
 		self.close({animated:true});
	});
	self.setLeftNavButton(back);
	
	
//	***********************************************	

//	PROFILE INFO VIEWS & SUBVIEWS
//	***********************************************	
	var profile_info = Ti.UI.createView({
		layout: 'vertical',
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		top: 10,
		//backgroundColor: 'red'
	});
	
	
	var header = Ti.UI.createView({
		layout: 'horizontal',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		left: 10,
		right: 10
		
	});
	profile_info.add(header);
//	***********************************************	




	//  USER IMAGE - upper left of view
	//	***********************************************	
	var user_image = Ti.UI.createImageView({
  		//left: 10,
  		width: '30%',
		top: 10,
		borderWidth: 1,
		borderRadius: 10,
  		contentMode: 'aspectfill',
  		clipsToBounds: false,
  		image:friend.picture_url,
  		
	});
	header.add(user_image);





	
	var content = Ti.UI.createView({
		layout: 'vertical',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE
	});
	header.add(content);
	
	
	
	
	
	
//***********************************************************
//EDIT PROFILE POP-DOWN
//***********************************************************	//  USER NAME TEXT FIELD
	var userName = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:24 },
  		text: friend.fname + ' ' + friend.lname,
  		top: 0,
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	content.add(userName);
	

	
	//  CHECK-INS FIELD
	var check_ins = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize: 12 },
  		text: 'Total Check-ins: ' + friend.checkin_count,
  		top: 0,
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	content.add(check_ins);
	
	//  FOLLOWERS TEXT FIELD
	var followers = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize: 12 },
  		text: 'Followers: ' + friend.follower_count,
  		top: 0,
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	content.add(followers);
	
	
	//  FOLLOWING TEXT FIELD
	var following = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize: 12 },
  		text: 'Following: '+ friend.following_count,
  		top: 0,
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	content.add(following);
	var options = ['Following', 'Not Following'];
	var select_bar = global.TU.UI.createSelectBar ({
		left: 10,
		width: Ti.UI.FILL,
		top: 5,
		backgroundColor: global.colors.dark,
		allow_deselect: false,
		labels: options
	});
	select_bar.xsetSelectedIndex(0);
	select_bar.addEventListener ('TUchange', function (e) {
		if(e.index == 0){
			global.api.follow(friend.user_id, function(){
				alert('You are now following ' + friend.fname);
			});
		}else if(e.index = 1){
			global.api.unfollow(friend.user_id, function(){
				alert('You are no longer following ' + friend.fname);
			});
		}
	});
	content.add(select_bar);
	
	
	// RECENT CHECK-INS LABEL
	var recent_check_ins = Ti.UI.createLabel({
		
		color: global.colors.dark,
  		font: { fontSize:18, fontWeight: 'bold' },
		text: 'My Cellar',
		font:{
            fontFamily:'Helvetica Neue',
            fontSize:18,
            fontWeight:'Bold'
           },   
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    width: Ti.UI.FILL, 
	    height: Ti.UI.SIZE,
	    top: 10,
	    left: 10, 
	    right: 10,
  		
	});
	profile_info.add(recent_check_ins);
	var table = null;
	function load_data(){
		self.removeEventListener('focus', load_data);
			
			global.api.friend_recent_checkins(friend.user_id, function(data){
				if(table)
				profile_info.remove(table);
				table = global.api.search_results(data, function(wine){
					var wine_review = require('ui/handheld/WineReview');
					w = wine_review(wine, friend);
					w.containingTab = self.containingTab;
					self.containingTab.open(w);

				});
				table.addEventListener('refresh_page_data', load_data);
				profile_info.add(table);
			});
	};
	load_data();
	
	self.add(profile_info);	

	global.outputHook(self);
	return self;
};

module.exports = FriendWindow;