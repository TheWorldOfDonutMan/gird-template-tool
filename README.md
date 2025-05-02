# GRID TEMPLATE TOOL

key:
### date (brand)

### 4.30.25 (grid-sandbox)
---
Starting a new branch that will essentially be a revamp and pivot on how this app procceds.
I will first make a veiw port where rectangles can be dragged and placed around the screen.
### 4.25.25(Main) 
---
Issue fixed. computeRowsandCols( ) is called on document change and returns the number of grid rows and cols

Needs to now return a css grid template format. After that is made we can start the calculation on when a div is moved and  more than 50% of its volume is overlapping it will move the overlapping div into the other divs spot.
 
### 4.23.25 (Main)
---
Leaving off at a point where I have refactor the grid col/row algo and added it at the bottom of the call to ```defautlGridStyles()``` .

Values seem skewy, console.log from top to bottom

### TODO (Main)
1. Calculate box area dynamic on box drag
2. Convert box placement into CSS Geid-Template-Area expresion with rows and column data.
