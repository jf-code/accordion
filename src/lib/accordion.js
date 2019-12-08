// import utils
import { mergeDeep } from '../utils/mergeDeep';

// set defaults
const defaultOptions = {
    selectors: {
        trigger: '.accordion__trigger',
        content: '.accordion__content'
    },
    classes: {
        active: 'is-active'
    },
    active: -1,
    expandable: false,
    callbacks: {},
    errorMessages: {}
};

// return Accordion class
export class Accordion {
    constructor(elem, options) {
        this.elem = elem;
        this.options = defaultOptions;
        this.initialized = false;

        if (options) {
            this.options = mergeDeep(this.options, options);
        }
    }
    // initialize plugin
    init() {
        const components = document.querySelectorAll(this.elem);

        for (let i = 0; i < components.length; i += 1) {
            const currentComponent = components[i];

            this.prepareAccordion(currentComponent);
            this.observeEvents(currentComponent);

            window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
        }

        // set initialized to `true`
        this.initialized = true;
    }
    /**
     * prepare accordion
     * @param accordion
     */
    prepareAccordion(accordion) {
        const contents = accordion.querySelectorAll(this.options.selectors.content);
        const triggers = accordion.querySelectorAll(this.options.selectors.trigger);
        let content = {};

        // activate a specific accordion by index
        if (this.options.active >= 0 && triggers[this.options.active] && contents[this.options.active]) {
            triggers[this.options.active].classList.add(this.options.classes.active);
            contents[this.options.active].classList.add(this.options.classes.active);
            contents[this.options.active].style.maxHeight = 'none';
        }

        for (let i = 0; i < triggers.length; i += 1) {
            const triggerTarget = triggers[i].dataset.target;

            // if content is next dom element
            if (triggerTarget) {
                content = document.getElementById(triggerTarget);
            } else {
                content = triggers[i].nextElementSibling;
            }

            triggers[i].accordionContent = content;
        }
    }
    /**
     * observe Events
     *
     * @param {Object} accordion
     */
    observeEvents(accordion) {
        const triggers = accordion.querySelectorAll(this.options.selectors.trigger);

        for (let i = 0; i < triggers.length; i += 1) {
            triggers[i].addEventListener('click', this.triggerListener.bind(this));
        }
    }
    /**
     * listener for click on trigger
     * @param event
     */
    triggerListener(event) {
        event.preventDefault();
        const accordion = event.currentTarget.closest(this.elem);
        this.triggerContent(event.currentTarget, accordion);
    }
    /**
     * open or close elements
     * @param trigger
     * @param accordion
     */
    triggerContent(trigger, accordion) {
        const triggers = accordion.querySelectorAll(this.options.selectors.trigger);
        const contents = accordion.querySelectorAll(this.options.selectors.content);
        let content = trigger.accordionContent;

        if (content) {
            if (!trigger.classList.contains(this.options.classes.active)) {
                // if only one at a time should be open, close the other ones
                if (this.options.expandable === false) {
                    for (let i = 0; i < triggers.length; i += 1) {
                        triggers[i].classList.remove(this.options.classes.active);
                    }

                    for (let i = 0; i < contents.length; i += 1) {
                        contents[i].classList.remove(this.options.classes.active);
                        contents[i].style.maxHeight = '0';
                    }
                }

                trigger.classList.add(this.options.classes.active);
                content.classList.add(this.options.classes.active);
                content.style.maxHeight = `${content.scrollHeight}px`;
            } else {
                // if item was already active -> close it
                trigger.classList.remove(this.options.classes.active);
                content.classList.remove(this.options.classes.active);
                content.style.maxHeight = '0';
            }
        }
    }
    /**
     * handle resize Events
     */
    handleResize() {
        const activeItems = document.querySelectorAll(this.options.selectors.activeContent + this.options.classes.active);

        // resize open accordion items
        for (let i = 0; i < activeItems.length; i += 1) {
            activeItems[i].style.maxHeight = `${activeItems[i].scrollHeight}px`;
        }
    }
    /**
     * reset accordion
     * @param accordion
     */
    resetAccordion(accordion) {
        const triggers = accordion.querySelectorAll(this.options.selectors.trigger);
        const contents = accordion.querySelectorAll(this.options.selectors.content);

        for (let i = 0; i < triggers.length; i += 1) {
            triggers[i].removeEventListener('click', this.triggerListener.bind(this));
        }

        for (let i = 0; i < contents.length; i += 1) {
            contents[i].style.maxHeight = '';
        }
    }
}
