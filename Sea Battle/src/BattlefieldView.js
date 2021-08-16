class BattlefieldView extends Battlefield{
    root = null;
    table = null;
    dock = null;
    cells = [];

    constructor(){
        super();

        const root = document.createElement("div");
        root.classList.add("battlefield");
        const table = document.createElement("table");
        table.classList.add("battlefield-table");
        const dock = document.createElement("div");
        dock.classList.add("battlefield-dock");

        //Создание ячеек таблицы (поля)
        for ( let y = 0; y < 10; y++ ) {
            const tr = document.createElement("tr");
            tr.classList.add("battlefield-row");
            tr.dataset.y = y;
            let row=[]
            
            for (let x = 0; x < 10; x++) {
                const td = document.createElement("td");
                td.classList.add("battlefield-item");
                Object.assign(td.dataset , { x, y });
                tr.append(td);
                row.push(td);
            }
            this.cells.push(row);
            table.append(tr);
        }
        
        //Создание надписей сверху и слева поля (таблицы)
        for (let x = 0; x < 10; x++) {
            let div1 = document.createElement("div");
            div1.innerHTML = "АБВГДЕЖЗИК"[x];
            div1.classList.add("marker","marker-col");
            let cell = this.cells[0][x];
            cell.append(div1);
            let div2 = document.createElement("div");
            div2.innerHTML = x + 1;
            div2.classList.add("marker","marker-row");
            cell = this.cells[x][0];
            cell.append(div2);
        }

        Object.assign( this, { root, table, dock });
        root.append(table, dock);
        
        table.addEventListener("dragover", function (e){
            e.preventDefault();
            if(e.target.classList.contains("battlefield-item")) {
                e.target.style.background="#d1c3c3";
            }
        });

        table.addEventListener("dragleave", function (e){
            if(e.target.classList.contains("battlefield-item")) {
                e.target.style.background="#e1e4ff";
            }
        });

        table.addEventListener("drop", this.addShipToMatrix);
    }
    addShipToMatrix(e){
        e.target.style.background="#e1e4ff";
        super.addShipToMatrix(e.target);
    }

    addShips(){
        //Создание объектов кораблей
        let ships = [];
        for (let x = 0; x < 10; x++) {
            let ship = new ShipView("4332221111"[x], "row", this.dock, this.currentShip);
            ships [x] = ship;
        }
        super.addShip(ships);
    }
}