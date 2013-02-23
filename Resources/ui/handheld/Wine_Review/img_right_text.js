function header(name, winery, location, region, label_url ){
	global = require('ui/common/globals');
	// function that abreviates the state.
	var st2ab = require('ui/handheld/Wine_Review/abrev_state');
	// Header overview
	var h = Ti.UI.createView({
		layout: 'horizontal',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: 10,
		left: 10,
		right: 10
	});
	// The label image.
	var bottle_label = Ti.UI.createImageView({ 		
	  	height: 100,
	  	width: 100,
	  	borderRadius: 15,
	  	borderColor: global.colors.dark,
		borderWidth: 1,
	  	contentMode: 'aspectfill',
	  	clipsToBounds: false,
	  	image: label_url,
	});
	
	var right_text_view = Ti.UI.createView({
		layout: 'vertical',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		left: 10,
		top: 0
	});
	
	// The text to the right of the image
	Ti.API.info('name: '+name);
	var name_lbl = Ti.UI.createLabel({
		text: name,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 0,
		top: 0
	});
	
	var winery_lbl = Ti.UI.createLabel({
		text: winery,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 0,
		font:{fontSize:14,fontWeight:'italic',fontFamily:'Helvetica Neue'},

	});
	
	var loc_lbl = Ti.UI.createLabel({
		text: location + ', ' + st2ab(region),
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 0,
		font:{fontSize:14,fontWeight:'italic',fontFamily:'Helvetica Neue'},
	});
	
	var checkin_button = Ti.UI.createButton({
		title: 'Checkin',
		width: Ti.UI.FILL,
		height: 50,
		top: 10,
		color: 'white',
		backgroundColor: global.colors.dark
	});
	right_text_view.add(name_lbl);
	right_text_view.add(winery_lbl);
	right_text_view.add(loc_lbl);
	
	h.add(bottle_label);
	h.add(right_text_view);
	h.add(checkin_button);
	
	return h;
	
	
}
module.exports = header;