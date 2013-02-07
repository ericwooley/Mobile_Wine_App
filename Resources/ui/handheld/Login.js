function LoginWindow() {
	var global = require('ui/common/globals');
	
	var self = Ti.UI.createWindow({
		title:"Login to Wine Life",
		backgroundColor: global.colors.lightest,
		exitOnClose: true
	});
	
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
  		width: '65%',
  		top: 15,
  		hintText: 'Password',
  		passwordMask: true
	});

	var showPWbox = Ti.UI.createSwitch({
    	title:"Show Password",
    	value:true,
    	left: 10,
    	top: 15
	});
	
	var showPWview = Ti.UI.createView({
		width: '80%',
		height: Ti.UI.SIZE,
		layout: 'horizontal'
	});
	
	showPWview.add(passwordTextField);
	showPWview.add(showPWbox);
	
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
		top: 15,
		width: '80%',
		enabled: false
		
	});
	
	var login_Label = Ti.UI.createLabel({
		text: "Don't have an account? Signing up is easy, just hit register instead of login.",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: 10,
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
	   
	   global.login(email, pw);
	   
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
	function validateFields(e){ 
		
		// Email regex
    	var re = /\S+@\S+\.\S+/;
		if(re.test(emailTextField.value) && passwordTextField.value.length > 5)
		{
			loginButton.enabled = true;
			registerButton.enabled = true;
		}
		else
		{
			loginButton.enabled = false;
			registerButton.enabled = false;
		}
		
		
	}
	
	emailTextField.addEventListener('change', validateFields);
	passwordTextField.addEventListener('change', validateFields);
	
	
	var loginForm = global.elements.SimpleView('vertical');
	loginForm.add(emailTextField);
	loginForm.add(showPWview);
	loginForm.add(loginButton);
	loginForm.add(registerButton);
	loginForm.add(login_Label);
	Body.add(loginForm);
	self.add(Body);	
	

	
	return self;
};

module.exports = LoginWindow;