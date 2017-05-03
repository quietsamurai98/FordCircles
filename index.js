var svgImg;


function pageLoad(){
    window.addEventListener("resize", resizeSVG);
    init();
}
function getElem(idStr){
    return document.getElementById(idStr);
}

function init(){
    
    //getElem("svgDiv").innerHTML = "<svg id='svgImg' height=" + window.innerHeight + " width=" + window.innerWidth + " viewbox = '-0.5 0 2 1'></svg>";
    svgImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //resizeSVG();
    svgImg.setAttribute("preserveAspectRatio", "xMidYMin slice");
    svgImg.setAttribute("viewBox", "-0.5 0 2 1");
    //svgImg.setAttribute("style", "border-bottom: 1px solid black");
    getElem("svgDiv").appendChild(svgImg);
    // addFordCircle(0,1);
    // addFordCircle(1,1);
    // addFordCircle(1,2);
    run(100);
}

function resizeSVG(){
    svgImg.setAttribute("width", window.innerWidth * 1);
    svgImg.setAttribute("height", window.innerHeight * 0.8);
}

function run(n){
    for(var a = 1; a <= n; a++){
        for(var b = 0; b <= a; b++){
            //if(1==gcd(b, a)){
                addFordCircle(b,a);
            //}
        }
    }
}

function gcd(a,b) {
  a = Math.abs(a);
  b = Math.abs(b);
 
  if (b > a) {
    var temp = a;
    a = b;
    b = temp; 
  }
 
  while (true) {
    a %= b;
    if (a == 0) { return b; }
    b %= a;
    if (b == 0) { return a; }
  }
}

function addFordCircle(p, q){
    addCircle(p/q, 1/(2*q*q), 1/(2*q*q), "black")
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