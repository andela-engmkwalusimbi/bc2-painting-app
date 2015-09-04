(function(){

	var canvas = document.querySelector('#canvas1');
	var ctx = canvas.getContext('2d');
	
	//get the refrence to the button
	var layers = $('#layers'),
		canvasArray = ["layer1"],
		arrayLen = canvasArray.length;

	//get the container of list items
	var layerObj = $('#actualLayers li');

	if(arrayLen === 3){
		layers.css("display", "none");
	}
	functionCall(canvas, ctx);

	//when you click the add layers button
	layers.on('click', function() {
		var increment = arrayLen + 1;
		//if the length of the array is 1 then 
		if (arrayLen === 1) {

			/*remove the class called selected and add the list element 2 with the same class and 
			remove the class that hides the element ::  plus remove class and add layersIndex class 
			on the canvas*/
			$("#actualLayers li.selected").removeClass('selected');
			$("#actualLayers li:nth-child(2)").removeClass('hideObj').addClass('selected');
			$('#canvas2').removeClass('hideObj');
			$('#canvas2').addClass('layersIndex');
			//query the canvas by its id
			var canvas1 = document.querySelector('#canvas2');
			var ctx1 = canvas1.getContext('2d');
			//call the function to draw on the canvas
			functionCall(canvas1, ctx1);

		} else if (arrayLen === 2) {
			//if array length is not 3
			/*remove the class called selected on element 2 in the list and add the list element 3 with the same class and 
			remove the class that hides the element ::  plus remove class and add layersIndex class 
			on the canvas*/
			$("#actualLayers li:nth-child(2).selected").removeClass('selected');
			$("#actualLayers li:nth-child(3)").removeClass('hideObj').addClass('selected');
			$('#canvas3').removeClass('hideObj');
			$('#canvas3').addClass('layersIndex');
			var canvas2 = document.querySelector('#canvas3');
			var ctx2 = canvas2.getContext('2d');		
			console.log("call 3");
			functionCall(canvas2, ctx2);
		}

		//add element layer plus the increment value in the array at index equal to the new length
		canvasArray[arrayLen] = "layer" + increment;
		arrayLen = canvasArray.length;
		if(arrayLen === 3){
			//add a css display property to none on the add layers button
			layers.css("display", "none");
		}
	});


	//when you click on the layer btns
	layerObj.on('click', function() {
		//when u click on the actual layers
		$("#actualLayers li.selected").removeClass('selected');
		$(this).addClass('selected');
		var id = $(this).attr('id');
		if (id === "layer1") {
			//hide canvas 2 and 3
			$('#canvas2').removeClass('hideObj').addClass('hideObj');
			$('#canvas3').removeClass('hideObj').addClass('hideObj');
		} else if (id === "layer2") {
			//hide canvas 3 when button 2 is clicked
			$('#canvas2').removeClass('hideObj');
			$('#canvas3').removeClass('hideObj').addClass('hideObj');
		} else if (id === "layer3") {
			//un hide canvas 2 and 3
			$('#canvas3').removeClass('hideObj');
			$('#canvas3').removeClass('hideObj');
		}


	});

}());