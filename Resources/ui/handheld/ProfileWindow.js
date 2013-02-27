//	***********************************************
//	WINE LIFE
//	PROFILE WINDOW  - ProfileWindow.js
//	
//	MEN+1
//	Programmer:  David Wells
//	***********************************************


function ProfileWindow(title) {
	var global = require('ui/common/globals');
	var dropdown = require('ui/common/elements/dropdown');


	
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
		
		
//	EDIT PROFILE VIEW
//	***********************************************	
	var edit_prof = Ti.UI.createView(
		{
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: 'vertical',
			left: 10,
			right: 10
		}
	);
//	***********************************************	





//	PROFILE INFO VIEWS & SUBVIEWS
//	***********************************************	
	var profile_info = Ti.UI.createView({
		layout: 'vertical',
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		top: 35,
		//backgroundColor: 'red'
	});
	
	
	var header = Ti.UI.createView({
		layout: 'horizontal',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		left: 10,
		right: 10
		
	});
	profile_info.add(header);
//	***********************************************	




	//  USER IMAGE - upper left of view
	//	***********************************************	
	var user_image = Ti.UI.createImageView({
  		
  		height: 100,
  		width: 100,
		top: 0,
  		
		borderWidth: 1,
		borderRadius: 10,
  		contentMode: 'aspectfill',
  		clipsToBounds: false,
  		image:'images/user_david.jpg',
  		
	});
	header.add(user_image);





	
	var content = Ti.UI.createView({
		layout: 'vertical',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE
	});
	header.add(content);
	
	
	
	
	
	
//***********************************************************
//EDIT PROFILE POP-DOWN
//***********************************************************

	//  ADD FIRST NAME - FIELD
	var fname = Ti.UI.createTextField({
		hintText: 'First Name',
		width: Ti.UI.FILL,
		height: 50,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	edit_prof.add(fname);
	
	//  ADD LAST NAME - FIELD
	var lname = Ti.UI.createTextField({
		hintText: 'Last Name',
		width: Ti.UI.FILL,
		height: 50,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	edit_prof.add(lname);
	
	//  ADD BIO/ ABOUT ME INFO - FIELD
	var about_me = Ti.UI.createTextArea({
		value: 'About me text',
		width: Ti.UI.FILL,
		top: 2,
		font: {fontSize: 18},
		height: 100,
		color: '#AAA',
		borderRadius: 10
	});
	Ti.API.info("got to here");
	about_me._hintText = about_me.value;
	about_me.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	        e.source.color = 'black';
	    }
	});
	about_me.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	        e.source.color = '#AAA';
	    }
	});
	edit_prof.add(about_me);
	
	
	
	
	
	global.api.editProfile = function(fname, lname, bio, callback){
	getResponse('http://winelife.ericwooley.com/user/update_profile/',{
		fname: fname,
		lname: lname,
		bio: bio
	}, callback);
};

	
	
	
	
	dropdown(edit_prof, self, "Save Changes", "Edit Profile", "up", function(){
		alert('Profile Updated!');
	});
	
	
//***********************************************************
// END EDIT PROFILE POP-DOWN
//***********************************************************

	

	


	//  USER NAME TEXT FIELD
	var userName = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:24 },
  		text: 'Loading',
  		top: 0,
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	content.add(userName);
	

	
	//  CHECK-INS FIELD
	var check_ins = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize: 12 },
  		text: 'Total Check-ins: 10',
  		top: 0,
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	content.add(check_ins);
	
	//  FOLLOWERS TEXT FIELD
	var followers = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize: 12 },
  		text: 'Followers: 3000',
  		top: 0,
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	content.add(followers);
	
	
	//  FOLLOWING TEXT FIELD
	var following = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize: 12 },
  		text: 'Following: 4',
  		top: 0,
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	content.add(following);
	
	


	// ABOUT ME TITLE FIELD
	var aboutMe = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:18 },
  		text: 'About Me:',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		top: 10,
  		left: 10,
 		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	profile_info.add(aboutMe);




	// ABOUT ME TEXT FIELD
	var aboutMe_Text = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:14 },
  		text: 'Hi, my name is David. I love all wines!  Current favorite is Cabernet Sauvignon.  Follow me to see which wines I am drinking.',
  		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  		top: 0,
  		left: 10,
 		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	profile_info.add(aboutMe_Text);
	
	
	// RECENT CHECK-INS LABEL
	var recent_check_ins = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize:18, fontWeight: 'bold' },
  		text: 'My Cellar',
  		top: 10,
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL

	});
	profile_info.add(recent_check_ins);


	// Add User Profile Data to top row of table
	//profile_info.add(user_image);
	


	
	

	
	function load_data(){
		self.removeEventListener('focus', load_data);
		global.api.profileInformation(function(data){
			userName.text = data.fname + ' ' + data.lname;
			aboutMe_Text.text = data.bio;
 		});
		
	};
	self.addEventListener('focus', load_data);
	
	
	

	

	
	self.add(profile_info);

	
	
	//self.add(profile_info);
	

	global.outputHook(self);
	return self;
};

module.exports = ProfileWindow;