class Battlefield {
    constructor (div) {

        //Свойства объектов player и opponent
        this.ships = [];
        this.shots = [];
        this.cells = [];
        this.matrix = [];
        this.dock = null;

        //Построение полей боя
        let table = document.createElement("table");
        table.classList.add("battlefield-table");
        for (let y = 0; y < 10; y++) {
            let tr = document.createElement("tr");
            tr.classList.add("battlefield-tr");
            Object.assign(tr.dataset, { y } );
            let row = [];
            for (let x = 0; x < 10; x++){
                let td = document.createElement("td");
                td.classList.add("battlefield-td");
                Object.assign(td.dataset, { y, x } );
                tr.append(td);
                row.push(td);
            }
            table.append(tr);
            this.cells.push(row);
        }
        div.append(table);

        //Создание меток сверху и слева полей боя
        for (let x = 0; x < 10; x++) {
            let markLetter = document.createElement("div");
            markLetter.classList.add("marker", "marker-col");
            markLetter.innerHTML = "АБВГДЕЖЗИК"[x];
            this.cells[0][x].append(markLetter);
            let markNumber = document.createElement("div");
            markNumber.classList.add("marker", "marker-row");
            markNumber.innerHTML = x+1;
            this.cells[x][0].append(markNumber);
        }

        //Инициализация свойство matrix для корректной расстановки кораблей
        for (let y = 0; y < 10; y++) {
            let row = [];
            for (let x = 0; x < 10; x++) {
                row[x] = true;
            }
            this.matrix.push(row);
        }
    }

    addShips (divPlayer) {
        //Создание дока, где будут располагаться корабли
        let dock = document.createElement("div");
        if (divPlayer.getAttribute("data-side") == "player") {
            dock.classList.add("battlefield-player-dock");
        }
        else {
            dock.classList.add("battlefield-opponent-dock");
        }
        divPlayer.append(dock);
        this.dock = dock;

        //Создание объектов кораблей
        for (let x = 0; x < 10; x++) {
            let ship = new Ship(parseInt("4332221111"[x]), "row", this.cells, divPlayer, x);
            this.ships[x] = ship;
        }
    }

    underField(shipDiv) {
        for(let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                let shipDivRect = shipDiv.getBoundingClientRect();
                let cellRect = this.cells[y][x].getBoundingClientRect();
                let cL = parseInt(shipDivRect.left) + cellRect.width/2 - cellRect.left;
                let cT = parseInt(shipDivRect.top) + cellRect.height/2 - cellRect.top;
                if (cL > 0 && cT > 0 && cL < cellRect.width && cT < cellRect.height) {
                    return true;
                }
            }
        }
        return false;
    }

    inFieldOfCell(shipD) {
        let shipDivRect = shipD.getBoundingClientRect();
        for(let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                let cellRect = this.cells[y][x].getBoundingClientRect();
                let cL = parseInt(shipDivRect.left) + cellRect.width/2 - cellRect.left;
                let cT = parseInt(shipDivRect.top) + cellRect.height/2 - cellRect.top;
                if (cL > 0 && cT > 0 && cL < cellRect.width && cT < cellRect.height) {
                    return this.cells[y][x];
                }
            }
        }
        return false;
    }

    checkPosition(td, ship) {
        let matr = this.matrix.slice();
        let x = parseInt(td.getAttribute("data-x"));
        let y = parseInt(td.getAttribute("data-y"));
        let size = ship.size;
        let dirR = ship.direction == "row";
        let dirC = ship.direction == "col";
        if (y + (size - 1) * dirC > 9 || x + (size - 1) * dirR > 10) {
            return false;
        }
        if (matr[y + (size - 1) * dirC][x + (size - 1) * dirR]) {
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
                            if (matr[dy][dx] === true) {
                                countSup++;
                            }
                            else {
                                return false;
                            }
                        }
                    }
                }
            }
            if (countSup == count) {
                return true;
            }
        }
        else {
            return false;
        }
    }
}