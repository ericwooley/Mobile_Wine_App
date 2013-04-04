module.exports = function(result, callback){
	Ti.API.info("loading search results: ");
	Ti.API.info(JSON.stringify(result));
	var make_row = require('ui/common/elements/search_results/make_row');
	var tbl_data = [];
	//result.Products.List
	var pl = result.Products.List;
	Ti.API.info(pl.length + " results");
	// if we have a result
	if(pl.length > 0){
		for(var i = 0; i < pl.length; ++i)
			tbl_data.push(make_row(pl[i]));	
	}
	else
	{
		var row = Ti.UI.createTableViewRow
		({
			hasChild:true
		});
		var message = Ti.UI.createLabel
		({
			color:'black',
			text: "0 results",
			font:{fontSize:16,fontWeight:'normal',fontFamily:'Helvetica Neue'},
			touchEnabled:false
		});
		row.add(message);
		tbl_data.push(row);
	}
	var table = Titanium.UI.createTableView
	({
		backgroundColor:'transparent',
		top:10,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		data:tbl_data
	});
	if(pl.length > 0)
		table.addEventListener('click', function(data){
			callback(data.row.wine);
		});
	
	return table;	
}

