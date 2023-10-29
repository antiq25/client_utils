import { handleLogin, signup } from "../dist/apiHandler.js";

// document.addEventListener('DOMContentLoaded', () => {
    // const domHandler = new DOMHandler({
        // loginEmail: {},
        // loginPassword: {},
        // signUpButton: {
            // event: 'click',
            // callback: 'handleSignupEvent',
            // fields: ['email', 'password', 'firstName', 'lastName']
        // },
        // loginButton: {
            // event: 'click',
            // callback: 'handleLoginEvent',
            // fields: ['loginEmail', 'loginPassword']
        // }
    // });
// });
// 

class DOMHandler {
    constructor(config) {
        this.elements = {};
        this.config = config;

        for (let id in config) {
            const element = document.getElementById(id);
            this.elements[id] = element;

            if (config[id].event && config[id].callback) {
                element.addEventListener(config[id].event, (event) => {
                    this[config[id].callback](config[id].fields, event);
                });
            }
        }
    }

    getValues(elementKeys) {
        const values = {};
        elementKeys.forEach(key => {
            if (!this.elements[key]) {
                console.error(`Element with key ${key} is not defined!`);
            } else {
                values[key] = this.elements[key].value;
            }
        });
        return values;
    }

    async handleSignupEvent(fields, event) {
        event.preventDefault();
        const values = this.getValues(fields);
        await signup(values.signUpEmail, values.signUpPassword, values.signUpFirstName, values.signUpLastName);
    }

    async handleLoginEvent(fields, event) {
        event.preventDefault();
        const values = this.getValues(fields);
        await handleLogin(values.loginEmail, values.loginPassword);
    }
}




document.addEventListener('DOMContentLoaded', () => {
    const handleDom = new DOMHandler({
        signUpEmail: {},
        signUpPassword: {},
        signUpFirstName: {},
        signUpLastName: {},
        signUpButton: {
            event: 'click',
            callback: 'handleSignupEvent',
            fields: ['signUpEmail', 'signUpPassword', 'signUpFirstName', 'signUpLastName']
        },
        loginEmail: {},
        loginPassword: {},
        loginButton: {
            event: 'click',
            callback: 'handleLoginEvent',
            fields: ['loginEmail', 'loginPassword']
        }
    });
});


