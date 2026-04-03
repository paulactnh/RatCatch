class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

    des_cat(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

}

class Cat extends Obj{

    dir = 0
    vida = 5
    pontos = 0
   

    mov_cat(){
        this.y += this.dir
        if(this.y < 150){
            this.y = 150
        }else if(this.y > 500){
            this.y = 500
        }
    }

    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
          (this.x + this.w > objeto.x)&&
          (this.y < objeto.y + objeto.h)&&
          (this.y + this.h > objeto.y)){
            return true
        }else{
            return false
        }
    }

    point(objeto){
        if(objeto.x < this.x){
            return true
        }else{
            return false
        }
    }

      frame = 0
      tempo = 0
      anim(nome){
        this.tempo +=1
        if(this.tempo > 12){
            this.tempo = 0
            this.frame +=1
        }
        if(this.frame>3){
            this.frame=0
        }
        //cat_001_bg
        this.a = "./img/"+nome+this.frame+".png"
    }
    
}

class Rat extends Obj{

    vel = 3

    recomeca(){
        this.x = Math.floor(Math.random() * (1800 - 1000) + 1000)
        this.y =  Math.floor(Math.random() * (600 - 180) + 180)
    }

    mov_rat(){
        this.x -= this.vel
        if(this.x <= - 200){            
            this.recomeca()         
        }
    }

      frame = 0
      tempo = 0
      anim(nome){
        this.tempo +=1
        if(this.tempo > 12){
            this.tempo = 0
            this.frame +=1
        }
        if(this.frame>2){
            this.frame=0
        }
        //cat_001_bg
        this.a = "./img/"+nome+this.frame+".png"
    }

}




class Text{
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    }
}
