/**
 * @author Eric Wooley
 */

function make_row(info){
	 var global = require('ui/common/globals');
	 var wine = info.wine;
	 //Ti.API.info('info:'+JSON.stringify(info));	
	 top = info.top;
	name = wine.Name;
	
	try{
		winetype = wine.Varietal.WineType.Name;
	}
	catch(err){
		winetype = "Unknown";
	}
	img_width = '20%';
	txt_width = '80%';
	
	location = wine.Appellation.Name + " - " +wine.Appellation.Region.Name;
	imageurl = wine.Labels[0].Url;
	var row = Ti.UI.createTableViewRow
	({
		hasChild:false,
		height:Ti.UI.SIZE,
		width: Ti.UI.FILL,
		className: 'WineRow'
	});
	 

	var row_block = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: 10,
		left: 10,
		right: 10,
		backgroundColor: '#fcf3e1',
		layout: 'vertical'
	});
	row_block.addEventListener('click', function(data){
		info.callback({
			id: wine.Id,
			name: name,
			winetype: winetype,
			location: location,
			all_information: wine
		});
	})
	
	if(!global.android) row_block.borderRadius = 5;
	var wine_info = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: 'horizontal',

	});
	// This image will be the image of the wine
	var image = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: '20%',
		
	});
	image.add(Ti.UI.createImageView({ 
		width: 50,
		//top: 10,
		left: 10,
		image: imageurl,
		backgroundImage: 'blue'
	}));

	var txt_container = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: '80%',
		layout: 'vertical',
		
	});
	// Label for the location of the wine within the row
	var lbl_location = Ti.UI.createLabel
	({
		color:'black',
		bottom:5,
		right: 5,
		text: location,
		font: {fontSize: 12, fontStyle: 'italic'},
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		touchEnabled:false
	});
	
	// Label for the type of wine within the row
	var lbl_type = Ti.UI.createLabel
	({
		right: 5,
		color:'black',
		text: name,
		left: 10,
		bottom:lbl_location.top,
		font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	
	});	

	// Label for the name
	var lbl_name = Ti.UI.createLabel
	({
		right:5,
		color:'black',
		text: winetype,
		
		font: {fontSize: 12, fontStyle: 'italic'},
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		touchEnabled:false
	});

	// Add each of these features to the row, then push the row
	wine_info.add(image);
	wine_info.add(txt_container);
	txt_container.add(lbl_name);
	txt_container.add(lbl_type);
	txt_container.add(lbl_location);
	row_block.add(wine_info);
	if(wine.friend){
		var friend_name = wine.friend.fname + ' ' + wine.friend.lname + ' checked in';
		var friend_info_row = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: 'horizontal'
		});
		
		var friend_picture = Ti.UI.createView({height: Ti.UI.SIZE, width: '20%',top: 10, bottom: 10});
		friend_picture.add(Ti.UI.createImageView({
			image: wine.friend.picture_url,
			width: 50,
			left: 10,

			borderRadius: global.android?null: 10,
			backgroundColor: 'black'
		}));
		
		var rating_container = Ti.UI.createView({
			width: '80%',
			height: Ti.UI.SIZE,
			layout: 'vertical'
		});
		
		// Add user rating
		rating_container.add(Ti.UI.createLabel({
			color: 'black',
			text: 'Rated ' + wine.friend.rating + '/10',
			left: 10,
			font: {fontSize: 18, fontStyle: 'bold'}
		}));
		// Add User Comment
		rating_container.add(Ti.UI.createLabel({
			color: 'black',
			text: '"'+wine.friend.comment+'"\n- ' + wine.friend.fname + ' ' + wine.friend.lname,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font: {fontSize: 12, fontStyle: 'italic'}
		}));
		if(wine.friend.user_wine_url.length > 0){
			friend_info_row.add(Ti.UI.createImageView({
				width: Ti.UI.FILL,
				//height:,
				left: 10, right: 10,
				image: wine.friend.user_wine_url
			}));
		}
		friend_info_row.add(friend_picture);
		friend_info_row.add(rating_container);
		row_block.add(friend_info_row);
	}
	
	row.add(row_block);
	return row_block;
};
module.exports = make_row;