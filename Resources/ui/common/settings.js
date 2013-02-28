
module.exports = function(w)
{
	var global = require('ui/common/globals');
	
	// This is where I am going put the with all the results.
	var overview = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: 'vertical',
		top: 0
	});
	
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