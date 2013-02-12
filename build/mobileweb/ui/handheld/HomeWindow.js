function HomeWindow(title) {
<<<<<<< HEAD
	var global = require('ui/common/globals');
	
	var self = global.createWindow(title);
	
	var Body = global.elements.SimpleView('vertical');
	
	
	Body.add(global.elements.SimpleLabel("This is the home page"));
	self.add(Body);
	
	
	global.outputHook(self);
	return self;
=======
	var win = Titanium.UI.createWindow();
	// Change the bar color
	win.barColor = '#000';
	
	var tableView;
	var data = [];
	
	// Create update row (used when the user clicks on the row)
	function createUpdateRow(text)
	{
		var updateRow = Ti.UI.createTableViewRow();
		updateRow.backgroundColor = '#eccd98';
		updateRow.selectedBackgroundColor = '#eccd98';
	
		// Add custom property to identify this row
		updateRow.isUpdateRow = true;
		var updateRowText = Ti.UI.createLabel({
			color:'#320113',
			font:{fontSize:20, fontWeight:'bold'},
			text:text,
			width:'auto',
			height:'auto'
		});
		updateRow.className = 'updated_row';
		updateRow.add(updateRowText);
		return updateRow;
	}
	
	// Create a variable to track the active row
	var currentRow = null;
	var currentRowIndex = null;
	
	// Create the rows
	for (var c=1;c<50;c++)
	{
		// Create a row called row
		var row = Ti.UI.createTableViewRow();
		row.selectedBackgroundColor = '#000';
		row.height = '16%';
		row.className = 'datarow';
		row.clickName = 'row';
	
		// Add a photo to the row
		var photo = Ti.UI.createView({
			backgroundImage:'/images/custom_tableview/user.png',
			top:'3%',
			bottom:'97%',
			left:'3%',
			right:'18%',
			clickName:'photo'
		});
		row.add(photo);
	
		// Create and add a user to the row
		var user = Ti.UI.createLabel({
			color:'#320113',
			font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
			top:'36%',
			bottom:'65%',
			left:'21%',
			right:'87%',
			clickName:'user',
			text:'Cabernet Sauvignon 2009'
		});
		// 
		row.filter = user.text;
		row.add(user);
	
		// Establish a font size
		var fontSize = 16;
		if (Titanium.Platform.name == 'android') {
			fontSize = 14;
		}

		// Give the row it's various features		
		var comment = Ti.UI.createLabel({
			color:'#320113',
			font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
			top:'68%',
			bottom:'97%',
			left:'21%',
			right:'87%',
			clickName:'comment',
			text:'Beringer Vineyards'
		});
		row.add(comment);
	
		var calendar = Ti.UI.createView({
			backgroundImage:'/images/custom_tableview/eventsButton.png',
			top:'3%',
			bottom:'33%',
			left:'90%',
			right:'33%',
			clickName:'calendar'
		});
		row.add(calendar);
	
		var button = Ti.UI.createView({
			backgroundImage:'/images/custom_tableview/commentButton.png',
			top:'45%',
			bottom:'55%',
			left:'90%',
			right:'97%',
			clickName:'button'
		});
		row.add(button);
	
		var date = Ti.UI.createLabel({
			color:'#320113',
			font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
			top:'3%',
			bottom:'33%',
			left:'90%',
			right:'97%',
			clickName:'date',
			text:'Jan 21'
		});
		row.add(date);
	
		data.push(row);
	}
	
	// Create a table view
	if (Ti.Platform.osname !== 'mobileweb') {
		tableView = Titanium.UI.createTableView({
			data:data,
			filterAttribute:'filter',
			backgroundColor:'eccd98'
		});
	} else {
		tableView = Titanium.UI.createTableView({
			data:data,
			filterAttribute:'filter',
			backgroundColor:'eccd98'
		});
	}
	
	// Add an event listener that will tell you what is being clicked
	tableView.addEventListener('click', function(e)
	{
		Ti.API.info('table view row clicked - source ' + e.source);
		// Use the rowNum property on the object to get the row number
		var rowNum = e.index;
		var updateRow;
		if (Ti.Platform.osname !== 'mobileweb') {
			updateRow = createUpdateRow('You clicked on the '+e.source.clickName);
			tableView.updateRow(rowNum,updateRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.LEFT});
		} else {
			updateRow = createUpdateRow('Row clicked');
			tableView.updateRow(rowNum,updateRow);
		}
	});
	
	win.add(tableView);

	return win;
>>>>>>> Home-Aaron
};

module.exports = HomeWindow;