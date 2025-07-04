var canvas=document.querySelector("canvas")
let width=window.innerWidth
let height=window.innerHeight
canvas.width=width
canvas.height=height

let c=canvas.getContext("2d")

function randcolor(){
    let colorarr=['#b9fbc0','#98f5e1','#8eecf5','#90dbf4',
        '#a3c4f3','#cfbaf0','#f1c0e8','#ffcfd2','#fde4cf','#fbf8cc']
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

class circle{
    constructor(radius,lwidth,color){
        this.radius=radius
        this.lwidth=lwidth
        this.x=width/2
        this.y=height/2
        this.velocity=0.0275
        this.radian=Math.random()*Math.PI*2
        this.color=color
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
        this.x+=Math.cos(this.radian)*this.radius
        this.y+=Math.sin(this.radian)*this.radius
        this.draw(lastpoint)
    }
}

let carr=[]
function init(){
    carr=[]
    for(let i=0;i<150;i++){
        let radius=(Math.random()*(1.5-1+1))+1
        let lwidth=randomnumber(2,4)
        let color=randcolor()
        carr.push(new circle(radius,lwidth,color))
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle="rgba(0,0,0,0.08)"
    c.fillRect(0,0,width,height)
    carr.forEach(val=>{
        val.update()
    })
}

init()
animate()

