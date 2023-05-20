var theDojo = [ [1, 0, 1, 1, 1, 0, 4, 0, 8, 0],
                [3, 1, 0, 7, 0, 0, 6, 0, 8, 8],
                [5, 0, 7, 0, 3, 6, 6, 6, 0, 0],
                [2, 3, 0, 9, 0, 0, 6, 0, 8, 0],
                [6, 0, 3, 3, 0, 2, 0, 3, 0, 4],
                [0, 0, 3, 3, 0, 0, 2, 2, 3, 0],
                [0, 0, 0, 0, 5, 0, 1, 2, 0, 6],
                [2, 2, 2, 2, 0, 7, 1, 1, 1, 0],
                [5, 2, 0, 2, 0, 0, 0, 1, 1, 2],
                [9, 2, 2, 2, 0, 7, 0, 1, 1, 0] ];
var dojoDiv = document.querySelector("#the-dojo");
    
// Creates the rows of buttons for this game
function render(theDojo) {
    var result = "";
    for(var i=0; i<theDojo.length; i++) {
        for(var j=0; j<theDojo[i].length; j++) {
        result += `<button class="tatami" onclick="howMany(${i}, ${j}, this)"></button>`;
        }
    }
    return result;
}
    
// TODO - Make this function tell us how many ninjas are hiding 
//        under the adjacent (all sides and corners) squares.
//        Use i and j as the indexes to check theDojo.
function howMany(i, j, element) {
    // check if clicked on ninja
    if (theDojo[i][j] == 1){
        dojoDiv.innerHTML = `<button onclick="location.reload()">restart</button>`;
    } else { // did not click on ninja, check how many ninja's around spot
        let sum = 0;
        for (let row = i - 1; row < i + 2; ++ row) {
            for (let column = j - 1; column < j + 2; ++ column) {
                // if row is out of bounds on left side, move into bounds
                if (row < 0) {
                    row = 0;
                } // if row is out of bounds on right side, break for loop
                else if (row >= theDojo.length) {
                    break;
                } // if column is out of bounds on top side, move into bounds
                if (column < 0) {
                    column = 0;
                } // if column is out of bounds on bottom side, break for loop
                else if (column >= theDojo.length) {
                    break;
                }
                // row/column is in bounds, add to sum
                sum += theDojo[row][column];
            }
        }
        // minus selected block, but is redundant code for ninjasweeper as this spot will be 0.
        sum-= theDojo[i][j]
        return element.innerHTML = sum;
    }
}
    
// BONUS CHALLENGES
// 1. draw the number onto the button instead of alerting it
// 2. at the start randomly place 10 ninjas into theDojo with at most 1 on each spot
// 3. if you click on a ninja you must restart the game 
//    dojoDiv.innerHTML = `<button onclick="location.reload()">restart</button>`;

// Bonus - working now
function createNinjaSweeper(ninjaNum){
    let count = 0;
    // wipe TheDojo board
    for (var i = 0; i < theDojo.length; i++){
        for (var j = 0; j < theDojo[i].length; j++){
            theDojo[i][j] = 0;
        }
    }
    while (count <= ninjaNum){
        var randX = Math.floor(Math.random()*theDojo.length);
        var randY = Math.floor(Math.random()*theDojo.length);
        if (theDojo[randX][randY] == 0){
            theDojo[randX][randY] = 1;
            count++;
        }
    }
}
// clear board to set number of ninja's
createNinjaSweeper(10);

// start the game
// message to greet a user of the game
var style="color:cyan;font-size:1.5rem;font-weight:bold;";
console.log("%c" + "IF YOU ARE A DOJO STUDENT...", style);
console.log("%c" + "GOOD LUCK THIS IS A CHALLENGE!", style);
// shows the dojo for debugging purposes
console.table(theDojo);
// adds the rows of buttons into <div id="the-dojo"></div> 
dojoDiv.innerHTML = render(theDojo);    

