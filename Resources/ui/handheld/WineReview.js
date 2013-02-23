
// WineReview.js
// Author: Matthew Johnson  & David Wells

function WineReview(wine){
	
	var global = require('ui/common/globals');	
	var self = global.createWindow('Wine Review');
	var all = wine.all_information;

	var overview = Ti.UI.createView({
		height: '100%',
		width: '100%',
		layout: 'vertical'		
	});
	Ti.API.info(all.Labels[0].Url);
	// Add the header to the view.
	var header = require('ui/handheld/Wine_Review/img_right_text');
	overview.add(header(
			wine.name,
			all.Vineyard.Name,
			all.Appellation.Name,
			all.Appellation.Region.Name,
			all.Labels[0].Url
		)
	);
	
	
	/*
	// Label for Company Name
	var lbl_CompanyName = Ti.UI.createLabel({
		color:global.colors.dark,
		text: all.Vineyard.Name,
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});		
	
	// Label for Company Location
	var lbl_CompanyLocation = Ti.UI.createLabel({
		color:global.colors.dark,
		text: all.Appellation.Name + " - " + all.Appellation.Region.Name,
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	
	});	
	
	// Label for type of wine
	var lbl_type = Ti.UI.createLabel({
		color:global.colors.dark,
		text: all.Varietal.Name,
		font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});
	
	// This image will be the image of the wine
	var image = Ti.UI.createImageView({ 		
	  	height: 100,
	  	width: 100,
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
		left: image.width + 30,
		width: Ti.UI.SIZE - image.width - 30,
		height: image.bottom - image.top,
		layout: 'vertical'	
	});

	// Label for Price
	var lbl_Price = Ti.UI.createLabel({
		color:global.colors.dark,
		text: "$"+all.PriceMin + " - $" + all.PriceMax,
		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});
	// Add the price to the description
	view_description.add(lbl_Price);

	// Label for Description
	var lbl_Likes = Ti.UI.createLabel({
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
	var btn_checkin = Ti.UI.createButton({
		title:'Comment',
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
		title:'Share',
		color: global.colors.dark,
		borderColor: global.colors.dark,
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: global.colors.lightest,
		backgroundImage: 'none',
		font:{fontSize:14,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	
	});

	overview.add(lbl_WineName);
	overview.add(lbl_CompanyName);
	overview.add(lbl_CompanyLocation);
	overview.add(lbl_type);
	overview.add(image);
	overview.add(view_description);
	overview.add(btn_checkin);
	overview.add(btn_share);*/
	self.add(overview);
	return self;
};

module.exports = WineReview;