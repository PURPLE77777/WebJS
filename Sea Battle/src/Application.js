class Application {
    constructor() {
        //Создание объектов игоков
        let divPlayer = document.querySelector("[data-side='player']");
        this.player = new Battlefield(divPlayer);
        let divOpponent = document.querySelector("[data-side='opponent']");
        this.opponent = new Battlefield(document.querySelector("[data-side='opponent']"));
        let user = this.player;

        //Создание кораблей у player
        this.player.addShips(divPlayer);
        // this.opponent.addShips(divOpponent);
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
                        e.target.style.width = cell.width * ship.size + "px";
                        e.target.style.height = cell.height + "px";
                    }
                    ship.direction = ship.direction === "row" ? "col" : "row";
                }
            });
        }

        user.ships.forEach(function (ship) {
            //При нажатии на кнопку мыши
            ship.div.addEventListener("mousedown", function (e) {
                let shipDiv = e.target;
                let shipStyles = getComputedStyle(shipDiv);
                let poseX = e.clientX - parseInt(shipStyles.left);
                let poseY = e.clientY - parseInt(shipStyles.top);
                let cellPrevious, cellNew, firstEnter = 0;
                
                //Перемещение блока
                function move (event) {
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
                    let cellPr = cellPrevious;

                    //Присваивание к ячейке
                    if (user.underField(evnt.target)) {
                        if (user.checkPosition(user.inFieldOfCell(evnt.target), ship)) {
                            cellPr.style.backgroundColor = "#e1e4ff";
                            let tdRect = user.inFieldOfCell(evnt.target).getBoundingClientRect();
                            evnt.target.classList.remove("ship-pos-good");
                            evnt.target.classList.add("ship");
                            evnt.target.style.left = tdRect.left + "px";
                            evnt.target.style.top = tdRect.top + "px";
                            ship.div.addEventListener("dblclick", changeDirection);
                        }
                        else { 
                            cellPr.style.backgroundColor = "#e1e4ff";
                            evnt.target.style.left = ship.startX + "px";
                            evnt.target.style.top = ship.startY + "px";
                            if (ship.direction === "col") {
                                changeDirection(evnt.target);
                            }
                            evnt.target.classList.remove("ship-pos-bad");
                            evnt.target.classList.add("ship");
                            ship.div.removeEventListener("dblclick", changeDirection);
                        }
                    } 
                    else {
                        cellPr.style.backgroundColor = "#e1e4ff";
                        evnt.target.style.left = ship.startX + "px";
                        evnt.target.style.top = ship.startY + "px";
                        if (ship.direction === "col") {
                            changeDirection(evnt.target);
                        }
                        evnt.target.classList.remove("ship-pos-good", "ship-pos-bad");
                        evnt.target.classList.add("ship");
                        ship.div.removeEventListener("dblclick", changeDirection);
                    }
                });
            });
        });
    }
}