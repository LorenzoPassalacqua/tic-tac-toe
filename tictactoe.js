let activeplayer = "x";
let selectedsquares = [];

function placeXorO (squareNumber){
    if (!selectedsquares.some(Element => Element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber);
    
        if (activeplayer === "x"){
            select.style.backgroundImage= "x.png";
        }
        else {
            select.style.backgroundImage= "o.png";
        }
        selectedsquares.push (squareNumber + activeplayer);
        checkwinconditions();
        if (activeplayer === "x"){
            activeplayer= "o";
        }
        else {
            activeplayer = "x";
        }
        Audio ("place.mp3")
        if (activeplayer === "o"){
            disableclik();
            setTimeout(function(){computersTurn(); }, 1000);
        }
        return true;
    }
    function computersTurn(){
        let success= false;
        let pickasquare;
        while (!success){
            pickasquare= String(Math.floor(Math.random() * 9));
            if (placeXorO(pickasquare)){
                placeXorO(pickasquare);
                success=true;
            }
        }
    }
}


function checkwinconditions(){
    if (ArrayIncludes("0x", "1x", "x2")) {drawWinline (50, 100, 558, 100)}
    else if (ArrayIncludes("3x", "4x", "5x")) {drawWinline (50, 304, 558, 304)}
    else if (ArrayIncludes("6x", "7x", "8x")) {drawWinline (50, 508, 558, 508)}
    else if (ArrayIncludes("0x", "3x", "6x")) {drawWinline (100, 50, 100, 558)}
    else if (ArrayIncludes("1x","4x", "7x")) {drawWinline (304, 50, 304, 508)}
    else if (ArrayIncludes("2x", "5x", "8x")) {drawWinline (508, 50, 508, 558)}
    else if (ArrayIncludes("6x", "4x", "2x")) {drawWinline (100, 508, 510, 90)}
    else if (ArrayIncludes("0x", "4x", "8x")) {drawWinline (100, 100, 520, 520)}
    else if (ArrayIncludes("0o", "1o", "2o")) {drawWinline (50, 100, 558, 100)}
    else if (ArrayIncludes("3o", "4o", "5o")) {drawWinline (50, 304, 558, 304 )}
    else if (ArrayIncludes("6o", "7o", "8o")) {drawWinline (50, 508, 558, 508)}
    else if (ArrayIncludes("0o", "3o", "6o")) {drawWinline (100, 50, 100, 558)}
    else if (ArrayIncludes("1o", "4o", "7o")) {drawWinline (304, 50, 304, 558)}
    else if (ArrayIncludes("2o", "5o", "80")) {drawWinline (508, 50, 508, 558)}
    else if (ArrayIncludes("6o", "40", "2o")) {drawWinline (100, 508, 510, 90)}
    else if (ArrayIncludes("0o", "4o", "8o")) {drawWinline (100, 100, 520, 520)}

    else if (selectedsquares >= 9){
        Audio("//tie.mp3")
        setTimeout (function () {resetgame(); }, 1000);
    }

}

function ArrayIncludes(squareA, squareB, squareC){
    const a = selectedsquares.includes (squareA)
    const b = selectedsquares.includes (squareB)
    const c = selectedsquares.includes (squareC)
    if(a === true && b === true && c === true) {return true;}
}

function disableclik(){
    body.style.pointerEvents = "none";
    setTimeout (function(){ body.style.pointerEvents= "auto"}, 1000);
}

function Audio (audioURL){
    let audio= new (audioURL);
    audio.play();
}


function drawWinline(coordx1, coordy1, coordx2, coordy2){
    const canvas = document.getElementById("win-lines");
    let x1 = coordx1, 
        y1 = coordy1,
        x2 = coordx2,
        y2 = coordy2,
        x = x1,
        y = y1;

    function animateDrawLine() {
        const animationLoop = requestAnimationFrame (animateDrawLine);
        c.clearRect (0, 0, 608, 608);
        c.beginPath ();
        c.moveTo (x1, y1);
        c.lineTo (x, y);
        c.lineWidth = 10;
        c.strokeStyle = "rgba (70, 255, 33, 8)";
        c.stroke()
        if (x1 <= x2 && y1 <= y2){
            if (x < x2) {x += 10;}
            if (y < y2) {y += 10;}
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop);}
        }
    }
    function clear(){
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }
    
    disableclik(); 
    audio("wingame.mp3")
    animateDrawLine()
    setTimeout (function() {clear(); resetgame(); }, 1000);
}


function resetgame(){
    for (let i = 0; i < 9; i++){
        let square = document.getElementById(string(i));
        square.style.backgroundImage = "";
    }
    selectedsquares = [];
}

