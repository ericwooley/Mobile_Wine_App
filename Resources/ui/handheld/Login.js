function LoginWindow(title) {
	var global = require('ui/common/globals');
	
	var self = Ti.UI.createWindow({
		title:title,
		barColor: global.colors.dark,
		backgroundColor: global.colors.lightest
	});
	
	var Body = global.elements.SimpleView('vertical');
	Body.add(global.elements.SimpleLabel("Login to use this page"));
	
	var emailTextField = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		top: 15,
  		width: '80%',
  		hintText: 'E-Mail Address'
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
	loginButton.addEventListener('click',function(e)
	{
	   Titanium.API.info("User Login Pressed");
	   
	   var username = emailTextField.value;
	   var pw = passwordTextField.value;
	   
	   var dia = Ti.UI.createAlertDialog(
	   {
	   	title: 'User Login Pressed',
	   	message: 'User would now attempt to login: '+ username + ' ' + pw
	   });
	   dia.show();
	});	
	
	var loginForm = global.elements.SimpleView('vertical');
	
	
	
	loginForm.add(emailTextField);
	loginForm.add(passwordTextField);
	loginForm.add(loginButton);
	Body.add(loginForm);
	self.add(Body);	
	

	
	return self;
};

module.exports = LoginWindow;