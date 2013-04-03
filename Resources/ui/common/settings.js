
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
	
	// Creates back button
	var back = Ti.UI.createButton({ title: "Back" });
	
 	back.addEventListener("click", function() 
	{
 		w.close({animated:true});
	});
	w.setLeftNavButton(back);
	
	// Creates top label
	var top_label = Ti.UI.createLabel({
        
        text: 'Settings',
		color: 'white',
		font:{
            fontFamily:'Helvetica Neue',
            fontSize:18,
            fontWeight:'Bold'
           },   
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	    width: Ti.UI.FILL, 
	    height: 40, 
	    top:0,
	    backgroundColor: global.colors.dark,
	});
	
	w.add(top_label)
	
	var logout_button = Ti.UI.createButton({
	    top: 60, 
	    width: Ti.UI.FILL, 
	    height: 42, 
	    left: 10,
	    right: 10,
	    backgroundColor: global.colors.dark,
	    backgroundImage:'none',
	    borderRadius: 5,
		title: 'Logout'
	});
	overview.add(logout_button);
	
	
	logout_button.addEventListener('click', function(e){
		global.api.logout(function(data){
			Ti.App.fireEvent('user_logout', {});
		});
		alert('Logging You Out');
	});
	// add overview to the window.
	w.add(overview);
}
//*/