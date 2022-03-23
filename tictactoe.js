let activeplayer = "X";
let selectedsquares = [];

function placeXorO (Number){
    if (!selectedsquares.some(element => element.includes(Number))) {
        let select = document.getElementById(Number);
    
        if (activeplayer == "X"){ 
            select.setAttribute("background", "X.png");
        }
        else {
            select.setAttribute("background", "O.png");
        }
        
        selectedsquares.push (Number + activeplayer);
        checkwinconditions();
        if (activeplayer == "X"){
            activeplayer= "O";
        }
        else {
            activeplayer = "X";
            
        }
        audio ("place.mp3")
        if (activeplayer == "O"){
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
                console.log(selectedsquares)
            }
        }
    }
}


function checkwinconditions(){
    if (ArrayIncludes("0X", "1X", "2X")) {drawWinline (50, 100, 558, 100)}
    else if (ArrayIncludes("3X", "4X", "5X")) {drawWinline (50, 304, 558, 304)}
    else if (ArrayIncludes("6X", "7X", "8X")) {drawWinline (50, 508, 558, 508)}
    else if (ArrayIncludes("0X", "3X", "6X")) {drawWinline (100, 50, 100, 558)}
    else if (ArrayIncludes("1X","4X", "7X")) {drawWinline (304, 50, 304, 508)}
    else if (ArrayIncludes("2X", "5X", "8X")) {drawWinline (508, 50, 508, 558)}
    else if (ArrayIncludes("6X", "4X", "2X")) {drawWinline (100, 508, 510, 90)}
    else if (ArrayIncludes("0X", "4X", "8X")) {drawWinline (100, 100, 520, 520)}
    else if (ArrayIncludes("0O", "1O", "2O")) {drawWinline (50, 100, 558, 100)}
    else if (ArrayIncludes("3O", "4O", "5O")) {drawWinline (50, 304, 558, 304)}
    else if (ArrayIncludes("6O", "7O", "8O")) {drawWinline (50, 508, 558, 508)}
    else if (ArrayIncludes("0O", "3O", "6O")) {drawWinline (100, 50, 100, 558)}
    else if (ArrayIncludes("1O", "4O", "7O")) {drawWinline (304, 50, 304, 558)}
    else if (ArrayIncludes("2O", "5O", "8O")) {drawWinline (508, 50, 508, 558)}
    else if (ArrayIncludes("6O", "4O", "2O")) {drawWinline (100, 508, 510, 90)}
    else if (ArrayIncludes("0O", "4O", "8O")) {drawWinline (100, 100, 520, 520)}

    else if (selectedsquares.length >= 9){
        audio("tie.mp3")
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

function audio (audioURL){
    let audio= new Audio (audioURL);
    audio.play();
}


function drawWinline(coordx1, coordy1, coordx2, coordy2){
    const canvas = document.getElementById("win-lines");
    const c = canvas.getContext ("2d");
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
        let square = document.getElementById(String(i));
        square.setAttribute("background", "");
    }
    selectedsquares = [];
}

