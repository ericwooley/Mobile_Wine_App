function HomeWindow(title) {
	var global = require('ui/common/globals');
	
	var self = Ti.UI.createWindow({
		title:title,
		barColor: global.colors.dark,
		backgroundColor: global.colors.lightest
	});
	
	var Body = global.elements.SimpleView('vertical');
	Body.add(global.elements.SimpleLabel("Login to use this page"));
	var usernameTextField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		top: 15,
  		width: '80%',
  		hintText: 'Username'
	});
	var passwordTextField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		width: '80%',
  		top: 15,
  		hintText: 'password',
  		passwordMask: true
	});
	var loginButton = Ti.UI.createButton({
		title: 'Login',
		top: 15,
		width: '80%'
		
	});
	var loginForm = global.elements.SimpleView('vertical');
	
	
	
	loginForm.add(usernameTextField);
	loginForm.add(passwordTextField);
	loginForm.add(loginButton);
	
	Body.add(loginForm);
	
	
	
	self.add(Body);	
	
	return self;
};

module.exports = HomeWindow;