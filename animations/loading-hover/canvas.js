var canvas=document.querySelector("canvas")
let width=window.innerWidth
let height=window.innerHeight
canvas.width=width
canvas.height=height

let c=canvas.getContext("2d")

function randcolor(){
    let colorarr=['#f72585','#56cfe1','#80ffdb','#7400b8']
    let idx=randomnumber(0,colorarr.length-1)
    return colorarr[idx]
}

function randomnumber(max,min){
    return Math.round(Math.random()*(max-min+1))+min
}

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    init()
})

let mouse={
    x:width/2,
    y:height/2
}

canvas.addEventListener("mousemove",(e)=>{
    mouse.x=e.x
    mouse.y=e.y
})

class circle{
    constructor(radius,lwidth,color){
        this.radius=radius
        this.lwidth=lwidth
        this.x=width/2
        this.y=height/2
        this.velocity=0.025
        this.radian=Math.random()*Math.PI*2
        this.color=color
        this.lastmouse={x:this.x,y:this.y};
    }
    draw(lastpoint){
        c.beginPath()
        c.moveTo(lastpoint.x,lastpoint.y)
        c.lineWidth=this.lwidth
        c.lineTo(this.x,this.y)
        c.strokeStyle=this.color
        c.stroke()
        c.closePath()
    }
    update(){
        let lastpoint={x:this.x,y:this.y}
        this.radian+=this.velocity
        this.lastmouse.x+=(mouse.x-this.lastmouse.x)*0.02
        this.lastmouse.y+=(mouse.y-this.lastmouse.y)*0.02
        this.x=this.lastmouse.x+Math.cos(this.radian)*this.radius
        this.y=this.lastmouse.y+Math.sin(this.radian)*this.radius
        this.draw(lastpoint)
    }
}

let carr=[]
function init(){
    carr=[]
    for(let i=0;i<75;i++){
        let radius=(Math.random()*(150-60+1))+60
        let lwidth=randomnumber(2,4)
        let color=randcolor()
        carr.push(new circle(radius,lwidth,color))
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle="rgba(0,0,0,0.04)"
    c.fillRect(0,0,width,height)
    carr.forEach(val=>{
        val.update()
    })
}

init()
animate()

