define(['physicsjs'], function(Physics) {
    return Physics.behavior('ship-controls', function(parent) {
        return {
            init: function(options){
                var self = this;
                parent.init.call(this, options);
                // the ship will be passed in via the config options
                // so we need to store the ship
                var ship = self.ship = options.ship;

                // events
                document.addEventListener('keydown', function( e ){
                    switch ( e.keyCode ){
                        case 38: // up
                            self.moveShip();
                        break;
                        case 37: // left
                            ship.turn( -1 );
                        break;
                        case 39: // right
                            ship.turn( 1 );
                        break;
                    }
                    return false;
                });
                document.addEventListener('keyup', function( e ){
                    if (self.gameover){
                        return;
                    }
                    switch ( e.keyCode ){
                        case 38: // up
                            self.moveShip( false );
                        break;
                        case 37: // left
                            ship.turn( 0 );
                        break;
                        case 39: // right
                            ship.turn( 0 );
                        break;
                    }
                    return false;
                });
            },

            connect: function( world ){
                world.on('integrate:positions', this.behave, this);
            },

            disconnect: function( world ){
                world.off('integrate:positions', this.behave);
            },

            // toggle ship motion
            moveShip: function( active ){

                if ( active === false ){
                    this.shipMove = false;
                    return;
                }
                this.shipMove = true;
            },

            behave: function( data ){

                // activate thrusters if shipMove is true
                this.ship.thrust( this.shipMove ? 1 : 0 );
            }
        };
    });
});
