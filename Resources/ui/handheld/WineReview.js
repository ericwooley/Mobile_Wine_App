
// WineReview.js
// Author: Matthew Johnson

function WineReview(){
 var global = require('ui/common/globals');	
 var self = global.createWindow('Wine Review');
	
	
// This is the Label for the Wine Name / year
var lbl_WineName = Ti.UI.createLabel({
	left:'5%',
	color:global.colors.dark,
	top:'1%',
	text: "Wine Name / Year",
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	touchEnabled:false,
	height:'auto'

});
// Label for Company Name
var lbl_CompanyName = Ti.UI.createLabel({
	left:'5%',
	top: '6%',
	color:global.colors.dark,
	text: "Company Name",
	font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
	touchEnabled:false

});		
// Label for Company Location
var lbl_CompanyLocation = Ti.UI.createLabel({
	left:'5%',
	color:global.colors.dark,
	top:'11%',
	text: "Company Location",
	font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
	touchEnabled:false

});	
// Label for date of review
var lbl_date = Ti.UI.createLabel({
	right:5,
	top:5,
	color:global.colors.dark,
	text: "Date",
	font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
	touchEnabled:false
});

	// This image will be the image of the wine
var image = Ti.UI.createImageView({ 		
  	height: 120,
  	width: 100,
  	left: '5%',
  	top:'20%',
  	borderColor: global.colors.dark,
	borderWidth: 1,
  	contentMode: 'aspectfill',
  	clipsToBounds: false,
  	image:'/images/logo.png',
  	layout:'vertical'
});
// Label for Rating
var lbl_Rating = Ti.UI.createLabel({
	left: image.right,
	top:'20%',
	color:global.colors.dark,
	text: "Rating: ",
	font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	touchEnabled:false
});

// View to hold description
var view_description = Ti.UI.createView({
top:-95,
left: '40%',
width: '60%',
height: (lbl_Rating.bottom - image.bottom)		
});
// Label for Description
	var lbl_Description = Ti.UI.createLabel({
	left: image.right,
	color:global.colors.dark,
	text: "This is where the description goes. i.e. this tastes like grandma or it was like suckling off the teet of jesus.  you get the idea...",
	font:{fontSize:14,fontWeight:'normal',fontFamily:'Helvetica Neue'},
	touchEnabled:true
});

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
	backgroundImage: 'none'
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
	backgroundImage: 'none'
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
	backgroundImage: 'none'
	
	});
/* var btn_share = Ti.UI.createButton({
	top: '55%',
	right: '5%',
	width: '26%',
	height: 'auto',
	title:'Share',
	backgroundColor:'#ffdc95'
});
btn_share.setBackgroundColor('#ffdc95'); */

	view_description.add(lbl_Description);
	self.add(lbl_WineName);
	self.add(lbl_CompanyName);
	self.add(lbl_CompanyLocation);
	self.add(lbl_date);
	self.add(image);
	self.add(lbl_Rating);
	self.add(lbl_Description);
	self.add(view_description);
	self.add(btn_comment);
	self.add(btn_share);
	self.add(btn_cheers);
	return self;
};

module.exports = WineReview;