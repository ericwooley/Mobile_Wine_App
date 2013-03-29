
module.exports = function(w)
{
	var global = require('ui/common/globals');
	w.barImage='images/iPhone_Nav_Bar_With_Bkgrd.png';
	// This is where I am going put the with all the results.
	var overview = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: 'vertical',
		top: 0
	});
	
	var top_label = Ti.UI.createLabel({
		text: 'Settings',
		top:10,
		color: 'black',
		font:{
            fontFamily:'Helvetica Neue',
            fontSize:20,
            fontWeight:'Bold'
          }
	});
	
	w.add(top_label)
	
	var logout_button = Ti.UI.createButton({
	    top: 44, 
	    width: Ti.UI.FILL, 
	    height: 42, 
	    left: 10,
	    right: 10,
	    backgroundColor: global.colors.dark,
	    backgroundImage:'none',
	    borderRadius: 5,
		title: 'logout'
	});
	overview.add(logout_button);
	
	
	logout_button.addEventListener('click', function(e){
		global.api.logout(function(data){
			Ti.App.fireEvent('user_logout', {});
		});
		alert('logging out');
	});
	// add overview to the window.
	w.add(overview);
}
//*/