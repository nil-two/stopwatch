(function() {
    var idle = {
        start: function() {
            this.intervalId = setInterval(function() {
                this.set('time', this.get('time') + 0.01);
            }.bind(this), 10);
            this.state = running;
        },
        stop: function() {
        },
        reset: function() {
            this.set('time', 0.0);
        }
    };
    var running = {
        start: function() {
        },
        stop: function() {
            clearInterval(this.intervalId);
            this.state = idle;
        },
        reset: function() {
        },
    };

    var Stopwatch = Ractive.extend({
        template: '#stopwatch_template',
        intervalId: -1,
        state: idle,

        oninit: function() {
            this.set('time', 0.00);
        },
        start: function() {
            this.state.start.bind(this)();
        },
        stop: function() {
            this.state.stop.bind(this)();
        },
        reset: function() {
            this.state.reset.bind(this)();
        },
    });

    stopWatch = new Stopwatch({
        el: '#stopwatch_app',
        data: {},
    });
})();
