# dust-textareaExpand
a jQuery plugin to make a textarea auto expand as you type.

## What does it do?
Textareas don't natively grow to fit content. This plugin enables a textarea's height to fit the height of the text within. You can also make the textarea expand x lines before the text reaches the bottom, and you can make it add y lines when it expands.

## How do I use it?
You need to have a textarea inside a relatively positioned element. That's the only requirement.

So just
```html
<div class="textarea-expand">
	<textarea></textarea>
</div>
```

and call the plugin on the element.
```javascript
$('.textarea-expand').textareaExpand();
```

Done. But you do have options, which you can add like this:
```javascript
$('.textarea-expand').textareaExpand({
	'lineOffset' : 3
});
```

### Options
* lineOffset. Integer. How many lines before the text reaches the bottom of the textarea to trigger the expand. Default 1.
* numberOfLinesToAdd. Integer. How many lines to add to the text area when expanding. Default 2.
* cloneID. String. The ID to give the clone element. Default 'textarea-clone'.
* addCSS. Boolean. Whether or not to add plugin-specific CSS or not. Default true.
* expandedClass. String. The class to add when the textarea expands. Default null.

## How does it work?
So you've got your containing element. Firstly, we create a clone of the textarea as a sibling. This means that it will have all the same classes and styles as the actual textarea. We add some additional styles to the clone to make it invisible have no height, so that the scrollHeight of the clone will be the height of the text.

Whenever you interact with the textarea, it copies the text into the clone, works out the height of the text and whether it's time to expand, and expands accordingly by setting the height of the clone to the scrollHeight of the clone.

Simple but effective.
