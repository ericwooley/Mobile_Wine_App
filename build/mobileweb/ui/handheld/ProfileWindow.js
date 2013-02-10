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
	
	
	// USER IMAGE - upper left of view
	// Will be populated with image data from user's account in database. 
	var image = Ti.UI.createImageView({
  		
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
	self.add(image)
	
	
	//  SCROLL VIEW
	//  Attempting to get the whole view to scroll as "Recent Check-ins" grow.
	var scroll_view = Ti.UI.createScrollView({
   		height:200,
    	width:200,
    	/* left & right work too */
    	contentHeight:'auto',
    	contentWidth:'auto',
    	scrollType: 'vertical'
	});
	self.add(scroll_view)


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
	self.add(userFullName)

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
	self.add(aboutMe)

	// ABOUT ME TEXT FIELD
	var aboutMe_Text = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:12 },
  		//shadowColor: '#aaa',
  		//shadowOffset: {x:5, y:5},
  		text: 'About me text goes here... ',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  		top: 60,
  		right: 10,
 		width: 'auto', 
 		height: 'auto',
	});
	self.add(aboutMe_Text)
	
	
	

	global.outputHook(self);
	return self;
};

module.exports = ProfileWindow;