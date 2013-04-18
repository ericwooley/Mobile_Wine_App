// ***********************************************
// WINE LIFE
// File: edit_wine.js (gets called in the search_results.js file)
// Author: Ivan Rodriguez
// Status: UNDER DEVELOPMENT
// Comments: Wine Life icon and name on top of pages are missing. Tabs are also
//			missing. Cannot go back to app after finding 0 results. Wine name, varietal,
// 			and region are stored in array as a single element. Need to push data to 
//			server.
// ***********************************************

module.exports = function(){
	var global = require('ui/common/globals');
	var make_row = require('ui/common/elements/search_results/make_row');
	var win1 = global.createWindow('Add a Wine');
	var win2 = global.createWindow('Edit Wine');

	win1.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black.png';
	win2.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black.png';

	// Create view 1
	var view1 = Ti.UI.createView();
	// Create view 2
	var view2 = Ti.UI.createView();

	/************************* Current Page ******************************/

	var message = Ti.UI.createLabel({
		color:'black',
		text: "0 Results",
		font:{fontSize:16,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		top: 150,
		textAlign: 'center',
		touchEnabled:false
	});

	// Create button for adding a wine
	var button1 = Ti.UI.createButton({
		title: 'Add a wine',
		top: 200,
		width: 150,
		height: 35
	});

	// Add event listener to button 1
	button1.addEventListener('click', function(e){
		// If device is an iPhone, open window 2 with animation.
		if(Ti.Platform.osname == 'iphone'){
			win2.open({
				transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		}
		// If device is an android, open window 2. Animation not supported.
		else { 
			win2.open();
		};
		
		// Window 2 is now open, attach the following labels, boxes, and buttons.

		// Create label
		var edit_message = Ti.UI.createLabel({
			text: 'Enter the following information:',
			height: 40,
			width: 'auto',
			top: 105,
			color: 'black'
		});

		// Create box to enter a wine
		var wineName = Ti.UI.createTextField({
			color: '#333333',
			hintText: 'Wine name',
			height: 35,
			top: 150,
			left: 10,
			right: 10,
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		
		// Create box to enter the wine type
		var wineType = Ti.UI.createTextField({
			color: '#333333',
			hintText: 'Wine varietal',
			height: 35,
			top: 190,
			left: 10,
			right: 10,
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		
		// Create box to enter the wine region
		var wineRegion = Ti.UI.createTextField({
			color: '#333333',
			hintText: 'Wine region',
			height: 35,
			top: 230,
			left: 10,
			right: 10,
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});

		var submitButton = Ti.UI.createButton({
			title: 'Submit',
			top: 275,
			right: 10,
			width: 145,
			height: 40
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
		
		win2.add(edit_message);	
		win2.add(wineName);
		win2.add(wineType);
		win2.add(wineRegion);
		win2.add(submitButton);
	});

	//************************* Editing Page ******************************

	// Create button 2
	var button2 = Ti.UI.createButton({
		title: 'Cancel',
		top: 275,
		left: 10,
		width: 145,
		height: 40
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

	// Adds the '0 Results' label
	view1.add(message);
	// Adds 'Add a wine' button to view 1 and 'cancel' button to view 2.
	view1.add(button1);
	view2.add(button2);
	// Adds (views -> (buttons + label)) to win1. 
	win1.add(view1);
	win2.add(view2);

	win1.open();
	global.outputHook(win1);
	global.outputHook(win2);
	return win1;
};