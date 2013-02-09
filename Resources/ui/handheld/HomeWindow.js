function HomeWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor: global.colors.dark
	});
	
	var data = [];
	
	for (var i = 0; i < 20; i++)
	{
		// Record the current row as a string
		var current_row = 'Wine ' + (i + 1);
		// Create table tab
		data[i] = Ti.UI.createTableViewRow({hasChild:true,title:current_row});
	}
	
	// Create a table view
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	
	function showClickEventInfo(e, islongclick) {
		// Various event data
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;
		var msg = 'row ' + row + ', index ' + index + ', section ' + section  + ', row data ' + rowdata;
		if (islongclick) {
			msg = "LONGCLICK " + msg;
		}
		// Creates popup dialog
		Titanium.UI.createAlertDialog({title:'Table View',message:msg}).show();
	}
	
	// Create table view click listener
	tableview.addEventListener('click', function(e)
	{
		showClickEventInfo(e);
	});
	
	// Create a table view longclick listener
	tableview.addEventListener('longclick', function(e)
	{
		showClickEventInfo(e, true);
	});
	
	// Add table view to the window
	self.add(tableview);
	
	return self;
};

module.exports = HomeWindow;