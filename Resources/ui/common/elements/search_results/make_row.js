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
		imageurl = wine.Labels[0].Url;
		img_width = '20%';
		txt_width = '80%';
	}
	var row = Ti.UI.createTableViewRow
	({
		hasChild:false,
		height:Ti.UI.SIZE,
		className: 'WineRow'

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
		backgroundColor: '#F2F2F2',
		layout: 'horizontal'
	});
	// This image will be the image of the wine
	var l_image = Ti.UI.createImageView({ 		
		height: Ti.UI.SIZE,
  		width: '75%',
  		//borderColor:'black',
		borderWidth: 1,
		borderRadius: 10,
		bottom: global.android? 0 : 10,
		top: global.android? 0 : 10,
  		//clipsToBounds: true,
		image: imageurl,
		//left: 10,
		//backgroundColor: 'green'
	});
	var image = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: img_width,
		//left: '1%',
		//borderRadius: 10,
		bottom: global.android? 0 : 10,
		top: global.android? 0 : 10,
		//backgroundColor: "#3C0017"
	});
	image.add(l_image);
	if(wine.friend){
		image.add(Ti.UI.createImageView({ 		
		height: '35%',//Ti.UI.SIZE,
  		width: Ti.UI.SIZE,
		borderWidth: 1,
		borderRadius: 5,
  		//clipsToBounds: true,
		image: wine.Labels[0].Url,
		bottom: 0,
		right: 0
    }));
	}
	var txt_container = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: txt_width,
		layout: 'vertical'
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