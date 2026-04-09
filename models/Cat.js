class Obj {
    constructor(x, y, w, h, src) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.img = new Image()
        this.img.src = src
        this.danoTempo = 0
    }

    des_cat() {
        if (this.danoTempo > 0) {
            des.globalAlpha = 0.5
            this.danoTempo--
        }
        des.drawImage(this.img, this.x, this.y, this.w, this.h)
        des.globalAlpha = 1
    }

    setImagem(src) {
        if (this.img.src !== src) {
            this.img.src = src
        }
    }
}

class Cat extends Obj {
    dir = 0
    vida = 5
    pontos = 0
    frame = 0
    tempo = 0

    mov_cat() {
        this.y += this.dir
        if(this.y < 150) this.y = 150
        else if(this.y > 530) this.y = 530
    }

    colid(obj) {
        return (this.x < obj.x + obj.w &&
                this.x + this.w > obj.x &&
                this.y < obj.y + obj.h &&
                this.y + this.h > obj.y)
    }

    point(obj) {
        return obj.x < this.x
    }

    anim(nome) {
        if(nome === 'cima_andar' || nome === 'baixo_andar'){
            this.w = 70
            this.h = 120
        } else if(nome === 'andar'){
            this.w = 90
            this.h = 105
        }

        this.tempo++
        if(this.tempo > 12){
            this.tempo = 0
            this.frame++
        }
        if(this.frame > 3) this.frame = 0

        this.setImagem("./img/"+nome+this.frame+".png")
    }
}

class Rat extends Obj {
    vel = 3
    frame = 0
    tempo = 0

    recomeca() {
        this.x = Math.floor(Math.random() * (1800 - 1000) + 1000)
        this.y = Math.floor(Math.random() * (630 - 210) + 210)
    }

    mov_rat() {
        this.x -= this.vel
        if(this.x <= -200) this.recomeca()
    }

    anim(nome) {
        this.tempo++
        if(this.tempo > 12){
            this.tempo = 0
            this.frame++
        }
        if(this.frame > 2) this.frame = 0

        this.setImagem("./img/"+nome+this.frame+".png")
    }
}

class Text {
    des_text(text, x, y, cor, font){
        des.fillStyle = cor
        des.font = font
        des.fillText(text, x, y)
    }
}

class Menu{
    constructor(){
        this.frame = 0
        this.tempo = 0
    }

  anim() {
    this.tempo++

    if (this.tempo > 10) {
        this.tempo = 0
        this.frame++
    }

    if (this.frame >= 27) this.frame = 0
  }

  desenhaTitulo() {
    let texto = "Rat Catch"

    // sombra 
    des.shadowColor = "black"
    des.shadowBlur = 15
    des.shadowOffsetX = 5
    des.shadowOffsetY = 5

    //  gradiente do título
    let grad = des.createLinearGradient(0, 150, 0, 270) 
    grad.addColorStop(0, "#eeff00")   
    grad.addColorStop(1, "#d67432") 
    des.fillStyle = grad

    // fonte e alinhamento
    des.font = '120px "Silkscreen"'
    des.textAlign = "center"
    des.fillText(texto, 650, 240)

    //  reset sombra
    des.shadowColor = "transparent"
    des.shadowBlur = 0
    des.shadowOffsetX = 0
    des.shadowOffsetY = 0
}


   
}
