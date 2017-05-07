function Map(game, width, height) {
    Phaser.Group.call(this, game);

    this.gridWidth = width;
    this.gridHeight = height;

    this.backgroundContainer = this.game.add.group();
    this.add(this.backgroundContainer);

    this.createMap();
};

Map.prototype = Object.create(Phaser.Group.prototype);
Map.prototype.constructor = Map;

Map.prototype.createMap = function() {
    for (let gridY=0; gridY<this.gridHeight; gridY++) {
        for (let gridX=0; gridX<this.gridWidth; gridX++) {
            let cell = this.game.add.tileSprite(0, 0, 74, 74, 'map:grass');
            cell.x = gridX * (cell.width+2);
            cell.y = gridY * (cell.height+2);

            cell.gridX = gridX;
            cell.gridY = gridY;

            cell.card = null;

            this.backgroundContainer.addChild(cell);
            /*
            let block = this.createTile(gridX, gridY, "tile:grass");
            block.frame = (gridY == 0 ? 0 : 1);
            this.blocksContainer.addChild(block);

            block.inputEnabled = true;
            block.events.onInputDown.add(this.onBlockInputDown, this);
            block.events.onInputOut.add(this.onBlockInputOut, this);
            block.events.onInputUp.add(this.onBlockInputUp, this);
            */
        }
    }
};

/* Helpers */

Map.prototype.createTile = function(gridX, gridY, spriteName) {
    let tile = this.game.add.sprite(0, 0, spriteName);
    tile.scale.setTo(GAME.scale.sprite, GAME.scale.sprite);
    tile.anchor.set(0.5, 0.5);
    tile.x = tile.width * gridX;
    tile.y = tile.height * gridY;

    tile.x += tile.width/2;
    tile.y += tile.height/2;

    tile.gridX = gridX;
    tile.gridY = gridY;

    return tile;
};

Map.prototype.getTileAt = function(gridX, gridY, container) {
    let wantedTile = null;

    container.forEach(function(tile) {
        if (tile.gridX == gridX && tile.gridY == gridY) {
            wantedTile = tile;
        }
    }, this);

    return wantedTile;
};

Map.prototype.getTileAtRandom = function() {
    let tiles = this.getTilesEmpty();

    return tiles[Math.floor(Math.random() * (tiles.length-1))];
};

Map.prototype.getTileAtWorldPosition = function(worldX, worldY) {
    let tile = null;

    this.backgroundContainer.forEach(function(singleTile) {
        /* Stop if the tile already have a card */
        if (singleTile.card != null) {
            return;
        }
        if (worldX >= singleTile.worldPosition.x && worldX <= singleTile.worldPosition.x + singleTile.width && worldY >= singleTile.worldPosition.y && worldY <= singleTile.worldPosition.y + singleTile.height) {
        tile = singleTile;
        }
    }, this);

    return tile;
};
