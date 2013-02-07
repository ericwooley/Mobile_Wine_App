function LoginWindow() {
	var global = require('ui/common/globals');
	
	var self = Ti.UI.createWindow({
		title:"Login to Wine Life",
		backgroundColor: global.colors.lightest,
		exitOnClose: true
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
	
	var showPWtext = Ti.UI.createLabel({
		text: 'Show Password: ',
		width: '50%',
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
	})
	var showPWbox = Ti.UI.createSwitch({
    	title:"Show Password",
    	value:false,
    	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    	
	});
	
	var showPWview = Ti.UI.createView({
		width: '100%',
		height: Ti.UI.SIZE,
		layout: 'horizontal'
	});
	
	showPWview.add(showPWtext);
	showPWview.add(showPWbox);
	
	showPWbox.addEventListener('change', function(e){
		passwordTextField.passwordMask = !e.value;
		Ti.API.info(!e.value);
	});
	
	
	
	var loginButton = Ti.UI.createButton({
		title: 'Login',
		top: 15,
		width: '80%'
		
	});
	var orLabel = Ti.UI.createLabel({
		text: '-- or --',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: 25
	});
	var registerButton = Ti.UI.createButton({
		title:'Register',
		top: 25,
		width: '80%'
	});
	loginButton.addEventListener('click',function(e)
	{
	   Titanium.API.info("User Login Pressed");
	   
	   var username = emailTextField.value;
	   var pw = passwordTextField.value;
	   
	   self.exitOnClose = false;
	   self.close();
	   var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	   new ApplicationTabGroup().open();
	});	
	
	
	
	var loginForm = global.elements.SimpleView('vertical');
	
	
	
	loginForm.add(emailTextField);
	loginForm.add(passwordTextField);
	loginForm.add(showPWview);
	loginForm.add(loginButton);
	loginForm.add(orLabel);
	loginForm.add(registerButton);
	Body.add(loginForm);
	self.add(Body);	
	

	
	return self;
};

module.exports = LoginWindow;