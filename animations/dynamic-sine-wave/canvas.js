let canvas=document.querySelector("canvas")
let amplitude=document.getElementsByName("amplitude")[0]
let frequency=document.getElementsByName("frequency")[0]
let wavelength=document.getElementsByName("wavelength")[0]
let color=document.getElementsByName("color")[0]
let saturation=document.getElementsByName("saturation")[0]
let lightness=document.getElementsByName("lightness")[0]
let br=document.getElementsByName("br")[0]
let bg=document.getElementsByName("bg")[0]
let bb=document.getElementsByName("bb")[0]
canvas.width=window.innerWidth
canvas.height=window.innerHeight
let c=canvas.getContext('2d')
let increment=frequency.value/1000

//eventlisteners
window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    increment=frequency.value/1000
    c.clearRect(0,0,canvas.width,canvas.height)
})

//functions
function init(){
    c.beginPath()
    c.moveTo(0,window.innerHeight/2)
    for(let i=0;i<window.innerWidth;i++){
        c.lineTo(i,(window.innerHeight/2)-Math.sin(i/wavelength.value+increment)*amplitude.value)
    }
    increment+=frequency.value/1000
    c.strokeStyle=`hsl(${color.value}, ${saturation.value}%, ${lightness.value}%)`
    c.stroke()
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle=`rgba(${br.value},${bg.value},${bb.value},0.05)`
    c.fillRect(0,0,canvas.width,canvas.height)
    init()
}

animate()
