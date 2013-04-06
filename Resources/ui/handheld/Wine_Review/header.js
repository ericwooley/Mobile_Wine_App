function header(name, winery, location, region, label_url, wine_info ){
	global = require('ui/common/globals');
	// function that abreviates the state.
	var st2ab = require('ui/handheld/Wine_Review/abrev_state');
	// Header overview
	var h = Ti.UI.createView({
		layout: 'horizontal',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: 35,
		left: 10,
		right: 10,
	});
	
	var FriendsReviews = Ti.UI.createLabel({
		top: 10,
  		color: global.colors.dark,
  		font: { fontFamily: 'Helvetica Neue', fontSize:18, fontWeight: 'bold'},
  		text: 'Reviews On This Wine',
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL 
	});
	
	// The label image.
	var bottle_label = Ti.UI.createImageView({ 		
	  	height: '50%',
	  	width: Ti.UI.SIZE ,
	  	clipsToBounds: true,
	  	image: label_url,
	  	//top: 5,
	  	layout: 'vertical'
	});
	
	var right_text_view = Ti.UI.createView({
		layout: 'vertical',
		width: '70%',
		height: Ti.UI.SIZE,
		left: 10,
		top: 0,
	});
	
	// The text to the right of the image
	var name_lbl = Ti.UI.createLabel({
		text: name,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 0,
		top: 0,
		color: 'black',
	});
	
	var winery_lbl = Ti.UI.createLabel({
		text: winery,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 0,
		font:{fontSize:14,fontWeight:'italic',fontFamily:'Helvetica Neue'},
		color: 'black',
	});
	
	var loc_lbl = Ti.UI.createLabel({
		text: location + ', ' + st2ab(region),
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 0,
		font:{fontSize:14,fontWeight:'italic',fontFamily:'Helvetica Neue'},
		color: 'black',
	});
	
	right_text_view.add(name_lbl);
	right_text_view.add(winery_lbl);
	right_text_view.add(loc_lbl);
	
	h.add(bottle_label);
	h.add(right_text_view);
	h.add(FriendsReviews)
	return h;
	
	
}
module.exports = header;