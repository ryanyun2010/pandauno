
/**********************************************************************
								FUNCTIONS
***********************************************************************/





/*
	Random Uno Card: creates a random uno card and puts it in a element as a <img> tag
	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	cardnames: Array of card names no extension.
	addorreplace: String if "add" it adds to the element if "replace" it changes the element to match the img tag
	element: The element you wish to put the card in
	styles: any inline css styles to be applied to the card.
	ammount: how many cards it creates
	player: player to add to the curcardsnumber

	>> cards: cards that have been added return array
	**PutCardInElement: Helper Function: replaces/adds images
*/

function randomUnoCard(cardnames,addorreplace,element,styles,ammount,player){
	if(player === 1){
		if(player1cardsArray.length>8){
			document.getElementById("player1cards").style.padding= -1*(player1cardsArray.length*100)+"px";
		}
	}else if(player === 2){
		if(player2cardsArray.length>8){
			document.getElementById("player2cards").style.padding= -1*(player2cardsArray.length*100)+"px";
		}
	}
	var cards = [];
	// if statement to check addorreplace
	if(addorreplace == "add"){
		//for loop ammounts time
		for(var i = 0;i<ammount;i++){
			
			// chooses the card
			var card=cardnames[Math.floor(cardnames.length*Math.random())];

			// runs helper function to add elements.
			PutCardInElement(element,addorreplace,card,player,styles);

			// adds card to array
			if(player === 0){}else{
				cards.push(document.getElementById("player"+player+document.getElementById("curcardsholder"+player).innerHTML));
			}
		}
	}else{
		
		//chooses the card		
		var card=cardnames[Math.floor(cardnames.length*Math.random())];

		//runs helper function
		PutCardInElement(element,addorreplace,card,player,styles);

		//checks if its player0/middle
		if(player === 0){}else{
			cards.push(document.getElementById("player"+player+document.getElementById("curcardsholder"+player).innerHTML));
		}
	}
	// returns cards array
	return cards;

}



/*
	Put Card In Element: Helper function for Random Uno Card. Can be used on its own if all arguments are provided.
	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	element: the element to put the card in
	addorreplace: add to the element or replace it?
	card: the cardname without extension to add
	player: the player. 0 = middle card
	styles: styles to put on the card

	>> returns nothing
*/
function PutCardInElement(element,addorreplace,card,player,styles){
	if(addorreplace === "replace"){
		// if statement to check player. 0 = middle.
		if(player === 0){
			//replace element with card id = middlecard
			element.innerHTML='<img src="cards/'+card+'.svg" style="'+styles+'" id = "middlecard">';

		}else if(player === 1){
			// adds one to the current card holder for player 1.
			document.getElementById("curcardsholder1").innerHTML=parseInt(document.getElementById("curcardsholder1").innerHTML)+1;
		
			// replace element with picture of card
			element.innerHTML='<img src="cards/'+card+'.svg" style="'+styles+'"onclick="'+"cardclicked('1"+document.getElementById("curcardsholder1").innerText+"')"+'"'+"id = 'player1"+document.getElementById("curcardsholder1").innerHTML+"'>";

		}else{
			//adds one to the current card holder for player2.
			document.getElementById("curcardsholder2").innerHTML=parseInt(document.getElementById("curcardsholder2").innerHTML)+1;
			
			// replace element with picture.
			element.innerHTML='<img src="cards/'+card+'.svg" style="'+styles+'"onclick="'+"cardclicked('2"+document.getElementById("curcardsholder2").innerText+"')"+'"'+"id = 'player2"+document.getElementById("curcardsholder2").innerHTML+"'>";

		}
	}

	else if(addorreplace = "add"){
		if(player == 1){
			//adds one to the curcard holder for player 1
			document.getElementById("curcardsholder1").innerHTML=parseInt(document.getElementById("curcardsholder1").innerHTML)+1;
		
			//adds the html for the card to the element
			element.innerHTML+='<img src="Cards/'+card+'.svg" style="'+styles+'"onclick="'+"cardclicked('1"+document.getElementById("curcardsholder1").innerText+"')"+'"'+"id = 'player1"+document.getElementById("curcardsholder1").innerHTML+"'>";

		} else{
			//adds one to the curcard holder for player 2
			document.getElementById("curcardsholder2").innerHTML=parseInt(document.getElementById("curcardsholder2").innerHTML)+1;

			//adds the html for the card element
			element.innerHTML+='<img src="Cards/'+card+'.svg" style="'+styles+'"onclick="'+"cardclicked('2"+document.getElementById("curcardsholder2").innerText+"')"+'"'+"id = 'player2"+document.getElementById("curcardsholder2").innerHTML+"'>";



			
			
		}
	}
}	
/*
	Parse Card: Takes a card element and gives you the primary, the secondary and the name of the card in an array
	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	player: the player of the card you want to parse
	number: the number of the card you want to parse

	>> Array []
	   Output Array Format[Name, Primary, Secondary, Player, Number
	]

	**** TODO: CHANGE WILD CODE ****
*/
function parseCard(player,number){
	//checks if middle player === 0
	if(player === 0){
		var element= document.getElementById("middlecard");
	}else{
		// gets the element
	var element=document.getElementById("player"+player+number);}
		// parses the elements source to get the name
	if(element===null){return;}else{
	var elementname = element.src.replace('.svg','').split("/Cards")[1].replace("/",'');}
	// checks all cases. sets the primary/secondary
	if(elementname.includes("+2")){
		var elementsecondary = "+2";
		var elementprimary = elementname.replace("+2","")
	}else if(elementname.includes("Reverse")){
		var elementsecondary = "Reverse";
		var elementprimary = elementname.replace("Reverse","")
	}else if(elementname.includes("Skip")){
		var elementsecondary = "Skip";
		var elementprimary = elementname.replace("Skip","")
	}else if(elementname.includes("Wild")){
		var elementsecondary = "None";
		var elementprimary = "Wild";
	}else if(elementname.includes("0-9")){
		var elementsecondary = "0-9"
		var elementprimary = elementname.replace("0-9",'');
	}
	else{
		var elementsecondary = elementname.match(/\d+/)[0] || 0;
		var elementprimary = elementname.replace(elementsecondary,'');
	}
	//returns the array
	return [elementname,elementprimary,elementsecondary,player,number];
}

/*
	Check Card: Takes 2 parse arrays and checks if you can use them
	-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	
	parsedArray1: array returned from ParseCard when used on middle card.
	parsedArray2: array returned from ParseCard when used on the card you are trying to use.

	>> true or nothing

	**** TODO: Change Wild Code ****
*/

function checkCard(parsedArray1,parsedArray2){
	//start with return value as false
	var temp = false;
	try {



	//check if primary are same
	if(parsedArray1[1]===parsedArray2[1]){
		console.log("Works! Color Same")
		temp = true;
	}

	//check if secondary are same
	if(parsedArray1[2]===parsedArray2[2]){
		console.log("Works! Number Same")
		temp = true;
	}

	//check if first is 0-9
	if(parsedArray1[1].includes("0-9")){
			if(parsedArray2[1].includes("+2")){
				
			}
			else if(parsedArray2[1].includes("Skip")){
				
			}
			else if(parsedArray2[1].includes("Reverse")){
				
			}
			else{
				console.log("Works! 0-9!")
				temp = true;
			}
		}

	//check is second is 0-9
	if(parsedArray2[1].includes("0-9")){
		if(parsedArray1[1].includes("Wild")){}else{
			temp = true;
			console.log("Works!0-9's are great");
		}
	}

	//return temp
	return temp;
}
catch{return;}
}

/*
MoveCard: Takes Player And Number and moves the card to the middle
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

player: player that is moving the csrd
number: number of the card

*/
function moveCard(player,number){
	// parse the player/number
	var parsed = parseCard(player,number);
	
	// remove the card
	var removeCard = document.getElementById("player"+player+number);
	removeCard.parentNode.removeChild(removeCard);
	
	//check the player
	if(player ===1){
		//splice the removedcard out of the cards array
		player1cardsArray.splice(number-1,1);

		//for loop to update the card ids
		for(var i = 0;i<100;i++){
			// change the ids
			try{
			console.log(player1cardsArray[i].id,player1cardsArray[i])
			document.getElementById("player1"+(i+1)).setAttribute("onclick",'cardclicked("'+player+(i+1)+'")');
			document.getElementById("player1"+(i+1)).id="player"+player+(i+1);
			player1cardsArray[i].id="player"+player+(i+1);
			} catch{};
			//update the ids in the array

		}
	}else if(player === 2){
		//splice the removedcard out of the cards array
		player2cardsArray.splice(number-1,1);

		//for loop to update the card ids
		for(var i = 0;i<player2cardsArray.length;i++){
			// change the ids
			if(document.getElementById("player2"+(i+1))===null){}else{
			console.log(player2cardsArray[i].id)
			document.getElementById("player2"+(i+1)).setAttribute("onclick",'cardclicked("'+player+(i+1)+'")');
			document.getElementById("player2"+(i+1)).id="player"+player+(i+1);
			//update the ids in the array
			player2cardsArray[i].id="player"+player+(i+1);
		}

		}
	}
	//create element
	var element = document.createElement("img")

	//change src
	element.src="Cards/"+parsed[0]+".svg";

	//change styles
	element.style.height="300px";

	//add the middlecard id
	element.id = "middlecard";

	//clear the middle
	document.getElementById("middle").innerHTML="";

	//append the element
	document.getElementById("middle").append(element);
}


/*
Use Card: takes a card and player.. changes the turn.. applies any affects the card might use.. uses Move Card to move the card to the middle
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

parsedCardUsed: output of the Parse Card function when used on the card you are trying to use
player: player using the card

>> none
*/

function useCard(parsedCardUsed,player){
	//checks if its the players turn
	if(parseInt(document.getElementById("curplayerholder").innerHTML) === player){

		//gets the middle card parsed
		var parsedCurrentCard = parseCard(0,1);

		//checks the current card agianst the card used
		if(checkCard(parsedCurrentCard,parsedCardUsed)){

			//moves the card used
			moveCard(parsedCardUsed[3],parsedCardUsed[4]);
			player1draws=0;
			player2draws=0;
			//changes the turn holder
			if(player === 1){
				document.getElementById("curplayerholder").innerHTML=2+"";
			}else{
				document.getElementById("curplayerholder").innerHTML=1+"";
			}
			//checks for reverse
			if(parsedCardUsed[0].includes("Reverse")){
				
				document.getElementById("curplayerholder").innerHTML=player;

			}
			//checks for skip
			else if(parsedCardUsed[0].includes("Skip")){
				document.getElementById("curplayerholder").innerHTML=player;

			}
			//checks for +2
			else if(parsedCardUsed[0].includes("+2")){
				if(player === 2){
					randomUnoCard(CardNames,"add",document.getElementById("player1cards"),"height:200px",2,1)
				}else{
					randomUnoCard(CardNames,"add",document.getElementById("player2cards"),"height:200px",2,2)
				}
				document.getElementById("curplayerholder").innerHTML=player;
			}
		}
	}
}


