let canvas=document.querySelector(".homecanvas")
let c=canvas.getContext('2d')

let frequency=0.01
let amplitude=50
let increment=frequency
let wavelength=50

//eventlisteners
window.addEventListener("resize",()=>{
    c.clearRect(0,0,canvas.width,canvas.height)
    increment=frequency
})

//functions
function init(){
    c.beginPath()
    c.moveTo(0,canvas.height/2)
    for(let i=0;i<canvas.width;i++){
        c.lineTo(i,(canvas.height/2)-Math.sin(i/wavelength+increment)*amplitude*Math.sin(i/wavelength*20))
    }
    increment+=frequency
    c.strokeStyle="hsl(0, 50%, 50%)"
    c.stroke()
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle="rgba(0,0,50,0.05)"
    c.fillRect(0,0,canvas.width,canvas.height)
    init()
}

animate()
