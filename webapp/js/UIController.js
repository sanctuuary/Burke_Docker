var app = angular.module('UI', [], function ($compileProvider) {
//	 $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel):/); // Not working (supposed to remove unsafe tag when opening picture links)
});


		app.controller('UIController', function($scope, $http, $filter) {	//Controller
			/** Tool list */
			$scope.tools;
			$scope.url = "http://localhost"
			/** Currently selected tool */
			$scope.selectedInputs = new Array('Sequence feature source');
			/** Data type Array*/
			$scope.dataTypes;
			/** Format type array */
			$scope.formatTypes;
			/** Select element containing types */
			$scope.typeOptions;
			/** Select element containing formats */
			$scope.formatOptions;
			/* Number of constraints */
			$scope.counter = 0;
			/** select element containing tools */
			$scope.toolOptions;
			/** Constraints introduced */
			$scope.constraintRows = [];
			/** Counter for input dropboxes */
			$scope.counterInputs = 1;
			/** Counter for output dropboxes */
			$scope.counterOutputs = 1;
			/** Number of solutions to be used for APE */
			$scope.solutionNumber = 5;
			/** Number of output types per tool to be consumed within the workflow */
			$scope.use_all_generated_data = "one";
			/** Minimum length that the workflows should have */
			$scope.minWorkflowLength = 1;
			/** Maximum length that the workflows should have */
			$scope.maxWorkflowLength= 20;
			/** APE-results in a very simple text form */
			$scope.simpleResults;
			/** Data Flow image array (results) */
			$scope.dataFlowImages;
			/** Control Flow image array (results) */
			$scope.controlFlowImages;
			/** Includes simpleResults, dataFlowImages and controlFlowImages in one array (so that looping with ng-repeats in index.html is possible) */
			$scope.constraints;
			/** Boolean to check if results table should be shown or not **/
			$scope.showTable = false;
			 
			/** Combines the simpleResults, dataFlowImages and controlFlowImages arrays in one array and creates correct amount of checkboxes*/
			$scope.buildResultsTable = function(){
				if($scope.simpleResults == null || $scope.simpleResults.length == 0){
					document.getElementById("loading").innerHTML = '';
					document.getElementById("exportButton").style.visibility = 'visible';
					alert("No solutions were found. The specification might be too restrictive.");
					return;
				}
				for(var i=0;i<$scope.simpleResults.length;i++){
					/** Create new row element **/
					var newRow = document.createElement("tr");
					newRow.id = "row" + i;
					
					/** Create checkbox cell **/
					var tdCheckbox = document.createElement("td");
					tdCheckbox.id = "tdCheckboxId" + i;
					/** Create checkbox element **/
					var checkbox = document.createElement("input");
					checkbox.type="checkbox";
					checkbox.id = "checkbox" + i;
					//checkbox.onclick = "checkboxChecked(this);";
					/** Save checkbox values **/
					/** Append checkbox element to checkbox cell **/
					tdCheckbox.appendChild(checkbox);
					/** Append checkbox cell to the row **/
					newRow.appendChild(tdCheckbox);
					
					/** Append simple result to the new row **/
					var tdSimpleResults = document.createElement("td");
					tdSimpleResults.id = "tdSimpleResultsId" + i;
					var currSimpleResult = $scope.simpleResults[i];
					tdSimpleResults.innerText = currSimpleResult;
					newRow.appendChild(tdSimpleResults);
					
					/** Append data flow image to the new row **/
					var tdDataFlowImage = document.createElement("td");
					tdDataFlowImage.id = "tdDataFlowImageId" + i;
					var currDataFlowImage = document.createElement('img');
					currDataFlowImage.setAttribute("class", "dataFlowImg");
					currDataFlowImage.setAttribute("id", "dataFlowImg" + i);
					currDataFlowImage.src = "data:image/png;base64," + $scope.dataFlowImages[i];
					currDataFlowImage.height = "200";
					tdDataFlowImage.append(currDataFlowImage);
					newRow.appendChild(tdDataFlowImage);
					
					/** Append control flow image to the new row **/
					var tdControlFlowImage = document.createElement("td");
					tdControlFlowImage.id = "tdControlFlowImageId" + i;
					var currControlFlowImage = document.createElement('img');
					currControlFlowImage.setAttribute("class", "controlFlowImg");
					currControlFlowImage.setAttribute("id", "controlFlowImg" + i);
					currControlFlowImage.src = "data:image/png;base64," + $scope.controlFlowImages[i];
					currControlFlowImage.height = "200";
					tdControlFlowImage.append(currControlFlowImage);
					newRow.appendChild(tdControlFlowImage);
					
					/** Append the new row **/
					document.getElementById("resultsBody").appendChild(newRow);
				}
				$scope.showTable = true;
				document.getElementById("loading").innerHTML = '';
				document.getElementById("exportButton").style.visibility = 'visible';
				location.href = "#";
				location.href = "#firstRow";
			}
			
			/** Fetches the data and format types*/
			$scope.getTypes = function(){
				document.getElementById("exportButton").style.visibility = 'hidden';
				$http.get($scope.url + ":8001/getTypes")
				.then(function successCallback(response) 
					{
					$scope.dataTypes = response.data.dataTypes;
					$scope.formatTypes = response.data.formatTypes;
					$scope.tools = response.data.tools;
					}, function errorCallback() {
						 console.log("Error. Data types could not be retreived.");
				});	
			}
			
			
			/** Fetches the constraint descriptions */
			$scope.getConstraintDescriptions = function(){
				$http.get($scope.url + ":8001/getConstraintDescriptions")
				.then(function(response) {
					$scope.constraints = response.data;
				});	
			}
			
			/**
			 * Send post request to APE to run it
			 */
			$scope.writeConstraints = function(constraints){
				$http.post($scope.url + ":8001/writeConstraints", constraints);
			}


			/**
			 * Send post request to APE to run it
			 */
			$scope.runApe = function(userInputsStringified){
				$http.post($scope.url + ":8001/run", userInputsStringified)
	            .then(function(response) {
					$scope.simpleResults = JSON.parse(response.data.simpleResults);
					$scope.controlFlowImages = JSON.parse(response.data.controlFlowImg);
					$scope.dataFlowImages = JSON.parse(response.data.dataFlowImg);
					$scope.buildResultsTable();
	            }, function(error){
	            	console.log("Post request failed"); 
	            });
			}
			
			/**
			 * Function called upon loading the 1st scenario
			 */
			$scope.useCase1 = function(){
				clearInputData();
				clearOutputData();
			}
			
			$scope.useCase2 = function(){
				clearInputData();
				clearOutputData();
			}
			
			$scope.useCase3 = function(){
				clearInputData();
				clearOutputData();
			}
			
			$scope.useCase4 = function(){
				clearInputData();
				clearOutputData();
			}
			
			/**
			 * Add another input dropdown box-pair (data type and data format)
			 */
			$scope.addInputs = function(){
				/** Copy the parent div */
				var toCopy = document.getElementById("inputSection0");
				var copy = angular.copy(toCopy);
				
		        /** Change the ids of the copied parent-div, the copied data type dropdwon box and the copied data format dropdown box */
		        copy.id = copy.id.substring(0,copy.id.length-1) + $scope.counterInputs;
		        copy.children[0].id = copy.children[0].id.substring(0,copy.children[0].id.length-1) + $scope.counterInputs;
		        copy.children[1].id = copy.children[1].id.substring(0,copy.children[1].id.length-1) + $scope.counterInputs;
		        $scope.counterInputs++;
		  
		        /** Append the copy to the cloneDiv container */
		        angular.element(document.getElementById("inputs")).append(copy);
			}
			
			/**
			 * Function called to remove all the constraints from the file
			 */
			$scope.clearConstraints = function(){
				const constraints = document.getElementById("constraints");
				constraints.innerHTML = '';
				$scope.counter = 0;
			}
			
			$scope.clearInputs = function(){
				clearInputData();
			}
			
			$scope.clearOutputs = function(){
				clearOutputData();
			}
			
			function clearInputData(){
				const data = document.getElementById("inputs");
				data.innerHTML = '';
				$scope.counterInputs = 1;
			}
			
			function clearOutputData(){
				const data = document.getElementById("outputs");
				data.innerHTML = '';
				$scope.counterOutputs = 1;
			}
			

			/**
			 * Add another output dropdown box-pair (data type and data format)
			 */
			$scope.addOutputs = function(){
				/** Copy the parent div */
				var toCopy = document.getElementById("outputSection0");
				var copy = angular.copy(toCopy);
				
		        /** Change the ids of the copied parent-div, the copied data type dropdwon box and the copied data format dropdown box */
		        copy.id = copy.id.substring(0,copy.id.length-1) + $scope.counterOutputs;
		        copy.children[0].id = copy.children[0].id.substring(0,copy.children[0].id.length-1) + $scope.counterOutputs;
		        copy.children[1].id = copy.children[1].id.substring(0,copy.children[1].id.length-1) + $scope.counterOutputs;
		        $scope.counterOutputs++;
		  
		        /** Insert new row into the outputs table body */
		        angular.element(document.getElementById("outputs")).append(copy);
			}

			function getTypeOptions() {
                    var typeOptions = document.createElement('select');
					for(i = 0; i < $scope.dataTypes.length; i++){
						var newOption = document.createElement("option");
						newOption.text = $scope.dataTypes[i].label;
						newOption.value = $scope.dataTypes[i].value;
						typeOptions.appendChild(newOption);
					}  
					return typeOptions;
			}

			function getFormatOptions() {
                    var formatOptions = document.createElement('select');
					for(i = 0; i < $scope.formatTypes.length; i++){
						var newOption = document.createElement("option");
						newOption.text = $scope.formatTypes[i].label;
						newOption.value = $scope.formatTypes[i].value;
						formatOptions.appendChild(newOption);
					}  
					//formatOptions.value = "http://edamontology.org/format_1915";
					return formatOptions;
			}

			function getToolOptions() {
                    var toolOptions = document.createElement('select');
					for(i = 0; i < $scope.tools.length; i++){
						var newOption = document.createElement("option");
						newOption.text = $scope.tools[i].label;
						newOption.value = $scope.tools[i].value;
						toolOptions.appendChild(newOption);
					}  
					return toolOptions;
			}
			
			/**
			 * Add a row for each constraint that's specified
			 */
			$scope.constraintRows 
			
			$scope.addConstraint = function(){
				    if($scope.typeOptions == null){
						$scope.typeOptions = getTypeOptions();
					}
					if($scope.formatOptions == null){
						$scope.formatOptions = getFormatOptions();
					}
					if($scope.toolsOptions == null){
						$scope.toolsOptions = getToolOptions();
					}
                    
				if(document.getElementById("constraintsSection").children[0].value == ""){
					return;
				}
				var constraintDropdown = document.getElementById("constraintsSection").children[0];
				var selectedConstraint =  JSON.parse(constraintDropdown.value.replace("string:",""));
				var paramSize = selectedConstraint.parameters.length;
				var description = selectedConstraint.description
				
				for(i =1; i<=paramSize; i++){
					description = description.replace("${parameter_" + i + "}", "$");
				}
				var templateParts = description.split("$");

				var tableBody = document.getElementById("constraints");
				var row = document.createElement('tr');
				tableBody.appendChild(row);
				
				var cell = document.createElement('td');
				row.appendChild(cell);
				cell.setAttribute("id", "constr_"+ $scope.counter);
				cell.setAttribute("class", selectedConstraint.constraintID);
				cell.setAttribute("params", paramSize);
				
				
				for(i = 0; i<paramSize; i++){
					cell.append(templateParts[i]);
					 if(selectedConstraint.parameters[i].length == 1){
						var newToolSelect = angular.copy($scope.toolsOptions);
						newToolSelect.setAttribute("id", "constr_" + $scope.counter + "_param_"+ i + 0);
						newToolSelect.setAttribute("dimensionNo", 1);
						cell.append(newToolSelect); 
					 } else {
						var newTypeSelect = angular.copy($scope.typeOptions);
						newTypeSelect.setAttribute("id", "constr_" + $scope.counter + "_param_"+ i + 0);
						newTypeSelect.setAttribute("dimensionNo", 2);
						cell.append(newTypeSelect); 
						var newFormatSelect = angular.copy($scope.formatOptions);
						newFormatSelect.setAttribute("id", "constr_" + $scope.counter + "_param_"+ i + 1);
						newFormatSelect.setAttribute("dimensionNo", 2);
						
						cell.append(newFormatSelect); 
						newTypeSelect.value="http://edamontology.org/data_0006";
						newFormatSelect.value = "http://edamontology.org/format_1915";
					 }
				}
				cell.append(templateParts[paramSize]);

				
				$scope.counter++;
			}
			
			$scope.exportWorkflows = function(){
				alert("Export to CWL is not yet supported. We would be happy to collaborate with you on that during the hakaton event! Find us at the workshop or contact at a.l.lamprecht@uu.nl (Anna-Lena) or v.kasalica@uu.nl (Vedran) if you are interested.");
			}
			
			
			/**
			 *  Gets the data from the type dropdown boxes and saves it and then runs APE
			 */
			$scope.fetchUserInputData = function(){
				/** Initial JSON-Object to be filled with inputs, outputs and the config data */
				var toSend = {
						"inputs": [],
						"outputs": [],
						"solution_min_length": "",
						"solution_max_length": "",
						"max_solutions": "",
						"use_all_generated_data": ""
				};
				/** Iterate through the input dropdown-boxes */
				var index1 = 0;
				for(i = 0; i < $scope.counterInputs; i++){
					var typeSelect = document.getElementById("dataMenuInputs" + i).children[0];
					var formatSelect = document.getElementById("formatMenuInputs" + i).children[0];
					if(typeSelect.options[typeSelect.selectedIndex].text != ""){
						if(formatSelect.options[formatSelect.selectedIndex].text != ""){
							toSend.inputs[index1++] = {
									"data_0006": typeSelect.options[typeSelect.selectedIndex].value.substring(7),
									"format_1915": formatSelect.options[formatSelect.selectedIndex].value.substring(7)
							}
						}else{
							toSend.inputs[index1++] = {
									"data_0006": typeSelect.options[typeSelect.selectedIndex].value.substring(7)
							}
						}
					}else{
						if(formatSelect.options[formatSelect.selectedIndex].text != ""){
							toSend.inputs[index1++] = {
									"format_1915": formatSelect.options[formatSelect.selectedIndex].value.substring(7)
							}
						}
					}
				}
				/** Iterate through the output dropdown-boxes */
				var index2 = 0;
				for(i = 0; i < $scope.counterOutputs; i++){
					var typeSelect = document.getElementById("dataMenuOutputs" + i).children[0];
					var formatSelect = document.getElementById("formatMenuOutputs" + i).children[0];
					if(typeSelect.options[typeSelect.selectedIndex].text != ""){
						if(formatSelect.options[formatSelect.selectedIndex].text != ""){
							toSend.outputs[index2++] = {
									"data_0006": typeSelect.options[typeSelect.selectedIndex].value.substring(7),
									"format_1915": formatSelect.options[formatSelect.selectedIndex].value.substring(7)
							}
						}else{
							toSend.outputs[index2++] = {
									"data_0006": typeSelect.options[typeSelect.selectedIndex].value.substring(7)
							}
						}
					}else{
						if(formatSelect.options[formatSelect.selectedIndex].text != ""){
							toSend.outputs[index2++] = {
									"format_1915": formatSelect.options[formatSelect.selectedIndex].value.substring(7)
							}
						}
					}
				}
				/** Get all the constraints. */
				var allConstraints = {
						"constraints": [],
				};
				for(i = 0; i < $scope.counter ; i++){
					var currConstraint = {
						"constraintid" : "",
						"parameters" : []
					};
					var constraintCell = document.getElementById("constr_" + i);
					currConstraint.constraintid = constraintCell.getAttribute("class");
					var constrParams = constraintCell.getAttribute("params");

					for(j = 0; j < constrParams; j++){
						var parameterDimensions = [];
						var currParam = document.getElementById("constr_" + i + "_param_"+ j + 0);
						var dimensionNo = 0;
						if(currParam != null){
							parameterDimensions.push(currParam.value);
							dimensionNo = currParam.getAttribute("dimensionNo");
						}
						for(dim = 1; dim < dimensionNo; dim++){
							currParam = document.getElementById("constr_" + i + "_param_"+ j + dim);
							if(currParam != null){
								parameterDimensions.push(currParam.value);
							}
						}
						currConstraint["parameters"].push(parameterDimensions);
					}
					allConstraints["constraints"].push(currConstraint);
				}
				var allConstraintsStr = JSON.stringify(allConstraints);
				$scope.writeConstraints(allConstraintsStr);

				/** Fill the config field */
				if(isNaN($scope.minWorkflowLength) || $scope.minWorkflowLength < 1) {
					alert("Min workflow length has to be a positive number.");
					return;
				}
				
				if(isNaN($scope.maxWorkflowLength) || $scope.maxWorkflowLength < 1) {
					alert("Max workflow length has to be a positive number.");
					return;
				}
				if($scope.minWorkflowLength > 30 || $scope.maxWorkflowLength > 30){
					alert("Demo version does not suport solutions longer than 30 steps. In case you want to experiment further you are welcome to test our local version of the app available at\n\n https://github.com/sanctuuary/Burke_Docker");
					return;
				}
				toSend.solution_min_length = $scope.minWorkflowLength;
				toSend.solution_max_length = $scope.maxWorkflowLength;
				if(isNaN($scope.solutionNumber) || $scope.solutionNumber < 1) {
					alert("Number of solutions has to be a positive number.");
					return;
				} else if($scope.solutionNumber > 100){
					alert("Demo version does not suport more then 100 solutions. In case you want to experiment further you are welcome to test our local version of the app available at\n\n https://github.com/sanctuuary/Burke_Docker");
					return;
				}
				toSend.max_solutions = $scope.solutionNumber;
				toSend.use_all_generated_data = $scope.use_all_generated_data;
				/** Running APE */
				const results = document.getElementById("resultsBody");
				results.innerHTML = '';
				document.getElementById("exportButton").style.visibility = 'hidden';
				var overlay = document.getElementById('loading');
				overlay.innerHTML = "<div id='loading' style='width:100%; height: 100%; top: 0; z-index: 100; position: absolute; background: lightgray; opacity: 0.5; text-align: center; font-size: large; padding-top: 25%; font-weight: bold;'>Loading...</div>";
				document.body.appendChild(overlay);
				$scope.runApe(toSend);
			}
		});