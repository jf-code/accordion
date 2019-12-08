# VanillaJS Accordion

This is a dependency free accordion

## Usage

### Template

```html
<div class="accordion">
    <a class="accordion__trigger" href="#" data-target="item-1">First item</a>
    <div class="accordion__content" id="item-1">First item content</div>
    <a class="accordion__trigger" href="#" data-target="item-2">Second item</a>
    <div class="accordion__content" id="item-2">Second item content</div>
</div>
```

### Javascript Initialization

```javascript
// instantiate with options
let instance = new Accordion('.accordion', {
    selectors: {
        trigger: '.accordion__trigger',
        content: '.accordion__content'
    },
    classes: {
        active: 'is-active'
    },
    active: false,
    expandable: false,
    callbacks: {},
    errorMessages: {}
});
// initialize
instance.init();
```


### Options

| Name       | Description                                      |  Type   |                                                          Default |
| ---------- | ------------------------------------------------ | :-----: | ---------------------------------------------------------------: |
| selectors  | Element Selectors                                | Object  | {trigger: '.accordion__trigger', content: '.accordion__content'} |
| classes    | Element Classes                                  | Object  |                                            {active: 'is-active'} |
| active     | Index of initial active item                     | Number  |                                                               -1 |
| expandable | Can more than one item be open at the same time? | Boolean |                                                            false |