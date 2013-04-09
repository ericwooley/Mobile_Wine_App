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
		top:'35%',
		left:0,
		width:'100%',
		height:'70%',
		layout: 'vertical', 
	});
	
	var label_title = Ti.UI.createLabel({
		color: global.colors.dark,
		top: '5%',
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



 var allwines = ['Type', 'Albarino', 'Barbera', 'Carmenere', 'Cabernet Sauvignon', 
 'Cabernet Franc', 'Chardonnay', 'Chenin Blanc', 'Dessert Wines', 'Dolcetto', 'Gamay', 'Grenache', 'Grigio', 
 'Gris', 'Madeira', 'Merlot', 'Mourvedre', 'Muscat', 'Nebbiolo', 'Petite Sirah', 'Pinot Blanc', 'Pinot Noir', 'Port', 'Primitivo', 'Riesling',
  'Sangiovese', 'Sauvignon Blanc', 'Semillon', 'Sherry', 'Shiraz', 'Syrah', 'Tempranillo', 'Torrontes', 'Viognier', 'Zinfandel', 'Non-Vintage'];
 
 var redwines =  ['Type', 'Barbera',  'Cabernet Sauvignon', 'Cabernet Franc', 'Carmenere',
   'Dolcetto', 'Gamay', 'Grenache', 'Merlot', 'Mourvedre', 'Nebbiolo', 'Petite Sirah', 'Pinot Noir',
  'Primitivo', 'Sangiovese', 'Shiraz', 'Syrah', 'Tempranillo', 'Zinfandel'];
  
 var whitewines = ['Type','Albarino', 'Chardonnay', 'Chenin Blanc', 
  'Grigio', 'Gris', 'Muscat', 'Pinot Blanc', 'Riesling',
  'Sauvignon Blanc', 'Semillon', 'Torrontes', 'Viognier' ];

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
		hintText:' Discover a wine...',
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
	wines['Albarino'] = '136';	
    wines['Barbera'] = '172';	
	wines['Bordeaux'] = '-2147483648'; // Filter doesnt work 
	wines['Cabernet Sauvignon'] = '139';
    wines['Cabernet Franc']	= '197';
	wines['Carmenere'] = '10081';
	wines['Chenin Blanc'] = '165'; 
	wines['Chardonnay'] = '140';
	wines['Dessert Wines'] = '160';
    wines['Dolcetto'] = '183';	
	wines['Gamay'] = '150';
	wines['Grenache'] = '10080';
	wines['Grigio'] = '194';  
	wines['Gris'] = '194';  
	wines['Madeira'] = '154';
//  wines['Malbec'] = '';	
	wines['Merlot'] = '138';
	//wines['Murray'] = '162'; -bad filter
	wines['Muscat'] = '173';
    wines['Mourvedre'] = '10083';	
    wines['Nebbiolo'] = '170';
    wines['Non-Vintage'] = '182';
	wines['Petite Sirah'] = '176';
	wines['Pinot Noir'] = '143';
	wines['Pinot Blanc'] = '168';
    wines['Port'] = '155';
    wines['Primitivo'] = '10084';	
//  wines['Rhone Blends'] = '';	
	wines['Riesling'] = '153';
	wines['Rose'] = '147';
	wines['Sangiovese'] = '163';
	wines['Sauvignon Blanc'] = '151';
	wines['Semillon'] = '177';
	wines['Shiraz'] = '146';  
	wines['Sherry'] = '157';
	wines['Syrah'] = '146';  
	wines['Tempranillo'] = '169';
    wines['Torrontes'] = '209';
	wines['Viognier'] = '162';
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
		
		view.setTop('4%');
		view.setHeight('100%');
		view.remove(table);
		view.setBottom('5%');
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