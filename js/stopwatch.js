(function() {
    var idle = {
        start: function() {
            this.startTime = Date.now();
            this.intervalId = setInterval(function() {
                this.set('time', Date.now() - this.startTime + this.totalTime);
            }.bind(this), 10);
            this.state = running;
        },

        reset: function() {
            this.set('time', 0.0);
	    this.totalTime = 0;
        }
    };

    var running = {
        stop: function() {
            clearInterval(this.intervalId);
	    this.totalTime += Date.now() - this.startTime;
            this.state = idle;
        },
    };

    var Stopwatch = Ractive.extend({
        template: '#stopwatch_template',

        intervalId: -1,
        startTime: 0,
        totalTime: 0,
        state: idle,

        _buttonState: function(button) {
            return (this.state[button] === undefined)
                ? 'inactive'
                : 'active';
        },

        _updateButtonState: function() {
            this.set('start', this._buttonState('start'));
            this.set('stop', this._buttonState('stop'));
            this.set('reset', this._buttonState('reset'));
        },

        _click: function(button) {
            if (this.state[button] === undefined)
                return;
            this.state[button].bind(this)();
            this._updateButtonState();
        },

        oninit: function() {
            this.set('time', 0.00);
            this._updateButtonState();
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

    new Stopwatch({
        el: '#stopwatch_app',
        data: {},
    });
})();
