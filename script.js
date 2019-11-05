
const task = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init(){
        
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
        // Automatically use keyboard for elements with .use-keyboard-input
        element = document.querySelector(".use-keyboard-input")
        element.addEventListener("focus", () => {
            this.open(element.value, currentValue => {
                element.value = currentValue;
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-","=", "Backspace",
            "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[","]","\\","Del",
            "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l",";","'", "Enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/","Up","ShiftR",
            "Ctrl","Win","Alt"," ","Alt","Left","Down","Right","Ctrl"
        ];

        // Creates HTML for an icon
        

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["Backspace", "Del", "Enter", "ShiftR"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            keyElement.textContent = key;
            switch (key) {
                case "Backspace":
                    keyElement.classList.add("keyboard__key--wide");

                    keyElement.addEventListener("click", () => {
                        const element = document.getElementById('textarea').value;
                        this.properties.value=element;
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "CapsLock":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "Enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.addEventListener("click", () => {
                        const element = document.getElementById('textarea').value;
                        this.properties.value = element;
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case " ":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.addEventListener("click", () => {
                        const element = document.getElementById('textarea').value;
                        this.properties.value = element;
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "Tab":
                    
                    keyElement.addEventListener("click", () => {
                        const element = document.getElementById('textarea').value;
                        this.properties.value = element;
                        this.properties.value += "   ";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "Shift":
                    keyElement.classList.add("keyboard__key--wide");
                    break;
                case "ShiftR":
                    keyElement.classList.add("keyboard__key--wide");                
                    break;
                case "Ctrl":
                    break;
                case "Del":
                    break;
                    case "Up":
                    break;
                    case "Down":
                    break;
                    case "Left":
                    break;
                    case "Right":
                    break;
                default:
                    keyElement.addEventListener("click", () => {
                        const element = document.getElementById('textarea').value;
                        this.properties.value = element;
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && key.textContent.length<2) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },
    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    },
    
};

window.addEventListener("DOMContentLoaded", function () {
    document.querySelector('body').innerHTML = "<textarea class='use-keyboard-input' id = 'textarea'></textarea>";
    task.init();
});
