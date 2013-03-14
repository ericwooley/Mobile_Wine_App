
// WineReview.js
// Author: Matthew Johnson  & David Wells

function WineReview(wine){
	var global = require('ui/common/globals');	
	var self = global.createWindow('Wine Review');
	self.barImage='images/iPhone_Nav_Bar_With_Bkgrd.png';
	var all = wine.all_information;

	var overview = Ti.UI.createView({
		height: '100%',
		width: '100%',
		layout: 'vertical'		
	});
	Ti.API.info(all.Labels[0].Url);
	// Add the header to the view.
	var header = require('ui/handheld/Wine_Review/header');
	var head = header(
			wine.name,
			all.Vineyard.Name,
			all.Appellation.Name,
			all.Appellation.Region.Name,
			all.Labels[0].Url,
			all
	);
	overview.add(head);
	get_checkin_view = require('ui/handheld/Wine_Review/Checkin');

	var ch = get_checkin_view(all);
	var dd = require('ui/common/elements/dropdown');
	dd(ch.view, self, "Finish Checkin", "Check In", "up", function(){
		alert("wine: "+ all.Id + " "+ ch.ta.value + " - " + Math.round(ch.rating.value));
		global.api.checkin(wine.id, ch.ta.value, Math.round(ch.rating.value), function(){
			alert('You have successfully checked in. Eventually, this will be more graceful');
		});
	});
	
	self.add(overview);
	return self;
};

module.exports = WineReview;