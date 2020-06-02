# pathfinding
Course work gets text file with cities and distances to the nearest ones, makes the graph out of this text file and finds the best route between two chosen cities. 

## How it works
`graph.js` implements graph structure where `City` class creates vertexes
##
`parser.js`  gets file `cities.txt` from root folder, parse it in objects that contains two cities and distance between.
#### Details
`getData`  
**gets** txt file  
**returns** one huge string containing text from txt file  

`parser`  
**gets** txt file  
**returns** array of strings splitted by newlines  

`get rule`  
**gets** txt file  
**returns** string that split values in every line  

`get rule`  
**gets** txt file
**returns** array of objects
```
{
  from,
  to,
  distance
}
```
##
`index.js` gets array of objects from `parcer.js`, creates a graph via `graph.js` and applies Dijkstra's algorithm to get table with the shortest distances between cities. `getRoute` function applies this table to find out the best route between two given cities.
#### Details  
`createGraph`  
**gets** txt file  
**returns** graph with all linked cities  

`getCell`  
**gets** name of Cell, array of Cells
**returns** Cell with appropriate name

`substractArrs`  
**gets** array1, array2  
**returns** array1 without elements of array2  

`getNextCity`  
**gets** table from Dijkstra's algorithm, array of passed cities  
**returns** name of unvisited city with the least weight  

`createTable`  
**gets** array of objects
```
{
  from,
  to,
  distance
}
```
**returns** initial table for Dijksta's algorithm  

`Dijkstra`  
**gets** name of initial city, its graph  
**returns** final table of Dijkstra's algorithm  

`getRoute`  
**gets** initial city, destination, final table of Dijkstra's algorithm  
**returns** string with the shortest route  

## TODO
 - [x] Add tests to my project.
 - [ ] Split `index.js` into `route.js` and `clInterface.js`. Create command line interface in the second one.
 
