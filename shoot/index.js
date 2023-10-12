const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector('#score')
const startButtonEl = document.querySelector('#startButton')
const modalEl = document.querySelector('#scoreBoard')
const BoardScoreEl = document.querySelector('#BoardScore')

class Player {
    constructor(x,y,radius,color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Bullet {
    constructor(x,y,radius,color, velocity){
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

class Enemy {
    constructor(x,y,radius,color, velocity){
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
const friction = 0.97
class Particle {
    constructor(x,y,radius,color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }
    draw(){
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }
    update(){
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.01
    }
}

const x = canvas.width/2
const y = canvas.height/2

let player = new Player(x,y, 20, '#ffffff')
let bullets = []
let enemies = []
let particles = []
let score = 0

function init(){
    player = new Player(x,y, 20, '#ffffff')
    bullets = []
    enemies = []
    particles = []
    score = 0
    scoreEl.innerHTML = score
}

let frame = 0
function spawnEnemy(){
    // setInterval : 끝에 지정한 시간 단위로 반복, 다른 페이지를 보고있어도 작동
    // 그래서 프래임으로 애니메이션 동작할 때만 타이머 흐르게 변경
    if (frame%60===0){
        const radius = Math.random() * 30 +10
        let x
        let y
        if(Math.random()<0.5){
            x = Math.random() < 0.5 ? 0-radius : canvas.width+radius
            y = Math.random() * canvas.height
        }else{
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0-radius : canvas.height+radius
        }
        // 색상 랜덤화
        const color = `hsl(${Math.random()*360}, 50%, 50%)`
        const angle = Math.atan2(
            y - canvas.height/2,
            x - canvas.width/2)
        const velocity = {
            x: -Math.cos(angle),
            y: -Math.sin(angle)
        }
        enemies.push(new Enemy(x,y,radius,color,velocity))
    }
}


let animationID
function animate(){
    frame +=1

    spawnEnemy()
    animationID = requestAnimationFrame(animate)
    // 해당 영역, 불투명도로 잔상 생성
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0,0,canvas.width,canvas.height)
    
    player.draw()
    bullets.forEach((bullet, index)=>{
        bullet.update()
        // 화면을 벗어나면 제외
        if (bullet.x + bullet.radius <0 || 
            bullet.x - bullet.radius > canvas.width ||
            bullet.y + bullet.radius < 0 ||
            bullet.y - bullet.radius > canvas.height){
            setTimeout(() =>{
                bullets.splice(index,1)
            }, 0)
            
        }
    })
    
    enemies.forEach((enemy, index) => {
        enemy.update()

        const p_e_d = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (p_e_d - enemy.radius - player.radius < 0){
            // 해당 애니메이션 종료 game over
            cancelAnimationFrame(animationID)
            modalEl.style.display = 'flex'
            BoardScoreEl.innerHTML = score
        }
        bullets.forEach((bullet, bulletindex) => {
            const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y)
            // 총알과 적 충돌 처리
            if (dist - enemy.radius - bullet.radius < 1){
                // 점수 추가
                score += 100
                scoreEl.innerHTML = score
                // 입자 생성
                for (let i=0; i< enemy.radius; i++){
                    particles.push(new Particle(
                        bullet.x,bullet.y,
                        Math.random()*3+1, 
                        enemy.color, 
                        {x: (Math.random()-0.5)*Math.random()*enemy.radius,
                        y: (Math.random()-0.5)*Math.random()*enemy.radius}
                        ))
                }
                if(enemy.radius -10 >10){
                    enemy.radius -= 10
                }else{
                    setTimeout(()=>{
                        enemies.splice(index,1)
                        bullets.splice(bulletindex,1)
                    },0)
                }
            }
        });

    });

    particles.forEach((particle, index) =>{
        if (particle.alpha <=0){
            particles.splice(index,1)
        } else{
            particle.update()
        }
    })
}

addEventListener("click",(event)=>{
    const angle = Math.atan2(
        event.clientY - canvas.height/2,
        event.clientX - canvas.width/2)
    const velocity = {
        x: Math.cos(angle)*4,
        y: Math.sin(angle)*4
    }
    bullets.push(new Bullet(
        canvas.width/2,
        canvas.height/2,
        5, 'white',
        velocity
    ))

})

startButtonEl.addEventListener('click', () =>{
    init()
    
    animate()
    modalEl.style.display = 'none'
})

