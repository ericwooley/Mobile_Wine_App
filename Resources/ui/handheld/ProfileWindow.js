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




	return self;
};

module.exports = ProfileWindow;