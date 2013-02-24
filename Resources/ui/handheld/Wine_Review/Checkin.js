
var TU = require('TitanUp/TitanUp');
module.exports = function(wine){
	var global = require('ui/common/globals');
	var margin = TU.UI.Sizer.getDimension (10);
	
	
	var overview = Ti.UI.createView({
		top: 10,
		right: 10,
		left: 10,
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		layout: 'vertical'
	});
	
	var name_lbl = Ti.UI.createLabel({
		text: wine.Name,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 10,
		top: 10,
	});

	
	var textArea = Ti.UI.createTextArea({
		borderRadius: 5,
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
		height: 60,
		width: Ti.UI.FILL,
		color: '#888',
		textAlign: 'left',
		value: 'Leave a comment about this wine'
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
	
	return overview;
}
