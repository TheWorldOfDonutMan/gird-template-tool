// DOCUMENT ELEMENTS
const appElement = document.getElementById("app")

// MOUSE STATE
let clientXY = {};


function getClientXY(event){
  clientXY.x = event.clientX;
  clientXY.y = event.clientY
  clientXY.normalizedX = (clientXY.x / window.innerWidth) * 2 - 1
  clientXY.normalizedY = (clientXY.y / window.innerHeight)* 2 + 1
  
}
function createContainer(){
  console.log("logging")
}

appElement.addEventListener("mousemove",
  // Get Mouse Position
  getClientXY
)
appElement.addEventListener("click", ()=>
{
  //set click coordinates
  const clickCoords = {
    x: clientXY.x,
    y:clientXY.y
  }
  // Create New Element
  let newDiv = document.createElement("div")
  newDiv.className = "grid-box absolute";
  // newDiv.style.top = connectingCorner
  appElement.append(newDiv)
let olderSibling = newDiv.getRootNode()
console.log(olderSibling)
let olderSiblingCoords;
if(olderSibling){
   olderSiblingCoords = olderSibling.getBoundingClientRect();} 
  if(olderSiblingCoords){
    console.log(olderSiblingCoords)
  olderSiblingCoords = olderSibling.getBoundingClientRect()
  console.log(olderSiblingCoords['right'])
  newDiv.style.left =`${olderSiblingCoords["left"]}px`
  }else{
    return
  }
} );
