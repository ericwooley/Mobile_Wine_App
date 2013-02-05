function ProfileWindow(title) {
	var global = require('ui/common/globals');
	var self = Ti.UI.createWindow({
		title:title,
		barColor: global.colors.dark,
		backgroundColor: global.colors.lightest
	});
	
	// User Image field - upper left of view
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
	});
	self.add(image)


	// NEW TEST TEXT FIELD
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
 		height: 25,
	});
	self.add(userFullName)


	var aboutMe = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:18 },
  		//shadowColor: '#aaa',
  		//shadowOffset: {x:5, y:5},
  		text: 'About Me',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  		top: 40,
  		right: 10,
 		width: 'auto', 
 		//height: 'auto',
	});
	self.add(aboutMe)


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


	return self;
};

module.exports = ProfileWindow;