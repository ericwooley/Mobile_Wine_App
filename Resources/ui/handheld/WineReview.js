
// WineReview.js
// Author: Matthew Johnson  & David Wells

function WineReview(wine){
	var global = require('ui/common/globals');	
	var self = global.createWindow('Wine Review');
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
	var chview = get_checkin_view(all);
	
	var dd = require('ui/common/elements/dropdown');
	dd(chview, self, "Finish Checkin", "Check In", "up", function(){
		alert("Hooray");
	});
	
	self.add(overview);
	return self;
};

module.exports = WineReview;