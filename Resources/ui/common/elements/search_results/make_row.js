/**
 * @author Eric Wooley
 */

function make_row(wine){
	
	name = wine.Name;
	try{
		winetype = wine.Varietal.WineType.Name;
	}
	catch(err){
		winetype = "Unknown";
	}
	if(wine.friend){
		location = wine.friend.fname + ' ' + wine.friend.lname + ' checked in';
		imageurl = wine.friend.picture_url;
		img_width = '39%';
		txt_width = '60%';
	}
	else{
		location = wine.Appellation.Name + " - " +wine.Appellation.Region.Name;
		imageurl = wine.Labels[wine.Labels.length-1].Url;
		img_width = '20%';
		txt_width = '80%';
	}
	var row = Ti.UI.createTableViewRow
	({
		hasChild:false,
		height:Ti.UI.SIZE,
		className: 'WineRow',

	});
	
	row.wine = {
		id: wine.Id,
		name: name,
		winetype: winetype,
		location: location,
		all_information: wine
	};
	var rc = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: 10,
		left: 10,
		right: 10,
		borderRadius: 5,
		//backgroundColor: '#F2F2F2',

		backgroundColor: '#fbf2df',
		layout: 'horizontal'

	});
	// This image will be the image of the wine
	var l_image = Ti.UI.createImageView({ 		
		height: Ti.UI.SIZE,
  		width: Ti.UI.SIZE,
  		borderColor:'black',
		//borderRadius: 10,
		bottom: 0,
		right: 0,
		image: imageurl,
	});
	
	var image = Ti.UI.createView({
		height: Ti.UI.SIZE,
		//width: Ti.UI.SIZE,
		width: img_width,
		//left: '1%',
		//borderRadius: 10,
		bottom: global.android? 0 : 10,
		top: global.android? 0 : 10,
		backgroundColor: "#3C0017"
	});

	
	if(wine.friend){
		
		lbl = Ti.UI.createImageView({ 		
			//height: '40%',//Ti.UI.SIZE,
	  		//width: '80%',
			//borderWidth: 1,
			//borderRadius: 10,
	  		//clipsToBounds: true,
			image: wine.Labels[wine.Labels.length-1].Url,
			top: 0,
			left: 0
	   });
	   image.add(lbl);
	   var label_load = function(){
			
	   		lbl.removeEventListener('load', label_load);
		   	var tmp = lbl.toBlob( );
			if(tmp)
				lbl.image = tmp.imageAsThumbnail(80);
				
	   };
	   
	   //lbl.addEventListener('load', label_load);
		
	}
	image.add(l_image);
	var l_image_load = function(){
		l_image.removeEventListener('load', l_image_load);
		var tmp = l_image.toBlob( );
		 if(tmp)
			 l_image.setImage(tmp.imageAsResized(80, 80));
		//l_image.setWidth('80%');
	}

	l_image.addEventListener('load', l_image_load );

	var txt_container = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: txt_width,
		layout: 'vertical',
		
	});
	// Label for the location of the wine within the row
	var lbl_location = Ti.UI.createLabel
	({
		color:'black',
		bottom:5,
		right: 5,
		text: location,
		font: {fontSize: 12, fontStyle: 'italic'},
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		touchEnabled:false
	});
	
	// Label for the type of wine within the row
	var lbl_type = Ti.UI.createLabel
	({
		right: 5,
		color:'black',
		text: name,
		left: 10,
		bottom:lbl_location.top,
		font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	
	});	

	// Label for the date within the row
	var lbl_date = Ti.UI.createLabel
	({
		right:5,
		color:'black',
		text: winetype,
		
		font: {fontSize: 12, fontStyle: 'italic'},
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		touchEnabled:false
	});

	// Add each of these features to the row, then push the row
	rc.add(image);
	rc.add(txt_container);
	txt_container.add(lbl_date);
	txt_container.add(lbl_type);
	txt_container.add(lbl_location);
	
	row.add(rc);
	return row;
};
module.exports = make_row;