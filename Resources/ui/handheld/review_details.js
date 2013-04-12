function review_details(review){
	var global = require('ui/common/globals');	
	var self = global.createWindow('');
	self.barImage='images/iPhone_Nav_Bar_Bkgrd_With_Black.png';
	var has_image = review.wine_pic.length > 0;
	// Creates back button
	var back = Ti.UI.createButton({ title: "Back" });
 	back.addEventListener("click", function() 
	{
 		self.close({animated:true});
	});
	self.setLeftNavButton(back);
	Ti.API.info(JSON.stringify(review));
	var header = Ti.UI.createView({
		width: 2* Titanium.Platform.displayCaps.platformWidth,
		height: Ti.UI.SIZE,
		top: 40,
		layout: 'horizontal',
		left: 0
		//touchEnabled: false,
		
	});
	var left_half = Ti.UI.createScrollView({
		width: Titanium.Platform.displayCaps.platformWidth,
		height: Ti.UI.SIZE,
		layout: 'horizontal',
		touchEnabled: false,
		top: 0
	});
	var user_image = Ti.UI.createImageView({
		image: review.friend.picture_url,
		width: 100,
		height: Ti.UI.SIZE,
		touchEnabled: false,
	});
	var rating = Ti.UI.createLabel({
		text: review.rating+ '/10',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		touchEnabled: false,
	});
	var left_img_rating = Ti.UI.createView({
		width: 120,
		height: Ti.UI.SIZE,
		layout: 'vertical',
		touchEnabled: false,
	});
	var review_text = Ti.UI.createView({
		width: Titanium.Platform.displayCaps.platformWidth - 120,
		height: Ti.UI.SIZE,
		layout: 'vertical',
		top: 0
	});
		
	var comment = Ti.UI.createLabel({
		text: '"'+review.comment+ '"',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	var swipe_text = Ti.UI.createLabel({
		text: 'Swipe left to view image <---',
		font: {fontSize: 10, fontStyle: 'italic'},
		color: '#444444',
		top: 0, right: 0
	});
	if(has_image) review_text.add(swipe_text);
	review_text.add(comment);
	left_img_rating.add(user_image);
	left_img_rating.add(rating);
	left_half.add(left_img_rating);
	left_half.add(review_text);
	
	
	comment = Ti.UI.createTextArea({
		borderRadius: 5,
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
		height: 60,
		width: Ti.UI.FILL,
		color: '#888',
		textAlign: 'left',
		value: 'Comment on this review...'
	});
	
	
	comment = Ti.UI.createTextArea({
		borderRadius: 5,
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
		height: 60,
		width: Ti.UI.FILL,
		color: '#888',
		textAlign: 'left',
		value: 'Comment on this review...'
	});
	comment._hintText = comment.value;
	comment.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	        e.source.color = 'black';
	    }
	});
	back_to_hint = function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	        e.source.color = '#888';
	    }
	}
	comment.addEventListener('blur', back_to_hint);
	var mode = 'review';
	if(review.wine_pic.length > 0){

		img = review.upload_pic.toImage();
		var iv = {
			image: review.wine_pic,
			height:Titanium.Platform.displayCaps.platformHeight * .7 ,
			touchEnabled: false,
			top: 0
		};
		if(img.width > img.height){
			alert('using width');
			iv = {
				image: review.wine_pic,
				width: Ti.UI.FILL,
				touchEnabled: false,
				top: 0
			};
		}
		var right_half = Ti.UI.createView({
			width: Titanium.Platform.displayCaps.platformWidth,
			height:Ti.UI.FILL,
			bottom: 10
		});
		var right_half_image = Ti.UI.createImageView(iv);
		right_half.add(right_half_image);
		var left_text = "";
		var right_text = "";
		var move_left = function(e){ // shows picture
			
			
			if(e.direction == 'left'){
				mode = 'picture';
				//if(right_half.size.width > )
				if(comment.value != comment._hintText){
					right_text = comment.value;
					if(left_text.length < 1)
						back_to_hint({source: comment});
					else
						comment.value = left_text;
				}
				header.removeEventListener('swipe', move_left);
				header.animate({left: -Titanium.Platform.displayCaps.platformWidth});
				header.addEventListener('swipe', move_right);
			}
		}
		var move_right = function(e){// shows comment
			
			
			if(e.direction == 'right'){
				mode = 'review';
				if(comment.value != comment._hintText){
					left_text = comment.value;
					if(right_text.length < 1)
						back_to_hint({source: comment});
					else
						comment.value = right_text;
				}
				header.removeEventListener('swipe', move_right);
				header.animate({left: 0});
				header.addEventListener('swipe', move_left);
			}
		}
		header.addEventListener('swipe', move_left);
	}
	header.add(left_half);
	if(review.wine_pic.length > 0) header.add(right_half);
	self.add(header);
		
	
	var dropdown = require('ui/common/elements/dropdown');
	dropdown(comment, self, "Save Comment", "Comment", "up", function(){
		//var mode = header.left < 0 ? 'picture': 'review';
		alert(comment.value);
		
	});	
	return self;
};

module.exports = review_details;