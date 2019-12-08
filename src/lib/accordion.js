// return Accordion class
export class Accordion {
    constructor(elem, options) {
        this.elem = elem;
        this.options = options;
        this.initialized = false;
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
     * open or close elements
     * @param trigger
     * @param accordion
     */
    triggerContent(trigger, accordion) {
        const triggers = accordion.querySelectorAll(this.options.selectors.trigger);
        const contents = accordion.querySelectorAll(this.options.selectors.content);
        let content = trigger.accordionContent;

        if (content) {
            if (!trigger.classList.contains('is-open')) {
                // if only one at a time should be open, close the other ones
                if (this.options.expandable === false) {
                    for (let i = 0; i < triggers.length; i += 1) {
                        triggers[i].classList.remove('is-open');
                    }

                    for (let i = 0; i < contents.length; i += 1) {
                        contents[i].classList.remove('is-open');
                        contents[i].style.maxHeight = '0';
                    }
                }

                trigger.classList.add('is-open');
                content.classList.add('is-open');
                content.style.maxHeight = `${content.scrollHeight}px`;
            } else {
                // if item was already active -> close it
                trigger.classList.remove('is-open');
                content.classList.remove('is-open');
                content.style.maxHeight = '0';
            }
        }
    }
    /**
     * handle resize Events
     */
    handleResize() {
        const activeItems = document.querySelectorAll(this.options.selectors.activeContent);

        // resize open accordion items
        for (let i = 0; i < activeItems.length; i += 1) {
            activeItems[i].style.maxHeight = `${activeItems[i].scrollHeight}px`;
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
     * prepare accordion
     * @param accordion
     */
    prepareAccordion(accordion) {
        const contents = accordion.querySelectorAll(this.options.selectors.content);
        const triggers = accordion.querySelectorAll(this.options.selectors.trigger);
        let content = {};

        // activate a specific accordion by index
        if (this.options.active !== false) {
            triggers[this.options.active].classList.add('is-open');
            contents[this.options.active].classList.add('is-open');
            contents[this.options.active].style.maxHeight = 'none';
        }

        for (let i = 0; i < triggers.length; i += 1) {
            content = triggers[i].nextElementSibling;

            // if content is next dom element
            if (!content) {
                content = triggers[i].nextElementSibling;
            }
            triggers[i].accordionContent = content;
        }
    }
    /**
     * reset accordion
     * @param accordion
     */
    resetAccordion(accordion) {
        const triggers = accordion.querySelectorAll(this.options.selectors.trigger);

        for (let i = 0; i < triggers.length; i += 1) {
            const id = triggers[i].dataset.target;
            let content = document.getElementById(id);

            // if content is next dom element
            if (!content) {
                content = triggers[i].nextElementSibling;
            }

            triggers[i].removeEventListener('click', this.triggerListener.bind(this));

            if (content) {
                content.style.maxHeight = '';
            }
        }
    }
}
