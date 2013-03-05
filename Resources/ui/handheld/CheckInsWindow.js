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
		height: Ti.UI.SIZE
	});
	
	var search_bar = Ti.UI.createTextField({
		hintText: 'Search for wine...',
		width: Ti.UI.FILL,
		right: 10,
		left: 10,
		height: 40,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	sv.add(search_bar);
	var results_view;
	var dd = require('ui/common/elements/dropdown');
	dd(sv, self, 'Finish Search', 'Search', 'down', function(data){
		global.api.search(search_bar.value, function(data){
			if(results_view != null)
				self.remove(results_view);
			var search_format = require('ui/common/elements/search_results');
			results_view = search_format(data);
			results_view.top = 15;
			self.add(results_view);
		});
	});
	
	
	
	
	global.outputHook(self);
	return self;
};
module.exports = CheckInsWindow;