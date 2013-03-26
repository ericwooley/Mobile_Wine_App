/************************************************
 * WINE LIFE
 * BARCODE WINDOW - barcode.js
 * 
 * MEN+1
 * Programmer:  Ivan Rodriguez
 * STILL UNDER CONSTRUCTION...
 * 
 * COMMENTS: Needs to be tested on a mobile device. Scanner seems to be
 * functional for iPhone (working to make it work for android). 
 * When the button for scanning is clicked it does switch to the camera. 
 * Working on how to switch from camera view back to the "check in" view 
 * once cancel button gets clicked.
 *************************************************/

module.exports = function(/*result, callback*/){
	// Instant overview of product information. Includes prices, most
	// important retailers, offers, local stores, reviews, etc.
	var window = Titanium.UI.createWindow({  
    	title:'Scandit SDK',
    	backgroundColor:'#fff',
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
    alert("success (" + e.symbology + "): " + e.barcode);
	});
	picker.setCancelCallback(function(e) {
    	window.close();
	});
	
	// add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
	picker.showToolBar(true);
	
	// Starts the scanning process, and triggers the loading and initialization of the
	// recognition engine.
	picker.startScanning();
	
	// Adds a search bar to the top of the scan screen.
	picker.showSearchBar(true);
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
	
	
	window.add(picker);
	window.open();
	
	return window;
};
	
/*
module.exports = function(){
	// Anything you need to do to get the barcode working goes here
	alert('This function is called');	
}*/