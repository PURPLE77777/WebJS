class Application {
    constructor() {
        //Создание объектов игоков
        let divPlayer = document.querySelector("[data-side='player']");
        this.player = new Battlefield(divPlayer);
        let divOpponent = document.querySelector("[data-side='opponent']");
        this.opponent = new Battlefield(document.querySelector("[data-side='opponent']"));
        let user = this.player;
        let oppon = this.opponent;

        //Создание кораблей у player
        this.player.addShips(divPlayer);
        this.opponent.addShips(divOpponent);
        //Клик на кнопку "Расставить корабли вручную"
        let btnManually = document.querySelector('[data-action="manually"]');
        btnManually.click();

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

        //Если опустил ЛКМ, когда нельзя было ставить корабль или вне поля
        function toStartPosition (ship, evnt, cellPr) {
            try {
                cellPr.style.backgroundColor = "#e1e4ff";
            }
            catch {}
            finally {
                evnt.target.style.left = ship.startX + "px";
                evnt.target.style.top = ship.startY + "px";
                if (ship.direction === "col") {
                    changeDirection(evnt);
                }
                evnt.target.classList.remove("ship-pos-bad");
                evnt.target.classList.add("ship");
                ship.div.removeEventListener("wheel", changeDirection);
            }
        }

        //Регистрация корабля в матрице
        function addShipToMatrix (ship, cellCur, matrix) {
            try {
                ship.cell.style.backgroundColor = "#e1e4ff";
                let y = Number(cellCur.getAttribute("data-y"));
                let x = Number(cellCur.getAttribute("data-x"));
                let shipRow = ship.direction == "row";
                let shipCol = ship.direction == "col";
                for (let dy = y; dy <= y + ship.size * shipCol - shipCol; dy++) {
                    for (let dx = x; dx <= x + ship.size * shipRow - shipRow; dx++) {
                        matrix[dy][dx] = false;
                    }
                }
            }
            catch {
                return false;
            }
        }

        //Освобождаем позиции в матрице
        function removeShipFromMatrix (ship, cellCur, matrix) {
            try {
                let y = Number(cellCur.getAttribute("data-y"));
                let x = Number(cellCur.getAttribute("data-x"));
                let shipRow = ship.direction == "row";
                let shipCol = ship.direction == "col";
                for (let dy = y; dy <= y + ship.size * shipCol - shipCol; dy++) {
                    for (let dx = x; dx <= x + ship.size * shipRow - shipRow; dx++) {
                        matrix[dy][dx] = true;
                    }
                }
                ship.ready = false;
            }
            catch {
                return false;
            }
        }

        user.ships.forEach(function (ship) {
            //При нажатии на кнопку мыши
            ship.div.addEventListener("mousedown", function (e) {
                if (e.button == 0) {
                    ship.ready = false;
                    removeShipFromMatrix (ship, ship.cell, user.matrix);
                    let shipDiv = e.target;
                    let shipStyles = getComputedStyle(shipDiv);
                    let poseX = e.clientX - parseInt(shipStyles.left);
                    let poseY = e.clientY - parseInt(shipStyles.top);
                    let cellPrevious, cellNew, firstEnter = 0;
                    
                    //Перемещение блока
                    function move (event) {
                        event.target.addEventListener("wheel", changeDirection);
                        let mouseX = event.clientX - poseX;
                        let mouseY = event.clientY - poseY;
                        shipDiv.style.left = mouseX + "px";
                        shipDiv.style.top = mouseY + "px";
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
                        ship.div.removeEventListener("mousemove", move);
                        evnt.target.removeEventListener("wheel", changeDirection);
                        let cellPr = cellPrevious;
                        let cellCur = user.inFieldOfCell(evnt.target);
    
                        //Присваивание к ячейке и матрице
                        if (!ship.ready) {
                            if (user.underField(evnt.target)) {
                                if (user.checkPosition(cellCur, ship)) {
                                    removeShipFromMatrix (ship, ship.cell, user.matrix);
                                    ship.cell = cellCur;
                                    placeToField (ship, evnt, cellPr);
                                    addShipToMatrix (ship, cellCur, user.matrix);
                                }
                                else {
                                    toStartPosition (ship, evnt, cellPr);
                                    removeShipFromMatrix (ship, ship.cell, user.matrix);
                                }
                            } 
                            else {
                                toStartPosition (ship, evnt, cellPr);
                                removeShipFromMatrix (ship, ship.cell, user.matrix);
                            }
                        }
                    });
                }
            });
        });

        //При нажатии на кнопку "Расставить корабли случайно" расставляем корабли случайно
        let btnRandomize = document.querySelector('[data-action="randomize"]');
        btnRandomize.addEventListener("click", function () {
            randomize(user);
        });

        function randomValues (user, ship) {
            let xRand = Math.floor(Math.random()*10);
            let yRand = Math.floor(Math.random()*10);
            let val = user === oppon ? 1 : 0;
            ship.cell = document.querySelectorAll(`[data-y="${yRand}"][data-x="${xRand}"]`)[val];

            //Определяем размеры корабля в зависимости от направления
            ship.direction = Math.round(Math.random()*100) > 50 ? "row" : "col";
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
                let tdRect = ship.cell.getBoundingClientRect();
                ship.div.style.left = tdRect.left + "px";
                ship.div.style.top = tdRect.top + "px";
                addShipToMatrix (ship, ship.cell, user.matrix);
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
                ship.ready = false;
                ship.killed = false;
                ship.cell = null;
                randomValues(user, ship);
            });
        }
    }
}