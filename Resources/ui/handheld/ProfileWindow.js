//	***********************************************
//	WINE LIFE
//	PROFILE WINDOW  - ProfileWindow.js
//	
//	MEN+1
//	Programmer:  David Wells
//	***********************************************


function ProfileWindow(title) {
	var global = require('ui/common/globals');
	
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	
	
	
	//  SCROLL VIEW
	//  Table view that scrolls the entire contents of the profile page.
	var tbl_data = [];
	
	var profile_row = Ti.UI.createTableViewRow({
		hasChild:true
		
	});
	
	
	
	
	// USER IMAGE - upper left of view
	// Will be populated with image data from user's account in database. 
	var user_image = Ti.UI.createImageView({
  		
  		height: 100,
  		width: 100,
  		top: 10,
  		left: 10,
  		borderColor: 'black',
		borderWidth: 1,
  		contentMode: 'aspectfill',
  		clipsToBounds: false,
  		image:'/images/user_image.png',
  		layout:'vertical'
	});
	//self.add(image)
	
	


	// USER NAME TEXT FIELD
	var userFullName = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:28 },
  		//shadowColor: '#aaa',
  		//shadowOffset: {x:5, y:5},
  		text: 'User Name',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  		top: 10,
  		right: 10,
 		width: 'auto', 
 		//height: 25,
	});
	//self.add(userFullName)




	// ABOUT ME TITLE FIELD
	var aboutMe = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:18 },
  		//shadowColor: '#aaa',
  		//shadowOffset: {x:5, y:5},
  		text: 'About Me',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  		top: 40 + userFullName.getBottom,
  		right: 10,
 		width: 'auto', 
 		//height: 'auto',
	});
	//self.add(aboutMe)




	// ABOUT ME TEXT FIELD
	var aboutMe_Text = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:12 },
  		//shadowColor: '#aaa',
  		//shadowOffset: {x:5, y:5},
  		text: 'About me text goes here... Welcome to my profile! These are all of the wines I have tasted.',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
  		top: 60,
  		right: 10,
 		width: '55%', 
 		height: 'auto',
	});
	//self.add(aboutMe_Text)
	
	
	
	// RECENT CHECK-INS LABEL
	var recent_check_ins = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:18, fontWeight: 'bold' },
  		//shadowColor: '#aaa',
  		//shadowOffset: {x:5, y:5},
  		text: 'Recent Check-Ins',
  		//textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  		top: user_image.bottom,
  		left: 10,
 		width: 'auto', 
 		height: 'auto',
	});
	//self.add(recent_check_ins)
	
	
	
	
	// Add User Profile Data to top row of table
	profile_row.add(user_image);
	profile_row.add(userFullName);
	profile_row.add(aboutMe);
	profile_row.add(aboutMe_Text);
	profile_row.add(recent_check_ins);
	tbl_data.push(profile_row);


	
	
	
// create an array of anonymous objects
// Create an array of explicitly defined custom TableViewRows

for (var i = 0; i < 5; i++) {
	var row = Ti.UI.createTableViewRow({
		hasChild:true
		
	});
	
	
	
	// Wine Picture
	var wine_image = Ti.UI.createImageView({ 		
  		height: 80,
  		width: 80,
  		left: 10,
  		borderColor: 'black',
		borderWidth: 1,
  		contentMode: 'aspectfill',
  		clipsToBounds: false,
  		image:'/images/logo.png',
  		layout:'vertical',
  		width: 70,
  		height: 70
	});
	
	
	
	

	
	
	
	// This is the Label for the location of the wine within the row
	var wine_location = Ti.UI.createLabel({
		left:'30%',
		bottom:10,
		text: "Wine Location",
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});
	
	
	
	// This is the label of the type of wine within the row
	var wine_name = Ti.UI.createLabel({
		left:'30%',
		text: 'Wine Name and year',
		bottom:wine_location.top,
		font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	
	});



	// This is the Label for the location of the wine within the row
	var lbl_date = Ti.UI.createLabel({
		right:5,
		top:5,
		text: "Date",
		font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});



	// Add objects to each row
	row.add(wine_image);
	row.add(wine_name);
	row.add(wine_location);
	row.add(lbl_date);
	tbl_data.push(row);
}
	
	
	
	

	
	// SCROLLING TABLE VIEW FOR ENTIRE PROFILE PAGE
	var table = Titanium.UI.createTableView({
		backgroundColor:'transparent',
		top:0,
		width:'100%',
		height:'100%',
	
		data: tbl_data
		
	});
	self.add(table);
	
	
	
	

	global.outputHook(self);
	return self;
};

module.exports = ProfileWindow;