function HomeWindow(title) {

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
	
	// Create i rows
	for (var i = 0; i < 50; i++)
	{
		// Create a row called row
		var row = Ti.UI.createTableViewRow();
		row.selectedBackgroundColor = '#000';
		row.height = '16%';
		row.className = 'datarow';
		row.clickName = 'row';
	
		// Establish a font size
		var fontSize = 16;
		if (Titanium.Platform.name == 'android') {
			fontSize = 14;
		}
	
		// Give the row it's various features	
		var photo = Ti.UI.createView({
			backgroundImage:'/images/custom_tableview/user.png',
			top:'3%',
			bottom:'97%',
			left:'3%',
			right:'18%',
			clickName:'photo'
		});
		row.add(photo);

		var rating = Ti.UI.createView({
			backgroundImage:'/images/custom_tableview/eventsButton.png',
			top:'3%',
			left:'21%',
			height:'30%',
			width:'50%',
			clickName:'rating'
		});
		row.add(rating);

		var wine = Ti.UI.createLabel({
			color:'#320113',
			font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
			top:'36%',
			left:'21%',
			height:'29%',
			width:'66%',
			clickName:'wine',
			text:'Cabernet Sauvignon 2009'
		});
		row.filter = wine.text;
		row.add(wine);
	
		var vineyard = Ti.UI.createLabel({
			color:'#320113',
			font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
			top:'68%',
			left:'21%',
			height:'29%',
			width:'66%',
			clickName:'vineyard',
			text:'Beringer Vineyards'
		});
		row.add(vineyard);
	
		var button = Ti.UI.createView({
			backgroundImage:'/images/custom_tableview/commentButton.png',
			top:'45%',
			left:'90%',
			height:'10%',
			width:'7%',
			clickName:'button'
		});
		row.add(button);
	
		var date = Ti.UI.createLabel({
			color:'#320113',
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			top:'3%',
			left:'85%',
			height:'30%',
			width:'12%',
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
};

module.exports = HomeWindow;