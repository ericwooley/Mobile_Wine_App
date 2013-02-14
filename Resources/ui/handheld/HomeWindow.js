<<<<<<< HEAD
//	***********************************************
//	WINE LIFE
//	HOME WINDOW  - HomeWindow.js
//	
//	MEN+1
//	Programmer:  Aaron Cheever
//	***********************************************

function HomeWindow(title)
{
	var global = require('ui/common/globals');

	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	
	// create an array of anonymous objects
	// Create an array of explicitly defined custom TableViewRows
	var tbl_data = [];
	for (var i = 0; i < 10; i++)
=======
function HomeWindow(title) {

	var win = Titanium.UI.createWindow();
	// Change the bar color
	win.barColor = '#000';
	
	var tableView;
	var data = [];
	
	// Create update row (used when the user clicks on the row)
	function createUpdateRow(text)
>>>>>>> 3bbc1d7b2d7875312ad5e24bec6cbb2cb0c5a95d
	{
		var row = Ti.UI.createTableViewRow
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
		tbl_data.push(row);
	}
	
	// Create a tableview and add it to the window
	var table = Titanium.UI.createTableView
	({
		backgroundColor:'transparent',
		top:0,
		width:'100%',
		height:'100%',
		data:tbl_data
	});
	self.add(table);

<<<<<<< HEAD
	global.outputHook(self);
	return self;
=======
	return win;
>>>>>>> 3bbc1d7b2d7875312ad5e24bec6cbb2cb0c5a95d
};

module.exports = HomeWindow;