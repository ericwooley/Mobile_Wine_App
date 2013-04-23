/************************************************
 * WINE LIFE
 * BARCODE WINDOW - barcode.js
 * 
 * MEN+1
 * Programmer:  Ivan Rodriguez
 * 
 *************************************************/

module.exports = function(/*result, callback*/){
	var global = require('ui/common/globals');
	// Instant overview of product information. Includes prices, most
	// important retailers, offers, local stores, reviews, etc.
	var win = Titanium.UI.createWindow({  
    	title:'Scandit SDK',
    	backgroundColor:'#fff',
    	navBarHidden: true,
    	exitOnClose: false
	});
	
	
	var scanditsdk = require("com.mirasense.scanditsdk");
	
	// disable the status bar for the camera view on the iphone and android
	if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad' || Ti.Platform.osname == 'android'){
		Titanium.UI.iPhone.statusBarHidden = true;
	}
	
	// instantiate the Scandit SDK Barcode Picker view
	var picker = scanditsdk.createView({
		"width":Ti.Platform.displayCaps.platformWidth,
		"height":Ti.Platform.displayCaps.platformHeight
	});
	
	// Initialize the barcode picker.
	// Parameters: App key "RHAt6oVvEeKMJTSpdzXv4MRLAXBd2XHZQVIWK+HdL8I",
	//			   The cameraFacingPreference value takes 0 for the back camera.
	picker.init("RHAt6oVvEeKMJTSpdzXv4MRLAXBd2XHZQVIWK+HdL8I", 0);

	// Set callback functions for when scanning succeedes and for when the 
	// scanning is canceled.
	picker.setSuccessCallback(function(e) {
    	//alert("success (" + e.symbology + "): " + e.barcode);
    	//alert(JSON.stringify(e));
    	//Ti.API.info(JSON.stringify(e));
    	//https://api.scandit.com/v2/products/9781401323257?key=
    	Ti.App.fireEvent('barcode_scan_start');
    	var server = global.api.httpInterface;
		server.onload = function(){
			var json = JSON.parse(this.responseText);
			Ti.App.fireEvent('barcode_scan', json);
		};
		server.open('GET', "https://api.scandit.com/v2/products/"+e.barcode+"?key=agjZIRWRpvSfzPgu3ppvPQ4I9WS-eGZ8gSIh_BU5Q64")
		server.send({});
    	//if(Ti.Platform.osname == "android")
			//picker.closeScanner();
		//else
    	win.close();
	});

	picker.setCancelCallback(function(e) {

    		win.close();
    	
	});
	
	// add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
	picker.showToolBar(true);
	
	// Starts the scanning process, and triggers the loading and initialization of the
	// recognition engine.
	picker.startScanning();
	
	// Adds a search bar to the top of the scan screen.
	picker.showSearchBar(false);
	// Sets the text that will be displayed while non-autofocusing cameras are initialized.
	// It has no effect under android.
	picker.setTextForInitializingCamera("Initializing camera...");
	// Sets the text that will be displayed above the viewfinder to tell the user to align
	// it with the barcode that should be recognized.
	picker.setTextForInitialScanScreenState("Align code with box");
	// Enables the recognition of EAN13 and UPC12/UPCA codes.
	picker.setEan13AndUpc12Enabled(true);
	// Enables the recognition of EAN8 codes.
	picker.setEan8Enabled(true);
	// Enables the recognition of UPCE codes.
	picker.setUpceEnabled(true);
	// Enables the recognition of QR codes.
	picker.setQrEnabled(true);
	// Enables the sound when a barcode is recognized.
	picker.setBeepEnabled(true);
	// Enables the vibration when a barcode is recognized.
	picker.setVibrateEnabled(true);

	// Create a window to add the picker to and display it. 
	
	
	win.add(picker);
	win.open();
	
	return win;
};
	
/*
module.exports = function(){
	// Anything you need to do to get the barcode working goes here
	alert('This function is called');	
}*/