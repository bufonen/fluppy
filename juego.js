var contexto = document.getElementById("lienzoJuego")
var ctx = contexto.getContext("2d")
var WIDTH = 257;
var HEIGHT = 550;
var CANVAS_WIDTH = 257;
var CANVAS_HEIGHT = 550;
contexto.width = WIDTH;
contexto.height = HEIGHT;
//variables
var score = 0
var FPS = 60
var gravedad = 1.5
var personaje = {
    x:50,
    y:150,
    w:50,
    h:50

}
var tuberias = new Array()
tuberias[0] = {
    x:contexto.width,
    y:0
}

//variables audios
var punto = new Audio()
punto.src = "audios/punto2.ogg"
//Variables imagenes
var pajaro3 = new Image()
pajaro3.src = "imagenes/pajaro3.png"

var fondo4 = new Image()
fondo4.src = "imagenes/fondo4.jpg"

var tuboarriba7 = new Image()
tuboarriba7.src = "imagenes/tuboarriba7.png"

var tuboabajo7 = new Image()
tuboabajo7.src = "imagenes/tuboabajo7.png"

var suelo2 = new Image()
suelo2.src = "imagenes/suelo2.png"

//control
function presionar(){
    personaje.y -= 35
}
resize()
function resize(){
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;

    contexto.width = WIDTH;
    contexto.height = HEIGHT;

    contexto.style.height = ""+ CANVAS_HEIGHT+"px";

}

//bucle
setInterval(loop,1000/FPS)
function loop(){
    ctx.clearRect(0,0,257,550)
    //fondo (drawImage solo se puede usar cuando anteriormente se ha usado "Image")
    ctx.drawImage(fondo4,0,0)
    ctx.drawImage(suelo2,0,contexto.height - suelo2.height)
    //personaje
    ctx.drawImage(pajaro3,personaje.x,personaje.y)
    //tuberias
    for(var i= 0; i < tuberias.length; i++){
        var constante = tuboarriba7.height + 150
        ctx.drawImage(tuboarriba7,tuberias[i].x,tuberias[i].y)
        ctx.drawImage(tuboabajo7,tuberias[i].x,tuberias[i].y + constante)
        tuberias[i].x--

        if(tuberias[i].y + tuboarriba7.height < 80){
            tuberias[i].y = 0
        }

        if(tuberias[i].x == 60){
            tuberias.push({
                x:contexto.width,
                y:Math.floor(Math.random()*tuboarriba7.height) - tuboarriba7.height
            })
        }
        //colisiones
        if(personaje.x + pajaro3.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuboarriba7.width &&
            (personaje.y <= tuberias[i].y + tuboarriba7.height ||
                personaje.y + pajaro3.height >= tuberias[i].y + constante)
                || personaje.y + pajaro3.height >= contexto.height - suelo2.height){
            location.reload()
        }
        if(tuberias[i].x == 50){
            score++
            punto.play()
        }
    }
    

    //condiciones
    personaje.y += gravedad
    //score
    ctx.fillStyle = "rgba(0,0,0,1"
    ctx.font = "25px Arial"
    ctx.fillText("Score: " + score,10,contexto.height - 40)
}

//eventos
window.addEventListener("resize",resize)
window.addEventListener("keydown",presionar)