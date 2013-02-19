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
		left: 10,
		right: 10, 
		layout: 'vertical'
	});
	// "Search for wine" text field
	var search_bar = Titanium.UI.createTextField({
		backgroundColor:'#FFF',
		top:10,
		width:'80%',
		height:40,
		hintText:'  Search for a wine...',
		paddingLeft:8,
		paddingRight:8,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		backgroundColor:'transparent'
	});
	
	// Creates "Look-Up" button
	var search_button = Titanium.UI.createButton({
		color: 'white',
		title:"Look-Up",
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: global.colors.dark,
		backgroundImage: 'none',
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		top: 10,
		width:'80%',
		height:35,
		zIndex: 1
		
	});
	
	var show_search_button = Ti.UI.createButton(
		{
		top: 0,
		visible: false,
		title: 'search again',
		height: 20
		}
	);
	
	search_view.add(search_bar);
	search_view.add(search_button);
	self.add(show_search_button);
	overview.add(search_view);
	
	var results_table = null;
	search_button.addEventListener('click', function(){
		search_view.animate({
			opacity: 0,
			duration: 1000
			}, function(d){
			show_search_button.visible = true;
			search_view.normalheight = search_view.height;
			search_view.height = 0;
		});
		global.api.search(search_bar.value, function(result){
			if(results_table)
				overview.remove(results_table);
				
			results_table = global.api.search_results(result);
			overview.add(results_table);
		});
	});
	
	show_search_button.addEventListener('click', function(e){
		search_view.height = search_view.normalheight;
		search_view.animate({opacity: 1, duration: 1000}, function(d){
			show_search_button.visible = false;
			
		});
	});
	
	self.add(overview);
	global.outputHook(self);
	return self;
};

module.exports = CheckInsWindow;