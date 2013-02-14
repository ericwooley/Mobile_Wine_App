module.exports = function(w){
	
	var firstname = Ti.UI.createTextField({
		hintText: "First Name",
		backgroundColor: 'white',
		top: 10,
		left: 10,
		width: 100,
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	var lastname = Ti.UI.createTextField({
		hintText: "lastName",
		backgroundColor: 'white',
		top: 10,
		left: 10,
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	var bio = Ti.UI.createTextField({
		hintText: "bio",
		backgroundColor: 'white',
		top: 10,
		left: 10,
		width: 100,
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	 });
	 var edit = Ti.UI.createButton({
		title: 'Edit',
		top: 10,
		width: 100,
		height: 50
	 });
	 var overview = Ti.UI.createWindow({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		top: 10,
		left: 10,
		width: "100%",
		height: Ti.UI.SIZE,
		layout: 'vertical'
	});
	var pi = global.api.profileInformation(function(pi){
		firstname.value = pi.fname;
		lastname.value = pi.lname;
		bio.value = pi.bio;
		overview.add(firstname);
		overview.add(lastname);
		overview.add(bio);
		overview.add(edit);
		w.add(overview);
		edit.addEventListener('click', function(){
			global.api.editProfile(firstname.value, lastname.value, bio.value, function(result){
				alert(result);
			});
		});
	});
}




/* No longer using this, this page is now the testing ground for edit profile.
// For now this is a demo on how to use the search api.

module.exports = function(w)
{
	var global = require('ui/common/globals');
	
	// Do whatever you want to get the search query
	// I added a textfield
	var tmp = Ti.UI.createTextField({
		hintText: "Enter something here",
		backgroundColor: 'white',
		value:'merlot',
		top: 10,
		left: 10,
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	
	// This is where I am going put the with all the results.
	var overview = Ti.UI.createWindow({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		top: 10,
		left: 10,
		width: "100%",
		height: Ti.UI.SIZE,
		layout: 'vertical'
	});
	
	// add my search field to my 
	overview.add(tmp);
	
	// This is the function that fires when someone hides the keyboard.
	// Maybe a button event or whatever you want.
	tmp.addEventListener('blur', function(){
		// This is the search api.
		// The firsty value should be the query followed by an anonymous function
		// that will be called once the data has been retrieved. This won't be called
		// if there is a failure. 
		global.api.search(tmp.value, function(result){
			// get a view with the results.
			var view = global.api.search_results(result);
			// Add this view to the view in the whole page.
			overview.add(view);
		});
	});
	// add overview to the window.
	w.add(overview);
}

*/