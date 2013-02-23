module.exports = function(wine, label_url){
	var global = require('ui/common/globals');
	if(global.android){
		var win = Ti.UI.createWindow({title: 'Checkin'});
		var overview = Ti.UI.createView({
			backgroundColor: "#444444",
			layout: 'vertical'
		});
	}
	else
	{
		var win = Ti.UI.createWindow({
			left: 10,
			right: 10,
			width: Ti.UI.FILL,
			height: '80%',
			title: 'Checkin', 

		});
		var cancel = Ti.UI.createImageView({
		  	height: 35,
		  	width: 35,
		  	contentMode: 'aspectfill',
		  	clipsToBounds: false,
		  	top: 0,
		  	right: 00,
		  	image: 'Images/x.png', // this image is released under the GPL, so it needs to be replaced before release, or else our product is released under gpl
		});	
		var overview = Ti.UI.createView({
			backgroundColor: "#444444",
			//opacity: .95,
			top: 10,
			right: 10,
			left: 10,
			layout: 'vertical'
		});	
		win.add(cancel);
	}	
	Ti.API.info(JSON.stringify(wine));
	var name_lbl = Ti.UI.createLabel({
		text: wine.Name,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 10,
		top: 10,
		color: 'white'
	});
	
	var rating_wrapper = Ti.UI.createView({
		height: 50,
		width: Ti.UI.FILL,
		backgroundColor: 'green',
		left: 10, top: 10,
	})
	/*var rating = require('ui/common/elements/RatingControl');
	// This is the star rating
	var star_rating = new rating({left: ''});
	
	rating_wrapper.add(star_rating);*/
	
	var textArea = Ti.UI.createTextArea({
		borderRadius: 5,
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
		height: 60,
		width: Ti.UI.FILL,
		color: '#888',
		returnKeyType: Ti.UI.RETURNKEY_GO,
		textAlign: 'left',
		value: 'Leave a comment about this wine'
	});
	
	var complete_button = Ti.UI.createButton({
		title: 'finish checkin',
		height: 50,
		width: Ti.UI.FILL,
		left: 10,
		right: 10,
		bottom: 10,
		borderRadius: 10,
		backgroundColor: global.colors.dark,
		color: 'white'
	});
	
	overview.add(name_lbl);
	//overview.add(rating_wrapper);
	overview.add(textArea);
	overview.add(complete_button);
	win.add(overview);

	textArea._hintText = textArea.value;
	textArea.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	        e.source.color = 'black';
	    }
	});
	textArea.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	        e.source.color = '#888';
	    }
	});
	
	return win;
}
