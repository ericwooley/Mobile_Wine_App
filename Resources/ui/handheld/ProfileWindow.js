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
		borderRadius: 5,
		borderWidth: 1,
  		//hires: true,
  		contentMode: 'aspectfill',
  		clipsToBounds: true,
  		image:'/images/github-logo.png',
	});
	self.add(image)



	/*
	var button = Ti.UI.createButton({
		height:44,
		width:300,
		title:'Profile Window',
		color: 'black',
		top:20,
		borderColor: 'black',
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: global.colors.lightest,
		backgroundImage: 'none'
	});
	self.add(button);
	
	
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: global.colors.light
		}));
	});
	*/
	return self;
};

module.exports = ProfileWindow;