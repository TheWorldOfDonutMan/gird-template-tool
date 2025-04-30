# GRID TEMPLATE TOOL

### 4.20.25
---
NEW BRANCH : grid sandbox
Moving on to new branch where the goal is to change functionality from having a CSS GRID 'explictly' and continously being written, read and interrupted. To an implicit one. The window as sandbox. 
Any CSS GRID intrupting I want to do can be at the end as if it was an extraction of the current state, but everything will be written and read by the javascript in an absolute fashion. Think 3D animation matrix style. 
A data matrix will keep track of elements and their positions. It will update those position in an absolute way ( no figuring out what css grid props need to be written ). I can then write methods that will use these data values to compute copy-paste text of CSS and the HTML
### 4.25.25 
---
Issue fixed. computeRowsandCols( ) is called on document change and returns the number of grid rows and cols

Needs to now return a css grid template format. After that is made we can start the calculation on when a div is moved and  more than 50% of its volume is overlapping it will move the overlapping div into the other divs spot.
 
### 4.23.25
---
Leaving off at a point where I have refactor the grid col/row algo and added it at the bottom of the call to ```defautlGridStyles()``` .

Values seem skewy, console.log from top to bottom

### TODO
1. Calculate box area dynamic on box drag
2. Convert box placement into CSS Geid-Template-Area expresion with rows and column data.
