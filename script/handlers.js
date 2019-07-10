//
// handlers.js
// =========
// Contains handler functions to track input events.
// (Reused from my old project.)
//

var canvas_offset_x = 0;
var canvas_offset_y = 0;

var mouse = {
	X:	0,
	Y: 	0,
	ABS_X: 0,
	ABS_Y: 0
};

var key = {
	MOUSE_1:	false,
	MOUSE_2:	false,
	MOUSE_3:	false,
    UP:     	false,
    DOWN:   	false,
    LEFT:   	false,
    RIGHT:  	false,
	SPACE:  	false,
	NUM_1:		false,
	NUM_2:		false,
	NUM_3:		false,
	NUM_4:		false,
	R:			false
};

function handlerMousePosition(e) {
	mouse.X = e.clientX - canvas_offset_x;
	mouse.Y = e.clientY - canvas_offset_y;
	mouse.ABS_X = e.clientX;
	mouse.ABS_Y = e.clientY;
}

function handlerMouseDown(e) {
	switch(e.button) {
		case 0:
			key.MOUSE_1 = true;
			break;
		case 2:
			key.MOUSE_2 = true;
			break;
		case 1:
			key.MOUSE_3 = true;
			break;
		default:
			break;
	}
}

function handlerMouseUp(e) {
	switch(e.button) {
		case 0:
			key.MOUSE_1 = false;
			break;
		case 2:
			key.MOUSE_2 = false;
			break;
		case 1:
			key.MOUSE_3 = false;
			break;
		default:
			break;
	}
}

function handlerKeyDown(e) {
	switch(e.keyCode) {
		case 37:
		case 65:
			key.LEFT	= true;
			break;
		case 38:
		case 87:
			key.UP 	    = true;
			break;
		case 39:
		case 68:
			key.RIGHT 	= true;
			break;
		case 40:
		case 83:
            key.DOWN  	= true;
			break;
		case 32:
			key.SPACE   = true;
			break;

		case 49:
			key.NUM_1	= true;
			break;
		case 50:
			key.NUM_2	= true;
			break;
		case 51:
			key.NUM_3	= true;
			break;
		case 52:
			key.NUM_4	= true;
			break;

		case 81:
			key.Q		= true;
			break;
		case 82:
			key.R		= true;
			break;
        default:
            break;
    }
}

function handlerKeyUp(e) {
	switch(e.keyCode) {
		case 37:
		case 65:
			key.LEFT	= false;
			break;
		case 38:
		case 87:
			key.UP 	    = false;
			break;
		case 39:
		case 68:
			key.RIGHT 	= false;
			break;
		case 40:
		case 83:
            key.DOWN  	= false;
			break;
		case 32:
			key.SPACE   = false;
			break;

		case 49:
			key.NUM_1	= false;
			break;
		case 50:
			key.NUM_2	= false;
			break;
		case 51:
			key.NUM_3	= false;
			break;
		case 52:
			key.NUM_4	= false;
			break;

		case 81:
			key.Q		= false;
			break;
		case 82:
			key.R		= false;
			break;
        default:
            break;
	}
}



