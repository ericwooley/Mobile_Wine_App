function LoginWindow() {
	var global = require('ui/common/globals');
	
	var self = global.createWindow("Login");
	self.navBarHidden = true;
	
	var Body = global.elements.SimpleView('vertical');
	
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
  		width: '55%',
  		top: 15,
  		hintText: 'Password',
  		passwordMask: true
	});

	var showPWbox = Ti.UI.createSwitch({
    	title:"Show Password",
    	left: 10,
    	value:true
	});
	
	var showPWview = Ti.UI.createView({
		width: '80%',
		height: Ti.UI.SIZE,
		layout: 'horizontal',
	});
	var pwBoxHint = Ti.UI.createLabel({
		text: 'Hide Password',
		font: {fontSize: 14},
		bottom: 1,
		color: '#777777'
	});
	
	var pwBoxView = Ti.UI.createView({
		layout: 'vertical',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		top: 15,
		left: 10
	});
	pwBoxView.add(showPWbox);
	pwBoxView.add(pwBoxHint);

	
	showPWview.add(passwordTextField);
	showPWview.add(pwBoxView);
	
	showPWbox.addEventListener('change', function(e){
		passwordTextField.blur();
		if(!e.value){
        	passwordTextField.passwordMask = false;
	    }else{
	        passwordTextField.passwordMask = true;
	    }
	});
	
	
	
	var loginButton = Ti.UI.createButton({
		title: 'Login',
		top: 5,
		width: '80%',
		enabled: false
		
	});
	
	var login_Label = Ti.UI.createLabel({
		text: "Don't have an account? Signing up is easy, just hit register instead of login.",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: 'black',
		top: 5,
		width: '80%'
	});
	
	var registerButton = Ti.UI.createButton({
		title:'Register',
		top: 10,
		width: '80%',
		enabled: false
	});
	
	loginButton.addEventListener('click',function(e)
	{
		Titanium.API.info("User Login Pressed");
		   
		var email = emailTextField.value;
		var pw = passwordTextField.value;
		if(Ti.Network.networkType == Ti.Network.NETWORK_NONE){
			var dialog = Ti.UI.createAlertDialog({
				title: "Connectivity Error",
				message: "An active internet connection is required"
			});
			dialog.show();
		}
		else
			global.api.login(email, pw, function(response){
				if(response.error)
				{
					var dialog = Ti.UI.createAlertDialog({
						title: "Login Response",
						message: response.error
					});
					dialog.show();
				}
				else
				{
					self.close();
					var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
					new ApplicationTabGroup().open();
				}
				Ti.API.info(JSON.stringify(response));
			});
		/*
		self.exitOnClose = false;
		self.close();
		var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
		new ApplicationTabGroup().open();
		*/
	});	
	
	registerButton.addEventListener('click', function(e)
	{
	   Titanium.API.info("User Register Pressed");
	   
	   var email = emailTextField.value;
	   var pw = passwordTextField.value;
	   
	   global.register(email, pw);
	   
	});	
	var fieldHints = Ti.UI.createLabel({
		text: "To continue, enter a valid E-Mail and 6 character password.",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		width: '80%',
		top: 5,
		color: global.colors.dark,
		font: {fontSize: 12}
	})
	function validateFields(e){ 
		
		// Email regex
    	var re = /\S+@\S+\.\S+/;
		if(re.test(emailTextField.value) && passwordTextField.value.length > 5)
		{
			fieldHints.hide();
			loginButton.enabled = true;
			registerButton.enabled = true;
		}
		else
		{
			fieldHints.show();
			loginButton.enabled = false;
			registerButton.enabled = false;
		}
	}
	
	emailTextField.addEventListener('change', validateFields);
	passwordTextField.addEventListener('change', validateFields);
	
	
	var loginForm = global.elements.SimpleView('vertical');
	
	loginForm.add(fieldHints);
	
	loginForm.add(emailTextField);
	loginForm.add(showPWview);
	
	loginForm.add(loginButton);
	loginForm.add(login_Label);
	loginForm.add(registerButton);
	
	Body.add(loginForm);
	self.add(Body);	
	
	Ti.addEventListener('user_login', function(e){
		
	});

	
	return self;
};

module.exports = LoginWindow;