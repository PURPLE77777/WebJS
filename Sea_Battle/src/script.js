const app = new Application();
let player = app.player;
let opponent = app.opponent;
let menu = document.getElementsByClassName("menu")[0];
let eventBlock = document.getElementsByClassName("event")[0];
let helperMove = document.getElementsByClassName("helper-move")[0];
let result = document.getElementsByClassName("winner")[0];
let btnEasy = document.querySelector('[data-computer="easy"]');
let btnMiddle = document.querySelector('[data-computer="middle"]');
let btnHard = document.querySelector('[data-computer="hard"]');
let activeBot, levelArray, up = true, right = true, bottom = true, left = true;

function prepareForGame () {
    //Убираем меню и отображаем подсказчика ходов
    menu.style.display = "none";
    eventBlock.style.display = "block";
    helperMove.style.display = "block";

    //Запрещаем менять позиции кораблей во время игры и меняем курсор
    player.ships.forEach(function (ship) {
        ship.canChangePosition = false;
        ship.div.style.cursor = "default";
    });
    player.cells.forEach(function (cellsRow) {
        cellsRow.forEach(function (cell) {
            cell.style.cursor = "default";
        });
    });
    opponent.ships.forEach(function (ship) {
        ship.div.style.cursor = "crosshair";
    });
    opponent.cells.forEach(function (cellsRow) {
        cellsRow.forEach(function (cell) {
            cell.style.zIndex = "1000";
            cell.style.cursor = "crosshair";
        });
    });
}

function addShotsAroundDeadShip(user, shipDead) {
    let x = parseInt(shipDead.cell.getAttribute("data-x"));
    let y = parseInt(shipDead.cell.getAttribute("data-y"));
    let size = shipDead.size;
    let dirR = shipDead.direction == "row";
    let dirC = shipDead.direction == "col";
    let count = 3 * (size + 2);
    let countSup = 0;
    for (let dy = y - 1; dy <= y + dirR + size * dirC; dy++) {
        for (let dx = x - 1; dx <= x + size * dirR + dirC; dx++) {
            if (dy < 0 || dy > 9) {
                countSup++;
            }
            else {
                if (dx < 0 || dx > 9) {
                    countSup++;
                }
                else {
                    if (user.shots[dy][dx] === true || user.shots[dy][dx] == null) {
                        user.shots[dy][dx] = false;
                        let cell = user.cells[dy][dx];
                        let miss = document.createElement("span");
                        miss.style.zIndex = "1050";
                        // miss.innerHTML = '\u00B7';
                        cell.append(miss);
                        countSup++;
                    }
                    else {
                        countSup++;
                    }
                }
            }
        }
    }
    if (countSup == count) {
        return true;
    }
}

function endGame (winner) {
    helperMove.style.borderRight = "0px solid red";
    helperMove.style.borderLeft = "0px solid green";
    helperMove.style.display = "none";
    result.style.display = "block";
    player.ships.forEach(function (ship) {
        if (ship.killed == false) {
            ship.div.style.zIndex = "1050";
        }
        else {
            ship.cells.forEach(function (cell) {
                cell.style.zIndex = "auto";
            });
            cell.style.backgroundColor = "#e1e4ff";
            ship.div.style.zIndex = "1050";
            ship.div.style.outline = "3px solid rgb(255, 0, 0)";
            ship.div.style.backgroundColor = "rgba(255, 0, 0, .5)";
        }
    });
    opponent.ships.forEach(function (ship) {
        if (ship.killed == false) {
            ship.div.style.zIndex = "1050";
        }
        else {
            ship.cells.forEach(function (cell) {
                cell.style.zIndex = "auto";
            });
            cell.style.backgroundColor = "#e1e4ff";
            ship.div.style.zIndex = "1050";
            ship.div.style.outline = "3px solid rgb(255, 0, 0)";
            ship.div.style.background = "rgba(255, 0, 0, .5)";
        }
    });
    if (winner == player) {
        result.style.background = 'url("../Sea_Battle/img/win.png") round';
    } else {
        result.style.background = 'url("../Sea_Battle/img/lose.png") round';
        opponent.dock.style.visibility = "visible";
    }
}

let hit = false, shipNow, cell, xRand, yRand, level;
function botMove() {
    if (!hit) {
        xRand = Math.floor(Math.random()*10);
        yRand = Math.floor(Math.random()*10);
        let checkValue = 0;
        player.shots.forEach(function (shotsRow) {
            shotsRow.forEach(function (elem) {
                if (elem == false) { checkValue++; }
            });
        });
        if (100 - checkValue <= level) {
            for (let y = 0; y < player.shots.length; y++) {
                for (let x = 0; x < player.shots[y].length; x++) {
                    if (player.shots[y][x] == null) player.shots[y][x] = true;
                }
            }
        }
        if(player.shots[yRand][xRand] == true) {
            player.shots[yRand][xRand] = false;
            cell = document.querySelectorAll(`[data-y="${yRand}"][data-x="${xRand}"]`)[0];
            if(player.matrix[yRand][xRand] === false) {
                hit = true;
                for (let a = 0; a < player.ships.length; a++) {
                    if (player.ships[a].cells.indexOf(cell) > -1) {
                        shipNow = player.ships[a];
                        break;
                    } 
                }
                cell.classList.add("hitted");
                cell.style.backgroundColor = "rgb(159, 27, 27)";
                let index = shipNow.cells.indexOf(cell);
                shipNow.cells.splice(index, 1);
                shipNow.hp -= 1;
                if (shipNow.hp == 0) {
                    shipNow.div.classList.add("killed");
                    addShotsAroundDeadShip(player, shipNow);
                    hit = false;
                    shipNow.killed = true;
                }
                if (player.ships.every(function (ship) { return ship.killed; })) {
                    endGame(opponent);
                } 
                else setTimeout(botMove, 1000);
            } else {
                addMiss();
                playerMove();
            }
        } else {
            botMove();
        }
    } else {
        let count = 0;
        if (up && yRand - 1 > -1) count++; else up = false;
        if (bottom && yRand + 1 < 10) count++; else bottom = false;
        if (right && xRand + 1 < 10) count++; else right = false;
        if (left && xRand - 1 > -1) count++; else left = false; 
        let randShot = Math.floor(Math.random() * 100);

        if (up && randShot < Math.floor(100 / count)) {
            if (player.shots[yRand - 1][xRand] === true) {
                player.shots[yRand - 1][xRand] = false; 
                yRand = yRand - 1;
                cell = document.querySelectorAll(`[data-y="${yRand}"][data-x="${xRand}"]`)[0];
                if (player.matrix[yRand][xRand] === false) {
                    cell.classList.add("hitted");
                    cell.style.backgroundColor = "rgb(159, 27, 27)";
                    let index = shipNow.cells.indexOf(cell);
                    shipNow.cells.splice(index, 1);
                    shipNow.hp -= 1;
                    if (shipNow.hp == 0) {
                        shipNow.div.classList.add("killed");
                        addShotsAroundDeadShip(player, shipNow);
                        hit = false;
                        right = true; bottom = true; left = true;
                        shipNow.killed = true;
                        if (player.ships.every(function (ship) { return ship.killed; })) {
                            endGame(opponent);
                        } 
                        else setTimeout(botMove, 1000);
                    }
                    else {
                        right = false; left = false;
                        setTimeout(botMove, 1000);
                    }
                } else { up = false; yRand = yRand + 1; addMiss(); playerMove(); }
            } else if (player.matrix[yRand - 1][xRand] === true) { 
                up = false;
                botMove();
            } else { yRand = yRand - 1; botMove(); }
        }
        else if (bottom && randShot < Math.floor(100 / count * 2)) {
            if (player.shots[yRand + 1][xRand] === true) {
                player.shots[yRand + 1][xRand] = false;
                yRand = yRand + 1;
                cell = document.querySelectorAll(`[data-y="${yRand}"][data-x="${xRand}"]`)[0];
                if (player.matrix[yRand][xRand] === false) {
                    cell.classList.add("hitted");
                    cell.style.backgroundColor = "rgb(159, 27, 27)";
                    let index = shipNow.cells.indexOf(cell);
                    shipNow.cells.splice(index, 1);
                    shipNow.hp -= 1;
                    if (shipNow.hp == 0) {
                        shipNow.div.classList.add("killed");
                        addShotsAroundDeadShip(player, shipNow);
                        hit = false;
                        right = true; up = true; left = true;
                        shipNow.killed = true;
                        if (player.ships.every(function (ship) { return ship.killed; })) {
                            endGame(opponent);
                        } 
                        else setTimeout(botMove, 1000);
                    }
                    else {
                        right = false; left = false;
                        setTimeout(botMove, 1000);
                    }
                } else { bottom = false; yRand = yRand - 1; addMiss(); playerMove(); }
            } else if (player.matrix[yRand + 1][xRand] === true ) { 
                bottom = false;
                botMove();
            } else { yRand = yRand + 1; botMove(); }
        }
        else if (right && randShot < Math.floor(100 / count * 3)) {
            if (player.shots[yRand][xRand + 1] === true) {
                player.shots[yRand][xRand + 1] = false;
                xRand = xRand + 1;
                cell = document.querySelectorAll(`[data-y="${yRand}"][data-x="${xRand}"]`)[0];
                if (player.matrix[yRand][xRand] === false) {
                    cell.classList.add("hitted");
                    cell.style.backgroundColor = "rgb(159, 27, 27)";
                    let index = shipNow.cells.indexOf(cell);
                    shipNow.cells.splice(index, 1);
                    shipNow.hp -= 1;
                    if (shipNow.hp == 0) {
                        shipNow.div.classList.add("killed");
                        addShotsAroundDeadShip(player, shipNow);
                        hit = false;
                        left = true; up = true; bottom = true;
                        shipNow.killed = true;
                        if (player.ships.every(function (ship) { return ship.killed; })) {
                            endGame(opponent);
                        } 
                        else setTimeout(botMove, 1000);
                    }
                    else {
                        up = false; bottom = false;
                        setTimeout(botMove, 1000);
                    }
                } else { right = false; xRand = xRand - 1; addMiss(); playerMove(); }
            } else if (player.matrix[yRand][xRand + 1] === true ) { 
                right = false;
                botMove();
            } else { xRand = xRand + 1; botMove(); }
        }
        else if (left && randShot < 100) {
            if (player.shots[yRand][xRand - 1] === true) {
                player.shots[yRand][xRand - 1] = false;
                xRand = xRand - 1;
                cell = document.querySelectorAll(`[data-y="${yRand}"][data-x="${xRand}"]`)[0];
                if (player.matrix[yRand][xRand] === false) {
                    cell.classList.add("hitted");
                    cell.style.backgroundColor = "rgb(159, 27, 27)";
                    let index = shipNow.cells.indexOf(cell);
                    shipNow.cells.splice(index, 1);
                    shipNow.hp -= 1;
                    if (shipNow.hp == 0) {
                        shipNow.div.classList.add("killed");
                        addShotsAroundDeadShip(player, shipNow);
                        hit = false;
                        right = true; up = true; bottom = true;
                        shipNow.killed = true;
                        if (player.ships.every(function (ship) { return ship.killed; })) {
                            endGame(opponent);
                        } 
                        else setTimeout(botMove, 1000);
                    }
                    else {
                        up = false; bottom = false;
                        setTimeout(botMove, 1000);
                    }
                } else { left = false; xRand = xRand + 1; addMiss(); playerMove(); }
            } else if (player.matrix[yRand][xRand - 1] === true ) { 
                left = false;
                botMove();
            } else { xRand = xRand - 1; botMove(); }
        }
    }
}

function addMiss () {
    let miss = document.createElement("span");
    miss.style.zIndex = "1050";
    // miss.innerHTML = '\u00B7';
    cell.append(miss);
    helperMove.style.borderRight = "0px solid red";
    helperMove.style.borderLeft = "50px solid green";
}

function playerMove() {
    function shot(e) {
        if (e.button == 0 && e.target.classList.contains("battlefield-td")) {
            let cell = e.target;
            let x = Number(e.target.getAttribute("data-x"));
            let y = Number(e.target.getAttribute("data-y"));
            if(opponent.shots[y][x] == true) {
                opponent.shots[y][x] = false;
                if(opponent.matrix[y][x] === false) {
                    let shipN;
                    for (let a = 0; a < opponent.ships.length; a++) {
                        if (opponent.ships[a].cells.indexOf(cell) > -1) {
                            shipN = opponent.ships[a];
                            let index = shipN.cells.indexOf(e.target);
                            e.target.style.backgroundColor = "rgb(159, 27, 27)";
                            shipN.cells.splice(index, 1);
                            shipN.hp -= 1;
                            if (shipN.hp == 0) {
                                shipN.killed = true;
                                addShotsAroundDeadShip(opponent, shipN);
                                opponent.table.removeEventListener("click", shot);
                                if (opponent.ships.every(function (ship) { return ship.killed; })) {
                                    opponent.table.removeEventListener("click", shot);
                                    endGame(player);
                                    break;
                                } else {
                                    opponent.table.removeEventListener("click", shot);
                                    playerMove();
                                    break;
                                }
                            } else {
                                e.target.style.backgroundColor = "rgb(159, 27, 27)";
                                opponent.table.removeEventListener("click", shot);
                                playerMove();
                                break;
                            }
                        } 
                    }
                } else {
                    let miss = document.createElement("span");
                    miss.style.zIndex = "550";
                    // miss.innerHTML = '\u00B7';
                    cell.append(miss);
                    opponent.table.removeEventListener("click", shot);
                    helperMove.style.borderLeft = "0px solid green";
                    helperMove.style.borderRight = "50px solid red";
                    opponent.table.removeEventListener("click", shot);
                    setTimeout(botMove, 1000);
                }
            }
        }
    }
    opponent.table.addEventListener("click", shot);
}

function addLevelToBot(count) {
    if (count == 0) {
        return true;
    } else {
        let randX = Math.floor(Math.random() * 10);
        let randY = Math.floor(Math.random() * 10);
        if(player.matrix[randY][randX] && player.shots[randY][randX] != null) {
            player.shots[randY][randX] = null;
            count--;
            if (count == 0) {
                return true;
            }
            else {
                addLevelToBot(count);
            }
        } else {
            addLevelToBot(count);
        }
    }
}

//При нажатии на кнопку "Играть против слабого"
btnEasy.addEventListener("click", function () {
    prepareForGame();
    activeBot = "hard";
    //Случайным образом определяем, кто первый будет ходить
    let bone = Math.ceil(Math.random() * 100);

    level = 15;
    addLevelToBot(level);

    if (bone > 50) {
        helperMove.style.borderRight = "50px solid red";
        setTimeout(botMove, 1000);
    }
    else {
        helperMove.style.borderLeft = "50px solid green";
        playerMove();
    }
});

//При нажатии на кнопку "Играть против среднего"
btnMiddle.addEventListener("click", function () {
    prepareForGame();
    activeBot = "hard";
    //Случайным образом определяем, кто первый будет ходить
    let bone = Math.ceil(Math.random() * 100);

    level = 30;
    addLevelToBot(level);

    if (bone > 50) {
        helperMove.style.borderRight = "50px solid red";
        setTimeout(botMove, 1000);
    }
    else {
        helperMove.style.borderLeft = "50px solid green";
        playerMove();
    }
});

//При нажатии на кнопку "Играть против сильного"
btnHard.addEventListener("click", function () {
    prepareForGame();
    activeBot = "hard";
    //Случайным образом определяем, кто первый будет ходить
    let bone = Math.ceil(Math.random() * 100);

    level = 40;
    addLevelToBot(level);

    if (bone > 50) {
        helperMove.style.borderRight = "50px solid red";
        setTimeout(botMove, 1000);
    }
    else {
        helperMove.style.borderLeft = "50px solid green";
        playerMove();
    }
});