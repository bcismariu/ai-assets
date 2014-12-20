
	/*
		create a custom JavaScript Class

		ai global variable is instantiated immediately after

		below we have a String.prototype.pad() definition;

	*/
	function ai() {

		this.default = function (variable, defaultValue) {
			return (typeof (variable) !== 'undefined') ? variable : (typeof (defaultValue) !== 'undefined') ? defaultValue : '';
		}

		this.round = function ( value, dec ) {
			dec = this.default(dec, 0);
			var power = Math.pow(10, dec);
			return Math.round(value * power) / power;
		}

		this.ceil = function ( value, dec ) {
			dec = this.default(dec, 0);
			var power = Math.pow(10, dec);
			return Math.ceil(value * power) / power;
		}

		this.floor = function ( value, dec ) {
			dec = this.default(dec, 0);
			var power = Math.pow(10, dec);
			return Math.floor(value * power) / power;
		}

		this.toNumber = function ( value ) {
			if (this.undefined(value)) {
				return 0;
			}
			if ($.isNumeric(value)) {
				return Number(value);
			}
			value	= value.replace(/\s+/g, '');
			value	= value.replace(',', '.');
			if (!$.isNumeric(value)) {
				value = 0;
			}
			return Number(value);
		}

		this.undefined = function ( value ) {
			return (typeof(value) == 'undefined');
		}
	}

	ai = new ai();

	/*
		adds a custom method to String Objects
	*/
	String.prototype.pad = function (length, padstring) {
		length		= ai.default(length, 0);
		padstring	= ai.default(padstring, ' ');
		
		string = this;
		while (string.length < length) {
			string = String(padstring) + string;
		}
		
		return string;
	}
