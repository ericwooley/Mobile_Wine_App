module.exports = function(w)
{
	var global = require('ui/common/globals');
	var tmp = Ti.UI.createTextField({
		hintText: "Enter something here",
		backgroundColor: 'white',
		value:'goldeneye',
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	tmp.addEventListener('blur', function(){
		global.api.search(tmp.value, function(result){
			alert(result.Products.List);
			var tbl_data = [];
			for(var wine in result.Products.List){
				alert(this);
				
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

