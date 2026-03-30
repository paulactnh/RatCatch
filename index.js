let des = document.getElementById('des').getContext('2d')

let rat = new Rat(1300, 325, 90, 50, './img/rato1.0.png')
let rat2 = new Rat(1300, 325, 90, 50, './img/rato2.0.png')
let cat = new Cat(10, 325, 85, 99, '../img/andar0.png')

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

let motor = new Audio('./img/motor.wav')
let batida = new Audio('./img/batida.mp3')
motor.volume = 0.5
motor.loop = true
batida.volume = 0.5

let jogar = true
let fase = 1

document.addEventListener('keydown', (e) => {
    // motor.play()
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

function game_over() {
    if (cat.vida <= 0) {
        jogar = false
        motor.pause()
        // música com o jogo parado
    }
}

function ver_fase() { 
    if (cat.pontos > 20 && fase === 1) {
        fase = 2
        
        rat.vel = 4
    } else if (cat.pontos > 40 && fase === 2) {
        fase = 3
        rat.vel = 6
    }
}

function colisao() {
    if (cat.colid(rat)) {
        batida.play()
        rat.recomeca()
        cat.vida -= 1

    }
    console.log('colidiu')
}

function pontuacao() {
    if (cat.point(rat)) {
        cat.pontos += 5
        rat.recomeca()
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
        rat.des_cat()
        cat.des_cat()
        rat2.des_cat()
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
        rat.mov_rat()
        rat.anim('rato1.')
        rat2.mov_rat()
        rat2.anim('rato2.')
        colisao()
        pontuacao()
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