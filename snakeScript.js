var xc = [50,30,10];
var yc = [490, 490,490];

  		
var xpoint = 0; 
var ypoint = 0;
generateRandomCooradinates();

var canvas = document.getElementById('myCanvas');
var c = canvas.getContext('2d');
vdir = 0;
drawPoint();

var global_points = 0;
window.onload = draw();

function generateRandomCooradinates(){
	xpoint = getRandomArbitrary(1,49);
	if (xpoint%2==0){
		xpoint +=1;
	}

	ypoint = getRandomArbitrary(1,49);
	if (ypoint%2==0){
		ypoint +=1;
	}
	xpoint *= 10;
	ypoint *= 10;
}

function restart_game(){
	window.alert("Game Over. Your Score : "+ global_points);
	global_points = 0;
	xc = [50,30,10];
	yc = [490, 490,490];
	vdir = 0;

}


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function drawPoint(){

	c.beginPath();
	c.arc(xpoint, ypoint, 10 , 0, 2 * Math.PI, false);
	c.fillStyle = "red";
	c.fill();
}

function transferPoints(){
	for (var j = xc.length-1; j>0; j--){
		xc[j] = xc[j-1];
		yc[j] = yc[j-1];
	}
}

function selfColiding( t1, t2){
	for(var i = 0; i<xc.length; i++){
		if (t1==xc[i] && t2 ==yc[i]){
			return true;
		}
	}
	return false;
}
		
function drawCircle(){
			
	c.clearRect(0,0, canvas.width,canvas.height);

	drawPoint();

	transferPoints();

	if(vdir==0){
		//console.log("HI Right");
		//i'll transfer the coordinates to other points
		if(xc[0]+20 > canvas.width || selfColiding(xc[0]+20, yc[0])) {
			restart_game();
			generateRandomCooradinates();
		}

		else if (xc[0]+20== xpoint && yc[0] ==ypoint){
			xc.unshift(xpoint);
			yc.unshift(ypoint);
			generateRandomCooradinates();
			global_points += 20;
		}
		else{
			xc[0] = (xc[0]+20);
		}

	}

	else if(vdir==1){
			//console.log("HI Down");
			if(yc[0]+20 > canvas.height || selfColiding(xc[0], yc[0]+20)){
				restart_game();
				generateRandomCooradinates();
			}

			
			else if (yc[0]+20== ypoint && xc[0] == xpoint){
				xc.unshift(xpoint);
				yc.unshift(ypoint);
				generateRandomCooradinates();
				global_points += 20;
			}
			else{
				yc[0] = (yc[0]+20);
			}
	}

	else if(vdir==2){
			//console.log("HI Up");
			if (yc[0]-20<0 || selfColiding(xc[0], yc[0]-20)){
				restart_game();
				generateRandomCooradinates();
				
			}

			
			else if (yc[0]-20 == ypoint && xc[0] ==xpoint){
				xc.unshift(xpoint);
				yc.unshift(ypoint);	  					
				generateRandomCooradinates();
				global_points += 20;
			}
			else {
				yc[0] = yc[0]-20;
			}
	}

	else if(vdir==3){
		//left
		if (xc[0]-20<0 || selfColiding(xc[0]-20, yc[0])){
					restart_game();
					generateRandomCooradinates();
			}

		

		else if (xc[0]-20== xpoint && yc[0] ==ypoint){
			xc.unshift(xpoint);
			yc.unshift(ypoint);
			generateRandomCooradinates();
			global_points += 20;
		}
		else {
			xc[0] = xc[0]-20;
		}
	}


	for(var i = 0; i< xc.length; i++){
			c.beginPath();
			c.arc(xc[i], yc[i], 10 , 0, 2 * Math.PI, false);
			c.fillStyle = "#222";
			c.fill();
			}


	setTimeout(function(){drawCircle()}, 60);			 	
}

		
//on window.load this is called 
function draw(){

	
  	window.addEventListener('keydown', function(e){

    if (e.keyCode == '38') {
        // up arrow
        if (vdir!=2 && vdir!= 1){	
       	vdir = 2;	
       }
    }
    else if (e.keyCode == '40') {
        // down arrow

        if (vdir!=1 && vdir!= 2){
       		vdir = 1;	
       	}
        
    }
    else if (e.keyCode == '37') {
       // left arrow
       if (vdir!=3 && vdir!= 0){
       	vdir = 3;	
       }
    }
    else if (e.keyCode == '39') {
       // right arrow
       if (vdir!=0 && vdir!= 3){
       	vdir = 0;	
       }
       
    }

  	});

	drawCircle(0);
  	
}