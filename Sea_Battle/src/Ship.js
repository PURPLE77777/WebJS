class Ship {
    constructor (size, direction, cells, divPlayer, count) {
        //Свойства кораблей
        Object.assign(this, { size, direction });
        this.hp = size;
        this.ready = false;
        this.killed = false;
        this.cell = null;
        this.cells = [];
        this.canChangePosition = true;

        //Создание блоков кораблей
        let cell = cells[0][0].getBoundingClientRect();
        let div = document.createElement("div");
        div.classList.add("ship", `ship-${direction}-${size}-${count}`);
        div.style.width = cell.width * size + "px";
        div.style.height = cell.height + "px";
        this.div = div;
        divPlayer.children[1].append(div);
    }
}