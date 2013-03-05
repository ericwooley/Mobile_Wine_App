//	***********************************************
//	WINE LIFE
//	HOME WINDOW  - HomeWindow.js
//	
//	MEN+1
//	Programmer:  Aaron Cheever
//	***********************************************

function HomeWindow(title)
{
	var global = require('ui/common/globals');

	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	//var text = global.elements.SimpleLabel('Home Page');
	var view = Ti.UI.createView({
				width: Ti.UI.SIZE,
				height: Ti.UI.SIZE,
				top: 0,
				left: 0,
				layout: 'vertical'
			});
	//view.add(text);
	var top_label = Ti.UI.createLabel({
		text: 'Friends Recent Check-ins',
		color: 'black'
	});
	view.add(top_label);
	global.api.get_home_results(function(data){
		Ti.API.info(data);
		var table = global.api.search_results(data, function(wine){
			var wine_review = require('ui/handheld/WineReview');
			
			self.containingTab.open(wine_review(wine));
		});
		view.add(table);
	});
	
	self.add(view);

	global.outputHook(self);
	return self;
};

module.exports = HomeWindow;