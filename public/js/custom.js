	window.globals = {
		start: (window.innerWidth * 0.23),
		end: (window.innerWidth * 0.81),
		conflict: true
	}

	let keyData = {
			KeyA: {
		  		src: [{note: 'F', track: 'trombone/long/fLong.mp3'}, {note: 'B Flat', track: 'trombone/long/bFlatHighLong.mp3'},{note: 'B Flat', track: 'trombone/long/bFlatLong.mp3'}],
				num: 1,
				key: 'KeyA',
				pressed: false
			},
			KeyS: {
		  		src: [{note: 'E' , track: 'trombone/long/eLong.mp3'}, {note: 'A', track: 'trombone/long/aLong.mp3'}, {note: 'A', track: 'trombone/long/aLowLong.mp3'}],
				num: 2,
				key: 'KeyS',
				pressed: false
			},
			KeyD: {
		  		src: [{note: 'E Flat', track: 'trombone/long/eFlatLong.mp3'}, {note: 'A Flat', track: 'trombone/long/aFlatLong.mp3'}, {note: 'A Flat', track: 'trombone/long/aFlatLowLong.mp3'}],
				num: 3,
				key: 'KeyD',
				pressed: false
			},
			KeyF: {
		  		src: [{note: 'D', track: 'trombone/long/dLong.mp3'}, {note: 'G', track: 'trombone/long/gLong.mp3'}, {note: 'G', track: 'trombone/long/gLowLong.mp3'}],
				num: 4,
				key: 'KeyF',
				pressed: false
			},
			KeyG: {
		  		src: [{note: 'D Flat', track: 'trombone/long/dFlatLong.mp3'}, {note: 'G Flat', track: 'trombone/long/gFlatLong.mp3'}, {note: 'G Flat', track: 'trombone/long/gFlatLowLong.mp3'}],
				num: 5,
				key: 'KeyG',
				pressed: false
			},
			KeyH: {
		  		src: [{note: 'C', track: 'trombone/long/cLong.mp3'}, {note: 'F', track: 'trombone/long/fLong.mp3'}, {note: 'F', track: 'trombone/long/fLowLong.mp3'}],		
				num: 6,
				key: 'KeyH',
				pressed: false
			},
			KeyJ: {
		  		src: [{note: 'B', track: 'trombone/long/bLong.mp3'}, {note: 'E', track: 'trombone/long/eLong.mp3'}, {note: 'E', track: 'trombone/long/eLowLong.mp3'}],  			
				num: 7,
				key: 'KeyJ',
				pressed: false
			},
			ArrowLeft: {
				key: 'ArrowLeft',
				pressed: false
			},
			ArrowRight: {
				key: 'ArrowRight',
				pressed: false
			}
		};

	let activeKey; //most recent key down
	let soundKeys = 0; //track pressed sound keys 
	let sound;
	let register = 0; //note ranges
	let sliding = false; //sliding mouse
	let coorKey; //corresponding 'key' 
	let activeSound = false; //active sound if mousedown
	let pressedKeys = false; //tracking pressed keys
	
	let mouseUp; 
	let mouseDown;
	let mouseMove;
	let keyDown;
	let keyUp;

	let timeoutID;

	window.onload = function(){

		mouseDown = document.addEventListener('mousedown', handler);
		mouseMove = document.addEventListener('mousemove', handler);
		mouseUp = document.addEventListener('mouseup', handler);
		keyDown = document.addEventListener('keydown', handler);
		keyUp = document.addEventListener('keyup', handler);
		arrowKey = document.addEventListener('keydown', handler);
		// pointerDown = document.addEventListener('pointerdown', handler); // remove pointer events for now
		// pointerMove = document.addEventListener('pointermove', handler);
		// pointerUp = document.addEventListener('pointerup', handler);

		document.querySelector('#info').addEventListener('click', () => {
			const containerRow = document.querySelector('.row');
			containerRow.classList.contains('hide') ? containerRow.classList.remove('hide') : containerRow.classList.add('hide');
		})

		document.addEventListener('keydown', (e)=> { //listen on key down for keys pressed
			if(keyData[e.code]) {
				keyData[e.code].pressed = true;
				pressedKeys = true;
			}
		})

		document.addEventListener('keyup', (e)=> { //listen on key up for keys pressed
			pressedKeys = false;
			if(keyData[e.code]) {
				keyData[e.code].pressed = false;
			}

			for (const [key, value] of Object.entries(keyData)) {
				 if(value['pressed'] == true){
			 		pressedKeys = true;
				 }
			}
		})
	} //end window.onload


	//KEYBOARD EVENT FUNCTIONS

	function callKeyE(event) { //key "router"
			if ((event.code === 'ArrowLeft') || (event.code === 'ArrowRight')){
		    	(event.type === 'keydown') ? arrowSlide(event.code) : callKeyRelease(activeKey); 
		    	return;
		    } else

		    if(keyData[event.code] && (!event.getModifierState('Meta'))) {
				(event.type === 'keydown') ? callKeyMovement(event.code) : callKeyRelease(event.code);
				return;
			} 
	}

	function callKeyMovement(keyed) {  //call slide postition movement based off key
		clearCounter();
		activeKey = keyed; //active sound key
					soundKeys++; //pressed sound key count
					if(soundKeys > 1){   //prevent sound overlap
						soundKeys--;
						sound.fade(1,0,300);  
					} 
					playSound(activeKey);
					//slide animation
					window.globals.moveSlide(keyData[activeKey].num);
					return;
	}

	function callKeyRelease(released){  //if key released
		if((released === activeKey)){
				soundKeys--;
				pressedKey = false;
				sound.fade(1,0,300);
				activeKey = null;
				note.innerHTML = '';
			}
			startCounter();
			return;
	}

	//ARROW KEY FUNCTIONS

	function arrowSlide(arrow) { //left right arrow slide controls
		clearCounter();
		let coorKey = getKey(window.globals.getSlideX());
		let coorNum = keyData[coorKey].num;
		let nextPos = getStep(arrow, keyData[coorKey].num);

		coorNum = nextPos;

		let objArr = Object.values(keyData);
		let nextKey;

		for(var i = 0; i < objArr.length; i++){
			if(objArr[i].num === coorNum){
				nextKey = objArr[i].key;
			}
		}
		callKeyMovement(nextKey);
		return;
	}

	//MOUSE EVENT HANDLERS

	function callMouseE(event) { //mouse "router"
		if(event.button === 0){
			if(event.type === 'mousedown' || event.type === "pointerdown"){
				clearCounter();
				callMouseDown(event);
				return;
			} else if(event.type === 'mousemove' || event.type === "pointermove"){
				callMouseMove(event);
				return;
			} else if(event.type === 'mouseup' || event.type === "pointerup") {
				callMouseUp(event);	
				startCounter();
				return;
			} 
		} 
	} 
	

	function callMouseDown(e) {  //on mouse down - mainly sound handler
		if(soundKeys === 0) {  
			sliding = true;
			window.globals.conflict = false;
			if(e.offsetX > window.globals.start && e.offsetX < window.globals.end) {
				if(activeSound){	
					sound.fade(1,0,200);
				}
				activeKey = getKey(e.offsetX);
				playSound(activeKey);
				return;
			} 
		} else {
			window.globals.conflict = true;
			sliding = false;
			return;
		}
	}

	//MOUSE EVENT FUNCTIONS

	function callMouseMove(e) {  //on mouse move - cooresponding sound handler (movement handled in paperscript)
		if(soundKeys === 0){	
			if(sliding === true){
				window.globals.conflict = false; //disable paperjs from moving slide
				if(e.offsetX > window.globals.start && e.offsetX < window.globals.end){
					coorKey = getKey(e.offsetX);

					if(coorKey != activeKey){
						sound.fade(1,0,300);
						activeKey = coorKey; 
						playSound(activeKey);
						return;	
					}			
				}else {  //if outside side bounds
					window.globals.conflict = true;
					console.log("mousemove not slide not moving // out of bounds " + sliding);
					return;
				}
			}
		}
	}

	function callMouseUp(e) {  // on mouse up
		if(sliding){
		sliding = false;
		window.globals.conflict = true;
		sound.fade(1,0,200);
		activeKey = null;
		}
		note.innerHTML = '';
		return;
	}
	
	//SOUND FUNCTIONS

	function playSound(key) {  //play sound
		sound = new Howl({
			src: keyData[key].src[register].track,
			onplay: function(){
				activeSound = sound.playing();
			},
			onfade: function(){
				this.stop();
				activeSound = sound.playing();
			}
		});
		sound.play();
		note.innerHTML = keyData[key].src[register].note; 
		return;
	}

	function needsSoundRepeat(){   //if key is held on repeat - checks to see if getting close to sound track end to reset it with minimal lag
		let checkEnd = sound.duration() - 0.15; //point near end for range to catch seek 
		let currentPlace = sound.seek(); //current track seek placement
		if(currentPlace > checkEnd){ //are we getting close to end?
			sound.seek(0.15);  //reset seek to repeat 
		}
	}

	//COORESPONDING VALUES/ CONVERSION FUNCTIONS

	function getKey(num){ //get cooresponding sounds from key data when sliding

		let key;
		let sPt = .23;
		let ePt = .81;

		if(window.innerWidth <= (1401 * .78)){
			let sPt = (0.23 * .78);
		}

		let start = (window.innerWidth * sPt);
		let end = (window.innerWidth * ePt);
		let seventh = (window.innerWidth * (ePt - sPt)) / 7;

		console.log('7th', seventh, 'st', start, 'end', end)
		console.log('windowInner', window.innerWidth);
		// num > (window.innerWidth * 0.23)) && (num <= (window.innerWidth * 0.26) //initial grab span should be between this

		if((num > start) && (num <= (start + (seventh * 1)))){  //<26% width client width 
			key = 'KeyA';
		} else
	
		if(num <= (start + (seventh * 2))) { 
			key = 'KeyS';
		} else

		if(num <= (start + (seventh * 3))) { 
			key = 'KeyD';
		} else

		if(num <= (start + (seventh * 4))) { 
			key = 'KeyF';
		} else

		if(num <= (start + (seventh * 5))) { 
			key = 'KeyG';
		} else

		if(num <= (start + (seventh * 6))) { 
			key = 'KeyH';
		} else

		if((num > (start + (seventh * 6))) && (num < (end))) { 
			key = 'KeyJ';
		} 
		return key;	
	}

	function getRegister(selected){  //change note range (high or low)
			(selected === 'ArrowUp') ? (register = 1) : (register = 2);
	}

	function getStep(selected, num){  //change slide position from left or right arrow keys		
			if((num >= 1) && (num <= 7)) {
				if(selected === 'ArrowLeft') {
					(num > 1) ? num-- : (num = 1);
				}else if(selected === 'ArrowRight'){
					(num < 7) ? num++ : (num = 7); 
				} else {
					console.log("error");
				}
			} else {
				console.log("number is, somehow, out of bounds");
				return;
			}
			return num; 
	}

	//INACTIVITY AND OTHER OPERATIONAL FUNCTIONS

	function handler(event) {
			//console.log(event);
			if(event.repeat){ 
				clearCounter();
				needsSoundRepeat();
				return;
			} else {		
			    	if((event.code === 'ArrowUp') || (event.code === 'ArrowDown')){	
			    		(event.type === 'keydown') ? getRegister(event.code) : (register = 0);
				    	
			    		if(sliding || pressedKeys) {
				    		sound.fade(1,0,300);
				    		playSound(activeKey);	
			    		}
			    		return;
				    }

					if(!checkConflict(event)){
						if(MouseEvent || PointerEvent){
							callMouseE(event);
						}
						if(KeyboardEvent){
							callKeyE(event);
							return;
						}
					} else {
						console.log("bypassed");
						return;
					}
				}
		}

	const checkConflict = (e) => {
			let conflict = false;
			let letter;
	
			if(!sliding && !pressedKeys){ //if nothing pressed
				return false;
			} else if (sliding && keyData[e.code]){ //if mouse is already sliding and try to press directional key
				conflict = true;
			} else if(pressedKeys && MouseEvent.type === 'mousedown'){  // if directional key is already down and try to override with mouse
				conflict = true;
			} else if(keyData[e.code]) { 
				for (const [key, value] of Object.entries(keyData)) { //if A - J is pressed
				    if((value['pressed'] == true) && (key != 'ArrowLeft' && key != 'ArrowRight')) { 
				 		letter = true;
			 		}
			 	}	 
				if((e.code != 'ArrowLeft' && e.code != 'ArrowRight') && (keyData.ArrowLeft.pressed || keyData.ArrowRight.pressed)){ //if arrow key is already pressed and try to press A-J
						conflict = true;
				}else if((letter) && (e.code == 'ArrowLeft' || e.code == 'ArrowRight')){ // if A-J is already pressed and try to press arrow key
					conflict = true;
				}else if(keyData.ArrowLeft.pressed && keyData.ArrowRight.pressed){ //both arrow direction keys are pressed
					conflict = true;
				}
			}
			return conflict; 
		}

	function clearCounter() {
		window.clearTimeout(timeoutID);
	}

	function startCounter() {
		timeoutID = setTimeout(() => {window.globals.backToFirst();}, 4000);
	}