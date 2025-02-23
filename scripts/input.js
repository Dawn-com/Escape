class Input {
    constructor(specialName) {
        this.attackButton = document.getElementById("attackButton");
        this.hideButton = document.getElementById("hideButton");
        this.pickupButton = document.getElementById("pickupButton");
        this.abilityButton = document.getElementById("abilityButton");
        this.abilityButton.innerHTML = specialName;
        this.disengageButton = document.getElementById("disengageButton");

        this.canAttack = false;

        this.hideButtonPressed = false;
        this.canHide = true;
        this.hideButton.addEventListener("click", () => {
            this.hideButtonPressed = true && this.canHide;
        });

        this.canPickup = false;
        this.canAbility = false;
        this.canDisengage = false;

        this.pressed_keys = [];
        window.addEventListener("keydown", (event) => {
            this.pressed_keys[event.key] = true;
        });
        window.addEventListener("keyup", (event) => {
            this.pressed_keys[event.key] = false;
        });

        this.updateButtons();
    }

    updateButtons() {
        if (this.canAttack) {
            this.attackButton.style.color = "";
            this.attackButton.style.cursor = "pointer";
        } else {
            this.attackButton.style.color = "gray";
            this.attackButton.style.cursor = "not-allowed";
        }

        if (this.canHide) {
            this.hideButton.style.color = "";
            this.hideButton.style.cursor = "pointer";
        } else {
            this.hideButton.style.color = "gray";
            this.hideButton.style.cursor = "not-allowed";
        }

        if (this.canPickup) {
            this.pickupButton.style.color = "";
            this.pickupButton.style.cursor = "pointer";
        } else {
            this.pickupButton.style.color = "gray";
            this.pickupButton.style.cursor = "not-allowed";
        }

        if (this.canAbility) {
            this.abilityButton.style.color = "";
            this.abilityButton.style.cursor = "pointer";
        } else {
            this.abilityButton.style.color = "gray";
            this.abilityButton.style.cursor = "not-allowed";
        }

        if (this.canDisengage) {
            this.disengageButton.style.color = "";
            this.disengageButton.style.cursor = "pointer";
        } else {
            this.disengageButton.style.color = "gray";
            this.disengageButton.style.cursor = "not-allowed";
        }
    }
}
