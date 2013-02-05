function ProfileWindow(title) {
	var global = require('ui/common/globals');
	var self = Ti.UI.createWindow({
		title:title,
		barColor: global.colors.dark,
		backgroundColor: global.colors.lightest
	});
	

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
	var textArea = Ti.UI.createTextArea({
  		
		color: global.colors.dark,
		font: {fontSize:20, fontWeight:'bold'},
		keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
		returnKeyType: Ti.UI.RETURNKEY_GO,
		textAlign: 'left',
		value: 'I am a textarea',
		top: 60,
		width: 300, height : 70
});




	return self;
};

module.exports = ProfileWindow;