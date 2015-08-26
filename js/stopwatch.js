(function() {
    var idle = {
        start: function() {
            this.intervalId = setInterval(function() {
                this.set('time', this.get('time') + 0.01);
            }.bind(this), 10);
            this.state = running;
        },
        reset: function() {
            this.set('time', 0.0);
        }
    };
    var running = {
        stop: function() {
            clearInterval(this.intervalId);
            this.state = idle;
        },
    };

    var Stopwatch = Ractive.extend({
        template: '#stopwatch_template',
        intervalId: -1,
        state: idle,

        _updateButtonState: function() {
            this.set('start', this._buttonState('start'));
            this.set('stop', this._buttonState('stop'));
            this.set('reset', this._buttonState('reset'));
        },
        _click: function(button) {
            if (this.state[button] === undefined)
                return;
            this.state[button].bind(this)();
        },
        oninit: function() {
            this.set('time', 0.00);
        },
        start: function() {
            this._click('start');
        },
        stop: function() {
            this._click('stop');
        },
        reset: function() {
            this._click('reset');
        },
    });

    stopWatch = new Stopwatch({
        el: '#stopwatch_app',
        data: {},
    });
})();
