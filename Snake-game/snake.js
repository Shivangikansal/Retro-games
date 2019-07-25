// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var score_para = document.querySelector('p');

var width = canvas.width;
var height = canvas.height;

var score = 0;
score_para.textContent = 'Score: ' + score;

function random(value) {
  //var num = Math.floor(Math.random()*(max-min)) + min;
  var num = Math.floor(Math.random()*(value/10))*10
  return num;
}


function isItemInArray(array, item) {
    for (var i = 0; i < array.length-2; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return true;   // Found it
        }
    }
    return false;   // Not found
}

var box = 10;
var initial_length = 5;
var x_min = 20;
var	x_max = canvas.width - 20;
var y_min = 20;
var y_max = canvas.height - 20;
var lose = false;

function Food(x, y, size, color, exists){
	this.x = x;
	this.y = y;
	this.size = 10;
	this.color = 'red';
}
	

Food.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color
	ctx.fillRect(this.x, this.y, 10, 10);
	ctx.fill();
}


function Snake(x, y, dir, color){
	this.x = x;
	this.y = y;
	this.body = [];
	this.direction = dir;
	this.color = 'lawngreen';
	this.init = function() {
		while(this.body.length <= initial_length) {
			this.body.push([this.x, this.y]);
			this.x += box;	
		}
	}
}

Snake.prototype.update = function(food) {
	checkControls(this);
	this.new_head = [this.body[this.body.length-1][0],this.body[this.body.length-1][1]];
	if (this.direction === 'right') {
		this.new_head[0] += box;
		if(this.new_head[0] > width-10){
			this.new_head[0] = 0;
		}
	}
	else if (this.direction === 'left') {
		this.new_head[0] -= box;
		if(this.new_head[0] < 0){
			this.new_head[0] = width-10;
		}
	}
	else if (this.direction === 'up') {
		this.new_head[1] -= box;
		if(this.new_head[1] < 0){
			this.new_head[1] = height-10;
		}
	}
	else if (this.direction === 'down') {
		this.new_head[1] += box;
		if(this.new_head[1] > height-10){
			this.new_head[1] = 0;
		}
	}
	
	if(isItemInArray(this.body, this.new_head)){
		lose = true;
		console.log(snake.new_head);	
	}
	this.body.push(this.new_head);
	this.body.shift();

	//snake eating food
	if((this.new_head[0] === food.x) && (this.new_head[1] === food.y)){
		food.exists = false;
		food.x = random(width);
		food.y = random(height);
		food.exists = true;
		score += 1;
		score_para.textContent = 'Score: ' + score;
		snake.body.unshift([snake.body[0][0], snake.body[0][1]]);
		snake.body.unshift([snake.body[0][0], snake.body[0][1]]);
		snake.body.unshift([snake.body[0][0], snake.body[0][1]]);
	}
}



Snake.prototype.draw = function() {
	for(var i=0; i < this.body.length; i++){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.body[i][0], this.body[i][1], box, box);
		ctx.fill();
	}

}


function checkControls(snake) {
  window.onkeydown = function(e) {
	var changed = 0;
    if (e.keyCode === 65 && snake.direction !== 'right' && snake.direction !== 'left') {							//a
    	snake.direction = 'left';
		changed = 1;
    } 
    else if (e.keyCode === 68 && snake.direction !== 'left'&& snake.direction !== 'right') {					//d
    	snake.direction = 'right';
		changed = 1;
    } 
    else if (e.keyCode === 87 && snake.direction !== 'down'&& snake.direction !== 'up') {				//w
      	snake.direction = 'up'
		changed = 1;
    } 
    else if (e.keyCode === 83 && snake.direction !== 'up' && snake.direction !== 'down') {				//s
      	snake.direction = 'down';
		changed = 1;
    }
	if(changed == 1){
		
	snake.update(g_food);
	}
	
  }
}


var g_food = new Food(random(width), random(height), 10, 'red', true);
var snake = new Snake(100, 200,'right');
snake.init();
function loop() {
	ctx.fillStyle = 'lightgoldenrodyellow';
	ctx.fillRect(0, 0, width, height);


	g_food.draw();
	if(lose === false){
		snake.update(g_food);
	}
	
	snake.draw();
	if (lose === true){
		ctx.fillStyle = 'black';
		ctx.font = "40px Arial";
		ctx.fillText("Game Over!", canvas.width/2 - 100, canvas.height/2);
	}
}

setInterval(loop, 100);
