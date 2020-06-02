# pathfinding
Course work gets text file with cities and distances to nearest ones, makes graph out of this text file and finds the best route between two chosen cities. 

## How it works
`graph.js` implements graph structure where `City` class creates vertexes

`parcer.js` gets file `cities.txt` from root folder, parce it in objects that contains two cities and distance between.

`index.js` gets array of objects from `parcer.js`, creates a graph via `graph.js` and applies Dijkstra's algorithm to get table with the shortest distances between cities. `getRoute` function applies this table to find out the best route between two given cities.

## TODO
 - [x] Add tests to my project.
 - [ ] Split `index.js` into `route.js` and `clInterface.js`. Create command line interface in the second one.
 
