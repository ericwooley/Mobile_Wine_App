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
	self.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black.png';
	var TU = require ('/TitanUp/TitanUp');

	// This view holds the wine list
	var view = Ti.UI.createView({
		top:'40%',
		left:0,
		width:'100%',
		height:'60%',
		layout: 'vertical'
	});
	
	var label_title = Ti.UI.createLabel({
		color: global.colors.dark,
		top: 5,
		text:"Today's Featured Wines",
		font:{
            fontFamily:'Helvetica Neue',
            fontSize:18,
            fontWeight:'Bold'
           }
	});
//***********************************************************************************
//  This original list in the future will display advertised wines / picks of the day
//***********************************************************************************		
	self.addEventListener('open', function(e){
		global.api.search_with_filter("Zinfandel", '124', function(search_results){
            table = global.api.search_results(search_results, function(wine){
				wine_review = require('ui/handheld/WineReview');
				self.containingTab.open(wine_review(wine));
			});
		   view.add(label_title); 
           view.add(table);
      });
	});

	self.add(view);

//************************************************************************
// Arrays with wines for picker menu's
//************************************************************************



 var allwines = ['Type', 'Amarone', 'Barolo', 'Blanc', 'Carmenere', 'Cabernet', 'Chenin',
 'Grand', 'Grenache', 'Grigio', 'Gris', 'Merlot', 'Murray', 'Muscat', 'Pinot Noir', 'Riesling',
  'Sangiovese', 'Shiraz', 'Syrah', 'Traminer', 'Verdicchio', 'Zinfandel'];
 
 var redwines =  ['Type','Amarone', 'Barolo', 'Cabernet', 'Carmenere',
   'Grand', 'Grenache', 'Merlot', 'Pinot Noir',
  'Sangiovese', 'Shiraz', 'Syrah', 'Zinfandel'];
  
 var whitewines = ['Type','Blanc', 'Chenin',
  'Grigio', 'Gris', 'Murray', 'Muscat', 'Riesling',
  'Traminer', 'Verdicchio'];

// wines with filters not working
//  'Barolo', 'Carmenere', 'Chianti', 'Bordeaux',
	
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
		hintText:' Discover Wine...',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var picker_color = TU.UI.createSimplePicker ({
		left: '5%',
		right: '5%',
		title: "Color",
		values: ['Color','Red', 'White']
	});
	
	var picker_allwines = TU.UI.createSimplePicker ({
		left: '5%',
		right: '5%',
		title: "Type",
		values: allwines 
	});
	
	var picker_redwines = TU.UI.createSimplePicker ({
		left: '5%',
		right: '5%',
		title: "Type",
		values: redwines 
	});
	
	var picker_whitewines = TU.UI.createSimplePicker ({
		left: '5%',
		right: '5%',
		title: "Type",
		values: whitewines 
	});
	
	
	
	// These variables store picker selected values
	var winecolor = null; // this is for color id to refine search
	var wineColor = null;  // this is for actual wine color
	var winetype = null;

//*****************************************************************
//  Associative array used for server query filtering
//*****************************************************************

	var wines = new Object;
	wines['Amarone'] = '145';
	wines['Australian'] = '145';
	wines['Barolo'] = '170';
	wines['Blanc'] = '144';
	wines['Bordeaux'] = '-2147483648'; // Filter doesnt work 
	wines['Cabernet'] = '139';
	wines['Carmenere'] = '10081';
	wines['Chenin'] = '163'; // Filter DNE
	wines['Chile'] = '10081';
	wines['Chianti'] = '139';
	wines['Grand'] = '10082';
	wines['Grenache'] = '10080';
	wines['Grigio'] = '194';
	wines['Gris'] = '194';
	wines['Merlot'] = '138';
	wines['Murray'] = '162';
	wines['Muscat'] = '173';
	wines['Pinot Noir'] = '143';
	wines['Riesling'] = '153';
	wines['Rose'] = '147';
	wines['Sangiovese'] = '163';
	wines['Shiraz'] = '146';
	wines['Syrah'] = '146';
	wines['Traminer'] = '148';
	wines['Verdicchio'] = '148';
	wines['Zinfandel'] = '141';
			
//******************************************************************************
// Event listener for wine color picker.  This function adds and removes views
// based off of what is selected in the picker.
//******************************************************************************	
	picker_color.addEventListener ('TUchange', function (e) {
		if(e.value == 'Red'){
			winecolor = '124';
			wineColor = e.value;
			view_discover.remove(picker_allwines);
			view_discover.remove(picker_whitewines);
			view_discover.add(picker_redwines);
			
		picker_redwines.addEventListener ('TUchange', function (e) {
		winetype =  e.value;
		});
			
		}	
		else if(e.value == "White"){
			winecolor = '125';
			wineColor = e.value;
			view_discover.remove(picker_allwines);
			view_discover.remove(picker_redwines);
			view_discover.add(picker_whitewines);
			
			picker_whitewines.addEventListener ('TUchange', function (e) {
			winetype =  e.value;
			});
		}
		else{
			winecolor = null;
			wineColor = null;
			view_discover.remove(picker_whitewines);
			view_discover.remove(picker_redwines);
			view_discover.add(picker_allwines);
			
			picker_allwines.addEventListener ('TUchange', function (e) {
			winetype =  e.value;
			});
		}
	
	});
	
	picker_allwines.addEventListener ('TUchange', function (e) {
	winetype =  e.value;
	});
	
	
	view_discover.add(search_bar);
	view_discover.add(picker_color);
	view_discover.add(picker_allwines);
	
//***********************************************************************************
// Dropdown menu area
// This function controls the dropdown menu and the logic for the pickers and
// search bar.
//***********************************************************************************
	dropdown(view_discover, self, "Find", "Browse", "down", function(){
		
		view.setTop('10%');
		view.setHeight('90%');
		view.remove(table);
		view.remove(label_title);
		self.remove(view);
		label_title.setText("Search Results");
		view.add(label_title);
			
		if(search_bar.value != null && search_bar.value != ""){
		
		
		if(winetype == 'Type'){winetype = null;}
		
			if(winecolor != null && winetype != null)
			{
				global.api.search_with_filter(search_bar.value, winecolor + '+' + wines[winetype], function(search_results){
         		table = global.api.search_results(search_results, function(wine){
				wine_review = require('ui/handheld/WineReview');
				self.containingTab.open(wine_review(wine));
				});
				view.add(table);
			  });	 
			}
			else if(winecolor == null && winetype != null)
			{
				global.api.search_with_filter(search_bar.value, wines[winetype], function(search_results){
         		table = global.api.search_results(search_results, function(wine){
				wine_review = require('ui/handheld/WineReview');
				self.containingTab.open(wine_review(wine));
				}); 
				view.add(table);
			  });	 
			}
			else if(winecolor != null && winetype == null)
			{
				global.api.search_with_filter(search_bar.value, winecolor, function(search_results){
         		table = global.api.search_results(search_results, function(wine){
				wine_review = require('ui/handheld/WineReview');
				self.containingTab.open(wine_review(wine));
				});
				view.add(table);
			 });
			}
			else
			{
				global.api.search(search_bar.value, function(search_results){
         		table = global.api.search_results(search_results, function(wine){
				wine_review = require('ui/handheld/WineReview');
				self.containingTab.open(wine_review(wine));
				});
				view.add(table);
			 });
			}
			 		
        self.add(view);
     
     }
     else{
     //	if nothing entered in textfield do these
     	if(winetype == 'Type'){winetype = null;}
		
			if(winecolor != null && winetype != null)
			{
				global.api.search_with_filter(winetype, winecolor + '+' + wines[winetype], function(search_results){
         		table = global.api.search_results(search_results, function(wine){
				wine_review = require('ui/handheld/WineReview');
				self.containingTab.open(wine_review(wine));
				});
				view.add(table);
			  });	 
			}
			else if(winecolor == null && winetype != null)
			{
				global.api.search_with_filter(winetype, wines[winetype], function(search_results){
         		table = global.api.search_results(search_results, function(wine){
				wine_review = require('ui/handheld/WineReview');
				self.containingTab.open(wine_review(wine));
				}); 
				view.add(table);
			  });	 
			}
			else if(winecolor != null && winetype == null)
			{
				global.api.search_with_filter(wineColor, winecolor, function(search_results){
         		table = global.api.search_results(search_results, function(wine){
				wine_review = require('ui/handheld/WineReview');
				self.containingTab.open(wine_review(wine));
				});
				view.add(table);
			 });
			}
			else if(winecolor == null && winetype == null)
			{
				//alert('Please Enter a Wine or Select a Filter to Search');
			}
	
     	self.add(view);
     }
	});
	
global.outputHook(self);
return self;
};

module.exports = DiscoverWindow;