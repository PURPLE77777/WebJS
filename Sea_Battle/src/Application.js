class Application {
    constructor() {
        //Создание объектов игроков
        let divPlayer = document.querySelector("[data-side='player']");
        this.player = new Battlefield(divPlayer);
        let divOpponent = document.querySelector("[data-side='opponent']");
        this.opponent = new Battlefield(document.querySelector("[data-side='opponent']"));
        
        let app = document.querySelector("div.app");
        let widthWindow = document.documentElement.clientWidth;
        let heightWindow = document.documentElement.clientHeight;
        app.style.width = widthWindow + "px";
        app.style.height = heightWindow + "px";
        
        let user = this.player;
        let oppon = this.opponent;

        let btnEasy = document.querySelector('[data-computer="easy"]');
        btnEasy.addEventListener("click", function (clk) {
            if (clk.button == 0) {
                randomize(oppon);
            }
        });
        let btnMiddle = document.querySelector('[data-computer="middle"]');
        btnMiddle.addEventListener("click", function (clk) {
            if (clk.button == 0) {
                randomize(oppon);
            }
        });
        let btnHard = document.querySelector('[data-computer="hard"]');
        btnHard.addEventListener("click", function (clk) {
            if (clk.button == 0) {
                randomize(oppon);
            }
        });

        //Создание кораблей у player
        this.player.addShips(divPlayer);
        this.opponent.addShips(divOpponent);

        let promp = document.createElement("span");
        promp.classList.add("dock-promp");
        promp.innerHTML = "Зажмите левую клавишу мыши и вращайте колёсико мыши, чтобы повернуть:";
        user.dock.prepend(promp);
        
        //Клик на кнопку "Расставить корабли вручную"
        let btnManually = document.querySelector('[data-action="manually"]');
        btnManually.addEventListener("click", function() {
            divPlayer.children[1].style.visibility = "visible";
            promp.style.visibility = "visible";
        });

        //Изменение направления корабля
        let cell = user.cells[0][0].getBoundingClientRect();
        function changeDirection(e) {
            user.ships.forEach(function(ship) {
                //Ищем div, на который был произведён клик
                if (ship.div == e.target) {
                    if (ship.direction === "row") {
                        e.target.style.width = cell.width + "px";
                        e.target.style.height = cell.height * ship.size + "px";
                    } else {
                        e.target.style.height = cell.height + "px";
                        e.target.style.width = cell.width * ship.size + "px";
                    }
                    ship.direction = ship.direction === "row" ? "col" : "row";
                }
            });
        }

        //Присвоение к клетке
        function placeToField (ship, evnt, cellPr) {
            ship.ready = true;
            try {
                cellPr.style.backgroundColor = "#e1e4ff";
            }
            catch {}
            finally{
                let tdRect = user.inFieldOfCell(evnt.target).getBoundingClientRect();
                evnt.target.classList.remove("ship-pos-good");
                evnt.target.classList.add("ship");
                evnt.target.style.left = tdRect.left + "px";
                evnt.target.style.top = tdRect.top + "px";
            }
        }

        //Если отпустил ЛКМ, когда нельзя было ставить корабль или вне поля
        function toStartPosition (ship, evnt, cellPr) {
            try {
                cellPr.style.backgroundColor = "#e1e4ff";
            }
            catch {}
            finally {
                evnt.target.style.position = `static`;
                let divStyles = evnt.target.getBoundingClientRect();
                evnt.target.style.left = divStyles.left + "px";
                evnt.target.style.top = divStyles.top + "px";
                if (ship.direction === "col") {
                    changeDirection(evnt);
                }
                evnt.target.classList.remove("ship-pos-bad");
                evnt.target.classList.add("ship");
                ship.div.removeEventListener("wheel", changeDirection);
            }
        }

        //Регистрация корабля в матрице
        function addShipToMatrix (ship, cellCur, matrix, user) {
            try {
                ship.cell.style.backgroundColor = "#e1e4ff";
                let val = user === oppon ? 1 : 0;
                let y = Number(cellCur.getAttribute("data-y"));
                let x = Number(cellCur.getAttribute("data-x"));
                let shipRow = ship.direction == "row";
                let shipCol = ship.direction == "col";
                for (let dy = y; dy <= y + ship.size * shipCol - shipCol; dy++) {
                    for (let dx = x; dx <= x + ship.size * shipRow - shipRow; dx++) {
                        matrix[dy][dx] = false;
                        let cell = document.querySelectorAll(`[data-y="${dy}"][data-x="${dx}"]`)[val];
                        ship.cells.push(cell);
                    }
                }
            }
            catch {
                return false;
            }
        }

        //Освобождаем позиции в матрице
        function removeShipFromMatrix (ship, cellCur, matrix, user) {
            try {
                let val = user === oppon ? 1 : 0;
                let y = Number(cellCur.getAttribute("data-y"));
                let x = Number(cellCur.getAttribute("data-x"));
                let shipRow = ship.direction == "row";
                let shipCol = ship.direction == "col";
                for (let dy = y; dy <= y + ship.size * shipCol - shipCol; dy++) {
                    for (let dx = x; dx <= x + ship.size * shipRow - shipRow; dx++) {
                        matrix[dy][dx] = true;
                        let cell = document.querySelectorAll(`[data-y="${dy}"][data-x="${dx}"]`)[val];
                        let index = ship.cells.indexOf(cell);
                        ship.cells.splice(index, 1);
                    }
                }
                ship.ready = false;
            }
            catch {
                return false;
            }
        }

        user.ships.forEach(function (ship) {
            //При нажатии на левую кнопку мыши
            ship.div.addEventListener("mousedown", function (e) {
                if (e.button == 0 && ship.canChangePosition) {
                    e.target.style.zIndex = 100;
                    ship.ready = false;
                    removeShipFromMatrix (ship, ship.cell, user.matrix, user);
                    let shipDiv = e.target;
                    let shipStyles = e.target.getBoundingClientRect();
                    let poseX = e.clientX - parseInt(shipStyles.left);
                    let poseY = e.clientY - parseInt(shipStyles.top);
                    let cellPrevious, cellNew, firstEnter = 0;
                    
                    //Перемещение блока
                    function move (event) {
                        checkReady();
                        event.target.addEventListener("wheel", changeDirection);
                        let mouseX = event.clientX - poseX;
                        let mouseY = event.clientY - poseY;
                        shipDiv.style.left = mouseX + "px";
                        shipDiv.style.top = mouseY + "px";
                        e.target.style.position = "absolute";
                        if (user.underField(event.target)) {
                            if (!firstEnter) {
                                cellPrevious = user.inFieldOfCell(event.target);
                                cellPrevious.style.backgroundColor = "#d1c3c3";
                                firstEnter++;
                            }
                            else if (firstEnter) {
                                cellPrevious.style.backgroundColor = "#e1e4ff";
                                cellNew = user.inFieldOfCell(event.target);
                                cellNew.style.backgroundColor = "#d1c3c3";
                                cellPrevious = cellNew;
                            }
                            if (user.checkPosition(user.inFieldOfCell(event.target), ship)) {
                                event.target.classList.remove("ship", "ship-pos-bad");
                                event.target.classList.add("ship-pos-good");
                            }
                            else { 
                                event.target.classList.remove("ship", "ship-pos-good");
                                event.target.classList.add("ship-pos-bad");
                            }
                        }
                        else {
                            event.target.classList.remove("ship-pos-good", "ship-pos-bad");
                            event.target.classList.add("ship");
                        }
                    }
    
                    //При движении мыши с кораблём
                    ship.div.addEventListener("mousemove", move);
    
                    //При уводе мыши с корабля
                    ship.div.addEventListener("mouseout", function () {
                        ship.div.removeEventListener("mousemove", move);
                    });
    
                    //При опускании кнопки мыши
                    ship.div.addEventListener("mouseup", function (evnt) {
                        evnt.target.style.zIndex = 50;
                        ship.div.removeEventListener("mousemove", move);
                        evnt.target.removeEventListener("wheel", changeDirection);
                        let cellPr = cellPrevious;
                        let cellCur = user.inFieldOfCell(evnt.target);
    
                        //Присваивание к ячейке и матрице
                        if (!ship.ready) {
                            if (user.underField(evnt.target)) {
                                if (user.checkPosition(cellCur, ship)) {
                                    removeShipFromMatrix (ship, ship.cell, user.matrix, user);
                                    ship.cell = cellCur;
                                    placeToField (ship, evnt, cellPr);
                                    addShipToMatrix (ship, cellCur, user.matrix, user);
                                    checkReady();
                                }
                                else {
                                    toStartPosition (ship, evnt, cellPr);
                                    removeShipFromMatrix (ship, ship.cell, user.matrix, user);
                                    checkReady();
                                }
                            } 
                            else {
                                toStartPosition (ship, evnt, cellPr);
                                removeShipFromMatrix (ship, ship.cell, user.matrix, user);
                                checkReady();
                            }
                        }
                    });
                }
            });
        });

        //Проверка на готовность к игре
        function checkReady () {
            if (user.ships.every(function (ship) { return ship.ready === true; })) {
                user.readyToGame = true;
                btnEasy.removeAttribute("disabled");
                btnMiddle.removeAttribute("disabled");
                btnHard.removeAttribute("disabled");
            } else {
                user.readyToGame = false;
                btnEasy.setAttribute("disabled", "true");
                btnMiddle.setAttribute("disabled", "true");
                btnHard.setAttribute("disabled", "true");
            }
        }

        //При нажатии на кнопку "Расставить корабли случайно" расставляем корабли случайно
        let btnRandomize = document.querySelector('[data-action="randomize"]');
        btnRandomize.addEventListener("click", function () {
            user.dock.style.visibility = "visible";
            promp.style.visibility = "visible";
            randomize(user);
        });

        function randomValues (user, ship) {
            let xRand = Math.floor(Math.random()*10);
            let yRand = Math.floor(Math.random()*10);
            let val = user === oppon ? 1 : 0;
            ship.cell = document.querySelectorAll(`[data-y="${yRand}"][data-x="${xRand}"]`)[val];

            //Определяем размеры корабля в зависимости от направления
            ship.direction = Math.ceil(Math.random()*100) > 50 ? "row" : "col";
            if (ship.direction === "row") {
                ship.div.style.height = cell.height + "px";
                ship.div.style.width = cell.width * ship.size + "px";
            } else {
                ship.div.style.width = cell.width + "px";
                ship.div.style.height = cell.height * ship.size + "px";
            }

            //Проверка позиции и вставка в поле и матрицу
            if (user.checkPosition(ship.cell, ship)) {
                ship.ready = true;
                ship.div.style.position = "absolute";
                let tdRect = ship.cell.getBoundingClientRect();
                ship.div.style.left = tdRect.left + "px";
                ship.div.style.top = tdRect.top + "px";
                addShipToMatrix (ship, ship.cell, user.matrix, user);
            }
            else {
                randomValues(user, ship);
            }
        }

        function randomize (user) {
            for (let y = 0; y < user.matrix.length; y++) {
                for (let x = 0; x < user.matrix[y].length; x++) {
                    user.matrix[y][x] = true;
                }
            }
            user.ships.forEach(function (ship) {
                ship.div.style.position = `static`;
                let divStyles = ship.div.getBoundingClientRect();
                ship.div.style.left = divStyles.left + "px";
                ship.div.style.top = divStyles.top + "px";
                removeShipFromMatrix(ship, ship.cell, user.matrix, user);
                if (ship.direction === "col") {
                    ship.div.style.height = cell.height + "px";
                    ship.div.style.width = cell.width * ship.size + "px";
                    ship.direction = "row";
                }
            });
            user.ships.forEach(function (ship) {
                ship.ready = false;
                ship.killed = false;
                ship.cell = null;
                ship.div.style.position = "absolute";
                randomValues(user, ship);
            });
            checkReady();
        }
    }

    createStatBlockOpponent() {
        let statBlock = document.createElement("div");
        statBlock.classList.add("statistics");

        let td = document.getElementsByTagName("td")[0].getBoundingClientRect();

        let divOpponent = document.querySelector("[data-side='opponent']");
        divOpponent.append(statBlock);

        for (let x = 4; x > 0; x--) {
            let shipBlock = document.createElement("div");
            shipBlock.classList.add("ship-stat", `ship-stat-${x}`);
            let output = document.createElement("output");
            output.classList.add("out", `out-${x}`);
            if (x == 4) {
                shipBlock.style.width = td.width * 4 + "px";
                shipBlock.style.height = td.height + "px";

            } else if (x == 3) {
                shipBlock.style.width = td.width * 3 + "px";
                shipBlock.style.height = td.height + "px";
            } else if (x == 2) {
                shipBlock.style.width = td.width * 2 + "px";
                shipBlock.style.height = td.height + "px";
            } else if (x == 1) {
                shipBlock.style.width = td.width + "px";
                shipBlock.style.height = td.height + "px";
            }
            statBlock.append(shipBlock, output);
            statBlock.style.gridTemplateColumns = `${td.width * 4}px 50px`;
        }

    }

    updateStatOp () {
        for (let x = 4; x > 0; x--) {
            let output = document.querySelector(`output.out-${x}`);
            let count = 0;
            this.opponent.ships.forEach(function (ship) {
                if (ship.size == x & !(ship.killed)) {
                    count++
                }
            });
            output.value = count;
        }
    }
}