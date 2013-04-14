
// WineReview.js
// Author: Matthew Johnson  & David Wells

function WineReview(wine, friend){
	var global = require('ui/common/globals');	
	var self = global.createWindow('');
	self.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black.png';
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
	
	var FriendsReviews = Ti.UI.createLabel({
		top: 5,
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
					layout: 'vertical',
					touchEnabled: false
				});
				
				// THIS IS ONE REVIEW ENTRY
				var rc = Ti.UI.createView({
					width: Ti.UI.FILL,
					height: Ti.UI.SIZE,
					top: 10,
					left: 10,
					right: 5,
					right: 10,
					borderRadius: 5,
					backgroundColor: '#fcf3e1',
					layout: 'horizontal',
					touchEnabled: true
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
					touchEnabled: false
			  		
				});
				rc.add(user_image);
				var rv = Ti.UI.createView({
					layout: 'vertical',
					height: Ti.UI.SIZE,
					width: Ti.UI.FILL,
					touchEnabled: false
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
					width: Ti.UI.FILL,
					touchEnabled: false
				}));	
				review.upload_pic = null;
				if(review.wine_pic.length  > 0)
				{
					upload_pic = Ti.UI.createImageView({
						width: Ti.UI.FILL,
						left: 10, right: 10,
						top: 5,
						image: review.wine_pic,
						touchEnabled: false
					});
					rc.add(upload_pic);
					review.upload_pic = upload_pic;
				}
				rc.add(Ti.UI.createLabel({
					text: '"'+review.comment + '"',
					height: Ti.UI.SIZE,
					width: Ti.UI.FILL,
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					font: {fontSize: 12, fontStyle: 'italic'},
					bottom: 15,
					left: 10, 
	    			right: 10,
					touchEnabled: false
				}));
				//review.friend;
				//  THIS IS WHERE THE SWIPE TO DELETE EVENT IS
				rc.addEventListener('swipe', function(r){
					if(r.direction != 'right') return;
					if(global.user_id == r.source.review.friend.ID){
   	 					//alert('You swiped your own review '+e.direction);
   	 					var confirm = Titanium.UI.createAlertDialog({ title: 'Delete this review?', message: 'Are you sure?\n(this cannot be undone)', buttonNames: ['Yes', 'No'], cancel: 1 });
						confirm.addEventListener('click', function(e) { Titanium.API.info('e = ' + JSON.stringify(e));
						   //Clicked cancel, first check is for iphone, second for android
						   if (e.cancel === e.index || e.cancel === true) {
						      return;
						   }
						
						    //now you can use parameter e to switch/case
						
						   switch (e.index) {
						      case 0: Titanium.API.info('Clicked button 0 (YES)');
						      //alert('checkin id'+ r.review.checkin_id);
						      	global.api.delete_review(r.source.review.checkin_id, function(){
						      		Ti.API.info('deleted: '+r.source.review.checkin_id);
						      	});						 
						      	r.source.width = r.source.size.width;
							      r.source.animate({left: r.source.size.width,  duration: 200}, function(t){
							      	r.source.height=0;
							      	r.source.visible = false;
							      	r.source.top = 0; r.source.bottom = 0;
							      });
							      
						      
						      break;
						
						      //This will never be reached, if you specified cancel for index 1
						      case 1: Titanium.API.info('Clicked button 1 (NO)');
						      break;
						
						      default:
						      break;
						
						  }
						});
						confirm.show();

   	 				}
   	 				
				});
					
				//  THIS IS WHERE THE CLICK EVENT IS FOR WINE REVIEWS
				//  Used to edit your own wine revies
				rc.addEventListener('click', function(e){
					
					
					var open_review_details = require('/ui/handheld/review_details');
					
					var review_details = open_review_details(e.source.review);
					review_details.containingTab = self.containingTab;
					self.containingTab.open(review_details);
					
					
					
					/*if(global.user_id == e.source.friend.ID){
						//do nothing
						alert('clicked your own, this will eventually allow you to edit it.');
					}
					else
					{
						alert('you clicked another wine ' + global.user_id + ' ' + review.friend.ID);
					}*/
				});
				rc.review = review;
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
	function upload_image(id, img, total_rotation){
		if(!img){
			load_tables();
			return;
		}
		overview.add(progressbar);
		progressbar.show(); 
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onsendstream = function(e){
		        progressbar.value = e.progress ;
		};
        xhr.onload = function(){
        	progressbar.hide();
        	            	Ti.API.info(this.responseText);

        	res = JSON.parse(this.responseText);
        	overview.remove(progressbar);
        	if(!res.success)
        		alert("Server Error: \""+res.error+"\" Please try again later.");
        	else
        		load_tables();
        }
        Ti.API.info('Uploading photo: ' + "http://winelife.ericwooley.com/user/upload/wine/"+id);
		xhr.open('POST', "http://winelife.ericwooley.com/user/upload/wine/"+id);
		//f1 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,filename);
		//iamge=f1.read(image);
		xhr.send({profile_image: img, rotation: total_rotation});
	};
	Ti.App.addEventListener('rotate', function(rotation){
		ch.image_rotation = rotation.r;
	});
	dd(ch.view, self, "Finish Check-In", "Check-In", "up", function(){
		global.api.checkin(wine.id, ch.ta.value, Math.round(ch.rating.value), function(data){
			Ti.API.info('checkin complete:' + data.id);
			if(ch.ui == null){
				Ti.API.info('upload_image is null');
			}
			else{
				Ti.API.info('uploading image');
				upload_image(data.id, ch.ui.image, ch.image_rotation);
			}
			//load_tables();
		});
	});
	self.add(overview);
	return self;
};

module.exports = WineReview;