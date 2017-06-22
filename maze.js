"use strict";

// New maze constructor. Given a maze layout, construct a new maze.
//
// A maze is a rectangular grid of cells. Each cell can either be:
//  - A wall, represented by 'X'
//  - Empty space, represented by ' ' a single space character
//  - Starting point, represented by 'S'
//  - Ending point, represented by 'E'
//
// A maze is represented by a 2-dimensional array.  Inner arrays represent rows
//
// Mazes are solved by finding a path from the starting point to the ending
// point.
//
// Parameters:
//  * maze: A 2-dimensional array representing a rectangular maze.
//          The lengths of the inner arrays must be the same.
//          Each item of the inner array must be a string that represents a valid maze cell
//          There must be only one starting point and only one ending point.
//
// ex. new Maze([['S', 'E']) represents a trivial solvable maze
// ex. new Maze([['S', 'X', 'E']) represents a trivial unsolvable maze
window.Maze = function(maze) {
  // TODO throw exception if this is not called with new
  this.maze = maze;
}

Maze.validDirections = ['up', 'down', 'left', 'right'];

// Return a string representation of the current maze.
// Empty spaces are represented by underscores '_',
// and new rows are separated by newlines (\n in a string).

// Use this for your logging purposes!

// ex. new Maze(['S', ' ', 'E']).toString() -> "S_E"
// ex. new Maze([[' ', 'E'], [' ', 'S']]).toString() -> "_E\n_S"
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).toString -> "S_E\nXXX"

Maze.prototype.toString = function() {
  // YOUR CODE HERE
  // Hint: See Array.prototype.join()!
  var maze = this.maze;
  //console.log(maze.length);

  for (var i = 0; i<maze.length ;i++){
    for (var j = 0; j<maze[i].length; j++){
      if ((maze[i][j]) === " "){
        (maze[i][j]) = '_';
        //console.log("testing~!@@@@");
      }
    }
  }
  var result = "";
  for (var i = 0; i<maze.length; i++){
    result += maze[i].join('');
    if (i !== maze.length-1){
      result += "\n";
    }
  }
  return result;
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  //var startIndex = [];
  var maze = this.maze;
  var startIndex;
  var startExist = false;
 for (var i = 0; i<maze.length ;i++){
    for (var j = 0; j<maze[i].length; j++){
      if ((maze[i][j]) === "S"){
        startExist = true;
        startIndex = [i, j];
      }
    }
  }
  if (startExist === false){
    throw new Error("Maze has no starting point");
  }
  //console.log("output!!" + startIndex);
  return startIndex;
}

// Write a method tryMove() that takes a position (row and column parameters)
// a direction to move, and returns:
//  - if the move is valid, a new position ([row, column])
//  - if the move is invalid, false
//
// The position 0, 0 represents the upper left corner of the maze.
//
// A move is invalid if any of the following conditions are true:
//  - starting position is invalid (i.e. not on the board)
//  - move ends on a cell that's a wall (represented by 'X')
//  - move results in moving off the board (i.e. moving up from the top row, or
//    moving left from the leftmost column etc.)
//
// Parameters:
//  - row: row before the move. 0 represents top row.
//  - column: column before the move. 0 represents leftmost column.
//  - direction: direction to try to move. Must be one of:
//    - 'up': Move up i.e. decrement row
//    - 'down': Move down i.e. increment row
//    - 'left': Move left i.e. decrement column
//    - 'right': Move right i.e. increment column
//
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'leftright') -> Throws error: 'leftright' is not a valid direction
// ex. new Maze([['S', 'E']]).tryMove(1, 0, 'right') -> false, invalid starting position
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'left') -> false, moves off the left side of board
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'up') -> false, moves off the top of the board
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'down') -> false, moves off the bottom of the board
// ex. new Maze([['S', 'X', 'E']]).tryMove(0, 0, 'right') -> false, moves into wall
// ex. new Maze([['S', 'X', 'E']]).tryMove(0, 2, 'left') -> false, moves into wall
// ex. new Maze([['S'], ['E']]).tryMove(0, 0, 'right') -> false, moves off right side of the board
// ex. new Maze([['S'], ['X'], ['E']]).tryMove(0, 0, 'down') -> false, moves into wall
// ex. new Maze([['S'], ['X'], ['E']]).tryMove(2, 0, 'up') -> false, moves into wall
//
//
// ex. new Maze([['S'], ['E']]).tryMove(0, 0, 'down') -> [1, 0]
// ex. new Maze([['S'], ['E']]).tryMove(1, 0, 'up') -> [0, 0]
// ex. new Maze([['S', 'E']]).tryMove(0, 1, 'left') -> [0, 0]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'left') -> [0, 0]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'right') -> [0, 2]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 0, 'right') -> [0, 1]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', ' ']]).tryMove(1, 2, 'up') -> [0, 2]
Maze.prototype.tryMove = function(row, column, direction) {
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  // Maze.validDirections = ['up', 'down', 'left', 'right'];

  // YOUR CODE HERE
  var maze = this.maze;
  if (direction === 'up'){
    if (row >= maze.length){
      return false;
    }
    row--;
    if (row < 0 || maze[row][column] === "X"){
      return false;
    }
    return [row, column];
  }

  else if (direction === 'down'){
    row++;
    if (row >= maze.length || maze[row][column] === "X"){
      return false;
    }
    return [row, column];
  }
  else if (direction === 'right'){
    if (row >= maze.length){
      return false;
    }
    column++;
    if (column >= maze[0].length || maze[row][column] === "X"){
      return false;
    } 
    return [row, column];
  }
  else if (direction === 'left'){
    column--;
    if (column < 0 || maze[row][column] === "X"){
      return false;
    }
    return [row, column];
  }
}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
  //var maze = this;
  console.log("current: " + this);
  var currentPos = this.getStartPosition();
  
  console.log("current: " + currentPos[0] + currentPos[1]);
  console.log("starting point: " + this.maze[[currentPos[0]]][currentPos[1]]);

  console.log("testing move " + this.tryMove(currentPos[0], currentPos[1], right));
  console.log("starting point2: " + this.maze[[currentPos[0]]][currentPos[1]]);
  while (this[currentPos[0]][currentPos[1]] !== "E"){
    if (this.maze.tryMove(currentPos[0], currentPos[1], right) === false){
      return false;
    }
    else if (this.maze.tryMove(currentPos[0], currentPos[1], right) !== false){
      currentPos = this.maze.tryMove(currentPos[0], currentPos[1], right);
      console.log(currentPos);
    }
  }
  return true;

  // try 2
  //var maze = this.maze;
  // console.log("maze123: " + this);
  // var currentPos = this.getStartPosition();
  // console.log("current pos: " + currentPos);
  
  
}
