(function() {
	
	var fillBtn = document.getElementById('fillcolor'),
		strokeBtn = document.getElementById('strokecolor'),
		sizeBtn = document.getElementById('lineweight');

	//get the objects by id
	var clearBtn = document.getElementById('clearbtn');

	var shapes = $('ul li');
	console.log(shapes);
	
	var strokeColo = strokeBtn.value,
		lineSiz = sizeBtn.value;
		fillColo = fillBtn.value;

	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');
	
	var sketch = document.querySelector('#container');
	var sketch_style = getComputedStyle(sketch);
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));
	
	// Creating a tmp canvas
	var tmp_canvas = document.createElement('canvas');
	var tmp_ctx = tmp_canvas.getContext('2d');
	tmp_canvas.id = 'tmp_canvas';
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;
	
	sketch.appendChild(tmp_canvas);

	//get a mouse points
	var mouse = {x: 0, y: 0};
	var start_mouse = {x: 0, y: 0};
	var last_mouse = {x: 0, y: 0};
	
	// Pencil Points
	var ppts = [];

	var value = "pointer";

	/* Drawing on Paint App */
	tmp_ctx.lineWidth = 5;
	tmp_ctx.lineJoin = 'round';
	tmp_ctx.lineCap = 'round';
	tmp_ctx.strokeStyle = 'blue';
	tmp_ctx.fillStyle = 'blue';

	/*setting oninput listeners*/
	fillBtn.oninput = function() {
		fillColo = this.value;
	}

	strokeBtn.oninput = function() {
		strokeColo = this.value;
	}

	sizeBtn.oninput = function() {
		lineSiz = sizeBtn.value;
		document.getElementById("rangeSize").value = lineSiz;
	}

	/*define oclick listeners for the shapes*/
	shapes.on('click', function() {
		$("li.selected").removeClass('selected');
    	$(this).addClass('selected');
    	switch ($(this).attr('id')) {
    		case "rectbtn":
    			value = "rect";
    			break;
    		case "linebtn":
    			value = "line";
    			break;
    		case "squarebtn":
    			value = "square";
    			break;
    		case "elipsbtn":
    			value = "elipse";
    			break;
    		case "circlebtn":
    			value = "circle";
    			break;
    		default:
    			value = "pointer";
    	}
	});

	clearBtn.addEventListener('click', function() {
		clearCanvas();
	}, false);
	/*clearBtn.on('click', function() {
		clearCanvas();
	});*/
	
	/* Mouse Capturing Work */
	tmp_canvas.addEventListener('mousemove', function(e) {
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
	}, false);
		
	tmp_canvas.addEventListener('mousedown', function(e) {
		//do a check on what is stored in value to determine who has been activated
		if (value === "rect") {
			tmp_canvas.addEventListener('mousemove', onPaintRect, false);
		} else if (value === "elipse") {
			tmp_canvas.addEventListener('mousemove', onPaintElipse, false);
		} else if (value === "circle") {
			tmp_canvas.addEventListener('mousemove', onPaintCircle, false);
		} else if (value === "line") {
			tmp_canvas.addEventListener('mousemove', onPaintLine, false);
		} else if (value === "square") {
			tmp_canvas.addEventListener('mousemove', onPaintSquare, false);
		} else {
			tmp_canvas.addEventListener('mousemove', onPaintPencil, false);
		}
				
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;		
		start_mouse.x = mouse.x;
		start_mouse.y = mouse.y;
		ppts.push({x: mouse.x, y: mouse.y});

		//call paint methods basing on what is stored in value
		if (value === "rect") {
			onPaintRect();
		} else if (value === "elipse") {
			onPaintElipse();
		} else if (value === "circle") {
			onPaintCircle();
		} else if (value === "line") {
			onPaintLine();
		} else if (value === "square") {
			onPaintSquare();
		} else {
			onPaintPencil();
		}
	}, false);
	
	tmp_canvas.addEventListener('mouseup', function() {
		if (value === "rect") {
			tmp_canvas.removeEventListener('mousemove', onPaintRect, false);
		} else if (value === "elipse") {
			tmp_canvas.removeEventListener('mousemove', onPaintElipse, false);
		} else if (value === "circle") {
			tmp_canvas.removeEventListener('mousemove', onPaintCircle, false);
		} else if (value === "line") {
			tmp_canvas.removeEventListener('mousemove', onPaintLine, false);
		} else if (value === "square") {
			tmp_canvas.removeEventListener('mousemove', onPaintSquare, false);
		} else {
			tmp_canvas.removeEventListener('mousemove', onPaintPencil, false);
		}		
		// Writing down to real canvas now
		ctx.drawImage(tmp_canvas, 0, 0);
		// Clearing tmp canvas
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		// Emptying up Pencil Points
		ppts = [];		
	}, false);
	
	var onPaintRect = function() {		
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		var x = Math.min(mouse.x, start_mouse.x);
		var y = Math.min(mouse.y, start_mouse.y);
		var width = Math.abs(mouse.x - start_mouse.x);
		var height = Math.abs(mouse.y - start_mouse.y);
		tmp_ctx.fillStyle = fillColo;
		tmp_ctx.fillRect(x, y, width, height);
		tmp_ctx.lineWidth = lineSiz;
		tmp_ctx.strokeStyle = strokeColo;
		tmp_ctx.strokeRect(x, y, width, height);
		console.log(lineSiz);
	};

	var onPaintElipse = function () {
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);		
		var x = Math.min(mouse.x, start_mouse.x);
		var y = Math.min(mouse.y, start_mouse.y);		
		var w = Math.abs(mouse.x - start_mouse.x);
		var h = Math.abs(mouse.y - start_mouse.y);
		var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
	  		oy = (h / 2) * kappa, // control point offset vertical
		    xe = x + w,           // x-end
		    ye = y + h,           // y-end
		    xm = x + w / 2,       // x-middle
		    ym = y + h / 2;       // y-middle
		
		tmp_ctx.beginPath();
		tmp_ctx.moveTo(x, ym);
		tmp_ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		tmp_ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		tmp_ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		tmp_ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
		tmp_ctx.closePath();
		tmp_ctx.stroke();
	}

	var onPaintCircle = function() {		
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);	
		var x = (mouse.x + start_mouse.x) / 2;
		var y = (mouse.y + start_mouse.y) / 2;	
		var radius = Math.max(
			Math.abs(mouse.x - start_mouse.x),
			Math.abs(mouse.y - start_mouse.y)
		) / 2;
		
		tmp_ctx.beginPath();
		tmp_ctx.arc(x, y, radius, 0, Math.PI*2, false);
		// tmp_ctx.arc(x, y, 5, 0, Math.PI*2, false);
		tmp_ctx.stroke();
		tmp_ctx.closePath();
	};

	var onPaintLine = function() {		
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);	
		tmp_ctx.beginPath();
		tmp_ctx.moveTo(start_mouse.x, start_mouse.y);
		tmp_ctx.lineTo(mouse.x, mouse.y);
		tmp_ctx.stroke();
		tmp_ctx.closePath();
	};

	var onPaintSquare = function() {		
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		var x = Math.min(mouse.x, start_mouse.x);
		var y = Math.min(mouse.y, start_mouse.y);
		var width = Math.abs(mouse.x - start_mouse.x);
		var height = width;
		tmp_ctx.strokeRect(x, y, width, height);
	};

	var onPaintPencil = function() {		
		// Saving all the points in an array
		ppts.push({x: mouse.x, y: mouse.y});		
		if (ppts.length < 3) {
			var b = ppts[0];
			tmp_ctx.beginPath();
			//ctx.moveTo(b.x, b.y);
			//ctx.lineTo(b.x+50, b.y+50);
			tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
			tmp_ctx.fill();
			tmp_ctx.closePath();			
			return;
		}		
		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);		
		tmp_ctx.beginPath();
		tmp_ctx.moveTo(ppts[0].x, ppts[0].y);
		
		for (var i = 1; i < ppts.length - 2; i++) {
			var c = (ppts[i].x + ppts[i + 1].x) / 2;
			var d = (ppts[i].y + ppts[i + 1].y) / 2;			
			tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
		}
		
		// For the last 2 points
		tmp_ctx.quadraticCurveTo(
			ppts[i].x,
			ppts[i].y,
			ppts[i + 1].x,
			ppts[i + 1].y
		);
		tmp_ctx.stroke();		
	};

	var clearCanvas = function() {		
		// Tmp canvas is always cleared up before drawing.
		ctx.clearRect(0, 0, canvas.width, canvas.height);			
	};
}());