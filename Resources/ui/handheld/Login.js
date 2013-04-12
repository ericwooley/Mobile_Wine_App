function LoginWindow() {
	var global = require('ui/common/globals');
	var self = global.createWindow("");
	navBarHidden:false;
	
	//var Body = global.elements.SimpleView('vertical');
	var Body = Ti.UI.createView(
		{
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: 'vertical',
			//backgroundColor: 'black'
			//backgroundImage: 'images/login_bkg.png'
			backgroundGradient: {
    			type: 'radial',
   				colors: ['#3d3d3d','black'],
    			backFillStart: false
  			}
		}
	);
	
	var picture = Ti.UI.createImageView({
		top: '10%',
  		//height: 200,
  		width: Ti.UI.SIZE,
  		contentMode: 'aspectfill',
  		clipsToBounds: false,
  		image: '/images/login_logo.png',
 	});

	var emailTextField = Ti.UI.createTextField({
		//borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		font: {fontFamily: 'Myriad Pro', fontSize: 16, fontWeight: 'bold'},
  		top: 10,
  		left: 10,
  		width: '80%',
  		backgroundColor: 'transparent',
  		hintText: 'Email Address',
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE
	});
	
	var passwordTextField = Ti.UI.createTextField({
		//borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		font: {fontFamily: 'Myriad Pro', fontSize: 16, fontWeight: 'bold'},
  		width: '55%',
  		top: 0,
  		left: 10,
  		hintText: 'Password',
  		backgroundColor: 'transparent',
  		passwordMask: true
	});

	var showPWbox = Ti.UI.createSwitch({
    	title:"Show Password",
    	right: 0,
    	value:true
	});
	
	var showPWview = Ti.UI.createView({
		width: '100%',
		height: Ti.UI.SIZE,
		right: 0,
		layout: 'horizontal',
	});
	var pwBoxHint = Ti.UI.createLabel({
		text: 'Hide Password',
		font: {fontFamily: 'Myriad Pro', fontSize: 12},
		right: 0,
		bottom: 1,
		color: '#777777'
	});
	
	var pwBoxView = Ti.UI.createView({
		layout: 'vertical',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		top: 0,
		right: 0
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
		font: {fontFamily: 'Helvetica Neue', fontSize: 18, fontWeight: 'bold'},
		//top: 15,
		width: '45%',
		top: 10,
		enabled: false
		
	});
	
	var login_Label = Ti.UI.createLabel({
		text: "Don't have an account? Creating one is easy! Just hit register instead of login.",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {fontFamily: 'Helvetica Neue', fontSize: 13, fontWeight: 'bold'},
		color: global.colors.lightest,
		top: 10,
		width: '80%',
	});
	
	var registerButton = Ti.UI.createButton({
		font: {fontFamily: 'Helvetica Neue', fontSize: 18, fontWeight: 'bold'},
		title:'Register',
		top: 10,
		//left: '5%',
		width: '45%',
		left: '10%',
		enabled: false
	});
	
	
	// User is attempting to login.
	loginButton.addEventListener('click',function(e)
	{	   
		var email = emailTextField.value;
		var pw = passwordTextField.value;
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
				global.store_string('email', emailTextField.value);
				global.store_string('password', passwordTextField.value);
				var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
				new ApplicationTabGroup().open();
				self.close();
			}
		});
	});	
	
	// User is attempting to register
	registerButton.addEventListener('click', function(e)
	{
	   
	   var email = emailTextField.value;
	   var pw = passwordTextField.value;
	   
	   global.api.register(email, pw, function(response){
	   		Ti.API.info("user is attempting to register");
	   		Ti.API.info(JSON.stringify(response));
	   });
	   
	});	
	var fieldHints = Ti.UI.createLabel({
		text: "To login, please enter your email address and 6-character password.",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		width: '80%',
		bottom: 2,
		color: global.colors.lightest,
		font: {fontFamily: 'Myriad Pro', fontSize: 10, fontWeight: 'bold'}
	})
	function validateFields(e){
		//global.store_string('email', emailTextField.value);
		//Ti.API.info(global.get_string('email'));
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
	//loginForm.add(fieldHints);
	
	//loginForm.add(emailTextField);
	//loginForm.add(showPWview);
	var br = 20;
	if(Ti.Platform.osname == 'android')
		br = 40;
		
	// THE WHOLE THING minus the top text
	var fieldsView = Ti.UI.createView({
		// top
		borderRadius: br,
		layout: 'vertical',
		width: "80%",
		height: Ti.UI.SIZE,
		backgroundColor: 'white',
		borderColor: '#BBBBBB'
	});
	var locseperator=Ti.UI.createLabel({
	    height: 2,
	    width: Ti.UI.FILL,
	    top: 5,
	    bottom: 5,
	    left: 10,
	    right: 10,
	    backgroundColor:'#BBBBBB'
	});
	
	fieldsView.add(emailTextField);
	fieldsView.add(locseperator);
	fieldsView.add(showPWview);
	loginForm.add(fieldsView);
	//fieldsView.add(fieldHints)
	//loginForm.add(fieldHints);
	
	var lr_buttons = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: '80%',
		layout:'horizontal'
	});
	lr_buttons.add(loginButton);
	lr_buttons.add(registerButton);
	loginForm.add(lr_buttons);
	loginForm.add(login_Label);
	
		
	Body.add(picture);
	Body.add(loginForm);
	self.add(Body);	
	
	Ti.addEventListener('user_login', function(e){
		
	});
	return self;
};

module.exports = LoginWindow;