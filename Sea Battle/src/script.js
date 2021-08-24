const app = new Application();
let player = app.player;
let opponent = app.opponent;
let menu = document.getElementsByClassName("menu")[0];
let eventBlock = document.getElementsByClassName("event")[0];
let helperMove = document.getElementsByClassName("helper-move")[0];
let result = document.getElementsByClassName("winner")[0];
let btnEasy = document.querySelector('[data-computer="easy"]');
let btnHard = document.querySelector('[data-computer="hard"]');
let activeBot;

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
                    if (user.shots[dy][dx] === true) {
                        user.shots[dy][dx] = false;
                        let cell = user.cells[dy][dx];
                        let miss = document.createElement("span");
                        miss.style.zIndex = "1050";
                        miss.innerHTML = '\u00B7';
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
    opponent.ships.forEach(function (ship) {
        if (ship.killed == false) {
            ship.div.style.zIndex = "1000";
        }
    });
    if (winner == player) {
        result.style.background = 'url("/Sea Battle/img/win.png") round';
    } else {
        result.style.background = 'url("/Sea Battle/img/lose.png") round';
        opponent.dock.style.visibility = "visible";
    }
    console.log("Конец игры");
}
function botMove() {
    console.log("Ход бота");
    let xRand = Math.floor(Math.random()*10);
    let yRand = Math.floor(Math.random()*10);
    if(player.shots[yRand][xRand] == true) {
        player.shots[yRand][xRand] = false;
        let cell = document.querySelectorAll(`[data-y="${yRand}"][data-x="${xRand}"]`)[0];
        if(player.matrix[yRand][xRand] === false) {
            let shipNow;

            //Поведение сильного бота
            if (activeBot == "hard") {
                for (let a = 0; a < player.ships.length; a++) {
                    if (player.ships[a].cells.indexOf(cell) > -1) {
                        shipNow = player.ships[a];
                        let index = shipNow.cells.indexOf(cell);
                        shipNow.cells[index].style.zIndex = "1000";
                        shipNow.cells[index].style.backgroundColor = "rgba(255, 0, 0, .5)";
                        shipNow.cells.splice(index, 1);
                        shipNow.hp -= 1;
                        for (let b = 0; b < shipNow.cells.length;) {
                            let ind = shipNow.cells.indexOf(shipNow.cells[b]);
                            let cellOfShipNow = shipNow.cells[b];
                            let x = Number(cellOfShipNow.getAttribute("data-x"));
                            let y = Number(cellOfShipNow.getAttribute("data-y"));
                            player.shots[y][x] = false;
                            shipNow.cells[ind].style.zIndex = "1000";
                            shipNow.cells[ind].style.backgroundColor = "rgba(255, 0, 0, .5)";
                            shipNow.cells.splice(ind, 1);
                            shipNow.hp -= 1;
                        }
                        shipNow.killed = true;
                        addShotsAroundDeadShip(player, shipNow);
                        shipNow.div.style.outline = "3px solid rgb(255, 0, 0)";
                        if (player.ships.every(function (ship) { return ship.killed === true })) {
                            endGame (opponent);
                            break;
                        } else {
                            setTimeout(botMove, 1000);
                            break;
                        }
                    } 
                }
            }
        } else {
            let miss = document.createElement("span");
            miss.style.zIndex = "1050";
            miss.innerHTML = '\u00B7';
            cell.append(miss);
            helperMove.style.borderRight = "0px solid red";
            helperMove.style.borderLeft = "50px solid green";
            playerMove();
        }
    } else {
        botMove();
    }
}

function playerMove() {
    console.log("Ход игрока");
    function shot(e) {
        if (e.button == 0 && e.target.classList.contains("battlefield-td")) {
            let cell = e.target;
            let x = Number(e.target.getAttribute("data-x"));
            let y = Number(e.target.getAttribute("data-y"));
            if(opponent.shots[y][x] == true) {
                opponent.shots[y][x] = false;
                if(opponent.matrix[y][x] === false) {
                    let shipNow;
                    for (let a = 0; a < opponent.ships.length; a++) {
                        if (opponent.ships[a].cells.indexOf(cell) > -1) {
                            shipNow = opponent.ships[a];
                            let index = shipNow.cells.indexOf(e.target);
                            e.target.style.backgroundColor = "rgba(255, 0, 0, .5)";
                            shipNow.cells.splice(index, 1);
                            shipNow.hp -= 1;
                            if (shipNow.hp == 0) {
                                shipNow.killed = true;
                                addShotsAroundDeadShip(opponent, shipNow);
                                opponent.table.removeEventListener("click", shot);
                                if (opponent.ships.every(function (ship) { return ship.killed === true })) {
                                    opponent.table.removeEventListener("click", shot);
                                    endGame(player);
                                    break;
                                } else {
                                    opponent.table.removeEventListener("click", shot);
                                    playerMove();
                                    break;
                                }
                            } else {
                                e.target.style.backgroundColor = "rgba(255, 0, 0, .5)";
                                opponent.table.removeEventListener("click", shot);
                                playerMove();
                                break;
                            }
                        } 
                    }
                } else {
                    let miss = document.createElement("span");
                    miss.style.zIndex = "550";
                    miss.innerHTML = '\u00B7';
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

//При нажатии на кнопку "Играть против слабого"
btnEasy.addEventListener("click", function () {
    prepareForGame();
    activeBot = "easy";
    //Случайным образом определяем, кто первый будет ходить
    // let bone = Math.ceil(Math.random() * 100);
    // if (bone > 50) {
    //     botMove();
    // }
    // else {
    //     playerMove();
    // }
});

//При нажатии на кнопку "Играть против сильного"
btnHard.addEventListener("click", function () {
    prepareForGame();
    activeBot = "hard";
    //Случайным образом определяем, кто первый будет ходить
    let bone = Math.ceil(Math.random() * 100);
    if (bone > 50) {
        console.log("Бот ходит первым");
        helperMove.style.borderRight = "50px solid red";
        setTimeout(botMove, 1000);
    }
    else {
        console.log("Игрок ходит первым");
        helperMove.style.borderLeft = "50px solid green";
        playerMove();
    }
});
// btnHard.click();