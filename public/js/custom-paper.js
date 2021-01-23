//paper/canvas variables
var pWidth = view.bounds.width; 
var pHeight = view.bounds.height;
var midX = pWidth / 2;
var midY = pHeight / 2;
var pWidth3; // (pWidth / 3) - initSlideX
var xRatio = 1401/1440;
var yRatio = 309.67/789;

//shape variables
var width = 100;
var height = 100;

//trombone vars
var bell; //recolor
var slideChild;  //recolor

//calculate slide positions
var initSlideX; //center X of slide - used
var offset; // - used
var slideSeventh; // equal division of 7 parts //116 each - used

//slide svg relative ~ not canvas
var topSlide; //initSlideX - offset; // 245 - static // top of slide and left bound of animation - used
var bottomSlide; // 1085 - static - used
var leftSlSvg; // ((slide.bounds.width / 2) - (pWidth / 3)); // left endpoint x of slide svg - used 
var rightSlSvg; // ((slide.bounds.width / 2) + (pWidth / 3)); // right endpoint x of slide svg - used

var trombone = paper.project.importSVG('/images/old/bell2.svg', function(onload) { //background trombone image
    trombone = onload;
    //console.log('Tromby', trombone.bounds.width, view.bounds.width)
    // trombone.bounds.width = (1401/1440) * view.bound.width;
    // trombone.bounds.height = (309.67/789) * view.bound.height;

    trombone.position = new Point((pWidth / 3), midY);
    bell = trombone.children[1].children['Layer_4'].children[2];
    bell.fillColor = "#17FFEF";
    //console.log(trombone.children);
});

var slide = paper.project.importSVG('/images/old/slide2.svg', function(onload) { //animated trombone slide
    slide = onload;
    
    console.log('Slidy', slide.bounds, 'view', view.bounds);

    // slide.bounds.width = (1401/1440) * view.bound.width;
    // slide.bounds.height = (309.67/789) * view.bound.height;
    slide.position = new Point((pWidth / 3), midY); 
    pWidth3 = (pWidth / 3); // same as initial slide x
    initSlideX = slide.position.x; 

    leftSlSvg = ((slide.bounds.width / 2) - (pWidth / 3)); // left endpoint x of slide svg 
    rightSlSvg = ((slide.bounds.width / 2) + (pWidth / 3)); // right endpoint x of slide svg - bottom of slide - good
    offset = (pWidth * 0.0806); //from right side of canvas - used
    topSlide =  (pWidth * 0.2527);; // visual top of slide; should be fixed/closer //corrected sans resonsiveness
    bottomSlide = rightSlSvg; // good
    slideSeventh = (bottomSlide - topSlide) / 7; // corrected

    slideChild = slide.children[1].children['Layer_4'].children[0];
    slideChild.fillColor = "#17FFEF";
});

function onMouseDown(event) {
    if(globals.conflict){
        return;
    } else if(event.event.button === 0) {
        globals.mouseDraggery(event);
    } return;
}

function onMouseDrag(event) {
    if(globals.conflict){
        return;
    } else if(event.event.button === 0) {
        globals.mouseDraggery(event);
    } return;
}
globals.mouseDraggery = function(event) {
    if(view.bounds.width <= (1401 * 0.78)){
        topSlide = (pWidth * (0.2527 * 0.78)) + 50;
    }
    if(event.point.x >= (topSlide + 10) && event.point.x <= (bottomSlide - offset)){ //max and min slide range
        if((event.point.x > topSlide) && (event.point.x <= (topSlide + 40))) {
            slide.position.x = event.point.x + (offset - 10);
        }else if(event.point.x >= (bottomSlide - (offset + 10))){
                slide.position.x = event.point.x + offset;
        }else {
                slide.position.x = event.point.x + (offset - 10);
        }
    }
}

globals.getSlideX = function() {
    var clientSlide = slide.position.x - (pWidth * 0.0806); // calculate offset from current slide center x 
    return clientSlide;
}

globals.moveSlide = function(s){
    var moveSlide = (slideSeventh * (s - 1));
    var newSlidePos = initSlideX + moveSlide;

    slide.tween({
        'position.x': newSlidePos,
        
    }, {
        easing: 'easeInOutCubic',
        duration: 200
    });

    // bell.tween({
    //     'fillColor.hue': '+=5'
    // }, {
    //     easing: 'easeInOutCubic',
    //     duration: 200
    // })

    // slideChild.tween({
    //     'fillColor.hue': '+=5'
    // }, {
    //     easing: 'easeInOutCubic',
    //     duration: 200
    // })

};

globals.backToFirst = function(){
    if(slide.position.x === topSlide){
        return;
    } else {
        globals.moveSlide(1);
        return;
    }
}

function onResize(event) {
var posX = (view.bounds.width/3) - (trombone.bounds.width/2);
var posY = (view.bounds.height/2) - (trombone.bounds.height/2);
var scaleX = 1401;
// var scaleX = (1401/1440) * view.bounds.width;
var scaleY = 309.67;
//var scaleY = (309.67/789) * view.bounds.height;

trombone.bounds.y = posY;
slide.bounds.y = trombone.bounds.y;
trombone.bounds.x = posX;
slide.bounds.x = trombone.bounds.x;

if(view.bounds.height <= (309.67 * 1.5)) {
    trombone.bounds.height = (309.67/ (309.67 * 1.5)) * view.bounds.height;
    slide.bounds.height = trombone.bounds.height;  

    scaleX = ((1401/309.67) * trombone.bounds.height);
    //slide.bounds.width = trombone.bounds.width;
}

if(view.bounds.width <= (1401 * 0.78)) {
    scaleX = view.bounds.width / 0.78;
    trombone.bounds.height = (309.67/1401) * scaleX;
    slide.bounds.height = trombone.bounds.height;

}

trombone.bounds.width = scaleX;
slide.bounds.width = trombone.bounds.width;

// trombone.bounds.height = scaleY;
// slide.bounds.height = trombone.bounds.height;


console.log(view.bounds);
console.log('tb', trombone.bounds, 'slide', slide.bounds);
console.log('Pos: ', posX, posY, 'Scale: ', scaleX, scaleY);
// console.log(midX, midY);
}
// console.log(paper.project._view._id); //paperScope object id
paper.install(window);  //inject into window global scope
