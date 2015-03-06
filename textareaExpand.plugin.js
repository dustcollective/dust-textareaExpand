(function($){

	var TextareaExpand = function(element, options) {
		var self = $(element);
		var _this = this;

		var settings = $.extend({
			'lineOffset' : 1,
			'numberOfLinesToAdd' : 2,
			'cloneID' : 'textarea-clone',
			'addCSS' : true,
			'expandedClass' : null
		}, options || {});

		var textarea = self.find('textarea');
		var textareaClone;

		this.init = function() {
			var _this = this;

			// we set some CSS using JS because it's plugin-specific styles, but
			// you can choose to not do this.
			if (settings.addCSS) {
				_this.setInitialCSS();
			}

			// create a hidden clone of the textarea.
			_this.createClone();

			// on every interacting with the input...
			self.on('input', function() {

				// make sure the clone matches the current text.
				_this.copyTextIntoClone();

				// and expand if we're running out of space.
				if (_this.needToExpand()) {
					_this.expand();
				}
			})

			return _this;
		}

		this.setInitialCSS = function() {

			var initialCSS = {
				'position' : 'relative'
			};

			self.css(initialCSS);
		}

		this.createClone = function() {

			var cloneCSS = {
				'visibility' : 'hidden',
				'position' : 'absolute',
				'left' : 0,
				'top' : 0,
				'overflow' : 'hidden'
			};

			// create the clone textarea next to the original, inside self. This
			// way it will have all the same styles.
			textarea.after(textarea.clone().attr('id', settings.cloneID));

			textareaClone = self.find('#' + settings.cloneID);

			if (settings.addCSS) {
				textareaClone.css(cloneCSS);
			}
		}

		this.copyTextIntoClone = function() {

			textareaClone.val( textarea.val() );

		}

		// returns true if the textarea is getting too full.
		this.needToExpand = function() {
			var _this = this;

			var lineOffset = _this.getLineHeight(parseInt(settings.lineOffset));

			var heightOfText = parseInt(textareaClone[0].scrollHeight);

			var heightOfTextarea = parseInt(textarea.innerHeight());

			if ( (heightOfText + lineOffset) > heightOfTextarea ) {
				return true;
			} else {
				return false;
			}
		}

		// changes the height of the textarea to the height of the text, plus
		// any extra height specified in numberOfLinesToAdd.
		this.expand = function() {
			var _this = this;

			var heightToAdd = _this.getLineHeight(parseInt(settings.numberOfLinesToAdd));

			textarea.height(textareaClone[0].scrollHeight + heightToAdd);

			self.addClass(settings.expandedClass);

			return _this;
		}

		this.getLineHeight = function(x) {
			var lineHeight = parseInt(textarea.css('font-size'));

			return x * lineHeight;
		}

	};

	$.fn.textareaExpand = function(options) {
		return this.each(function() {
			var element = $(this);

			// Return early if this element already has a plugin instance
			if (element.data('textareaExpand')) return;

			// pass options to plugin constructor
			var textareaExpand = new TextareaExpand(this, options);

			textareaExpand.init();

			// Store plugin object in this element's data
			element.data('textareaExpand', textareaExpand);
		});
	};
})(jQuery);
