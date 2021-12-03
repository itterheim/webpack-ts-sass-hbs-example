import "./test-div.scss";
import template from "./test-div.hbs";

import { Component } from "../Component";

export class TestDiv extends Component {
    constructor () {
        super();

        this.element.classList.add("test-div");
    }

    public update () {
        this.element.innerHTML = template({ text: "Test" });
    }
}