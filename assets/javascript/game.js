// selectors because I lazy
$(".btn").css("visibility","hidden");
var ls = ["assets/sound/LSSound/ls1.mp3","assets/sound/LSSound/ls2.mp3","assets/sound/LSSound/ls3.mp3","assets/sound/LSSound/ls4.mp3","assets/sound/LSSound/ls5.mp3","assets/sound/LSSound/ls6.mp3","assets/sound/LSSound/ls7.mp3","assets/sound/LSSound/ls8.mp3","assets/sound/LSSound/ls9.mp3","assets/sound/LSSound/ls10.mp3","assets/sound/LSSound/ls11.mp3",]
var card = $(".card");
var announcer = $("#announcer");
var characters = $("#characters");
var player = $("#player");
var fighting = $("#fighting");
var enemies = $("#enemies")
var pmove = $("#pmove")
var emove = $("#emove")

var p = false;
var op= false;

var dead = false;
var specmeter;

var hp;

var obiwan={
    atk: 10,
    hp: 100,
    adratio: 50,
    death: false,
    special: function(target){
        this.hp += 25
    }
}

var sid = {
    atk : 8,
    hp :80,
    adratio:20,
    death: false,
    special: function(target){
        target.hp -= 30
    }
}

var vader = {
    atk : 12,
    hp : 120,
    adratio: 70,
    death: false,
    special: function(target){
        skip = true

    }
}

var luke = {
    atk: 9,
    hp: 90,
    adratio: 40,
    death: false,
    special: function(){

    }
}



$("#obiwan").children("div.card-body").children("div.row.hp").children("h4.points").text(obiwan.hp);
$("#sid").children("div.card-body").children("div.row.hp").children("h4.points").text(sid.hp);
$("#vader").children("div.card-body").children("div.row.hp").children("h4.points").text(vader.hp);
$("#luke").children("div.card-body").children("div.row.hp").children("h4.points").text(luke.hp);

var playerattack = false;
var enemyattack = false;

var pc;
var npc;

var poop;

card.on("click", function(){
    
    // player character select
    
    if(p==false){
        
        switch (this.id){
            case "obiwan":
                pc=obiwan
                break;
            case "sid":
                pc=sid
                break;
            case "vader":
                pc=vader
                break;
            case "luke":
                pc=luke
                break;
        }
        // $(this).append("<div id = 'special' class = 'row'><div class ='special'></div><div class ='special'></div><div class ='special'></div><div class ='special'></div><div class ='special'></div></div>")
        $(this).addClass("player");
        player.append(this);
        p=true;
        enemies.append(characters.contents());
        return;
    }

    // enemy select

    if(op==false && $(this).hasClass("player")==false){
        switch (this.id){
            case "obiwan":
                npc=obiwan
                break;
            case "sid":
                npc=sid
                break;
            case "vader":
                npc=vader
                break;
            case "luke":
                npc=luke
                break;
        }
        // $(this).append("<div id = 'special' class = 'row'><div class ='special'></div><div class ='special'></div><div class ='special'></div><div class ='special'></div><div class ='special'></div></div>")
        $(".btn").css("visibility", "visible")
        $(this).addClass("enemy");
        fighting.append(this);
        op=true;
        return;
    }

})

$("#atkbtn").on("click", function(){
    var damage = attack(pc,npc);
    playerattack = true;
    $(".enemy").children("div.card-body").children("div.row.hp").children("h4.points").text(damage)

})
$("#defbtn").on("click", function(){
    defend(pc);
    
})
$(".btn").on("click", function(){
    clearInterval(poop)
    specmeter++;
    enemyTurn(npc.adratio);
    lightsaber();
    poop = setInterval(function(){
        console.log("clear");
        pmove.empty();
        emove.empty();
    },2000)
})
$(".btn").on("click", function(){
    if(npc.hp<=0){
        deathrattle(npc,fighting);
    }
    if(pc.hp<=0){
        deathrattle(pc,player)
    }
    
})

function special(user){
    user.special()
}
    
function attack(attacker, target){
    
    target.hp -= attacker.atk
    console.log(target.hp)
    if(attacker == pc){
        pmove.text(pc.atk)
    }
    if(attacker == npc){
        emove.text(npc.atk)
    }
    return target.hp
}
function lightsaber(){
    var sound = document.createElement('audio');
    rando = Math.floor(Math.random()*11);
    sound.setAttribute("src", ls[rando]);
    sound.play();

}

function defend(poop){
    if(playerattack == true){
        poop.hp += pc.atk/2;
        $(".enemy").children("div.card-body").children("div.row.hp").children("h4.points").text(poop.hp)
        playerattack = false;
        emove.text("defend: " + pc.atk/2)
        return;
    }
    if(enemyattack == true){
        poop.hp += npc.atk/2;
        $(".player").children("div.card-body").children("div.row.hp").children("h4.points").text(poop.hp)
        console.log(poop.hp)
        enemyattack = false;
        pmove.text("defend: " + npc.atk/2)
        return;
    }
}

function enemyTurn(ratio){
    var choice = Math.floor(Math.random()*100)
    
    if(choice <= ratio){
        enemyattack = true;
        var damage = attack(npc,pc);
        $(".player").children("div.card-body").children("div.row.hp").children("h4.points").text(damage)

    }else{
        console.log("computer defend")
        defend(npc);

    }

    
}
// function special(){

// }

function deathrattle(guy,place){
    var death = document.createElement('audio');
    op = false;
    $(".btn").css("visibility","hidden");
    if(guy == vader){
        death.setAttribute('src', 'assets/sound/nooo.mp3');
        death.play();
        place.empty();
    }
    if(guy == sid){
        
        death.setAttribute('src','assets/sound/palpatineDeath.mp3')
        death.play()
        $(death).on("ended", function(){
            var kill = confirm("Are you sure you want to kill palpatine?")
            
            if(kill == true){
                death.setAttribute("src","assets/sound/realDeath.mp3" )
                death.play()
                place.empty();
            }else{
                special("sid");
            }

        })
    }
    if(guy == luke){
            death.setAttribute("src","assets/sound/lukeDeathrattle.mp3")
            death.play();
            place.empty();
    }
    if(guy == obiwan){
        death.setAttribute("src","assets/sound/obiwanDeathrattle.mp3")
        death.play();
        place.empty();
    }
    
}
