/************************************************
 * WINE LIFE
 * Android WINDOW - app.js
 * 
 * MEN+1
 * Programmer:  Ivan Rodriguez
 * UNDER CONSTRUCTION
 *************************************************/

(function() {

	// load the Scandit SDK module
	var scanditsdk = require("com.mirasense.scanditsdk");

	// disable the status bar for the camera view on the iphone and ipad
	if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
        Titanium.UI.iPhone.statusBarHidden = true;
    }
	
	// instantiate the Scandit SDK Barcode Picker view
	var picker = scanditsdk.createView({
    "width":Ti.Platform.displayCaps.platformWidth,
    "height":Ti.Platform.displayCaps.platformHeight
	});

	// Initialize the barcode picker. Ivan's key "RHAt6oVvEeKMJTSpdzXv4MRLAXBd2XHZQVIWK+HdL8I"
	picker.init("RHAt6oVvEeKMJTSpdzXv4MRLAXBd2XHZQVIWK+HdL8I", 0);

	// Set callback functions for when scanning succeedes and for when the 
	// scanning is canceled.
	picker.setSuccessCallback(function(e) {
    alert("success (" + e.symbology + "): " + e.barcode);
	});
	picker.setCancelCallback(function(e) {
    alert("canceled");
	});
	
	// add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
	picker.showToolBar(true);
	
	// Start the scanning process.
	picker.startScanning();
	
	picker.setQrEnabled(true);

	// Create a window to add the picker to and display it. 
	var window = Titanium.UI.createWindow({  
    title:'Scandit SDK',
    backgroundColor:'#fff',
	});
	window.add(picker);
	window.open();

})();