//	***********************************************
//	WINE LIFE
//	CHECK-IN WINDOW  - CheckInWindow.js
//	
//	MEN+1
//	Programmer:  Ivan Rodriguez & David Wells
//	***********************************************

//red wine = category 124
//white wine = category 125

function CheckInsWindow(title) {
	var global = require('ui/common/globals');
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	// Search View
	var sv = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: 'vertical'
	});
	
	var search_bar = Ti.UI.createTextField({
		hintText: 'Search for wine...',
		width: Ti.UI.FILL,
		right: 10,
		left: 10,
		height: 40,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var camera_button = Ti.UI.createButton({
		title: 'Scan Barcode',
		left: 10,
		right: 10,
		height: 40,
		top: 10
	});
	
	sv.add(search_bar);
	sv.add(camera_button);
	var results_view;
	var dd = require('ui/common/elements/dropdown');
	dd(sv, self, 'Search', 'Search Again', 'down', function(data){
		if(search_bar.value.length < 1)
			return;
		global.api.search(search_bar.value, function(data){
			if(results_view != null)
				self.remove(results_view);
			var search_format = require('ui/common/elements/search_results');
			results_view = search_format(data);
			results_view.top = 15;
			self.add(results_view);
		});
	});
	
	camera_button.addEventListener('click', function(){
		var get_bar_code = require('ui/common/elements/barcode');
		get_bar_code();
	});
	
	
	
	global.outputHook(self);
	return self;
};
module.exports = CheckInsWindow;