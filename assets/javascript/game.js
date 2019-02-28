var card = $(".card");
var announcer = $("#announcer")
// var obiAttack = ;
// var vaderAttack = ;
// var sidAttack = ;
// var lukeAttack= ;
// var charat
var hp;

select();

console.log("select");

function select(){
    announcer.text("choose your character")
    
    $("#characters").children().on("click", function(){
        console.log("poop")
        start(this);

    })
    
}

function start(selected){  
    
    console.log("start")
    
    $("#player").append(selected);

    $("#enemies").append($("#characters").contents());

    $("#announcer").text("Pick an enemy to fight");
    
    $("#enemies").children().on("click", function(){
        $("#fighting").append(this);
        console.log("fighting enemey" + this );
        fight(this);
    })

    
}  
    
    
    




function fight(op){
    
    // $("#announcer").text("Your are fighting" + $opid.
    console.log("fight")
    $(op).on("click", function(){
        attack(this)
        $(op).children("div.card-body").children("div.row.hp").children("h4.points").text(hp)
    })

}

function attack(target){
    hp = parseInt($(target).children("div.card-body").children("div.row.hp").children("h4.points").text());

    hp = hp - 10;
    console.log(hp)
    return hp;
    // $(target).children("div.card-body").children("div.row.hp").children("h4.points").text(hp);
    
}