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
	var overview = Ti.UI.createView({
		width: '100%',
		height: '100%',
		layout: 'vertical'
	});
	var search_view = Titanium.UI.createView({
		width: 'auto',
		height: Ti.UI.SIZE,
		left: 0,
		right: 0, 
		layout: 'vertical',
		bottom: 0,
		zIndex: 1
	});
	// "Search for wine" text field
	var search_bar = Ti.UI.createTextField({
		//backgroundColor:'#FFF',
		top:5,
		width:'80%',
		height:40,
		hintText:'  Search for a wine...',
		//backgroundColor:'transparent',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var search_bar_wrapper = Ti.UI.createView({
		width: '100%',
		height: 65,
		backgroundColor: global.colors.dark,
		top: 0,
		left: 0,
		right: 0, 
		layout: 'vertical',
		//backgroundImage: 'images/wood_texture.png'
	});
	var search_button = Titanium.UI.createButton({
		color: 'white',
		title:"Search",
		borderRadius: 15,
		borderWidth: 0,
		backgroundColor: global.colors.dark,
		backgroundImage: 'none',
		font:{fontSize:16,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		top: -15,
		width:'35%',
		height:30,
		//backgroundImage: 'images/wood_texture.png'
	});
	
	search_bar_wrapper.add(search_bar);
	// Creates "Look-Up" button
	search_view.height = search_bar_wrapper.height + search_button.height + search_button.top;
	
	search_view.add(search_bar_wrapper);
	search_view.add(search_button);
	
	overview.add(search_view);
	
	var results_table = null;
	
	var search_view_top = search_view.top;
	//Ti.API.info("Search height: " + search_view_height);
	function search(){
		if(Ti.Platform.osname != 'android')
		{
			search_button.removeEventListener('click', search);
			search_button.addEventListener('click', search_again);
					//search_view.visible = false
			search_view.animate({
				top: 0 - search_bar.height - search_bar.top - 10,
				duration: 500
			});
		}
		if(results_table)
				overview.remove(results_table);
		global.api.search(search_bar.value, function(result){
			results_table = global.api.search_results(result, function(wine){
				alert('Wine: ' + wine.id);
			});
			results_table.top = -15;
			
			if(Ti.Platform.osname == 'android'){
				alert('got this far');
				var res_win = global.createWindow("Search_results");
				alert('got to here');
				res_win.exitOnClose = false;
				
				res_win.add(results_table);
				
				self.containingTab.open(res_win);
			}
			else
				overview.add(results_table);
		});

	};
	search_button.addEventListener('click', search);
	function search_again(e){
		search_button.removeEventListener('click', search_again);
		search_button.addEventListener('click', search);
		search_view.animate({
			top: 0,
			duration: 500
		});
		search_view.bottom = 0;
		
		Ti.API.info('Setup animation');
	};
	
	self.add(overview);
	global.outputHook(self);
	return self;
};
module.exports = CheckInsWindow;