// selectors because I lazy
var card = $(".card");
var announcer = $("#announcer");
var characters = $("#characters");
var player = $("#player");
var fighting = $("#fighting");
var enemies = $("#enemies")

var turn = 0;

var plr;
var ene;

var playerHp ;
var opHp ;

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

var darth = {
    atk : 12,
    hp : 120,
    adratio: 70,
    special: function(){

    }
}

var luke = {
    atk: 90,
    hp: 90,
    adratio: 40,
    special: function(){

    }
}

$("#atkbtn").on("click", function(){
    attack(ene);
})

card.on("click", function(){
    // player character select

    if(p==false){
        $(this).addClass("player");
        player.append(this);
        p=true;
        plr = this;
        enemies.append(characters.contents());
        return;
    }

    // enemy select

    if(op==false && $(this).hasClass("player")==false){
        $(this).addClass("enemy");
        fighting.append(this);
        op=true;
        ene = this;
        dead = false;
        return;
    }

    // if(op == true && $(this).hasClass("enemy") == true){
        
    //     attack(this);
        
    //     if(dead == true){
    //         deathrattle(this);
            

            
    //         op = false;
    //         return;
    //     }
    //     return;
    // }
})


$(".btn").on("click", function(){
    specmeter++;
})
function attack(enemy){
    
    

    console.log(plr)
    switch (plr.id){
        case "obiwan":
            opHp = parseInt($(enemy).children("div.card-body").children("div.row.hp").children("h4.points").text());
            opHp -=  obiwan.atk
            $(enemy).children("div.card-body").children("div.row.hp").children("h4.points").text(opHp)
            if(opHp <= 0){
                dead = true
            }
            break;
        case "sid":
            opHp = parseInt($(enemy).children("div.card-body").children("div.row.hp").children("h4.points").text());
            opHp -=  sid.atk
            $(enemy).children("div.card-body").children("div.row.hp").children("h4.points").text(opHp)
            if(opHp <= 0){
                dead = true
            }
            break;
        case "darth":
            opHp = parseInt($(enemy).children("div.card-body").children("div.row.hp").children("h4.points").text());
            opHp -=  darth.atk
            $(enemy).children("div.card-body").children("div.row.hp").children("h4.points").text(opHp)
            if(opHp <= 0){
                dead = true
            }
            break;
        case "luke":
            opHp = parseInt($(enemy).children("div.card-body").children("div.row.hp").children("h4.points").text());
            opHp -=  luke.atk
            $(enemy).children("div.card-body").children("div.row.hp").children("h4.points").text(opHp)
            if(opHp <= 0){
                dead = true
            }
            break;
    }
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

// card.on("click",".enemy" function(){

// })


// function select(){

//         if(p==false){
            
//             card.on("click", function(){      
                
//                 if($(this).hasClass("enemy") == false){
//                     $(this).addClass("player");
//                     if(player.children().length == 0){
//                         player.append(this);
//                         p=true;
                        
//                     }
//                 }

                
//             })

//            for(i in characters.contents().length){
//                 console.log(this)
//             }
//             start();
//             console.log("end")     
            
//         }
// }



function start(){
    select();

    


    // 
    // enemies.append(characters.contents())
    // announcer.text("choose an opponent")
    // console.log(playerHp);
    // if(fighting.children().length == 0){
        
        
// }

// function fight(op){

}