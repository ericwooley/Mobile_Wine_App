
var TU = require('TitanUp/TitanUp');
module.exports = function(wine){
	var global = require('ui/common/globals');
	var margin = TU.UI.Sizer.getDimension (10);
	
	var overview = Ti.UI.createView({
		top: 10,
		right: 10,
		left: 10,
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		layout: 'vertical'
	
	});
	
	var name_lbl = Ti.UI.createLabel({
		text: wine.Name,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 10,
		top: 10,
		color: 'white'
	});
	
	var textArea = Ti.UI.createTextArea({
		borderRadius: 5,
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
		height: 60,
		width: Ti.UI.FILL,
		color: '#888',
		textAlign: 'left',
		value: 'Leave a comment about this wine...'
	});


	// Create a basic slider
	var basicSlider = Titanium.UI.createSlider({
		min:1,
		max:10,
		value:5,
		width:'60%',
		height:'auto',
		top:'auto'
		//selectedThumbImage:'/images/staron.ico',
		//highlightedThumbImage:'/images/staron.ico'
	});
	
	// Create a label for the slider
	var basicSliderLabel = Titanium.UI.createLabel({
		text:'My Rating: ' + Math.round(basicSlider.value) + ' points' ,
		color:'white',
		font:{
			fontSize:20
		},
		textAlign:'center',
		top:margin,
		width:300,
		height:'auto'
	});	
	
	//  Camera Image on check-in pull-down
	var camera = Ti.UI.createImageView({
		image: '/images/camera.png',
		//width: '25%',
		height: 50,
		left: '10%'
		
	});
	camera_button = Ti.UI.createView({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		borderRadius: 10,
		layout: 'horizontal'
	});
	

	
	var user_image = Ti.UI.createImageView({
		//width: '30%',
		//image:'/images/android_checkin_tab.png',
		height: 50,
		visible: false
	});
	var ccw = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		image:'/images/rotate_ccw.png',
		visible: false,
		top: 0,
		left: 0
	});
	var cw = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		image:'/images/rotate_cw.png',
		visible: false,
		left: 10
	});
	rotate_container = Ti.UI.createView({
		width: '25%',
		height: 50
		//layout: 'vertical'
	});
	
	camera_button.add(camera);
	camera_button.add(user_image);
	//rotate_container.add(ccw);
	rotate_container.add(cw);
	camera_button.add(rotate_container);
	
	var image;
	var full_image = Ti.UI.createImageView({width: Ti.UI.SIZE, height: Ti.UI.SIZE});
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
		                image = event.media; 
		                user_image.image = image.imageAsThumbnail(50);
		                user_image.visible = true;
		                cw.visible = true;
		                full_image.image = image;
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
		                image = event.media; 
		                user_image.image = image.imageAsThumbnail(50);
		                user_image.visible = true;
		                cw.visible = true;
		                ccw.visible = true;
		                full_image.image = image;
		            },
		            allowImageEditing:true,
		             
		        });
		    }
		});
		dialog.show();
	};
	camera.addEventListener('click', add_image);
	var total_rotation = 0;
	function rotate_right(){
		var t = Ti.UI.create2DMatrix(); 
		total_rotation += 90;
  		t = t.rotate(total_rotation);
  		var anim = Ti.UI.createAnimation();
  		anim.transform = t;
  		user_image.animate(anim);
  		Ti.App.fireEvent('rotate', {r: total_rotation});
	};
	cw.addEventListener('click', rotate_right);
		function rotate_left(){
		var t = Ti.UI.create2DMatrix(); 
  		total_rotation -= 90;
  		t = t.rotate(total_rotation);
  		var anim = Ti.UI.createAnimation();
  		anim.transform = t;
  		user_image.animate(anim);
  		Ti.App.fireEvent('rotate', {r: total_rotation});
	};
	ccw.addEventListener('click', rotate_left);
	
	// Record the values as they are changing
	basicSlider.addEventListener('change',function(e)
	{
		basicSliderLabel.text = 'My rating: ' + Math.round(basicSlider.value) + ' points';
	});

	// Record where the drag started
	basicSlider.addEventListener('touchstart', function(e)
	{
		Ti.API.info('Touch started: '+e.value);
	});
	// Record where the drag ended
	basicSlider.addEventListener('touchend', function(e)
	{
		Ti.API.info('Touch ended: '+e.value);
		
	});


	overview.add(basicSliderLabel);
	overview.add(basicSlider);
	//overview.add(name_lbl);
	overview.add(textArea);
	overview.add(camera_button);

	textArea._hintText = textArea.value;
	textArea.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	        e.source.color = 'black';
	    }
	});
	textArea.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	        e.source.color = '#888';
	    }
	});
		
	
	var ret = {
		ta: textArea,
		view: overview,
		rating: basicSlider,
		ui: full_image
		
	};
	return ret;
}
