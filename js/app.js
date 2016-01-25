define(['physicsjs'], function(Physics) {
    function init(world) {
        // render on every step
        world.on('step', function(){
            // middle of canvas
            var middle = {
                x: 0.5 * window.innerWidth,
                y: 0.5 * window.innerHeight
            };
            // follow player
            var offset = Physics.vector(middle.x, middle.y).vsub(ship.state.pos);
            renderer.layer('main').options.offset = offset;

            window.getElementById('distance').HTML('a');
            console.log(ship.state.pos.dist(planet.state.pos) - 1000);
            world.render();
        });
        world.on('lose-game', function(){
            document.body.className = 'lose-game';
            inGame = false;
        });
        world.on('win-game', function(){
            world.pause();
            document.body.className = 'win-game';
            inGame = false;
        });

        // add things to the world
        world.add([
            renderer,
            ship,
            planet,
            shipControls,
            Physics.behavior('newtonian', {strength: 1e-4}),
            Physics.behavior('sweep-prune'),
            Physics.behavior('body-collision-detection'),
            Physics.behavior('body-impulse-response')
        ]);
    }

    var renderer = Physics.renderer('canvas', {
        el: 'viewport',
        width: 500,
        height: 500,
        meta: true,
        debug:true,
    });

    var ship = Physics.body('ship', {
        debug: true,
        x: 400,
        y: -1000,
        vx: 0.12,
        restitution: 0,
        vertices: [
            {x:0, y:-30},
            {x:15, y:30},
            {x:-15, y:30}
        ]
    });

    // bodies
    var planet = Physics.body('circle', {
        fixed: true,
        // hidden: true,
        mass: 300000,
        radius: 1000,
        x: 400,
        y: 300
    });

    var shipControls = Physics.behavior('ship-controls', { ship: ship });

    var world = Physics(init);

    Physics.util.ticker.on(function(time) {
        if (world){
            world.step(time);
        }
    });

    Physics.util.ticker.start();

});
