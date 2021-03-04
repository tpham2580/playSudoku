// all variables
// referenced youtube video to set up sudoku table; link here: https://www.youtube.com/watch?v=VokhAdAfWCw
// referenced geeksforgeeks sudoku backtracking to help with solving sudoku puzzle. Link here: https://www.geeksforgeeks.org/sudoku-backtracking-7/

var selected_num;
var selected_slot;
var table = [];
for (var x=0; x<9; x++){
    table.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
var tableID = document.getElementById("table");
var answerID = document.getElementById("answer");

// easy, intermediate, and difficult problem
var easy = [[0, 0, 0, '2', '6', 0, '7', 0, '1'],
            ['6', '8', 0, 0, '7', 0, 0, '9', 0],
            ['1', '9', 0, 0, 0, '4', '5', 0, 0],
            ['8', '2', 0, '1', 0, 0, 0, '4', 0],
            [0, 0, '4', '6', 0, '2', '9', 0, 0],
            [0, '5', 0, 0, 0, '3', 0, '2', '8'],
            [0, 0, '9', '3', 0, 0, 0, '7', '4'],
            [0, '4', 0, 0, '5', 0, 0, '3', '6'],
            ['7', 0, '3', 0, '1', '8', 0, 0, 0]]

var intermediate = [[0, '2', 0, '6', 0, '8', 0, 0, 0],
                    ['5', '8', 0, 0, 0, '9', '7', 0, 0],
                    [0, 0, 0, 0, '4', 0, 0, 0, 0],
                    ['3', '7', 0, 0, 0, 0, '5', 0, 0],
                    ['6', 0, 0, 0, 0, 0, 0, 0, '4'],
                    [0, 0, '8', 0, 0, 0, 0, '1', '3'],
                    [0, 0, 0, 0, '2', 0, 0, 0, 0],
                    [0, 0, '9', '8', 0, 0, 0, '3', '6'],
                    [0, 0, 0, '3', 0, '6', 0, '9', 0]]

var difficult = [['2', 0, 0, '3', 0, 0, 0, 0, 0],
                ['8', 0, '4', 0, '6', '2', 0, 0, '3'],
                [0, '1', '3', '8', 0, 0, '2', 0, 0],
                [0, 0, 0, 0, '2', 0, '3', '9', 0],
                ['5', 0, '7', 0, 0, 0, '6', '2', '1'],
                [0, '3', '2', 0, 0, '6', 0, 0, 0],
                [0, '2', 0, 0, 0, '9', '1', '4', 0],
                ['6', 0, '1', '2', '5', 0, '8', 0, '9'],
                [0, 0, 0, 0, 0, '1', 0, 0, '2']]

// event listener for easy, intermediate, and difficult buttons
document.getElementById("easy").addEventListener("click", function(e){
    e.preventDefault;
    clearTable();
    table = JSON.parse(JSON.stringify(easy));
    setSudokuTable();
});

document.getElementById("intermediate").addEventListener("click", function(e){
    e.preventDefault;
    clearTable();
    table = JSON.parse(JSON.stringify(intermediate));
    setSudokuTable();
});

document.getElementById("difficult").addEventListener("click", function(e){
    e.preventDefault;
    clearTable();
    table = JSON.parse(JSON.stringify(difficult));
    setSudokuTable();
});

function createTable(table){
    for (var i=0; i<9; i++){
        for (var j = 0; j < 9; j++){
            var new_cell = document.createElement("div");
            var cell_class = i.toString() + j.toString();
            new_cell.setAttribute("class", "cell");
            new_cell.setAttribute("id", cell_class);
            new_cell.setAttribute("data-original", "false");
            table.appendChild(new_cell);
        }
    }
}

function cellFormatting(){
    $("#table").children().each(function(){
        var x;
        var y;

        x = parseInt($(this).attr("id").substring(0, 1));
        y = parseInt($(this).attr("id").substring(1));

        if (y==2 || y==5){
            $(this).css("border-right-width", 5);
        }
        if (x==2 || x==5){
            $(this).css("border-bottom-width", 5);
        }
    });
}

function setSudokuTable(){
    for (var x=0; x<9; x++){
        for (var y=0; y<9; y++){
            if(table[x][y] != 0){
                var cell_id = x.toString()+y.toString();
                var cell = document.getElementById(cell_id);
                cell.textContent = table[x][y];
                cell.setAttribute("data-original", "true");
                cell.style.fontWeight = "bold";
            }
        }
    }
}

// sets default sudoku table
document.getElementById("default").addEventListener("click", function(e){
    e.preventDefault();
    clearOutput();
    setSudokuTable();
});

function resetTable(){
    for (var x=0; x<9; x++){
        for (var y=0; y<9; y++){
            if(table[x][y] !=0){
                var cell_id = x.toString()+y.toString();
                var cell = document.getElementById(cell_id);
                if (cell.getAttribute("data-original") != "true"){
                    cell.textContent = ""
                    table[x][y] = 0;
                }
            }
        }
    }
}

// resets sudoku table back to default
document.getElementById("reset-table").addEventListener("click", function(e){
    e.preventDefault();
    clearOutput();
    resetTable();
});

function clearTable(){
    clearOutput();
    table = [];
    for (var x=0; x<9; x++){
        table.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    for (var x=0; x<9; x++){
        for (var y=0; y<9; y++){
            var cell_id = x.toString()+y.toString();
            var cell = document.getElementById(cell_id);
            cell.setAttribute("data-original", "false");
            cell.style.fontWeight = "normal";
            cell.textContent = "";
        } 
    }
}

// clears the entire sudoku table when button is pressed
document.getElementById("clear-table").addEventListener("click", function(e){
    e.preventDefault();
    clearOutput();
    clearTable();
});

function checkTable(){
    // checks the rows first
    for (var row=0; row<9; row++){
        var row_set = [];
        for (var col=0; col<9; col++){
            if ((row_set.includes(table[row][col])) || (table[row][col]==0)){
                return false;
            } else if (!(row_set.includes(table[row][col])) && (table[row][col]>=1 && table[row][col]<=9)){
                row_set.push(table[row][col]);
            }
        }
    }

    // checks col next
    for (var col=0; col<9; col++){
        var col_set = [];
        for (var row=0; row<9; row++){
            if (col_set.includes(table[row][col]) || table[row][col]==0){
                return false;
            } else if (!(row_set.includes(table[row][col])) && (table[row][col]>=1 && table[row][col]<=9)){
                col_set.push(table[row][col]);
            }
        }
    }

    //check box for repeating numbers
    for (var big_row=0; big_row<3; big_row++){
        for (var big_col=0; big_col<3; big_col++){
            var big_list = [];
            for (var row = big_row * 3; row < (big_row+1)*3; row++){
                for (var col = big_col * 3; col < (big_col+1)*3; col++){
                    if (big_list.includes(table[row][col]) || table[row][col]==0){
                        return false;
                    } else if (!(big_list.includes(table[row][col])) && (table[row][col]>=1 && table[row][col]<=9)){
                        big_list.push(table[row][col]);
                    }
                }
            }
        }
    }
        
    return true;
}

function clearCheckOutput(){
    answerID.innerHTML = "";
}

function setCheckOutput(check){
    clearCheckOutput();

    var newButton = document.createElement("div");
    if (check == true){
        newButton.setAttribute("class", "text-dark fs-3 p-2 bg-success");
        newButton.textContent = "SOLVED";
    } else {
        newButton.setAttribute("class", "text-dark fs-3 p-2 bg-danger");
        newButton.textContent = "NOT SOLVED";
    }
    answerID.appendChild(newButton);
}

// checks to see if the sudoku puzzle is solved
document.getElementById("check").addEventListener("click", function(e){
    e.preventDefault();
    clearOutput();
    check = checkTable();
    setCheckOutput(check);
    
});

// find empty position and returns array of i and j
function findEmpty(){
    for (var i=0; i<9; i++){
        for (var j=0; j<9; j++){
            if (table[i][j]==0){
                return [i, j];
            }
        }
    }
    return null;
}

// checks if the input is valid
function isValid(val, pos){
    // checks the row for duplicates
    for (var j=0; j<9; j++){
        if (table[pos[0]][j] == val && pos[1] !== j){
            return false;
        }
    }

    // checks the column for duplicates
    for (var i=0; i<9; i++){
        if (table[i][pos[1]] == val && pos[0] !== i){
            return false;
        }
    }

    // finds subsection
    var sub_row = Math.floor(pos[0]/3);
    var sub_col = Math.floor(pos[1]/3);

    for (var i=(sub_row*3); i<(sub_row*3 + 3); i++){
        for (var j=(sub_col*3); j<(sub_col*3 + 3); j++){
            if (table[i][j]==val && i !== pos[0] && j !== pos[1]){
                return false;
            }
        }
    }

    return true;
}

// solves the sudoku puzzle
function solve(){
    // base case when we reach the end of the table
    var empty = findEmpty();
    if (!empty || empty==null){
        return true
    } else {
        var row = empty[0];
        var col = empty[1];
    }

    // iterates from 1 to 9 for each cell, finding the first number that works
    for (var i=1; i<10; i++){
        if (isValid(i, [row, col])){
            var cell = document.getElementById(row.toString() + col.toString());
            table[row][col] = i.toString();
            cell.textContent = i.toString();

            if (solve()){
                return true;
            }

            // resets the cell if the table does not work
            table[row][col] = 0;
            cell.textContent = "";
        }
    }

    // backtracks if we can not find a solution
    return false;

}

function clearOutput(){
    $("#answer").empty();
}

document.getElementById("solve").addEventListener("click", function(e){
    e.preventDefault();
    clearOutput();
    solve();
});

window.onload = function() {
    createTable(tableID);
    cellFormatting();
    setSudokuTable();

    var oldCell = null;
    var newCell;

    $(".cell").click(function(){
        newCell = $(this);
        console.log(newCell[0].textContent);
        if (newCell.attr("data-original") === "true"){
            if (oldCell != null){
                oldCell.css("background-color", "white");
            }
            return false;
        }
        if (oldCell != null){
            oldCell.css("background-color", "white");
        }
        $(this).css("background-color", "#fff4ae");
        oldCell = $(this);

        // when the user clicks on a key
        $(window).keydown(function(e){
            if (newCell[0].getAttribute("data-original") != "true"){
                var id_list = newCell[0].getAttribute("id").toString().split("");
                var x = parseInt(id_list[0]);
                var y = parseInt(id_list[1]);
                // >=1 and <=9
                if ((e.which >= 49 && e.which <= 57) || (e.which >= 97 && e.which <= 105)){
                    if (e.which >= 97 && e.which <= 105){
                        newCell[0].textContent = String.fromCharCode(e.which - 48);
                        table[x][y] = String.fromCharCode(e.which - 48);
                    } else {
                        newCell[0].textContent = String.fromCharCode(e.which);
                        table[x][y] = String.fromCharCode(e.which);
                    }
                } else if (e.which == 8 || e.which == 46){
                    newCell[0].textContent = "";
                    table[x][y] = 0;
                }
            }
        }).keyup(function(e){

        });
    });
}
