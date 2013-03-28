/**
 * @author Eric Wooley
 */

function make_row(wine){
	imageurl = wine.Labels[0].Url;
	name = wine.Name;
	try{
		winetype = wine.Varietal.WineType.Name;
	}
	catch(err){
		winetype = "Unknown";
	}
	location = wine.Appellation.Name + " - " +wine.Appellation.Region.Name;
	
	var row = Ti.UI.createTableViewRow
	({
		hasChild:true,
		height:100
	});
	//alert(wine.Appellation.Id);
	row.wine = {
		id: wine.Id,
		name: name,
		winetype: winetype,
		location: location,
		all_information: wine
	};
	
	
	// This image will be the image of the wine
	var image = Ti.UI.createImageView
	({ 		
		height:Ti.UI.SIZE,/// 90,
		width: 40,//Ti.UI.SIZE,
		left: 10,
		top: 5,
		bottom: 5,
		//borderRadius: 10,
		//borderColor: 'black',
		//borderWidth: 1,
		//contentMode: 'aspectfill',
		clipsToBounds: true,
		image: imageurl,
		layout:'vertical'
	});

	// Label for the location of the wine within the row
	var lbl_location = Ti.UI.createLabel
	({
		left:'40%',
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
		left:'40%',
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
		top:5,
		color:'black',
		text: winetype,
		font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});

	// Add each of these features to the row, then push the row
	row.add(image);
	row.add(lbl_location);
	row.add(lbl_type);
	row.add(lbl_date);
	return row;
};
module.exports = make_row;