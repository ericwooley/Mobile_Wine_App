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
	self.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black.png';
	//var text = global.elements.SimpleLabel('Home Page');
	var view = Ti.UI.createView({
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
				top: 0,
				left: 0,
				layout: 'vertical'
			});
	//view.add(text);
	var top_label = Ti.UI.createLabel({
		text: 'Recent Check-Ins',
		color: 'white',
		font:{
            fontFamily:'Helvetica Neue',
            fontSize:18,
            fontWeight:'Bold'
           },   
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	    width: Ti.UI.FILL, 
	    height: 40, 
	    backgroundColor: global.colors.dark,
	});

	
	
	view.add(top_label);
	var loading = global.loading_animation()
	var table = null;
	var load_data = function(){
		if(table != null)
			view.remove(table);
		view.add(loading);
		loading.show(); 
		self.removeEventListener('focus', load_data);
		global.api.get_home_results(function(data){
			loading.hide();
			view.remove(loading);
			table = global.api.search_results(data, function(wine){
				var wine_review = require('ui/handheld/WineReview');
				var wr = wine_review(wine);
				wr.containingTab = self.containingTab;
				self.containingTab.open(wr);
			});
			table.addEventListener('refresh_page_data', function(){
				load_data();
			});
			view.add(table);
		});
	};

	
	self.addEventListener('focus', load_data);

	
	self.add(view);

	global.outputHook(self);
	return self;
};

module.exports = HomeWindow;