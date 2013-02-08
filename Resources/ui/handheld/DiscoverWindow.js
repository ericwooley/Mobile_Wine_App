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
	
	var label = Ti.UI.createLabel({
		left: image.right,
		text: 'Wine Type',
		top:10,
		height:15
	
	});
	
	var label2 = Ti.UI.createLabel({
		left: image.right,
		top:label.bottom,
		text: 'Wine Place'
	});

	var button = Ti.UI.createButton({
		right: 10,
		height: 30,
		width: 80,
		title: 'press me'
	});
	row.add(label);
	row.add(image);
	row.add(button);
	row.add(label2);
	tbl_data.push(row);
}
// now assign that array to the table's data property to add those objects as rows
var table = Titanium.UI.createTableView({
	backgroundColor:'transparent',
	top:0,
	width:'100%',
	height:'75%',
	
	data:tbl_data
});
	
	self.add(table);
	
	// This is the browse by color button
	var btn_bbc = Ti.UI.createButton({
		height:'20%',
		width:'42%',
		left:20,
		//title:'Browse by Color',
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
		//title:'Browse by Style',
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