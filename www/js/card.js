function Card(game) {
    Phaser.Sprite.call(this, game);

    this.backgroundContainer = this.game.add.group();
    this.addChild(this.backgroundContainer);

    this.onCardDragStart = new Phaser.Signal();
    this.onCardDragStop = new Phaser.Signal();

    this.createCard();
};

Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.prototype.constructor = Card;

Card.prototype.update = function() {
};

Card.prototype.createCard = function() {
    let background = this.backgroundContainer.create(0, 0, "card:background");
};

Card.prototype.setInteractive = function(state) {
    if (state) {
        this.originalX = this.x;
        this.originalY = this.y;

        this.inputEnabled = true;
        this.input.enableDrag();
        this.events.onDragStart.add(this.onDragStart, this);
        this.events.onDragStop.add(this.onDragStop, this);
    } else {
        this.inputEnabled = false;
    }
};

/* Events */

Card.prototype.onDragStart = function(tile, pointer) {
    this.onCardDragStart.dispatch(this);
};

Card.prototype.onDragStop = function(tile, pointer) {
    this.onCardDragStop.dispatch(this, pointer);
};
