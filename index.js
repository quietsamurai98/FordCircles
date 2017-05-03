var svgImg;
var anim = 0;
var colors = ['red', 'orangered', 'goldenrod', 'darkgreen', 'navy', 'indigo', 'violet'];
function pageLoad(){
    //window.addEventListener("resize", resizeSVG);
    init();
}
function getElem(idStr){
    return document.getElementById(idStr);
}

function init(){
    
    //getElem("svgDiv").innerHTML = "<svg id='svgImg' height=" + window.innerHeight + " width=" + window.innerWidth + " viewbox = '-0.5 0 2 1'></svg>";
    svgImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    resizeSVG();
    svgImg.setAttribute("width", window.innerWidth);
    svgImg.setAttribute("height", window.innerHeight);
    //svgImg.setAttribute("preserveAspectRatio", "xMidYMax slice");
    svgImg.setAttribute("viewBox", "-0.5 0 2 1");
    svgImg.setAttribute("style", "margin: 0 !important; padding: 0 !important;");
    document.body.appendChild(svgImg);
    addFordCircle(0,1);
    addFordCircle(1,1);
    //svgImg.setAttribute("height", document.body.clientHeight);
    svgImg.setAttribute("width", document.body.clientWidth);
    play(100);
}

function resizeSVG(){
    //svgImg.setAttribute("width", "100%");
    //svgImg.setAttribute("height", "auto");
}

function run(n){
    while(svgImg.firstChild){
        svgImg.removeChild(svgImg.firstChild);
    }
    addFordCircle(0,1);
    addFordCircle(1,1);
    for(var a = 2; a <= n; a++){
        for(var b = 0; b <= a; b++){
            if(1==gcd(b, a)){
                addFordCircle(b,a);
            }
        }
    }
    if(n>100){clearInterval(anim);}
}

function play(ms){
    var iter = 1;
    if(anim){
        clearInterval(anim);
    }
    anim = setInterval(function(){ run(iter++) }, ms);
}

function gcd(a,b) {
    if (a%b === 0) { 
        return b; 
    } 
    return gcd(b,a%b);
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

//function 