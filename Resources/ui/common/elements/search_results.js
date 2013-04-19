module.exports = function(result, callback, addwine){
	Ti.API.info("loading search results: ");
	var global = require('ui/common/globals');
	
	
			
	var table = Titanium.UI.createView
	({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		layout: 'vertical',
		top: 3,
		bottom: 10
	});
	
	
	Ti.API.info(JSON.stringify(result));
	var make_row = require('ui/common/elements/search_results/make_row');
	var tbl_data = [];
	var pl = result.Products.List;
	//Ti.API.info(pl.length + " results");
	var first = true;
	// if we have a result
	if(pl.length > 0){
		//var c = global.android? 10: pl.length; 
		c = pl.length;
		for(var i = 0; i < c; ++i){
			if(first){
				table.add(make_row({
					wine: pl[i],
					top: 20,
					callback: callback
				}));
				first = false;
			}
			else{
				table.add(make_row({
					wine: pl[i],
					top: 10,
					callback: callback
				}));
			}
			}
		// Add Wine row to bottom of list
	if(addwine == true){				
	var row_block = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
	    top: 5,
		left: 10,
		right: 10,
		backgroundColor: '#fcf3e1',
		layout: 'vertical'
	});
			
	var lbl_addwine = Ti.UI.createLabel({
		color:'black',
		text: "Don't see the wine you were looking for?\nAdd it to our database",
		font:{fontSize:20,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});
			
	row_block.add(lbl_addwine);
	table.add(row_block);
			
	row_block.addEventListener('click', function(e){
		alert('add wine clicked');  // load add wine page
	});	
	}

	}
	

	// else  // When there are no results from a search, call function to add a wine.
	// {
		// ////////////////////// CHANGED BY IVAN ///////////////////////
		// 
		// 
		// /*
		// var row = Ti.UI.createTableViewRow
		// ({
			// hasChild:true,
		// });
		// var message = Ti.UI.createLabel
		// ({
			// color:'black',
			// text: "0 Results",
			// font:{fontSize:16,fontWeight:'normal',fontFamily:'Helvetica Neue'},
			// touchEnabled:false
		// });
		// row.add(message);
		// table.add(row);
// 
		// tbl_data.push(row);
		// */
		// ////////////////////// END OF CHANGES ///////////////////////
	// }
	
	
	
	/**********************************************************
	 * 
	 * This still needs work, doesn't open in a resonable way
	 * 
	 **********************************************************/
	
	
	// if(pl.length < 1 || !pl[0].friend){
		// var add_wine = Ti.UI.createView({
			// width: Titanium.Platform.displayCaps.platformWidth - 20,
			// height: Ti.UI.SIZE,
			// top: 10,
			// left: 10,
			// right: 10,
			// backgroundColor: '#fcf3e1',
			// borderRadius: global.android?0:10,
			// //title: "Don't see the wine you were looking for?\nAdd it to our database",
		// });
		// add_wine.add(Ti.UI.createLabel({
			// width: Ti.UI.SIZE,
			// height: Ti.UI.SIZE,
			// top:10, bottom: 10,
			// textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			// text: "Don't see the wine you were looking for?\nAdd it to our database",
			// touchEnabled: false
		// }));
		// table.add(add_wine);
		// var edit_wine = require('ui/common/elements/edit_wine');
		// add_wine.addEventListener('click', function(){
			// var ew = edit_wine();
			// ew.containingTab = table.containingTab;
			// table.containingTab.open(wr);
		// });
	// }
	
	var table_view = Ti.UI.createView({
		height: Ti.UI.SIZE,
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
	});
	table_view.add(table);
	if(!global.android){
		//////////////////////////////////
		// Pull to refresh
		//////////////////////////////////
		var border = Ti.UI.createView({
			backgroundColor: 'e7c580',
			//backgroundColor: 'transparent',
			height:3,
			bottom:0,
		});
		
		var tableHeader = Ti.UI.createView({
			backgroundColor:"#efd195",
			width:320,
			height:60
		});
		
		// fake it til ya make it..  create a 2 pixel
		// bottom border
		tableHeader.add(border);
		
		var arrow = Ti.UI.createView({
			backgroundImage:"/images/arrow.png",
			width:23,
			//height:60,
			height: 37,
			bottom:10,
			left:25
		});
		
		var statusLabel = Ti.UI.createLabel({
			text:"Pull to reload",
			left:25,
			width:200,
			bottom:20,
			height:"auto",
			color: global.colors.dark,
			textAlign:"center",
			font:{fontFamily: "Helvetica Neue", fontSize:13,fontWeight:"bold"},
			//shadowColor:"#999",
			//shadowOffset:{x:0,y:1}
		});
		
		// var lastUpdatedLabel = Ti.UI.createLabel({
			// text:"Last Updated: "+formatDate(),
			// left:55,
			// width:200,
			// bottom:15,
			// height:"auto",
			// color:"#576c89",
			// textAlign:"center",
			// font:{fontSize:12},
			// shadowColor:"#999",
			// shadowOffset:{x:0,y:1}
		// });
		
		var actInd = Titanium.UI.createActivityIndicator({
			left:20,
			bottom:13,
			width:30,
			height:30
		});
	
		tableHeader.add(arrow);
		tableHeader.add(statusLabel);
		// tableHeader.add(lastUpdatedLabel);
		tableHeader.add(actInd);
		
		table.headerPullView = tableHeader;
		
		var pulling = false;
		var reloading = false;
		function beginReloading()
		{
			table_view.fireEvent('refresh_page_data', {});
		}
		
		function endReloading()
		{
			// simulate loading
			for (var c=lastRow;c<lastRow+10;c++)
			{
				tableView.appendRow({title:"Row "+c});
			}
			lastRow += 10;
		
			// when you're done, just reset
			tableView.setContentInsets({top:0},{animated:true});
			reloading = false;
			//lastUpdatedLabel.text = "Last Updated: "+formatDate();
			statusLabel.text = "Pull down to refresh...";
			actInd.hide();
			arrow.show();
		}
		
		table.addEventListener('scroll',function(e)
		{
			var offset = e.contentOffset.y;
			//if (offset <= -65.0 && !pulling && !reloading)
			if (offset <= -50.0 && !pulling && !reloading)
			{
				var t = Ti.UI.create2DMatrix();
				t = t.rotate(-180);
				pulling = true;
				arrow.animate({transform:t,duration:180});
				statusLabel.text = "Release to refresh...";
			}
			else if (pulling && (offset > -50.0 && offset < 0) && !reloading )
			{
				pulling = false;
				var t = Ti.UI.create2DMatrix();
				arrow.animate({transform:t,duration:180});
				statusLabel.text = "Pull down to refresh...";
			}
		});
			var event1 = 'dragEnd';
		if (Ti.version >= '3.0.0') {
			event1 = 'dragend';
		}
	
		table.addEventListener(event1,function(e)
		{
			if (pulling && !reloading)
			{
				reloading = true;
				pulling = false;
				arrow.hide();
				actInd.show();
				statusLabel.text = "Reloading...";
				table.setContentInsets({top:60},{animated:true});
				arrow.transform=Ti.UI.create2DMatrix();
				beginReloading();
			}
		});
		
		
		
		////////////////////////////
		// End of pull to refresh
		////////////////////////////
		
	}
	else
		table_view.add(refresh);
	
	return table_view;	
}

