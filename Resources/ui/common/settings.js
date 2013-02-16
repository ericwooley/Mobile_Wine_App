// This is an example of the edit profile and retreive profile functionality.

/*
module.exports = function(w){
	var global = require('ui/common/globals');
	
	var firstname = Ti.UI.createTextField({
		hintText: "First Name",
		backgroundColor: 'white',
		top: 10,
		left: 10,
		width: 100,
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	
	var lastname = Ti.UI.createTextField({
		hintText: "lastName",
		backgroundColor: 'white',
		top: 10,
		left: 10,
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	var bio = Ti.UI.createTextField({
		hintText: "bio",
		backgroundColor: 'white',
		top: 10,
		left: 10,
		width: 100,
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	 });
	 var edit = Ti.UI.createButton({
		title: 'Edit',
		top: 10,
		width: 100,
		height: 50
	 });
	 var overview = Ti.UI.createView({
		width: "100%",
		height: "100%",
		top: 10,
		left: 10,
		layout: 'vertical'
	});
	var pi = global.api.profileInformation(function(pi){
		firstname.value = pi.fname;
		lastname.value = pi.lname;
		bio.value = pi.bio;
		overview.add(firstname);
		overview.add(lastname);
		overview.add(bio);
		overview.add(edit);
		w.add(overview);
		edit.addEventListener('click', function(){
			global.api.editProfile(firstname.value, lastname.value, bio.value, function(result){
				// result.fname
				// result.lname
				// result.bio
				// result.imageurl
				alert(JSON.stringify(result));
			});
		});
	});
	
}



/*/
// For now this is a demo on how to use the search api.

module.exports = function(w)
{
	var global = require('ui/common/globals');
	
	// Do whatever you want to get the search query
	// I added a textfield
	var tmp = Ti.UI.createTextField({
		hintText: "Enter something here",
		backgroundColor: 'white',
		value:'merlot',
		top: 10,
		left: 10,
		style: Ti.UI.INPUT_BORDERSTYLE_BEZEL
	});
	
	// This is where I am going put the with all the results.
	var overview = Ti.UI.createWindow({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		top: 10,
		left: 10,
		width: "100%",
		height: Ti.UI.SIZE,
		layout: 'vertical'
	});
	
	// add my search field to my 
	overview.add(tmp);
	
	// This is the function that fires when someone hides the keyboard.
	// Maybe a button event or whatever you want.
	tmp.addEventListener('blur', function(){
		// This is the search api.
		// The firsty value should be the query followed by an anonymous function
		// that will be called once the data has been retrieved. This won't be called
		// if there is a failure. 
		global.api.search(tmp.value, function(result){
			Ti.API.info('search callback was called');
			alert(result);
			// get a view with the results.
			var view = global.api.search_results(result, function(wine){
				Ti.API.info('Settings callback was successful');
				Ti.API.info(JSON.stringify(wine.id));
				// strings to deal with are, 
				// wine.name
				// wine.id
				// wine.winetype
				// wine.location
				// wine.all_information - this is one extra bit of data (the motherload)
				// getting to all the data can be hard, but here is the layout. 
				// Let me know if you need help.
				//{
				//   "Url":"http://www.wine.com/V6/Pedestal-Merlot-2006/wine/98082/detail.aspx",
				//   "Name":"Pedestal Merlot 2006",
				//   "Ratings":{
				//      "List":[
				//
				//      ],
				//      "HighestScore":96
				//   },
				//   "ProductAttributes":[
				//      {
				//         "Url":"http://www.wine.com/v6/Collectible-Wines/wine/list.aspx?N=7155+36",
				//         "Name":"Collectible Wines",
				//         "ImageUrl":"http://cache.wine.com/images/glo_icon_collectable_big.gif",
				//         "Id":36
				//      },
				//      {
				//         "Url":"http://www.wine.com/v6/Smooth-andamp-Supple/wine/list.aspx?N=7155+611",
				//         "Name":"Smooth &amp; Supple",
				//         "ImageUrl":"",
				//         "Id":611
				//      }
				//   ],
				//   "Id":98082,
				//   "Varietal":{
				//      "Url":"http://www.wine.com/v6/Merlot/wine/list.aspx?N=7155+124+138",
				//      "Name":"Merlot",
				//      "WineType":{
				//         "Url":"http://www.wine.com/v6/Red-Wines/wine/list.aspx?N=7155+124",
				//         "Id":124,
				//         "Name":"Red Wines"
				//      },
				//      "Id":138
				//   },
				//   "Appellation":{
				//      "Url":"http://www.wine.com/v6/Columbia-Valley/wine/list.aspx?N=7155+104+2414",
				//      "Name":"Columbia Valley",
				//      "Region":{
				//         "Url":"http://www.wine.com/v6/Washington/wine/list.aspx?N=7155+104",
				//         "Name":"Washington",
				//         "Area":null,
				//         "Id":104
				//      },
				//      "Id":2414
				//   },
				//   "Vintage":"",
				//   "Vintages":{
				//      "List":[
				//
				//      ]
				//   },
				//   "Labels":[
				//      {
				//         "Url":"http://cache.wine.com/labels/98082m.jpg",
				//         "Id":"98082m",
				//         "Name":"thumbnail"
				//      }
				//   ],
				//   "Vineyard":{
				//      "Url":"http://www.wine.com/v6/Pedestal/learnabout.aspx?winery=17979",
				//      "Name":"Pedestal",
				//      "GeoLocation":{
				//         "Url":"http://www.wine.com/v6/aboutwine/mapof.aspx?winery=17979",
				//         "Longitude":-360,
				//         "Latitude":-360
				//      },
				//      "ImageUrl":"",
				//      "Id":6139
				//   },
				//   "Description":"",
				//   "Type":"Wine",
				//   "Community":{
				//      "Url":"http://www.wine.com/V6/Pedestal-Merlot-2006/wine/98082/detail.aspx",
				//      "Reviews":{
				//         "List":[
				//
				//         ],
				//         "HighestScore":1,
				//         "Url":"http://www.wine.com/V6/Pedestal-Merlot-2006/wine/98082/detail.aspx?pageType=reviews"
				//      }
				//   },
				//   "PriceMin":44.99,
				//   "PriceRetail":53.99,
				//   "PriceMax":61.99,
				//   "Retail":null,
				//   "GeoLocation":{
				//      "Url":"http://www.wine.com/v6/aboutwine/mapof.aspx?winery=17979",
				//      "Longitude":-360,
				//      "Latitude":-360
				//   }
				//}
			});
			// Add this view to the view in the whole page.
			overview.add(view);
		});
	});
	// add overview to the window.
	w.add(overview);
}
//*/