import "./app.scss";

import { Component } from "./components/Component";
import { TestDiv } from "./components/TestDiv/TestDiv";

export class App {
    constructor () {
        const test1 = new TestDiv();
        test1.show(document.body);

        const test2 = new Component<HTMLCanvasElement>("canvas");
        test2.show(document.body);

        const ctx = test2.element.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, test2.element.width, test2.element.height);
        ctx.strokeRect(10, 10, test2.element.width - 20, test2.element.height - 20);
    }
}