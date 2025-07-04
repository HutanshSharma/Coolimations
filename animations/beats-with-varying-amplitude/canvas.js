let canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight
let c=canvas.getContext('2d')

let frequency=0.01
let amplitude=100
let increment=frequency
let wavelength=100

//eventlisteners
window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    c.clearRect(0,0,canvas.width,canvas.height)
    increment=frequency
    console.log(increment)
})

//functions
function init(){
    c.beginPath()
    c.moveTo(0,window.innerHeight/2)
    for(let i=0;i<window.innerWidth;i++){
        c.lineTo(i,(window.innerHeight/2)-Math.sin(i/wavelength+increment)*amplitude*Math.sin(i/wavelength*20))
    }
    increment+=frequency
    c.strokeStyle="hsl(0, 50%, 50%)"
    c.stroke()
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle="rgba(0,0,0,0.05)"
    c.fillRect(0,0,canvas.width,canvas.height)
    init()
}

animate()
