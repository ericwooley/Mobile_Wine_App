function SetTitleBar(Window, title){
	var global = require('ui/common/globals');
	if ( Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad' ){
		
		// create the label
		var titleLabel = Titanium.UI.createLabel({
		    color:'#000',
		    height:18,
		    width:210,
		    top:10,
		    text:title,
		    textAlign:'center',
		    font:{fontFamily:'Trebuchet MS',fontSize:16,fontWeight:'bold'},
		    shadowColor:'#eee',shadowOffset:{x:0,y:1}
		});
	
		// associate label to title
		Window.setTitleControl(titleLabel);
	}
		Ti.API.info(Ti.Platform.osname);
	return Window;
};

module.exports = SetTitleBar;
