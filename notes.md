This notes file contains the previous version's logic. Some might be neccessary as I create features


```javascript
//======================================================================//

// Grab our buttons into an array
const defaultChoices = document.getElementsByClassName("default-choices")

// Grab our div grid boxes into an array
const divGridElements = document.getElementsByClassName("grid-box")

//  Grab our grid container
const gridContainer = document.getElementById("app")

// 1. Take that BUTTON Array and add an event listener to call their value when clicked
for(const button of defaultChoices){
    button.addEventListener('click',gridDefaultStyles);}
    
// A. On a change to the page compute cols and rows
document.addEventListener("change", computeRowsAndCols)

// 2. Take that DIV Array and add event listener for mouse hovers for select tool
for(const div of divGridElements){
    div.addEventListener("mouseenter", divHover)
}
// 3. Take that same DIV array and add eventlistener to remove hovering effects and set it as draggable.
for(const div of divGridElements){
    // sets the ID to the correspondig letter within the div (each div needs an ID for data transfer when dragging)
    div.id = div.innerText
    // Makes the div draggable
    div.setAttribute('draggable', true)
    // What to do when dragging starts
    div.addEventListener('dragstart', divGridElementDragging)
    // What to do when a mouse moves over the div
    div.addEventListener('mouseleave', divRemoveHover)
}

// 4. Take that Div Array and find the positioning of the divs and store it ( We will condense simalar operations later) 
function extractDivCoords(){
  const divCoords = []
  for(const div of divGridElements){
    const divElementClassList = (div.classList[0])
    const coords = div.getBoundingClientRect()
    divCoords.push({"id":divElementClassList, coords}); //  { "id": A, "coords": x, y, ect } 
}
    return divCoords
}


/**
 * GRAPHCIAL InterFace
 * FUNCATIONAL LOGIC
 */

// 1. Function logic to change the css grid layout for each radio value
let currentClassName = null; // State for class name list

function gridDefaultStyles(event){
    // save the value of the radio button clicked
    const gridContainerEventValue = event.target.value

//  if classlist has no names in it, add our event value as name and save it as the state of classnames
    if(!gridContainer.classList.length){
        gridContainer.classList.add(gridContainerEventValue);
        currentClassName = gridContainerEventValue;

//  if classList has any length, replace the class name stored in state mangaement with the event value and then reset the state to the newest value.
    }else{
        gridContainer.classList.replace(currentClassName, gridContainerEventValue);  
        currentClassName = gridContainerEventValue

    }
}

// 2. Function logic attributed to hover state over divs
function divHover(event){
    event.target.classList.add('divHover')
}

// 3. Function logic for leaving hover state
function divRemoveHover(event){
    event.target.classList.remove('divHover')
}

//  4. Event Handler for Dragging
function divGridElementDragging (ev){
    ev.dataTransfer.setData('plain/text', ev.target.id)
    ev.dataTransfer.effectAllowed = 'move'
}

/**
 * Functional Logic to Dynamnicly Compute Geometric Grid Data
 * -----computeEdges() : First we grab the div id, X, Y, height, width and store it as an array of objects
 * -----cleanComputedData(): Takes the array of div coords and seperates it into two new arrays. One has all x points, the other has all y points. 
 * ---- and the CALLS sortAndRemoveComputedEdgeData() to remove All doubles and sort
 * ---- and computeRowsAndCol returns the number of columns and grid
 * ---- if you want a div to be included in the computation use class="grid-box". This class will be listed in an array called divGridElement
 * ---- this function runs whenever there is a change to the document.
 */

// 1. Read and Save domREC Data. Dom rect data shows us the top left corner x,y and the width and height of an elements box including padding and border margins. Not including margins


  // This funtion takes our x/y, and w/h values and turns them into edge values. Any edge values that repeat signfiy a spaning width or height which we can remove to determine our row/col count
  function computeEdges(){
    // 1. Extract the grid cords to a new variable
      const copiedArrayData = extractDivCoords()
    // Empty var for the work we are about to do to the data
    const computedArrayData = []
    // The array is a list of objects. For each object in the array we will read data and compute the top, bottom, left, and right edges. TOP and BOTTOM are y coords. LEFT and RIGHT are x coords
    console.log("first compute ", copiedArrayData)
    for(let i = 0; i < copiedArrayData.length; i++){
        const id = copiedArrayData[i]['id']
        const boxWidth = copiedArrayData[i]['coords']['width']
        const boxHeight = copiedArrayData[i]['coords']['height']
        const leftEdge = copiedArrayData[i]['coords']['x']
        const rightEdge = leftEdge + boxWidth;
        const topEdge = copiedArrayData[i]['coords']['y']
        const bottomEdge = topEdge + boxHeight
        computedArrayData.push({id,leftEdge, rightEdge, topEdge, bottomEdge} )
    }
      // now we return an array of objects that are representing the top/bottom/right/left coords to each element 
      return computedArrayData //[ { id: letter, l-r-t-b edges: number }, { id, l-r-t-b edges } ]
  }
  
  // Take our computedEdge data and clean it to remove doubles and order it
  function cleanComputedData(computedGridProblemData){
    let vertEdges = [];
    let horzEdges = [];
    // take our edge data and save it to our own copy
    let edgeData = computeEdges();
    // sort into vertical and horizontal groups edges
    for(let i = 0; i < edgeData.length; i++){
      vertEdges.push(edgeData[i]['leftEdge'], edgeData[i]['rightEdge'])
      horzEdges.push(edgeData[i]['topEdge'], edgeData[i]['bottomEdge'])
    }
    // store arrays in an array.[ [ x's ], [ y's ] ] or [ [ Cols ], [ Rows ]]
    const computedEdgeData = [vertEdges, horzEdges]
    console.log(computedEdgeData)
    return computedEdgeData
  }
  
  //Sort and remove duplicated
  function sortAndRemoveComputedEdgeData(){
    let cleanedData = cleanComputedData()
    let colList = [... new Set(cleanedData[0])]
    let rowList = [... new Set(cleanedData[1])]
    return [rowList, colList]
    }
 
  // record number of rows and number of cols
  function computeRowsAndCols(){
  let rowCoordsArray = sortAndRemoveComputedEdgeData()
  console.log(`\n Rows: ${rowCoordsArray[0].length -1} \n Cols: ${rowCoordsArray[1].length -1} \n` )
  }
  ```