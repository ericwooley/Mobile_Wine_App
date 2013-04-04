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
	}
	else{
		location = wine.Appellation.Name + " - " +wine.Appellation.Region.Name;
		imageurl = wine.Labels[0].Url;
	}
	var row = Ti.UI.createTableViewRow
	({
		hasChild:true,
		height:Ti.UI.SIZE
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
		top: 5,

		layout: 'horizontal'
	});
	// This image will be the image of the wine
	var image = Ti.UI.createImageView({ 		
		height: Ti.UI.SIZE,
  		width: 100,
		//top: 10,
		left: 10,
		borderWidth: 1,
		borderRadius: 10,
  		clipsToBounds: true,
		image: imageurl,
	});
	var txt_container = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		top: 5,
		layout: 'vertical'
	});
	// Label for the location of the wine within the row
	var lbl_location = Ti.UI.createLabel
	({
		color:'black',
		bottom:5,
		right: 5,
		text: location,
		font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});
	
	// Label for the type of wine within the row
	var lbl_type = Ti.UI.createLabel
	({
		left:10,
		color:'black',
		text: name,
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
		font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});

	// Add each of these features to the row, then push the row
	rc.add(image);
	rc.add(txt_container);
	txt_container.add(lbl_location);
	txt_container.add(lbl_type);
	txt_container.add(lbl_date);
	row.add(rc);
	return row;
};
module.exports = make_row;