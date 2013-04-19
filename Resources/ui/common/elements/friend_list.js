module.exports = function(fl, callback){
	Ti.API.info("loading friendlist: ");
	Ti.API.info(JSON.stringify(fl));
	var tbl_data = [];
	var table = Titanium.UI.createView
	({
		backgroundColor:'transparent',
		top:10,
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		layout:'vertical',
		right: 10,
		bottom: 10
	});
	//result.Products.List
	for(var i = 0; i < fl.length; ++i)
	{
		f = fl[i];
		var row = Ti.UI.createView({
			height: Ti.UI.SIZE,
			width: Ti.UI.FILL
		});
		
		var rc = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			top: 12,
			//right: 5,
			borderRadius: 5,
			backgroundColor: '#fcf3e1',
			layout: 'horizontal'
		});
		rc.friend = f; 
		// This image will be the image of the user
		var image = Ti.UI.createImageView
		({ 		
  			  	//height: Ti.UI.SIZE,
		  		width: '100dp',//'27%',
		  		//height: 100,
				top: 10,
				bottom: 10,
				left: 5,
				borderWidth: 1,
				borderRadius: 10,
		  		clipsToBounds: true,
		  		image: f.picture_url,
		  		touchEnabled: false
		});
		var txt_container = Ti.UI.createView({
			height: Ti.UI.SIZE,
			width: '70%',
			top: 5,
			layout: 'vertical',
		  		touchEnabled: false
		});
		// Label for the location of the wine within the row
		var lbl_location = Ti.UI.createLabel
		({
			color:'black',
			bottom:5,
			right: 5,
			text: f.checkin_count + ' Check-Ins',
			font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
			touchEnabled:false
		});
		
		
		// Label for the type of wine within the row
		var lbl_type = Ti.UI.createLabel
		({
			color:'black',
			text: f.fname + ' ' + f.lname,
			bottom:lbl_location.top,
			font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica Neue'},
			touchEnabled:false
		
		});	

		row.addEventListener('click',function(data){
			callback(data.source.friend);
		});
		// Add each of these features to the row, then push the row
		row.add(rc);
		rc.add(image);
		rc.add(txt_container);
		txt_container.add(lbl_location);
		txt_container.add(lbl_type);
		table.add(row);
	}

	

	return table;	
}

