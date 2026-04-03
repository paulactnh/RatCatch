let des = document.getElementById('des').getContext('2d')

let cat = new Cat(10, 325, 85, 99, '../img/andar0.png')

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

let music = new Audio('./img/music.mp3')
let miau = new Audio('./img/cat_meow.mp3')
let squeak = new Audio('./img/rat_squeak2.mp3')
music.volume = 0.5
music.loop = true
miau.volume = 0.2
let jogar = true
let fase = 1
music.play()


function criarRatos() {
    let lista = []
    
    for (let i = 0; i < 10; i++) {
        let x = Math.floor(Math.random() * (1800 - 1000) + 1000)
        let y = Math.floor(Math.random() * (600 - 180) + 180)

        let tipo =  i % 3 === 0 ? 'rato1.' 
                    : i % 3 === 1 ? 'rato2.' 
                    : 'rato3.'
        let img = './img/' + tipo + '0.png'
        
        let r = new Rat(x, y, 90, 50, img)
        r.tipo = tipo 

        lista.push(r)
    }
    
    return lista
}
let rat = criarRatos()


document.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        cat.dir -= 10
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        cat.dir += 10
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        cat.dir = 0
        } else if (e.key === 's' || e.key === 'ArrowDown') {
        cat.dir = 0
    }
})

document.addEventListener('keydown', (e)=>{
    if (e.key === 'w' || e.key === 'ArrowUp') {
        cat.anim('cima_andar')
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        cat.anim('baixo_andar')
    }
})

function game_over() {
    if (cat.vida <= 0) {
        jogar = false
        music.pause()
        // música com o jogo parado
    }else{music.play()}
}

function ver_fase() { 
    if (cat.pontos > 200 && fase === 1) {
        fase = 2
        
        rat.vel = 4
    } else if (cat.pontos > 400 && fase === 2) {
        fase = 3
        rat.vel = 6
    }
}

function colisao() {
    for (let r of rat) {
        if (cat.colid(r)) {
            r.recomeca()
            squeak.play()
            cat.pontos += 5 
        }
    }
}

function vidas() {
    for(let r of rat){
        if (cat.point(r)) {
            cat.vida -= 0.5
            r.recomeca()
        }
    }
        //     if (cat.point(rat2)) {
//         cat.pontos += 5
//         rat2.recomeca()
//     }
//     if (cat.point(rat3)) {
//         cat.pontos += 5
//         rat3.recomeca()
//     }
}



function desenha() {

    if (jogar) {
        cat.des_cat()
        for (let r of rat) {
            r.des_cat()
        }
        t1.des_text('Pontos: ' + cat.pontos, 1000, 40, 'yellow', '26px Arial')
        t2.des_text('Vidas: ' + cat.vida, 40, 40, 'red', '26px Arial')
        fase_txt.des_text('Fase: ' + fase, 550, 40, 'white', '26px Arial')
    }else{
        t1.des_text('GAME OVER', 450, 350, 'yellow', '60px Arial')
        t2.des_text('Pontuação Final: ' + cat.pontos, 480, 400, 'white', '25px Arial')
    }

}

function atualiza() {
    if (jogar) {
        cat.mov_cat()
        cat.anim('andar')
       for(r  of rat){
        r.mov_rat()
        r.anim(r.tipo)
       }
        colisao()
        vidas()
        ver_fase()
        game_over()
    }
}

function main() {
    des.clearRect(0, 0, 1200, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()