class ShipView extends Ship{
    div = null;

    constructor(size, direction, dock, currentShip){
        super(size, direction);
        
        // Создание кораблей
        let div = document.createElement("div");
        div.classList.add("ship", `ship-${direction}-${size}`);
        div.setAttribute("draggable", "true");
        this.div = div;
        dock.append(div);
    }
}