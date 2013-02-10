//	***********************************************
//	WINE LIFE
//	DISCOVER WINDOW  - DiscoverWindow.js
//	
//	MEN+1
//	Programmer:  Matthew Johnson
//	***********************************************

function DiscoverWindow(title) {
	var global = require('ui/common/globals');
	// Creates the default window with global color scheme
	var self = global.createWindow(title);
	
// create an array of anonymous objects
// Create an array of explicitly defined custom TableViewRows
var tbl_data = [];
for (var i = 0; i < 10; i++) {
	var row = Ti.UI.createTableViewRow({
		hasChild:true
		
	});
	// This image will be the image of the wine
		var image = Ti.UI.createImageView({ 		
  		height: 90,
  		width: 90,
  		left: 10,
  		borderColor: 'black',
		borderWidth: 1,
  		contentMode: 'aspectfill',
  		clipsToBounds: false,
  		image:'/images/user_image.png',
  		layout:'vertical'
	});
	
	// This is the Label for the location of the wine within the row
	var lbl_location = Ti.UI.createLabel({
		left:'40%',
<<<<<<< HEAD
=======
		color:'black',
>>>>>>> Experimental
		bottom:10,
		text: "Wine Location",
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});
	
		// This is the label of the type of wine within the row
	var lbl_type = Ti.UI.createLabel({
		left:'40%',
<<<<<<< HEAD
=======
		color:'black',
>>>>>>> Experimental
		text: 'Wine Type',
		bottom:lbl_location.top,
		font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	
	});

	// This is the Label for the location of the wine within the row
	var lbl_date = Ti.UI.createLabel({
		right:5,
		top:5,
<<<<<<< HEAD
=======
		color:'black',
>>>>>>> Experimental
		text: "Date",
		font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		touchEnabled:false
	});


	
	row.add(image);
	row.add(lbl_location);
	row.add(lbl_type);
	row.add(lbl_date);
	tbl_data.push(row);
}
// This is the tableview
var table = Titanium.UI.createTableView({
	backgroundColor:'transparent',
	top:0,
	width:'100%',
	height:'73%',
	
	data:tbl_data
});
	
	self.add(table);
	
	// This is the browse by color button
	var btn_bbc = Ti.UI.createButton({
		height:'20%',
		width:'42%',
		left:20,
		color: 'black',
		bottom:10,
		borderColor: 'black',
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: global.colors.lightest,
		backgroundImage: 'none'
	
	});
	// This label is the text for the browse by color button
	var lbl_bbc = Titanium.UI.createLabel({
    color:'black',
    font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
    highlightedColor:'black',
    text:'Browse by Color',
    textAlign:'center',
    touchEnabled:false,
    bottom:10,
    left:btn_bbc.left,
    height:btn_bbc.height,
    width:btn_bbc.width
});
	
	self.add(btn_bbc);
	self.add(lbl_bbc);
	
	// This is the browse by style button
	var btn_bbs = Ti.UI.createButton({
		height:'20%',
		width:'42%',
		right:20,
		textAlign:'center',
		color: 'black',
		bottom:10,
		borderColor: 'black',
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: global.colors.lightest,
		backgroundImage: 'none'
	
	});
	
		// This label is the text for the browse by style button
	var lbl_bbs = Titanium.UI.createLabel({
    color:'black',
    font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},
    highlightedColor:'black',
    text:'Browse by Style',
    textAlign:'center',
    touchEnabled:false,
    bottom:10,
    right:btn_bbs.right,
    height:btn_bbs.height,
    width:btn_bbs.width
});
	
	self.add(btn_bbs);
	self.add(lbl_bbs);
	
	btn_bbc.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: global.colors.light
		}));
	});
	
	return self;
};

module.exports = DiscoverWindow;