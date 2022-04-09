// const cj = colorjoe.rgb(document.querySelector('.colorjoe'));

// cj.show();


class ColorPicker {
    constructor(root) {
        this.root = root;
        this.colorjoe = colorjoe.rgb(this.root.querySelector('.colorjoe'));
        this.selectedColor = null;
        this.savedColors = this.getSavedColors();
        this.colorjoe.show();
        this.setSelectedColor("#009578");

        this.colorjoe.on("change", color => {
            this.setSelectedColor(color.hex(), true);
            document.body.style.background = color.hex();
        });

        // ======= Save Colors =======
        this.root.querySelectorAll(".saved-color").forEach((el, i) => {
            this.showSavedColor(el, this.savedColors[i]);
            el.addEventListener("mouseup", e => {
                if (e.button == 0) {
                    this.saveColor(this.selectedColor, i);
                    this.showSavedColor(el, this.selectedColor);
                }
                this.setSelectedColor(el.dataset.color);
            });

            el.addEventListener("mouseover", e => {
                document.querySelector('.hovered').textContent = el.dataset.color;
                document.querySelector('.hovered').style.background = el.dataset.color;
                document.querySelector('.hovered').style.color = "#FFF";
            });
        });
    }

    setSelectedColor(color, skipCjUpdate = false) {
        this.selectedColor = color;
        this.root.querySelector('.selected-color-text').textContent = color;
        this.root.querySelector('.selected-color').style.backgroundColor = color;

        if (!skipCjUpdate) {
            this.colorjoe.set(color);
        }
    }

    getSavedColors() {

        const saved = JSON.parse(localStorage.getItem("colorpicker-saved") || "[]");
        console.log(saved);
        return new Array(5).fill("#FFFFFF").map((defaultColor, i) => saved[i] || defaultColor);
    }

    showSavedColor(element, color) {
        element.style.background = color;
        element.textContent = color;
        element.dataset.color = color;
    }

    saveColor(color, i) {
        this.savedColors[i] = color;
        localStorage.setItem("colorpicker-saved", JSON.stringify(this.savedColors));
    }
}

const cp = new ColorPicker(document.querySelector('.container'));