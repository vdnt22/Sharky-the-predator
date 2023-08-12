const smallfishes = 50
const foodfishes = 20

const player = document.querySelector('.player')
const player_pos = {
    x: parseInt(window.innerWidth / 2),
    y: parseInt(window.innerHeight / 2)
}
const player_vel = {
    x: 0, y: 0
}
const foods = []

function createsmallfish(){
    for(let i = 0; i < smallfishes; i++){
        const div = document.createElement('div')
        div.classList.add('smallfish')
        div.style.left = Math.random() * 100 + '%'
        div.style.top = Math.random() * 100 + '%'
        document.body.appendChild(div)
    }
}

function generatefood(){
    const div = document.createElement('div')
    div.classList.add('foodfish')
    let x = Math.random() * 100 + '%'
    let y = Math.random() * 100 + '%'
    div.style.left = x
    div.style.top = y
    foods.push({
        fish: div,pos: {
            x, y
        }
    })
    document.body.appendChild(div)
}

function createfoods(){
    for(let i = 0; i < foodfishes; i++){
        generatefood()
    }
}

function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
        return false;
    return true;
}

function checkCollisions(){
    foods.forEach(fish => {
        if(collision(fish.fish, player)){
            fish.fish.remove()
            generatefood()
        }
    })
}

function run(){
    player_pos.x += player_vel.x
    player_pos.y += player_vel.y

    player.style.left = player_pos.x + 'px'
    player.style.bottom = player_pos.y + 'px'
    
    checkCollisions()

    requestAnimationFrame(run)
}

function init(){
    createsmallfish()
    createfoods()
    run()
}

init()

window.addEventListener('keydown', function(e){
    if(e.key == "ArrowUp"){
        player_vel.y = 5
        
    }
    if(e.key == "ArrowDown"){
        player_vel.y = -5
        
    }
    if(e.key == "ArrowLeft"){
        player_vel.x = -5
        
    }
    if(e.key == "ArrowRight"){
        player_vel.x = 5
    
    }
    player.classList.add('active')
})

window.addEventListener('keyup', function(){
    player_vel.x = 0
    player_vel.y = 0
    player.classList.remove('active')
})

