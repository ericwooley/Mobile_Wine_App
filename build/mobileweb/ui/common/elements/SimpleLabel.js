function SimpleLabel(text){
	var self = Ti.UI.createLabel({
		text: text,
		left: 5,
		right: 5,
		top: 5
	});
	
	return self;
}

module.exports = SimpleLabel;