	

	//code for arrow navigation; moved over from index.html

	let currentScreenPosition;
	let slidePosition;

		//disable slide arrow control ~~ for now

		if(activeKey === 'ArrowLeft') {
			if(slidePosition > 1){
			 slidePosition--;
			animateFromArrows()
			}
		}

		if(activeKey === 'ArrowRight') {
			if(slidePosition < 7){
			 slidePosition++;
			animateFromArrows();
			}
			// arrowActive = true;
			//console.log(activeKey);
		}

			//disable left/right arrow keys for now
			// if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
			// 	//arrowActive = false;
			// 	sound.fade(1,0,300);
			// 	sound.onfade;
			// }

			// currentScreenPosition = keyData[activeKey].pos; //for square
			// slidePosition = keyData[activeKey].num;  //update to new obj for arrow functions;

	function getCoorespKey(num){ //if using arrows to navigate
			switch(num) {
			case 1 : 
				return 'a';
				break;

			case 2 :
				return 's';
				break;

			case 3 :
				return 'd';
				break;

			case 4 :
				return 'f';
				break;

			case 5 :
				return 'g';
				break;

			case 6 :
				return 'h';
				break;

			case 7 :
				return 'j';
				break;

			default : 
				console.log("not cooresponding key");
			;
		}

	}

	move slide by left and right arrows ~~ later feature fix
	function animateFromArrows(){

		let coorKey = getCoorespKey(slidePosition);

		sound = new Howl({
			src: keyData[coorKey].src[register],
			onfade: function(){
				console.log('faded!');
				this.stop();
			}
		});

		sound.play();

		let x =  window.globals.calcPosition(slidePosition);
		window.globals.tween(x);
	}