const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// if innerWidth > innerHeight:
canvas.height = innerHeight/1.5
canvas.width = innerWidth
//Class
class ColorBoard{
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update(){
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Controler{
    
}
//Set
const color_list = []
const color_code_list = []

function makeColor(){
    // setInterval : 지정한 시간 단위로 반복
    setInterval(()=>{
        const radius = canvas.width/8

        let x = radius
        let y = canvas.height+radius

        // 색상 랜덤화
        const color = `rgba(${Math.random()*255},
        ${Math.random()*255},
        ${Math.random()*255},0.5)`

        const velocity = {
            x : 0, y : -1
        }
        // 생성
        color_list.push(new ColorBoard(x,y,radius,color,velocity))
        color_list.push(new ColorBoard(x+2*radius,y,radius,color,velocity))
        color_list.push(new ColorBoard(x+4*radius,y,radius,color,velocity))
        color_list.push(new ColorBoard(x+6*radius,y,radius,color,velocity))
    }, canvas.width*4)
}


//animation
let animationID
function animate(){
    animationID = requestAnimationFrame(animate)
    // 해당 영역, 불투명도로 잔상 생성
    c.fillStyle = '#FFFFFF'
    c.fillRect(0,0,canvas.width,canvas.height)

    color_list.forEach((colorBoard, index) => {
        colorBoard.update()

        if (colorBoard.y + colorBoard.radius < 0){
            setTimeout(() =>{
                color_list.shift()
                // console.log(color_list.length)
            }, 0)
        }

    })
}

makeColor()
animate()