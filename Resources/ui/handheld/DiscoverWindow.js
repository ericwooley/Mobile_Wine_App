// ***********************************************
// WINE LIFE
// DISCOVER WINDOW - DiscoverWindow.js
//
// MEN+1
// Programmer: Matthew Johnson
// ***********************************************

function DiscoverWindow(title) {
	
	var global = require('ui/common/globals');
	var dropdown = require('ui/common/elements/dropdown');
	var self = global.createWindow(title);
	var TU = require ('/TitanUp/TitanUp');

	// This view holds the wine list
	var view = Ti.UI.createView({
		top:'5%',
		left:0,
		width:'100%',
		height:'95%',
		layout: 'vertical'
	});
	
	
//***********************************************************************************
//  This original list in the future will display advertised wines / picks of the day
//***********************************************************************************		
	self.addEventListener('open', function(e){
		global.api.search_with_filter("sweet", '124', function(search_results){
            table = global.api.search_results(search_results, function(wine){
				wine_review = require('ui/handheld/WineReview');
				self.containingTab.open(wine_review(wine));
			}); 
           view.add(table);
      });
	});

	self.add(view);
	
// Drop down view
	var view_discover = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: 'vertical',
			left: 10,
			right: 10,
		});
	
	
	var wine_review = null; 
	var table = null;
	
	// Dropdown menu components
	var search_bar = Ti.UI.createTextField({
		top:0,
		width:'90%',
		left:'5%',
		hintText:' Discover wine...',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var picker_color = TU.UI.createSimplePicker ({
		left: '5%',
		right: '5%',
		title: "Color",
		values: ['Color','Red', 'White']
	});
	
	var picker_type = TU.UI.createSimplePicker ({
		left: '5%',
		right: '5%',
		title: "Type",
		values: ['Type','Barbera', 'Cabernet Sauvignon', 'Malbec', 'Merlot', 'Pinot Noir', 'Sangiovese', 'Syrah', 'Zinfandel']
	});
	
	// These store picker values
	var winecolor = null;
	var winetype = null;
	var wines = new Object;
	
	wines['Amarone'] = '145';
	wines['Australian'] = '145';
	wines['Barolo'] = '170';
	wines['Blanc'] = '142+123+144';
	wines['Bordeaux'] = '160+128';
	wines['Cabernet'] = '139';
	wines['Carmenere'] = '10081';
	wines['Chenin'] = '165+128';
	wines['Chile'] = '10081';
	wines['Chianti'] = '152+163';
	wines['Grand'] = '10082';
	wines['Grenache'] = '10080';
	wines['Grigio'] = '194';
	wines['Gris'] = '194';
	wines['Merlot'] = '138';
	wines['Murray'] = '162';
	wines['Muscat'] = '173';
	wines['Pinot Noir'] = '143';
	wines['Riesling'] = '153';
	wines['Rose'] = '147+123';
	wines['Sangiovese'] = '163';
	wines['Shiraz'] = '146+145';
	wines['Syrah'] = '146';
	wines['Traminer'] = '148';
	wines['Verdicchio'] = '148';
	wines['Zinfandel'] = '141';
			
 var allwines = ['Amarone', 'Australia', 'Barolo', 'Blanc', 'Bordeaux', 'Cabernet', 'Carmenere', 'Chenin',
 'Chile', 'Chianti', 'Grand', 'Grenache', 'Grigio', 'Gris', 'Merlot', 'Murray', 'Muscat', 'Pinot Noir', 'Riesling',
 'Rose', 'Sangiovese', 'Shiraz', 'Syrah', 'Traminer', 'Verdicchio', 'Zinfandel'];
 
 var redwines =  ['Amarone', 'Australia', 'Barolo', 'Cabernet', 'Carmenere',
 'Chile', 'Chianti', 'Grand', 'Grenache', 'Merlot', 'Pinot Noir',
  'Sangiovese', 'Shiraz', 'Syrah', 'Zinfandel'];
  
 var whitewines = ['Blanc','Bordeaux', 'Chenin',
  'Grigio', 'Gris', 'Murray', 'Muscat', 'Riesling',
 'Rose', 'Traminer', 'Verdicchio'];
 
	
//  winetype = wines['Cabernet'];	
	
	
	picker_color.addEventListener ('TUchange', function (e) {
		if(e.value == 'Red'){
			winecolor = '124';
		}	
		else if(e.value == "White"){
			winecolor = '125'
		}
		else{
			alert('Didnt work');
			winecolor = null;
		}
	
	});
	
	picker_type.addEventListener ('TUchange', function (e) {
//	winetype =  e.value;
// alert(winetype);
	});
	
	
	view_discover.add(search_bar);
	view_discover.add(picker_color);
	view_discover.add(picker_type);
	
	// Dropdown menu
		dropdown(view_discover, self, "Find", "Discover", "up", function(){
		view.remove(table);
		table = null;
		self.remove(view);
		global.api.search_with_filter(search_bar.value, '124', function(search_results){
         table = global.api.search_results(search_results, function(wine){
			 wine_review = require('ui/handheld/WineReview');
			self.containingTab.open(wine_review(wine));
		}); 		
        view.add(table);
        self.add(view);
      });
	});
	

/*

	var colorpicker = Ti.UI.createPicker({
   		top:'16%',
   		left:'2%',
   		width:'47%',
   		height:'8%'
  
	});

	var typepicker = Ti.UI.createPicker({
   		top:'16%',
   		right:'2%',
   		width:'47%',
   		height:'8%'
   		//color:global.colors.dark
	});

	var WineColor = [];
	WineColor[0]=Ti.UI.createPickerRow({title:'Color'});
	WineColor[1]=Ti.UI.createPickerRow({title:'Red'});
	WineColor[2]=Ti.UI.createPickerRow({title:'White'});
	// Common Whine types
	var WineType = [];
	WineType[0]=Ti.UI.createPickerRow({title:'Type'});
	WineType[1]=Ti.UI.createPickerRow({title:'Barbera'});
	WineType[2]=Ti.UI.createPickerRow({title:'Cabernet Sauvignon'});
	WineType[3]=Ti.UI.createPickerRow({title:'Malbec'});
	WineType[4]=Ti.UI.createPickerRow({title:'Merlot'});
	WineType[5]=Ti.UI.createPickerRow({title:'Pinot Noir'});
	WineType[6]=Ti.UI.createPickerRow({title:'Sangiovese'});
	WineType[7]=Ti.UI.createPickerRow({title:'Syrah'});
	WineType[8]=Ti.UI.createPickerRow({title:'Zinfadel'});


	colorpicker.add(WineColor);
	colorpicker.selectionIndicator = true;
	typepicker.add(WineType);
	typepicker.selectionIndicator = true;
*/
//	self.add(colorpicker);
//	self.add(typepicker);
//	self.add(search_bar);
//	self.add(btn_search);
	//view_discover.add(search_bar);

	
	
	
// create an array of anonymous objects
// Create an array of explicitly defined custom TableViewRows
/*
var tbl_data = [];
for (var i = 0; i < 10; i++) {
var row = Ti.UI.createTableViewRow({
hasChild:true,
height:90
});
// This image will be the image of the wine
var image = Ti.UI.createImageView({
height: 80,
width: 80,
left: 10,
top:5,
borderColor: 'black',
borderWidth: 1,
contentMode: 'aspectfill',
clipsToBounds: false,
image:'/images/logo.png',
layout:'vertical'
});
// This is the Label for the location of the wine within the row
var lbl_location = Ti.UI.createLabel({
left:'40%',
color:global.colors.dark,
bottom:10,
text: "Wine Location",
font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
touchEnabled:false
});
// This is the label of the type of wine within the row
var lbl_type = Ti.UI.createLabel({
left:'40%',
color:global.colors.dark,
text: 'Wine Type',
bottom:lbl_location.top,
font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
touchEnabled:false
});

// This is the Label for the location of the date within the row
var lbl_date = Ti.UI.createLabel({
right:5,
top:5,
color:global.colors.dark,
text: "Date",
font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
touchEnabled:false
});


row.add(image);
row.add(lbl_location);
row.add(lbl_type);
row.add(lbl_date);
row.addEventListener('click', function() {
var win_review = require('ui/handheld/WineReview');
self.containingTab.open(win_review());
});
tbl_data.push(row);
}
// This is the tableview
var table = Titanium.UI.createTableView({
backgroundColor:'transparent',
top:0,
width:'100%',
height:'73%',
data:tbl_data
});
self.add(table);
*/	
// This is the browse by color button
/* var btn_bbc = Ti.UI.createButton({
height:'20%',
width:'42%',
left:20,
color: global.colors.dark,
bottom:10,
borderColor: global.colors.dark,
borderRadius: 5,
borderWidth: 1,
backgroundColor: global.colors.lightest,
backgroundImage: 'none'
});
// This label is the text for the browse by color button
var lbl_bbc = Titanium.UI.createLabel({
color:'black',
font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
highlightedColor:global.colors.dark,
text:'Browse by Color',
textAlign:'center',
touchEnabled:false,
bottom:10,
left:btn_bbc.left,
height:btn_bbc.height,
width:btn_bbc.width
});
self.add(btn_bbc);
self.add(lbl_bbc);
// This is the browse by style button
var btn_bbs = Ti.UI.createButton({
height:'20%',
width:'42%',
right:20,
textAlign:'center',
color: global.colors.dark,
bottom:10,
borderColor: global.colors.dark,
borderRadius: 5,
borderWidth: 1,
backgroundColor: global.colors.lightest,
backgroundImage: 'none'
});
// This label is the text for the browse by style button
var lbl_bbs = Titanium.UI.createLabel({
color:'black',
font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
highlightedColor:global.colors.dark,
text:'Browse by Style',
textAlign:'center',
touchEnabled:false,
bottom:10,
right:btn_bbs.right,
height:btn_bbs.height,
width:btn_bbs.width
});
self.add(btn_bbs);
self.add(lbl_bbs);
// Listener for Browse by Color
btn_bbc.addEventListener('click', function() {
var win_bbc = require('ui/handheld/BrowseByColor');
self.containingTab.open(win_bbc());
});
// Listener for Browse by style
btn_bbs.addEventListener('click', function() {
var win_bbs = require('ui/handheld/BrowseByStyle');
self.containingTab.open(win_bbs());
});
*/
global.outputHook(self);
return self;
};

module.exports = DiscoverWindow;