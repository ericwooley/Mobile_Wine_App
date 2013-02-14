module.exports = function(w)
{
	var global = require('ui/common/globals');
	var tmp = Ti.UI.createTextField({
		hintText: "Enter something here",
		backgroundColor: 'white',
		value:'ponzi',
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	tmp.addEventListener('blur', function(){
		global.api.search(tmp.value, function(result){
			alert(result.Products);
			var tbl_data = [];
			for(var wine in result.Products.List){
				alert(typeof wine);
				/*var row = Ti.UI.createTableViewRow
				({
					hasChild:true
				});
				
				// This image will be the image of the wine
				var image = Ti.UI.createImageView
				({ 		
		  			height: 90,
		  			width: 90,
		  			left: 10,
		  			borderColor: 'black',
					borderWidth: 1,
		  			contentMode: 'aspectfill',
		  			clipsToBounds: false,
		  			image:'/images/logo.png',
		  			layout:'vertical'
				});
			
				// Label for the location of the wine within the row
				var lbl_location = Ti.UI.createLabel
				({
					left:'40%',
					color:'black',
					bottom:10,
					text: "Wine Location",
					font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
					touchEnabled:false
				});
				
				// Label for the type of wine within the row
				var lbl_type = Ti.UI.createLabel
				({
					left:'40%',
					color:'black',
					text: "Wine Type",
					bottom:lbl_location.top,
					font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
					touchEnabled:false
				
				});	
		
				// Label for the date within the row
				var lbl_date = Ti.UI.createLabel
				({
					right:5,
					top:5,
					color:'black',
					text: "Date",
					font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
					touchEnabled:false
				});
		
				// Add each of these features to the row, then push the row
				row.add(image);
				row.add(lbl_location);
				row.add(lbl_type);
				row.add(lbl_date);
				tbl_data.push(row);*/
			};
		});
	});
	var view = Ti.UI.createView({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		top: 0,
		left: 0
	});
	view.add(tmp);
	w.add(view);
}

