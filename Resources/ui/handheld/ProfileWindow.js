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
	self.barImage='images/iPhone_Nav_Bar_With_Bkgrd.png';
	var loading = global.loading_animation();
	
	self.add(loading);
	loading.show();
	loading.top = 40;
	
//	EDIT PROFILE VIEW
//	***********************************************	
	var edit_prof = Ti.UI.createView(
		{
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: 'horizontal',
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
	header.hide();
	//	***********************************************	
	//  USER IMAGE - upper left of view
	//	***********************************************	
	var user_image = Ti.UI.createImageView({
  		
  		height: Ti.UI.SIZE,
  		width: '30%',
		top: 0,
  		
		borderWidth: 1,
		borderRadius: 10,
  		//contentMode: 'aspectfill',
  		clipsToBounds: true,
  		//image:'images/user_david.jpg',
  		
	});
	var progressbar = Ti.UI.createProgressBar({width: Ti.UI.FILL, height: 20});
	header.add(user_image);
	
	
	user_image.addEventListener('click', add_image);

	var content = Ti.UI.createView({
		layout: 'vertical',
		width: '70%',
		height: Ti.UI.SIZE
	});
	header.add(content);
	header.add(progressbar);
	//  ADD IMAGE
	//	***********************************************	
	function add_image(){
		
		//Create a dialog with options
		var dialog = Titanium.UI.createOptionDialog({
		    //title of dialog
		    title: 'Choose an image source...',
		    //options
		    options: ['Camera','Photo Gallery', 'Cancel'],
		    //index of cancel button
		    cancel:2
		});
		function upload_image(img){
			progressbar.show();
            var xhr = Titanium.Network.createHTTPClient();
            xhr.onsendstream = function(e){
			        progressbar.value = e.progress ;
			};
            xhr.onload = function(){
            	progressbar.hide();
            	            	Ti.API.info(this.responseText);

            	res = JSON.parse(this.responseText);
            	if(!res.success)
            		alert("Server Error: \""+res.error+"\" Please try again later.");
            }
			xhr.open('POST', "http://winelife.ericwooley.com/user/upload");
			//f1 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,filename);
			//iamge=f1.read(image);
			xhr.send({profile_image: img});
		}
		//add event listener
		dialog.addEventListener('click', function(e) {
			
		    //if first option was selected
		    if(e.index == 0)
		    {
		        //then we are getting image from camera
		        Titanium.Media.showCamera({
		            //we got something
		            success:function(event)
		            {
		                //getting media
		                var image = event.media; 
		                user_image.image = image;
		               	upload_image(image);
						
		                //checking if it is photo
		                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
		                {
		                    //we may create image view with contents from image variable
		                    //or simply save path to image
		                    Ti.App.Properties.setString("image", image.nativePath);
		                }
		            },
		            cancel:function()
		            {
		                //do somehting if user cancels operation
		            },
		            error:function(error)
		            {
		                //error happend, create alert
		                var a = Titanium.UI.createAlertDialog({title:'Camera'});
		                //set message
		                if (error.code == Titanium.Media.NO_CAMERA)
		                {
		                    a.setMessage('Device does not have camera');
		                }
		                else
		                {
		                    a.setMessage('Unexpected error: ' + error.code);
		                }
		 
		                // show alert
		                a.show();
		            },
		            allowImageEditing:true,
		            saveToPhotoGallery:true
		        });
		    }
		    
		    else if(e.index == 1)
		    {
		        //obtain an image from the gallery
		        Titanium.Media.openPhotoGallery({
		            success:function(event)
		            {
		                //getting media
		                var image = event.media; 
		                user_image.image = image;
		                // set image view
		                upload_image(image);
		                //checking if it is photo
		                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
		                {
		                    //we may create image view with contents from image variable
		                    //or simply save path to image
		                    Ti.App.Properties.setString("image", image.nativePath); 
		                }   
		            },
		            cancel:function()
		            {
		                //user cancelled the action fron within
		                //the photo gallery
		            }
		        });
		    }
		    else
		    {
		        //cancel was tapped
		        //user opted not to choose a photo
		    }
		});
		dialog.show();
	}
	

	
//***********************************************************
//EDIT PROFILE POP-DOWN
//***********************************************************

	//  ADD FIRST NAME - FIELD
	var fname = Ti.UI.createTextField({
		hintText: 'First Name',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	edit_prof.add(fname);
	
	//  ADD LAST NAME - FIELD
	var lname = Ti.UI.createTextField({
		hintText: 'Last Name',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	edit_prof.add(lname);

	

	


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
  		left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL
	});
	content.add(check_ins);
	
	//  FOLLOWERS TEXT FIELD
	var followers = Ti.UI.createLabel({
  		color: global.colors.dark,
  		font: { fontSize: 12 },
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

	// RECENT CHECK-INS LABEL
	var recent_check_ins = Ti.UI.createLabel({

  		color: global.colors.dark,
  		font: { fontSize:18, fontWeight: 'bold', textDecoration: 'underline'},
  		text: 'My Cellar',
  		top: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL 

	});
	
	header.add(recent_check_ins);
	var table = false;
	function load_data(){
		self.removeEventListener('focus', load_data);
		global.api.profileInformation(function(data){
			userName.text = data.fname + ' ' + data.lname;			
			fname.value = data.fname;
			lname.value = data.lname;
			check_ins.text= "Total Check-ins: " + data.chcount;
			followers.text = "Followers: "+data.follower;
			following.text = "Following: "+data.following;
			
			user_image.image = data.picture_url;
			if(table){
					profile_info.remove(table);
					
				}
			global.api.recent_checkins(function(data){
				header.show();
				self.remove(loading);
				
				table = global.api.search_results(data, function(wine){
					var wine_review = require('ui/handheld/WineReview');
					self.containingTab.open(wine_review(wine));
				});
				profile_info.add(table);
			});
 		});
		
	};
	self.addEventListener('focus', load_data);
	self.addEventListener('blur', function(){
		self.addEventListener('focus', load_data);
	});
	
	self.add(profile_info);

	dropdown(edit_prof, self, "Save Changes", "Edit Profile", "up", function(){
		if(fname.value.length < 1 || lname.value.lengh < 1 /*|| about_me.value == about_me._hintText*/){
			alert('Profile was not updated, a field was blank');
			return;
		}
		global.api.editProfile(fname.value, lname.value, ''/*about_me.value*/, function(data){
			userName.text = data.user_info.fname + ' ' + data.user_info.lname;
		});
		
	});	

	global.outputHook(self);
	return self;
};

module.exports = ProfileWindow;