requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js/app'
    },
    packages: [{
        name: 'physicsjs',
        location: 'PhysicsJS/dist',
        main: 'physicsjs'
    }]
});

requirejs([,
    'physicsjs',
    'physicsjs/renderers/canvas',
    'physicsjs/bodies/circle',
    'physicsjs/bodies/convex-polygon',
    'physicsjs/behaviors/newtonian',
    'physicsjs/behaviors/sweep-prune',
    'physicsjs/behaviors/body-collision-detection',
    'physicsjs/behaviors/body-impulse-response',
    '../js/ship',
    '../js/ship-controls'
], function(Physics) {
    require(['app']);
});
