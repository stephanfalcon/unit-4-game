// selectors because I lazy
$(".btn").css("visibility","hidden");

var card = $(".card");
var announcer = $("#announcer");
var characters = $("#characters");
var player = $("#player");
var fighting = $("#fighting");
var enemies = $("#enemies")

var p = false;
var op= false;

var dead = false;
var specmeter;


var obiwan={
    atk: 10,
    hp: 100,
    adratio: 50,
    special: function(){

    }
}

var sid = {
    atk : 8,
    hp :80,
    adratio:20,
    special: function(){

    }
}

var vader = {
    atk : 12,
    hp : 120,
    adratio: 70,
    special: function(){

    }
}

var luke = {
    atk: 9,
    hp: 90,
    adratio: 40,
    special: function(){

    }
}
$("#obiwan").children("div.card-body").children("div.row.hp").children("h4.points").text(obiwan.hp);
$("#sid").children("div.card-body").children("div.row.hp").children("h4.points").text(sid.hp);
$("#vader").children("div.card-body").children("div.row.hp").children("h4.points").text(vader.hp);
$("#luke").children("div.card-body").children("div.row.hp").children("h4.points").text(luke.hp);

var pc;
var npc;

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
        ($().children("div.card-body").children("div.row.hp").children("h4.points").text());
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
        $(".btn").css("visibility", "visible")
        $(this).addClass("enemy");
        fighting.append(this);
        op=true;
        dead = false;
        return;
    }

})
$(".btn").on("click", function(){
    specmeter++;
})
$("#atkbtn").on("click", function(){
    attack(pc,npc);
})
$("#defbtn").on("click", function(){
    defend();
})

function attack(attacker, target){
    
    target.hp -= attacker.atk
    $(".enemy").children("div.card-body").children("div.row.hp").children("h4.points").text(target.hp);
}

function defend(){
    
}
function special(){

}

function deathrattle(guy){
    var death = document.createElement('audio');

    if(guy.id=="vader"){
        death.setAttribute('src', 'assets/sound/nooo.mp3');
        death.play();
        fighting.empty();
    }
    if(guy.id == "sid"){
        death.setAttribute('src','assets/sound/palpatineDeath.mp3')
        death.play()
        $(death).on("ended", function(){
            var kill = confirm("Are you sure you want to kill palpatine?")
            if(kill == true){
                death.setAttribute("src","assets/sound/realDeath.mp3" )
                fighting.empty();
            }else{
                special("sid");
            }

        })
    }
    
}
