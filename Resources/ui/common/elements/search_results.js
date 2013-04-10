module.exports = function(result, callback){
	Ti.API.info("loading search results: ");
	Ti.API.info(JSON.stringify(result));
	var make_row = require('ui/common/elements/search_results/make_row');
	var tbl_data = [];
	//result.Products.List
	var pl = result.Products.List;
	Ti.API.info(pl.length + " results");
	var first = true;
	// if we have a result
	if(pl.length > 0){
		for(var i = 0; i < pl.length; ++i)
			if(first){
				tbl_data.push(make_row({
					wine: pl[i],
					top: 20
				}));
				first = false;
			}
			else{
				tbl_data.push(make_row({
					wine: pl[i],
					top: 10
				}));
			}
	}
	else
	{
		var row = Ti.UI.createTableViewRow
		({
			hasChild:true,
		});
		var message = Ti.UI.createLabel
		({
			color:'black',
			text: "0 Results",
			font:{fontSize:16,fontWeight:'normal',fontFamily:'Helvetica Neue'},
			touchEnabled:false
		});
		row.add(message);
		tbl_data.push(row);
	}
		
	var table = Titanium.UI.createTableView
	({
		backgroundColor:'transparent',
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		data:tbl_data,
		style: Ti.UI.iPhone.TableViewStyle.PLAIN,
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		separatorColor: 'transparent',
		//top: 10
	});
	if(pl.length > 0)
		table.addEventListener('click', function(data){
			callback(data.row.wine);
		});
	
	var table_view = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.SIZE
	});
	var refresh = Ti.UI.createButton({
    	systemButton : global.android? null :Ti.UI.iPhone.SystemButton.REFRESH,
    	bottom: 5,
    	right: 5,
    	height: 25,
    	width: 25,
    	//title: 'refresh',
    	opacity: .9,
    	backgroundColor: 'transparent'

	});
	refresh.add(Ti.UI.createImageView({
		image: '/images/refresh.png',
		top: 2,
		bottom: 2,
		left: 2,
		right: 2
	}));
	refresh.addEventListener('click', function(e){
		table_view.fireEvent('refresh_page_data', {});
	})
	
	table_view.add(table);
	table_view.add(refresh);
	
	return table_view;	
}

