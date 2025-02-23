class Inventory {
    constructor() {
        this.items = [];
        this.foundItems = [];
    }

    addItem(item) {
        this.items.push(item);
        input.updateButtons();
        this.updateInventory();

        if (inventory.hasItem("Dagger") && inventory.hasItem("Holy Water")) {
            inventory.removeItem("Dagger");
            inventory.removeItem("Holy Water");
            inventory.addItem("Holy Dagger");
            textControl.addText(texts.CreateHolyDagger);
        }
    }

    removeItem(item) {
        this.items = this.items.filter((i) => i !== item);
        input.updateButtons();
    }

    getItems() {
        return this.items;
    }

    hasItem(item) {
        return this.items.includes(item);
    }

    updateInventory() {
        let inventorySlotElements = document.getElementsByClassName("inventory-slot");
        for (let i = 0; i < this.items.length; i++) {
            inventorySlotElements[i].innerHTML = this.items[i];
        }
    }

    ItemFound(item) {
        this.foundItems.push(item);
    }

    IsFound(item) {
        return this.foundItems.includes(item);
    }

    CharToName(char) {
        let itemNames = {
            o: "Whetstone",
            "[": "Armor",
            ">": "Speed Boots",
            "/": "Dagger",
            "~": "Holy Water",
            "@": "Dog Whistle",
            "+": "Religious Cross",
            "^": "View Extender",
            "=": "Healing Potion",
        };
        return itemNames[char];
    }
}
