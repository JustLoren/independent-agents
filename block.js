var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlockTaming;
(function (BlockTaming) {
    var Block = (function (_super) {
        __extends(Block, _super);
        function Block(arena) {
            var randomX, randomY;
            do {
                randomX = Math.random() * (arena.world.width - 100) + 50;
                randomY = Math.random() * (arena.world.height - 100) + 50;
            } while (arena.physics.arcade.getObjectsAtLocation(randomX, randomY, arena.wildBlocks).length > 0 ||
                arena.physics.arcade.getObjectsAtLocation(randomX + 32, randomY, arena.wildBlocks).length > 0 ||
                arena.physics.arcade.getObjectsAtLocation(randomX, randomY + 32, arena.wildBlocks).length > 0 ||
                arena.physics.arcade.getObjectsAtLocation(randomX + 32, randomY + 32, arena.wildBlocks).length > 0);
            _super.call(this, arena.game, randomX, randomY, 'untamed');
            arena.wildBlocks.add(this);
            this.body.bounce.y = 0.2;
            this.body.bounce.x = 0.2;
            this.body.collideWorldBounds = true;
            this.body.maxVelocity.x = 200;
            this.body.maxVelocity.y = 200;
            this.inputEnabled = true;
            var self;
            self = this;
            this.events.onInputDown.add(function () {
                if (!arena.tamingStarted) {
                    arena.tameBlock(self);
                    arena.tamingStarted = true;
                }
            }, this);
            //Custom properties
            this.tamed = false;
            this.changeAcceleration = 100;
        }
        Block.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.tamed) {
                this.tameThought();
            }
            else {
                this.untamedThought();
            }
        };
        Block.prototype.tameThought = function () {
            if (this.body.acceleration.x == 0 || this.changeAcceleration-- <= 0) {
                this.body.acceleration.x = Math.random() * 50 - 25;
                this.body.acceleration.y = Math.random() * 50 - 25;
                this.changeAcceleration = 100;
            }
        };
        ;
        Block.prototype.untamedThought = function () {
            if (this.body.acceleration.x == 0 || this.changeAcceleration-- <= 0) {
                this.body.acceleration.x = Math.random() * 5 - 2.5;
                this.body.acceleration.y = Math.random() * 5 - 2.5;
                this.changeAcceleration = 200;
            }
        };
        ;
        return Block;
    })(Phaser.Sprite);
    BlockTaming.Block = Block;
})(BlockTaming || (BlockTaming = {}));
//# sourceMappingURL=block.js.map