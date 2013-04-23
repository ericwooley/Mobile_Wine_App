// ***********************************************
// WINE LIFE
// File: edit_wine.js
// Author: Ivan Rodriguez
// Status: UNDER DEVELOPMENT
// Comments: Wine name, varietal, and region are stored in array as a 
// 			single element. Need to push data to server.
// ***********************************************

module.exports = function(){
	var global = require('ui/common/globals');
	var make_row = require('ui/common/elements/search_results/make_row');
	var win2 = global.createWindow('Edit Wine');

	if(!global.android)
		win2.barImage = 'images/iPhone_Nav_Bar_Bkgrd_With_Black.png';
	win2.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black.png';

	// Create view 2
	var view2 = Ti.UI.createView();

	// Window 2 is now open, attach the following labels, boxes, and buttons.
	
	// Label for wine name text box
	var name_label = Ti.UI.createLabel({
		text: 'Wine name:',
		height: 35,
		width: 'auto',
		left: 10,
		top: 40,
		color: 'black'
	});

	// Create box to enter a wine
	var wineName = Ti.UI.createTextField({
		color: '#333333',
		hintText: 'e.g., Kendall Jackson',
		height: 35,
		top: 70,
		left: 10,
		right: 10,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
		
	// Label for wine varietal text box
	var varietal_label = Ti.UI.createLabel({
		text: 'Wine varietal:',
		height: 35,
		width: 'auto',
		left: 10,
		top: 105,
		color: 'black'
	});
		
	// Create box to enter the wine type
	var wineType = Ti.UI.createTextField({
		color: '#333333',
		hintText: 'e.g., Pinot Noir 2007',
		height: 35,
		top: 135,
		left: 10,
		right: 10,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
		
	// Label for wine varietal text box
	var location_label = Ti.UI.createLabel({
		text: 'Wine region:',
		height: 35,
		width: 'auto',
		left: 10,
		top: 170,
		color: 'black'
	});
		
	// Create box to enter the wine region
	var wineRegion = Ti.UI.createTextField({
		color: '#333333',
		hintText: 'e.g., Sonoma County, CA',
		height: 35,
		top: 200,
		left: 10,
		right: 10,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	var submitButton = Ti.UI.createButton({
		title: 'Submit',
		top: 245,
		right: 10,
		width: 145,
		height: 35
		//color: '#3c0017',
	});
	
	var wine_list = [];
	submitButton.addEventListener('click', function(e){
		wine_list.push({ val1: wineName.getValue(), 
						 val2: wineType.getValue(), 
						 val3: wineRegion.getValue() });
		alert('Wine: ' + wineName.getValue() + 
			  '\nWine Type: ' + wineType.getValue() + 
			  '\nWine Region: ' + wineRegion.getValue() + 
			  '\nArray size: ' + wine_list.length);
					  
			  //var server = global.api.httpInterface;
			  //server.onload = function(){
			  //	var json = JSON.parse(this.responseText);
			  //};
			  //server.open();
			  //server.send({});
	});
		
	//for( var i = 0; i < wine_list.length; ++i )
	//	wine_list.push(make_row(wine_list[i]));

	//************************* Editing Page ******************************

	// Create button 2
	var button2 = Ti.UI.createButton({
		title: 'Cancel',
		top: 245,
		left: 10,
		width: 145,
		height: 35
		//color: '#3c0017',
	});

	// Add event listener to button 2
	button2.addEventListener('click', function(e){
		// If device is an iPhone, close window 2 with animation.
		if(Ti.Platform.osname == 'iphone'){
			win2.close({
				transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		}
		// If device is an android, close window 2. Animation not supported.
		else { 
			win2.close();
		};
	});

	//*********************************************************************

	view2.add(button2);
	view2.add(name_label);
	view2.add(wineName);
	view2.add(varietal_label);
	view2.add(wineType);
	view2.add(location_label);
	view2.add(wineRegion);
	view2.add(submitButton);

	win2.add(view2);

	global.outputHook(win2);
	return win2;
};