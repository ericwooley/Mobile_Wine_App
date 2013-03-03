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

//************************************************************************
// Arrays with wines for picker menu's
//************************************************************************

 var allwines = ['Type', 'Amarone', 'Australia', 'Barolo', 'Blanc', 'Bordeaux', 'Cabernet', 'Carmenere', 'Chenin',
 'Chile', 'Chianti', 'Grand', 'Grenache', 'Grigio', 'Gris', 'Merlot', 'Murray', 'Muscat', 'Pinot Noir', 'Riesling',
 'Rose', 'Sangiovese', 'Shiraz', 'Syrah', 'Traminer', 'Verdicchio', 'Zinfandel'];
 
 var redwines =  ['Type','Amarone', 'Australia', 'Barolo', 'Cabernet', 'Carmenere',
 'Chile', 'Chianti', 'Grand', 'Grenache', 'Merlot', 'Pinot Noir',
  'Sangiovese', 'Shiraz', 'Syrah', 'Zinfandel'];
  
 var whitewines = ['Type','Blanc','Bordeaux', 'Chenin',
  'Grigio', 'Gris', 'Murray', 'Muscat', 'Riesling',
 'Rose', 'Traminer', 'Verdicchio'];

	
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
	var winecolor = null;
	var winetype = null;

//*****************************************************************
//  Associative array used for server query filtering
//*****************************************************************

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
			
//******************************************************************************
// Event listener for wine color picker.  This function adds and removes views
// based off of what is selected in the picker.
//******************************************************************************	
	picker_color.addEventListener ('TUchange', function (e) {
		if(e.value == 'Red'){
			winecolor = '124';
			view_discover.remove(picker_allwines);
			view_discover.remove(picker_whitewines);
			view_discover.add(picker_redwines);
			
		picker_redwines.addEventListener ('TUchange', function (e) {
		winetype =  e.value;
		});
			
		}	
		else if(e.value == "White"){
			winecolor = '125'
			view_discover.remove(picker_allwines);
			view_discover.remove(picker_redwines);
			view_discover.add(picker_whitewines);
			
			picker_whitewines.addEventListener ('TUchange', function (e) {
			winetype =  e.value;
			});
		}
		else{
			winecolor = null;
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
	dropdown(view_discover, self, "Find", "Discover", "up", function(){
			
		if(search_bar.value != null && search_bar.value != ""){
		view.remove(table);
		self.remove(view);
		
		
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
     	alert('Please enter a wine name to search for');
     }
	});
	
global.outputHook(self);
return self;
};

module.exports = DiscoverWindow;