function ID(elementid){
	return document.getElementById(elementid)
}
var player1draws = 0;
var player2draws = 0;
var player2cardsArray= []
var player1cardsArray = [];
ID("start").addEventListener("click",function(){
	ID("draw").style.display = "block";
	ID("startingscreen").style.display = "none";
	// draw begining 7 cards for players

	var times = 0
	var startingDraw = setInterval(function(){
		player1cardsArray.push(randomUnoCard(CardNames,"add",ID("player1cards"),"height:200px",1,1)[0])
		player2cardsArray.push(randomUnoCard(CardNames,"add",ID("player2cards"),"height:200px",1,2)[0])
		times++;
		if(times > 6){
			clearInterval(startingDraw);
		}
	},400)
	//draw current card
	setTimeout(function(){curcard = randomUnoCard(CardNames,"replace",ID("middle"),"height:300px",1,0)},100);
})

function cardclicked(id){
	console.log(id);
	var idfiltered = id.replace("player","")
	var player = parseInt(idfiltered.charAt(0));
	var number = parseInt(idfiltered.substring(1));
	useCard(parseCard(player,number),player);
	console.log(id,idfiltered,player,number);
	
}
function draw(){
	if(parseInt(ID("curplayerholder").innerHTML) === 1){
		if(player1draws < 3){
			player1cardsArray.push(randomUnoCard(CardNames,"add",ID("player1cards"),"height:200px",1,1)[0])
			player1draws++;
		}
	}else{
		if(player2draws < 3){
			player2cardsArray.push(randomUnoCard(CardNames,"add",ID("player2cards"),"height:200px",1,2)[0])
			player2draws++;
		}
	}
}