const Handlebars = require("handlebars/runtime");

// Equals
Handlebars.registerHelper("eq", function (x: any, y: any, options: any) {
    if (x === y) {
        return options.fn(this);
    }
    return options.inverse(this);
});
