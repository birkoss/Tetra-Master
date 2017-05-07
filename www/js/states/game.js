var GAME = GAME || {};

GAME.Game = function() {};

GAME.Game.prototype = {
    create: function() {
        this.mapContainer = this.game.add.group();
        this.cardsContainer = this.game.add.group();

        this.createMap();

        this.createCards();
    },
    update: function() {
    },

    /* Misc methods */
    createCards: function() {
        for (let i=0; i<5; i++) {
            let card = new Card(this.game);
            card.x = i * (58);
            card.setInteractive(true);
            card.onCardDragStart.add(this.onDragStart, this);
            card.onCardDragStop.add(this.onDragStop, this);
            this.cardsContainer.addChild(card);
        }

        this.cardsContainer.y = (this.mapContainer.y*2) + this.mapContainer.height;
        this.cardsContainer.x = this.mapContainer.x;
    },

    createMap: function() {
        this.map = new Map(this.game, 4, 4);

        let background = this.mapContainer.create(0, 0, "tile:blank");
        background.tint = 0xffffff;;
        background.width = (this.map.gridWidth * 76) + 2;
        background.height = (this.map.gridHeight * 76) + 2;

        this.mapContainer.addChild(this.map);

        this.map.x = (this.mapContainer.width - this.map.width)/2;
        this.map.y = (this.mapContainer.height - this.map.height)/2;
        this.mapContainer.x = (this.game.width - this.mapContainer.width)/2;
        this.mapContainer.y = this.mapContainer.x;
    },

    onDragStart: function(card) {
        console.log(card);
        this.cardsContainer.swap(card, this.cardsContainer.getChildAt(this.cardsContainer.children.length - 1));
    },
    onDragStop: function(card, pointer) {
        let cursor = {x:pointer.worldX, y:pointer.worldY};

        let tile = this.map.getTileAtWorldPosition(cursor.x, cursor.y);
        if (tile == null) {
            console.log("NOP: " + card.x + "x" + card.y + " from " + card.originalX + "x" + card.originalY);
            card.x = card.originalX;
            card.y = card.originalY;
        } else {
            card.setInteractive(false);
            tile.card = card;
            tile.addChild(card);
            card.x = card.y = 0;
        }
    }
};
