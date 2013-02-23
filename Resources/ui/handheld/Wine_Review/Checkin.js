
var TU = require('TitanUp/TitanUp');
module.exports = function(wine, label_url){
	var global = require('ui/common/globals');
	var margin = TU.UI.Sizer.getDimension (10);
	
	
	var overview = Ti.UI.createView({
		backgroundColor: "#444444",
		//opacity: .95,
		top: 10,
		right: 10,
		left: 10,
		height: Ti.UI.SIZE,
		width: global.android? Ti.UI.FILL: '90%',
		layout: 'vertical'
	});
	
	if(global.android){
		var win = Ti.UI.createWindow({title: 'Checkin'});
	}
	else
	{
		var win = Ti.UI.createWindow({
			left: 10,
			right: 10,
			width: '100%',
			height: '100%',
			title: 'Checkin', 

		});
		var cancel = Ti.UI.createButton({
			title: 'Cancel',
			height: 25,
			top: 10,
			left: 10,
			style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
		});
		overview.add(cancel);

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
	
	/*var rating_wrapper = Ti.UI.createView({
		height: 50,
		width: Ti.UI.FILL,
		backgroundColor: 'green',
		left: 10, top: 10,
	})
	var rating = require('ui/common/elements/RatingControl');
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
		//backgroundColor: 'green',
		//color: 'white'
	});
	var rating = TU.UI.createSimplePicker ({
		left: margin,
		right: margin,
		top: margin,
		title: "Rating: ",
		values: ['1: I hated it.', '2: I disliked It.', '3: It was mediocre.', '4: I would drink it again.', '5: I LOVED it!']
	});
	overview.add(name_lbl);
	overview.add(rating);
	
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
