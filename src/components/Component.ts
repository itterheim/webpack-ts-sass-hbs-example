export class Component<T extends HTMLElement = HTMLElement> {
    public readonly element: T;

    constructor (tagName: keyof HTMLElementTagNameMap = "div") {
        this.element = document.createElement(tagName) as T;

        this.element.classList.add("component");
    }

    public show (target: HTMLElement) {
        if (this.element.parentNode) return;

        target.appendChild(this.element);
        this.update();
    }

    public hide () {
        if (this.element.parentNode) {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

    public update () {
        //
    }
}
