

module.exports = function(in_view, win, down_button_text,  up_button_text, starting, callback){
	var start_down = starting == "down"? true: false;
	var global = require('ui/common/globals');
	in_view.bottom = 15;
	var drop_view = Titanium.UI.createView({
		width: 'auto',
		height: Ti.UI.SIZE,
		left: 0,
		right: 0, 
		top: 0,
		layout: 'vertical',
		bottom: 0,
		zIndex: 1,
		bottom: 15,
		backgroundColor: global.colors.dark
	});
	var drop_view_w = Titanium.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		left: 0,
		right: 0, 
		top: 0,
		layout: 'vertical',
		bottom: 0,
		zIndex: 2,
		
	});

	var drop_button = Titanium.UI.createButton({
		color: 'white',
		title: start_down? down_button_text: up_button_text,
		borderRadius: 15,
		borderWidth: 0,
		backgroundColor: global.colors.dark,
		backgroundImage: 'none',
		font:{fontSize:16,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		top: -30,
		width:'35%',
		height:30,
		zIndex: 1
		//backgroundImage: 'images/wood_texture.png'
	});
	
	
	drop_view.add(in_view);
	drop_view_w.add(drop_view);
	drop_view_w.add(drop_button);
	win.add(drop_view_w);
	
	
	
	function raise_call(){
		drop_button.removeEventListener('click', raise_call);
		drop_button.addEventListener('click', drop);
				//search_view.visible = false
		drop_view_w.animate({
			top: 0 - in_view.size.height - in_view.top,
			duration: 500
		},function(e){
			drop_button.title = down_button_text;
			callback();
		});
	};
	
	function drop(e){
		drop_button.removeEventListener('click', drop);
		drop_button.addEventListener('click', raise_call);
		drop_view_w.animate({
			top: 0,
			duration: 500
		}, function(){
			drop_button.title = up_button_text;
		});
	};
	
	win.addEventListener('focus', init);
	function init(e){
		// We only want this called the first time the window is focused on.
		win.removeEventListener('focus', init);
		if(start_down)
		{
			drop_button.addEventListener('click', raise_call);
		}
		else
		{
			drop_button.addEventListener('click', drop);
			drop_view_w.top = 0 - in_view.size.height - in_view.top;
		}
	}
	
	return win;
	
};
