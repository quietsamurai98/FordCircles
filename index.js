var svgImg;
var animDelay = 100;
var iter;
var MAX_DEPTH = 250;
var colors = ['red', 'orangered', 'goldenrod', 'darkgreen', 'navy', 'indigo', 'violet'];
function pageLoad(){
    window.addEventListener('wheel', function(e) { zoom(e); });
    window.addEventListener('keydown', function(e) { pan(e); });
    init();
}
function getElem(idStr){
    return document.getElementById(idStr);
}

function init(){
    setupSVG();
    iter = 0;
    play();
}

function setupSVG(){
    svgImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgImg.setAttribute("width", document.body.clientWidth);
    svgImg.setAttribute("height", document.body.clientWidth/2);
    svgImg.setAttribute("viewBox", "-0.5 0 2 1");
    svgImg.setAttribute("style", "margin: 0 !important; padding: 0 !important;");
    document.body.appendChild(svgImg);
}

function play(){
    iter++
    addIteration(iter);
    if(iter<MAX_DEPTH){
        setTimeout(play, animDelay);
    }
}

function gcd(a,b) {
    if (a%b === 0) { 
        return b; 
    } 
    return gcd(b,a%b);
}

function addIteration(q){
    for (var p=0; p<=q; p++){
        if(gcd(p, q)==1){
            addFordCircle(p, q);
        }
    }
}

function addFordCircle(p, q){
    addCircle(p/q, 1/(2*q*q), 1/(2*q*q), colors[(q-1)%6])
}
function addCircle(x, y, r, c){
    y = 1.0 - y; //Flips cartesian coordinate to svg coordinate
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx",x);
    circle.setAttribute("cy",y);
    circle.setAttribute("r",r);
    circle.setAttribute("stroke-width",0);
    circle.setAttribute("fill", c);
    svgImg.appendChild(circle);
}

function zoom(e){ 
    if (e.deltaY !== 0) {
        var zoomFactor = 3;
        var initialViewBox = svgImg.getAttribute("viewBox");
        var viewBoxArr = initialViewBox.split(" ").map(parseFloat);
        var x = viewBoxArr[0];
        var y = viewBoxArr[1];
        var w = viewBoxArr[2];
        var h = viewBoxArr[3];
        var cx = x+(w/2);
        var cy = y+(h/2);
        if (e.deltaY < 0) { //scroll up = zoom in
            w/=zoomFactor;
            h/=zoomFactor;
            x=cx-(w/2);
            y=cy-(h/2);
        } else { //scroll down = zoom out
            w*=zoomFactor;
            h*=zoomFactor;
            x=cx-(w/2);
            y=cy-(h/2);
        }
        console.log("Old viewBox: " + initialViewBox);
        var outputViewBox = [x,y,w,h].join(" ");
        svgImg.setAttribute("viewBox", outputViewBox);
        console.log("New viewBox: " + outputViewBox);
    }
}

function pan(e){
    console.log(e.key);
    if(e.key.substr(0,5) === "Arrow" || ["w","a","s","d","W","A","S","D"].indexOf(e.key)>-1){
        var initialViewBox = svgImg.getAttribute("viewBox");
        var viewBoxArr = initialViewBox.split(" ").map(parseFloat);
        var x = viewBoxArr[0];
        var y = viewBoxArr[1];
        var w = viewBoxArr[2];
        var h = viewBoxArr[3];
        
        if(e.key === "ArrowDown" || e.key.toLowerCase() === "s"){
            console.log("D");
            y+=w/100;
        } else if(e.key === "ArrowUp" || e.key.toLowerCase() === "w"){
            console.log("U");
            y-=w/100;
        } else if(e.key === "ArrowLeft" || e.key.toLowerCase() === "a"){
            console.log("L");
            x-=w/100;
        } else if(e.key === "ArrowRight" || e.key.toLowerCase() === "d"){
            console.log("R");
            x+=w/100;
        }
        
        console.log("Old viewBox: " + initialViewBox);
        var outputViewBox = [x,y,w,h].join(" ");
        svgImg.setAttribute("viewBox", outputViewBox);
        console.log("New viewBox: " + outputViewBox);
    }
}