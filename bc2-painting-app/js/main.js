(function(){

	var canvas = document.querySelector('#canvas1');
	var ctx = canvas.getContext('2d');
	var tmp_canvas = document.createElement('canvas');
	tmp_canvas.id = 'tmp_canvas';
	var tmp_ctx = tmp_canvas.getContext('2d');
	var	sketch = document.querySelector('#container');
	//get the refrence to the button
	var layers = $('#layers'),
		canvasArray = ["layer1"],
		arrayLen = canvasArray.length;

	//get the container of list items
	var layerObj = $('#actualLayers li'),
		layerIndex;

	if(arrayLen === 3){
		layers.css("display", "none");
	}

	functionCall(canvas,ctx,tmp_canvas,tmp_ctx,sketch);

	//when you click the add layers button
	layers.on('click', function() {
		var increment = arrayLen + 1;
			
		if (arrayLen === 1) {

			//remove the class called selected
			$("#actualLayers li.selected").removeClass('selected');
			$("#actualLayers li:nth-child(2)").removeClass('hideObj').addClass('selected');
			$('#canvas2').removeClass('hideObj');
			$('#canvas2').addClass('layersIndex');
			var canvas1 = document.querySelector('#canvas2');
			var ctx1 = canvas1.getContext('2d');
			var tmp_canvas1 = document.createElement('canvas');	
			tmp_canvas1.id = 'tmp_canvas1';
			var tmp_ctx1 = tmp_canvas1.getContext('2d');
			console.log("call 2");
			functionCall(canvas1,ctx1,tmp_canvas1,tmp_ctx1,sketch);

		} else if (arrayLen === 2) {

			$("#actualLayers li:nth-child(2).selected").removeClass('selected');
			$("#actualLayers li:nth-child(3)").removeClass('hideObj').addClass('selected');
			$('#canvas3').removeClass('hideObj');
			$('#canvas3').addClass('layersIndex');
			var canvas2 = document.querySelector('#canvas3');
			var ctx2 = canvas2.getContext('2d');
			var tmp_canvas2 = document.createElement('canvas');	
			tmp_canvas2.id = 'tmp_canvas2';
			var tmp_ctx2 = tmp_canvas2.getContext('2d');		
			console.log("call 3");
			functionCall(canvas2,ctx2,tmp_canvas2,tmp_ctx2,sketch);
		}

		canvasArray[arrayLen] = "layer" + increment;
		arrayLen = canvasArray.length;
		if(arrayLen === 3){
			layers.css("display", "none");
		}
	});


	//when you click on the layer btns
	layerObj.on('click', function() {
		//when u click on the actual layers
		$("#actualLayers li.selected").removeClass('selected');
		$(this).addClass('selected');
		var id = $(this).attr('id');
		if (id == "layer2") {
			$('#canvas3').css("display","none");
		} else if (id === "layer1") {
			$('#canvas2').css("display","none");
			$('#canvas3').css("display","none");
		}


	});

}());