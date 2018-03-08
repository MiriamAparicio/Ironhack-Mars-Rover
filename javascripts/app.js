// Rover Object Goes Here
// ======================
var rover = {
  direction: "E",
  x: 0,
  y: 0,
  travelLog: []
}
//I change start direction from N to E
//because I think it's not very logic that the rover is facing the limits of the grid on a start position
// ======================

//Rover's grid. Create obstacles for the rover. "R" is for a rock, "H" is for a hole
var grid = [
  [null, null, null, "H", null, null, null, null, "H", null],
  [null, null, null, null, "R", null, null, null, "R", null],
  ["R", null, null, null, "R", null, null, null, "R", null],
  [null, "H", null, null, null, null, null, null, null, null],
  [null, null, null, null, "R", null, null, null, null, null],
  [null, null, null, "R", null, null, null, null, null, null],
  [null, "R", null, "H", null, null, null, "R", null, null],
  ["R", null, null, null, null, null, null, null, null, null],
  [null, "R", null, null, null, null, null, null, null, null],
  [null, null, null, null, "R", null, null, null, "H", null]
];

function initRover() {

  var confContinue = true;
  do {
    insertRoverPath();
    confContinue = confirm("Do you want to add a  new path?");
  } while (confContinue);
  console.log("See you soon martian!")
}

//turn the rover in the appropriate direction based off of its current direction.
function turnLeft(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "E":
      rover.direction = "N";
      break
  }
  console.log("Now rover's direction is " + rover.direction);
}

function turnRight(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
    case "E":
      rover.direction = "S";
      break;
  }
  console.log("Now rover's direction is " + rover.direction);
}

//Moving rover’s current position
function moveForward(rover) {
  switch (rover.direction) {
    case "N":
      if (rover.x === 0) {
        console.log("You can move out of grid limits");
      } else {
        rover.x--;
        if (obstacleSearch(rover)) {
          moveBackward(rover);
        } else {
          updateRoverPosition(rover);
        }
      }
      break;
    case "S":
      if (rover.x === 9) {
        console.log("You can move out of grid limits");
      } else {
        rover.x++;
        if (obstacleSearch(rover)) {
          moveBackward(rover);
        } else {
          updateRoverPosition(rover);
        }
      }
      break;
    case "W":
      if (rover.y === 0) {
        console.log("You can move out of grid limits");
      } else {
        rover.y--;
        if (obstacleSearch(rover)) {
          moveBackward(rover);
        } else {
          updateRoverPosition(rover);
        }
      }
      break;
    case "E":
      if (rover.y === 9) {
        console.log("You can move out of grid limits");
      } else {
        rover.y++;
        if (obstacleSearch(rover)) {
          moveBackward(rover);
        } else {
          updateRoverPosition(rover);
        }
      }
      break;
  }
}

function moveBackward(rover) {
  switch (rover.direction) {
    case "N":
      if (rover.x === 9) {
        console.log("You can move out of grid limits");
      } else {
        rover.x++;
        updateRoverPosition(rover);
      }
      break;
    case "S":
      if (rover.x === 0) {
        console.log("You can move out of grid limits");
      } else {
        rover.x--;
        updateRoverPosition(rover);
      }
      break;
    case "W":
      if (rover.y === 9) {
        console.log("You can move out of grid limits");
      } else {
        rover.y++;
        updateRoverPosition(rover);
      }
      break;
    case "E":
      if (rover.y === 0) {
        console.log("You can move out of grid limits");
      } else {
        rover.y--;
        updateRoverPosition(rover);
      }
      break;
  }
}

//updates rover position and add the new coordinates to the travelLog
function updateRoverPosition(rover) {
  var roverCurrentPosition = "x: " + rover.x + ", y: " + rover.y;
  console.log("Rover's current coordinates: x: " + rover.x + ", y: " + rover.y);
  rover.travelLog.push(roverCurrentPosition);
}

//insert the movements by "f"orward, "r"ight, "l"eft and "b"ackward
//calls the validation function
//shows the rover's path, tracking it's travel log 
function insertRoverPath() {
  var commands = prompt("Introduce Rover's path: (f)orward, (b)ackward, (r)ight or (l)eft ");
  if (validation(commands)) {
    for (var i = 0; i < commands.length; i++) {
      switch (commands[i]) {
        case "f":
          moveForward(rover);
          break;
        case "r":
          turnRight(rover);
          break;
        case "l":
          turnLeft(rover);
          break;
        case "b":
          moveBackward(rover);
          break;
      }
    }

    showRoverPath(rover);

  } else {
    alert("Your path is not correct.");
  }
}

//validates the correct inputs (f,r,l,b)
function validation(commands) {
  var validCommand = false;
  for (var i = 0; i < commands.length; i++) {
    if (commands[i] === "f") {
      validCommand = true;
    } else if (commands[i] === "r") {
      validCommand = true;
    } else if (commands[i] === "l") {
      validCommand = true;
    } else if (commands[i] === "b") {
      validCommand = true;
    } else {
      validCommand = false;
      break;
    }
  }
  return validCommand;
}

//interation to show the travel log, where the rover has been
function showRoverPath(rover) {
  console.log("TRAVEL LOG:")
  for (var i = 0; i < rover.travelLog.length; i++) {
    console.log(rover.travelLog[i]);
  }
}

//If the rover’s next move would run into an obstacle on the grid,
// stop it from moving forward and report the obstacle as found with console.log
function obstacleSearch(rover) {

  if (grid[rover.x][rover.y] === "R") {
    console.log("Rover find a rock on position: x:" + rover.x + ", y:" + rover.y);
    return true;
  } else if (grid[rover.x][rover.y] === "H") {
    console.log("Rover find a hole on position: x:" + rover.x + ", y:" + rover.y);
    return true;
  } else {
    return false;
  }
}

console.log("Welcome to Mars Rover Program!");
console.log("Please write on the console: initRover(); and press intro.");


