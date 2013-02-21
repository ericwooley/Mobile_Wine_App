function RatingControl() {
    var stars = []; 
    var numberOfStars = 5;
    var starOffImgSrc = '/Images/staroff.ico';
    var starOnImgSrc = '/Images/staron.ico';
    var star;
    var imageTemp = Ti.UI.createImageView({image:starOnImgSrc,height:'auto',width:'auto'});
    var starWidth = imageTemp.toImage().width;  
    imageTemp = null;   
 
    var rateView = Ti.UI.createView({
        layout: 'absolute',
        height: starWidth,  // this is the same as the width, as my star images are square
        width: Titanium.UI.FILL,
    }); 
 
    // this stops the touch event bubbling to the starImg.
    var coverView = Ti.UI.createView({
        height: rateView.height,
        width: rateView.width,
        backgroundColor: 'transparent'
    });     
 
 
 
    for(var i = 0; i < numberOfStars; i++) {
        star = Ti.UI.createImageView({
            rating: i + 1,
            image: starOffImgSrc,
            left: i * starWidth
        });
        rateView.addEventListener('click', function(e) {
            for(var i = 0; i < stars.length; i++) {     
                stars[i].image = (e.x >= stars[i].left) ? starOnImgSrc : starOffImgSrc;
            }           
        });             
        rateView.addEventListener('touchmove', function(e) {
            for(var i = 0; i < stars.length; i++) {     
                stars[i].image = (e.x >= stars[i].left) ? starOnImgSrc : starOffImgSrc;
            }           
        }); 
        stars.push(star);
        rateView.add(star);
    }
 
    rateView.add(coverView);
 
    rateView.getValue = function() {
        var value = 0;
        for(var i = 0; i < stars.length; i++) {
            value = (stars[i].image == starOnImgSrc) ? stars[i].rating : value;
        }
        return value;
    };
 
    return rateView;
}
 
module.exports = RatingControl;