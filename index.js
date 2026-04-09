//imgs/desenhos
let des = document.getElementById('des').getContext('2d')
let menu = new Menu()
let estado = "menu"
let fase = 0
let fundoFase1 = new Image()
fundoFase1.src = './img/scenario1.png'
let fundoFase2 = new Image()
fundoFase2.src = './img/scenario2.png'
let fundoFase3 = new Image()
fundoFase3.src = './img/scenario1.png'
let fundoGameOver = new Image()
fundoGameOver.src = './img/gameOver.png'
let fundoMenu = new Image()
fundoMenu.src = './img/menu.gif'

//-----menu settings------
let piscaTempo = 0
let mostrarTexto = true
let fade = 0
let fadeSaindo = false
let fadeEntrando = false
//------------------------

let cat = new Cat(50, 325, 90, 105, '../img/andar0.png')
cat.danoTempo = 0
cat.nome = 'andar'

let coin = new Image()
coin.src = './img/coin.png'

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

//musica/sons
let music = new Audio('./img/music.mp3')
let miau = new Audio('./img/cat_meow.mp3')
let squeak = new Audio('./img/rat_squeak2.mp3')


//outros
let boss = null
let bossAtivo = false
let faseTextoTempo = 0
let hearts = []







function desenhaVidas() {
    let vida = cat.vida

    if (vida <= 2) {
        if (Math.floor(Date.now() / 200) % 2 === 0) {
            return // não desenha (pisca)
        }
    }

    des.drawImage(hearts[vida], 950, 20, 200, 40)
}





function criarRatos() {
    let lista = []

    for (let i = 0; i < 10; i++) {
        let x = Math.floor(Math.random() * (1800 - 1000) + 1000)
        let y = Math.floor(Math.random() * (600 - 180) + 180)

        let tipo = i % 3 === 0 ? 'rato1.'
            : i % 3 === 1 ? 'rato2.'
                : 'rato3.'
        let img = './img/' + tipo + '0.png'

        let r = new Rat(x, y, 90, 50, img)
        r.tipo = tipo

        lista.push(r)
    }

    return lista
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        cat.dir -= 10
        cat.nome = 'cima_andar'
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        cat.dir += 10
        cat.nome = 'baixo_andar'
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        cat.dir = 0
        cat.nome = 'andar'
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        cat.dir = 0
        cat.nome = 'andar'
    }
})
document.addEventListener('keydown', (e) => {
    if (estado === "menu" && e.key === "Enter") {
        fadeSaindo = true
    }
})


function iniciarJogo() {
    estado = "jogo"
    cat.vida = 5
    cat.pontos = 0
    fase = 1
    rat = criarRatos()

    music.volume = 0.5
    music.loop = true
    miau.volume = 0.2
    music.play()

    for (let i = 0; i <= 5; i++) {
    let img = new Image()
    img.src = './img/hearts' + i + '.png'
    hearts.push(img)
}
}

function game_over() {
    if (cat.vida <= 0) {
        estado = "gameOver"
        music.pause()
    } else { music.play() }
}



function interacaoRatos() {
    for (let r of rat) {

        if (cat.colid(r)) {

            if (r.tipo === 'rato3.') {
                cat.vida -= 1
                miau.currentTime = 0
                miau.play()
            } else {
                cat.pontos += 5
                squeak.play()
            }

            r.recomeca()
        }

        else if (cat.point(r)) {

            if (r.tipo !== 'rato3.') {
                cat.pontos -= 5
            }

            r.recomeca()
        }
    }
}



//-----------FASES------------
function controlarFase() {
    if (cat.pontos >= 10 && fase === 1) {
        fase = 2
        iniciarFase2()
    }
    else if (cat.pontos >= 30 && fase === 2) {  // ajusta pontuação para fase 3
        fase = 3
        iniciarFase3()
    }

    if (fase === 3 && !bossAtivo && cat.pontos >= 70) {
        iniciarBoss() // aqui é chamado quando pontos chegam a 200
    }
}

function iniciarFase2() {
    faseTextoTempo = 120

    // mais ratos e velocidade maior
    rat = criarRatos(30)  // cria 30 ratos
    rat.forEach(r => r.vel = 4)
}

function iniciarFase3() {
    faseTextoTempo = 120

    // ativa fase escura
    fase = 3
    rat = criarRatos(15)   // ratos da fase 3 antes do chefão
    rat.forEach(r => r.vel = 5)

    bossAtivo = false      // chefão ainda não aparece
    boss = new Rat(1200, 300, 200, 120, './img/boss0.png')
    boss.vida = 15
    boss.vel = 2
}

function iniciarBoss() {
    bossAtivo = true
    faseTextoTempo = 120
    rat = [] // remove ratos normais quando o chefão aparece
}



//--------FASE 3 FUNCOES---------
function desenhaFundoComLuz() {
    if (fase !== 3) return

    // fundo escuro
    des.fillStyle = 'rgba(0,0,0,0.9)'
    des.fillRect(0, 0, 1300, 850)

    // círculo de luz ao redor do gato
    des.globalCompositeOperation = 'destination-out'
    des.beginPath()
    des.arc(cat.x + cat.w / 2, cat.y + cat.h / 2, 200, 0, Math.PI * 2)
    des.fill()
    des.globalCompositeOperation = 'source-over'
}

function calculaAlphaObjeto(obj) {
    if (fase !== 3) return 1

    let objX = obj.x + obj.w / 2
    let objY = obj.y + obj.h / 2
    let catX = cat.x + cat.w / 2
    let catY = cat.y + cat.h / 2

    let dx = catX - objX
    let dy = catY - objY
    let distancia = Math.sqrt(dx * dx + dy * dy)

    let raioLuz = 200
    let transicao = 300

    if (distancia < raioLuz) return 1
    else if (distancia > raioLuz + transicao) return 0.2
    else return 1 - 0.8 * ((distancia - raioLuz) / transicao)
}

function desenhaRatos() {
    for (let r of rat) {
        des.globalAlpha = calculaAlphaObjeto(r)
        r.des_cat()
    }
    des.globalAlpha = 1
}



//---------------MENU----------------
  let framesMenu = []

    for (let i = 0; i <= 27; i++) {
        let img = new Image()
        img.src = "./img/gif/frame_" + i + ".gif"
        framesMenu.push(img)
    }



function desenhaMenu(){
    let img = framesMenu[menu.frame]
    if (!img || !img.complete) return

    des.drawImage(img, 0, 0, 1300, 850)
    menu.anim()

    // 🔹 desenha título
    menu.desenhaTitulo()

        piscaTempo++
    if (piscaTempo > 30) {
        mostrarTexto = !mostrarTexto
        piscaTempo = 0
    }

    if (mostrarTexto) {
        des.fillStyle = "white"
        des.font = "40px Silkscreen"
        des.textAlign = "center"
        des.fillText("PRESSIONE ENTER PARA COMEÇAR", 650, 500)
        des.textAlign = "start"
    }
    

    // fade saindo
    if (fadeSaindo) {
        fade += 0.02
        des.fillStyle = "rgba(0,0,0," + fade + ")"
        des.fillRect(0, 0, 1300, 850)

        if (fade >= 1) {
            iniciarJogo()
            fade = 1
            fadeSaindo = false
            fadeEntrando = true
        }
    }
}

// CABEÇALHO DO JOGO
function cabecalho(){
    let largura = 1300;

    // fundo transparente
    des.globalAlpha = 0.5;
    des.fillStyle = 'black';
    des.fillRect(0, 0, largura, 80);
    des.globalAlpha = 1;

    // VIDAS
    des.drawImage(hearts[cat.vida], 20, 20, 180, 40);

    // FASE
    des.font = "30px 'Press Start 2P'";
    des.textAlign = 'center';
    des.fillStyle = "#ae00ff"; 
    des.strokeStyle = "black";
    des.lineWidth = 1;
    des.shadowColor = "rgba(0,0,0,0.5)";
    des.shadowBlur = 3;
    des.fillText('FASE ' + fase, largura / 2, 55);
    des.strokeText('FASE ' + fase, largura / 2, 55);

    // PONTOS
    des.font = "25px 'Press Start 2P'"
    des.textAlign = 'right';
    des.fillStyle = "#FFD700"; // dourado
    des.drawImage(coin, largura - 120, 25, 30, 30);
    des.fillText(cat.pontos, largura - 130, 55);
    des.strokeText(cat.pontos, largura - 130, 55);

    des.textAlign = 'start';
}


function desenhaJogo(){

    cat.des_cat()
    if (!bossAtivo) desenhaRatos()


    if (bossAtivo) {
        boss.des_cat()
        des.fillStyle = 'red'
        des.fillRect(300, 20, boss.vida * 20, 20)
    }

    cabecalho()

    if (faseTextoTempo > 0) {
        des.fillStyle = 'white'
        des.font = '50px Arial'
        des.textAlign = 'center'
        let texto = bossAtivo ? 'CHEFÃO!' : 'FASE ' + fase
        des.fillText(texto, 600, 350)
        des.textAlign = 'start'
        faseTextoTempo-- 
    }

}

function desenhaGameOver() {
    des.drawImage(fundoGameOver,0,0,1300,850)
        t1.des_text('GAME OVER', 450, 350, 'yellow', '60px Arial')
}




function desenha() {
    des.clearRect(0, 0, 1300, 850)

    if (estado === "menu") {
        desenhaMenu()
        return
    }

    else if (estado === "gameover") {
        desenhaGameOver()
        return
    } 
    else if(estado === "jogo"){

    if(fase===1) des.drawImage(fundoFase1,0,0,1300,850)
        else if(fase===2) des.drawImage(fundoFase2,0,0,1300,850)
        else if(fase===3) des.drawImage(fundoFase3,0,0,1300,850)

    desenhaFundoComLuz()

    desenhaJogo()

    if (fadeEntrando) {
        fade -= 0.02

        des.fillStyle = "rgba(0,0,0," + fade + ")"
        des.fillRect(0, 0, 1300, 850)

        if (fade <= 0) {
            fade = 0
            fadeEntrando = false
        }
    }
    }
}


function atualiza() {
    if (estado !== "jogo") return
    cat.mov_cat()
    cat.anim(cat.nome)

    if (!bossAtivo) {
        for (let r of rat) {
            r.mov_rat()
            r.anim(r.tipo)
        }
        interacaoRatos()
    }

    if (bossAtivo) {
        boss.x -= boss.vel

        if (boss.y < cat.y) boss.y += 2
        else boss.y -= 2

        if (cat.colid(boss)) {
            boss.vida -= 1
        }
    }

    controlarFase()

    game_over()
}


function main() {
    des.clearRect(0, 0, 1300, 850)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()