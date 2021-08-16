class Battlefield{
    // ships = [];
    // shots = [];
    // matrix = [];

    constructor() {
        this.ships = [];
        this.shots = [];
        this.matrix = [];
        this.currentShip = null;
    }

    addShipToMatrix(td){
        // this.isShip();
        console.log(this.ships);
        for (let x = 0; x < this.ships.length; x++) {
            // let ship = this.ships[x];
            // if (!ship.inField) {
            //     ship.inField = true;
            //     td = td.getBoundingClientRect();
            //     let currentShipCoords = currentShip.div.getBoundingClientRect();
            //     currentShipCoords.left = parseInt(`${td.left}`);
            //     currentShipCoords.top = parseInt(`${td.top}`);
            // }
        }
    }
 
    // isShip(){
    //     console.log(this.ships);
    // }

    addShip(ships){
        // console.log(this.ships);
        // console.log(ship);
        // ship.div.addEventListener("dragstart", function(e) {
        //     this.currentShip = e.target;
        // });
        this.ships = ships.slice();
        console.log(ships);
        console.log(this.ships);
    }
}