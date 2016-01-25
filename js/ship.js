define(['physicsjs','physicsjs/bodies/convex-polygon'], function(Physics) {
    Physics.body('ship', 'convex-polygon', function() {
        var deg = Math.PI/180;

        return {
            turn: function(amount){
                // set the ship's rotational velocity
                this.state.angular.vel = 0.2 * amount * deg;
                return this;
            },
            thrust: function(amount) {
                var self = this;
                var world = this._world;
                if (!world){
                    return self;
                }
                var angle = this.state.angular.pos;
                var scratch = Physics.scratchpad();
                // scale the amount to something not so crazy
                amount *= 0.0001;
                // point the acceleration in the direction of the ship's nose
                var v = scratch.vector().set(
                    amount * Math.sin( angle ),
                    amount * Math.cos( angle + Math.PI)
                );
                // accelerate self
                this.accelerate( v );
                scratch.done();

                return self;
            }
        }
    });
});
