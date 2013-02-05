function SetTitleBar(Window){
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#000',
	    height:18,
	    width:210,
	    top:10,
	    text:'A Trebuchet TItle',
	    textAlign:'center',
	    font:{fontFamily:'Trebuchet MS',fontSize:10,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});

// associate label to title
	Window.setTitleControl(titleLabel);
	
	return Window;
};

module.exports = SetTitleBar;
