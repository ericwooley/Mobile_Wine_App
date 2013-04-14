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
		text: 'Friends Recent Check-Ins',
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
		Ti.API.info("-----------------------------------------------");
		Ti.API.info("Loading data");
		Ti.API.info("-----------------------------------------------");
		self.removeEventListener('focus', load_data);
		global.api.get_home_results(function(data){
			loading.hide();
			view.remove(loading);
			//Ti.API.info(data);
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
			//alert('got to here');
		});
	};
	
	
	
	// // Refresh button
	// var refresh = Titanium.UI.createButton({
    	// systemButton : Titanium.UI.iPhone.SystemButton.REFRESH,
	// });
	// self.setLeftNavButton(refresh);
	// refresh.addEventListener('click',function(){
   	    // load_data()
	// });
	
	
	
	
	self.addEventListener('focus', load_data);
	// self.addEventListener('blur', function(){
		// Ti.API.info("-----------------------------------------------");
		// Ti.API.info("blurred");
		// Ti.API.info("-----------------------------------------------");
		// self.addEventListener('focus', load_data);
	// });
	
	self.add(view);

	global.outputHook(self);
	return self;
};

module.exports = HomeWindow;