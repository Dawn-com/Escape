class Fight {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.turn = 0;

        this.ninjaAbility = false;
        this.tankAbility = false;

        console.log("Fight started");

        input.canAbility = true;
        input.canAttack = true;
        input.canDisengage = true;
        input.updateButtons();
    }

    nextTurn() {
        console.log("Next turn");

        if (this.isOver()) {
            enemies = enemies.filter((e) => e !== this.enemy);
            inCombat = false;
            return;
        }

        console.log("Turn " + this.turn);
        if (this.turn % 2 === 0) {
            console.log("Player turn start");
            this.playerTurn();
        } else {
            console.log("Enemy turn start");
            this.enemyTurn();
        }
    }

    playerTurn() {
        console.log("Player turn");
        textControl.addText("Your turn!");
        input.attackButton.addEventListener("click", () => this.handlePlayerAction("attack"));
        input.disengageButton.addEventListener("click", () => this.handlePlayerAction("disengage"));
        input.abilityButton.addEventListener("click", () => this.handlePlayerAction("ability"));
    }

    handlePlayerAction(action) {
        textControl.addText(`Player chose to ${action}`);

        input.attackButton.removeEventListener("click", () => this.handlePlayerAction("attack"));
        input.disengageButton.removeEventListener("click", () => this.handlePlayerAction("disengage"));
        input.abilityButton.removeEventListener("click", () => this.handlePlayerAction("ability"));

        if (action === "attack") {
            if (Math.random() < 0.2) {
                textControl.addText("You missed!");
            } else {
                this.enemy.hp -= this.player.strength;
                textControl.addText(`You dealt ${this.player.strength} damage to ${this.enemy.name}`);
                if (this.enemy.name === "Black Annis" && inventory.hasItem("Holy Dagger")) {
                    this.enemy.hp -= 50;
                    textControl.addText(`You dealt an extra 50 damage to ${this.enemy.name} with the Holy Dagger`);
                }
            }
        }

        if (action === "disengage") {
            this.enemyTurn();
            textControl.addText("You disengaged from the fight");
            inCombat = false;
            return;
        }

        if (action === "ability") {
            if (this.player.name === "Ninja") {
                textControl.addText("You used your ability to dodge any incoming attacks");
                this.ninjaAbility = true;
            }

            if (this.player.name === "Medic") {
                textControl.addText("You used your ability to heal yourself for 10 health");
                this.player.health += 10;
            }

            if (this.player.name === "Tank") {
                textControl.addText("You used your ability to defend yourself");
                this.tankAbility = true;
            }

            if (this.player.name === "Warrior") {
                textControl.addText("You used your ability to double attack");
                if (Math.random() < 0.2) {
                    textControl.addText("You missed!");
                } else {
                    this.enemy.hp -= this.player.strength;
                    textControl.addText(`You dealt ${this.player.strength} damage to ${this.enemy.name}`);
                }
                this.enemy.hp -= this.player.strength;
                textControl.addText(`You dealt ${this.player.strength} damage to ${this.enemy.name}`);
            }

            if (this.player.name === "Athlete") {
                textControl.addText("You used your ability to disengage without taking any damage");
                inCombat = false;
                return;
            }
        }

        this.turn++;
        this.nextTurn();
    }

    enemyTurn() {
        let damage = this.enemy.strength;
        if (this.enemy.name === "Black Annis" && armorActive) {
            damage /= 4;
        }
        if (Math.random() < (this.ninjaAbility ? 0.2 : 0.8)) {
            textControl.addText(`${this.enemy.name} missed!`);
        } else {
            if (this.tankAbility) {
                damage /= 2;
            }
            this.player.health -= damage;
            textControl.addText(`${this.enemy.name} dealt ${damage} damage to you`);
        }
        this.ninjaAbility = false;
        this.tankAbility = false;
        this.turn++;
        this.nextTurn();
    }

    isOver() {
        if (this.player.health <= 0) {
            window.location = "death.html";
        }

        if (this.enemy.hp <= 0 && this.enemy.name === "Black Annis") {
            window.location = "win.html";
        }

        return this.player.health <= 0 || this.enemy.hp <= 0;
    }
}
