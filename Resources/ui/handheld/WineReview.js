
// WineReview.js
// Author: Matthew Johnson  & David Wells

function WineReview(wine){
	
	var global = require('ui/common/globals');	
	var self = global.createWindow('Wine Review');
	var all = wine.all_information;
	var rating = require('ui/common/elements/RatingControl');
	
	// This is the star rating
	var star_rating = new rating({
		left: ''
	});
	
	// This is the Label for the Wine Name / year
	var lbl_WineName = Ti.UI.createLabel({
		left:'5%',
		color:global.colors.dark,
		top:'1%',
		text: wine.name,
		font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		touchEnabled:false,
		height:'auto'
	});
	
	// Label for Company Name
	var lbl_CompanyName = Ti.UI.createLabel({
		left:'5%',
		top: '6%',
		color:global.colors.dark,
		text: all.Vineyard.Name,
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});		
	
	// Label for Company Location
	var lbl_CompanyLocation = Ti.UI.createLabel({
		left:'5%',
		color:global.colors.dark,
		top:'11%',
		text: all.Appellation.Name + " - " + all.Appellation.Region.Name,
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	
	});	
	
	// Label for type of wine
	var lbl_type = Ti.UI.createLabel({
		right:5,
		top:5,
		color:global.colors.dark,
		text: all.Varietal.Name,
		font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});
	
	// This image will be the image of the wine
	var image = Ti.UI.createImageView({ 		
	  	height: 100,
	  	width: 100,
	  	left: '5%',
	  	top:'20%',
	  	borderRadius: 15,
	  	borderColor: global.colors.dark,
		borderWidth: 1,
	  	contentMode: 'aspectfill',
	  	clipsToBounds: false,
	  	image: all.Labels[0].Url,
	  	layout:'vertical'
	});
	
	
	// View to hold description
	var view_description = Ti.UI.createView({
		top:'20%',
		left: image.width + 30,
		width: Ti.UI.SIZE - image.width - 30,
		height: image.bottom - image.top,
		layout: 'vertical'	
	});

	// Label for Price
	var lbl_Price = Ti.UI.createLabel({
		left: 0,
		color:global.colors.dark,
		text: "$"+all.PriceMin + " - $" + all.PriceMax,
		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});
	// Add the price to the description
	view_description.add(lbl_Price);

	// Label for Description
	var lbl_Likes = Ti.UI.createLabel({
		left: 0,
		color:global.colors.dark,
		text: "10 of your friends have liked this wine!",
		font:{fontSize:14,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});
	// Add the likes to the description
	view_description.add(lbl_Likes);
	
	// Create a star rating and add it to the description
	var my_rating = new rating();
	view_description.add(my_rating);
	
	// This is the comment button
	var btn_comment = Ti.UI.createButton({
		top: '55%',
		left: '5%',
		width: '26%',
		height: '10%',
		title:'Comment',
		color: global.colors.dark,
		borderColor: global.colors.dark,
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: global.colors.lightest,
		backgroundImage: 'none',
		font:{fontSize:14,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	});
	
	// This is the cheers button
	var btn_cheers = Ti.UI.createButton({
		top: '55%',
		left: '36%',
		width: '26%',
		height: '10%',
		title:'Cheers',
		color: global.colors.dark,
		borderColor: global.colors.dark,
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: global.colors.lightest,
		backgroundImage: 'none',
		font:{fontSize:14,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	});
	
	// This is the share button
	var btn_share = Ti.UI.createButton({
		top: '55%',
		right: '5%',
		width: '26%',
		height: '10%',
		title:'Share',
		color: global.colors.dark,
		borderColor: global.colors.dark,
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: global.colors.lightest,
		backgroundImage: 'none',
		font:{fontSize:14,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	
	});

	self.add(lbl_WineName);
	self.add(lbl_CompanyName);
	self.add(lbl_CompanyLocation);
	self.add(lbl_type);
	self.add(image);
	self.add(view_description);
	self.add(btn_comment);
	self.add(btn_share);
	self.add(btn_cheers);
	return self;
};

module.exports = WineReview;