
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

var lbl_CompanyName = Ti.UI.createLabel({
	left:'5%',
	top: '6%',
	color:global.colors.dark,
	text: "Company Name",
	font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
	touchEnabled:false

});		

var lbl_CompanyLocation = Ti.UI.createLabel({
	left:'5%',
	color:global.colors.dark,
	top:'11%',
	text: "Company Location",
	font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
	touchEnabled:false

});	
	
	self.add(lbl_WineName);
	self.add(lbl_CompanyName);
	self.add(lbl_CompanyLocation);
	return self;
};

module.exports = WineReview;