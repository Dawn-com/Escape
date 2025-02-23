class TextControl {
    constructor() {
        this.textElement = document.getElementById('gameText');
        this.text = '';
        this.maxLines = 10;
    }
    
    updateText() {
        let lines = this.text.split('\n');
        if (lines.length > this.maxLines) {
            lines = lines.slice(-this.maxLines);
        }
        this.text = lines.join('\n');
        this.textElement.innerHTML = this.text;
        this.textElement.scrollTo(0, this.textElement.scrollHeight);
    }

    setText(text) {
        this.text = text;
        this.updateText();
    }

    addText(text) {
        this.text += text;
        this.text += "<br>";
        this.updateText();
    }

    clearText() {
        this.text = '';
        this.updateText();
    }

    removeLastLine() {
        this.text = this.text.split('\n').slice(0, -1).join('\n');
        this.updateText();
    }

    removeFirstLine() {
        this.text = this.text.split('\n').slice(1).join('\n');
        this.updateText();
    }
}