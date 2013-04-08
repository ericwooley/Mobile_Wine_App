
// WineReview.js
// Author: Matthew Johnson  & David Wells

function WineReview(wine, friend){
	var global = require('ui/common/globals');	
	var self = global.createWindow('');
	self.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black@2x.png';
	var all = wine.all_information;
	
	
	// Creates back button
	var back = Ti.UI.createButton({ title: "Back" });
 	back.addEventListener("click", function() 
	{
 		self.close({animated:true});
	});
	self.setLeftNavButton(back);
	
	var overview = Ti.UI.createView({
		height: '100%',
		width: '100%',
		layout: 'vertical',	
	});
	// Add the header to the view.
	var header = require('ui/handheld/Wine_Review/header');
	var head = header(
			wine.name,
			all.Vineyard.Name,
			all.Appellation.Name,
			all.Appellation.Region.Name,
			all.Labels[all.Labels.length - 1].Url
	);
	overview.add(head.header);
	var progressbar = Ti.UI.createProgressBar({width: Ti.UI.FILL, height: 20});
	overview.add(progressbar);
	var FriendsReviews = Ti.UI.createLabel({
		top: 10,
		left: 10,
  		color: global.colors.dark,
  		font: { fontFamily: 'Helvetica Neue', fontSize:18, fontWeight: 'bold'},
  		text: 'Reviews',
  		height: Ti.UI.SIZE,
  		width: Ti.UI.FILL 
	});
	
	overview.add(FriendsReviews);
	get_checkin_view = require('ui/handheld/Wine_Review/Checkin');

	var ch = get_checkin_view(all);
	var dd = require('ui/common/elements/dropdown');
	var tableview = null;
	function load_tables(){
		//alert("wineid: "+ JSON.stringify(wine));
		var uid = null;
		if(friend)
			uid = friend.user_id;
		global.api.previous_checkins(wine.id, uid, function(data){
			//alert(JSON.stringify(data));
			if(tableview != null)
				overview.remove(tableview);
			
			var reviews = [];
			
			for (var i = 0; i < data.length; i++) {
				var review = data[i];
				var r = Ti.UI.createTableViewRow({
					hasChild:false,
					selectionStyle: 'none',
					layout: 'vertical'
				});
				var rc = Ti.UI.createView({
					width: Ti.UI.FILL,
					height: Ti.UI.SIZE,
					top: 10,
					left: 10,
					right: 5,
					borderRadius: 5,
					backgroundColor: '#f2f2f2',
					layout: 'horizontal',
				});
				var user_image = Ti.UI.createImageView({
			  		height: Ti.UI.SIZE,
			  		width: 60,
					top: 10,
			  		left: 10,
					borderWidth: 1,
					borderRadius: 10,
			  		clipsToBounds: true,
			  		image: review.friend.picture_url,
			  		
				});
				rc.add(user_image);
				var rv = Ti.UI.createView({
					layout: 'vertical',
					height: Ti.UI.SIZE,
					width: Ti.UI.FILL,
				});
				r.add(rc);
				rc.add(rv);	
				rv.add(Ti.UI.createLabel({
					color: 'black',
	    			top: 10,
	    			left: 10, 
	    			right: 10,
					text: "Rating: "+review.rating + " by " +review.friend.fname+" "+review.friend.lname+ "\n" +review.date,
					font: {fontSize: 12, fontStyle: 'italic'},
					textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
					height: Ti.UI.SIZE,
					width: Ti.UI.FILL
				}));	
				
				rc.add(Ti.UI.createLabel({
					text: '"'+review.comment + '"',
					height: Ti.UI.SIZE,
					width: Ti.UI.FILL,
					bottom: 15,
					left: 10, 
	    			right: 10,
				}));
				
				
				reviews.push(r);
				
			}
			// create table view
			tableview = Titanium.UI.createTableView({
				data:reviews,
				width: Ti.UI.FILL,
				height: Ti.UI.FILL,
				backgroundColor:'transparent',
				style: Ti.UI.iPhone.TableViewStyle.PLAIN,
				separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
				separatorColor: 'transparent',
			});
			
			overview.add(tableview);
		});
	};
	load_tables();
	function upload_image(id, img){
		progressbar.show(); 
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onsendstream = function(e){
		        progressbar.value = e.progress ;
		};
        xhr.onload = function(){
        	progressbar.hide();
        	            	Ti.API.info(this.responseText);

        	res = JSON.parse(this.responseText);
        	if(!res.success)
        		alert("Server Error: \""+res.error+"\" Please try again later.");
        }
        Ti.API.info('Uploading photo: ' + "http://winelife.ericwooley.com/user/upload/wine/"+id);
		xhr.open('POST', "http://winelife.ericwooley.com/user/upload/wine/"+id);
		//f1 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,filename);
		//iamge=f1.read(image);
		xhr.send({profile_image: img});
	};
	
	dd(ch.view, self, "Finish Check-In", "Check-In", "up", function(){
		global.api.checkin(wine.id, ch.ta.value, Math.round(ch.rating.value), function(data){
			Ti.API.info('checkin complete:' + data.id);
			if(ch.ui == null){
				Ti.API.info('upload_image is null');
			}
			else{
				Ti.API.info('uploading image');
				upload_image(data.id, ch.ui.image);
			}
			load_tables();
		});
	});
	self.add(overview);
	return self;
};

module.exports = WineReview;