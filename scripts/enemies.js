class Enemy {
    constructor(name, position, hp, strength, char) {
        this.name = name;
        this.hp = hp;
        this.strength = strength;
        this.speed = 0;
        this.char = char;
        this.position = position;
        this.active = true;
        this.ticksSinceLastMove = 0;
    }

    move() {
        // Base movement logic to be overridden
    }
}

class Hellhound extends Enemy {
    constructor(position, isNearAnnis) {
        super("Hellhound", position, 38, 13, "D");
        this.isNearAnnis = isNearAnnis;
    }

    move() {
        let distanceToPlayer = Math.sqrt(Math.pow(this.position.x - playerX, 2) + Math.pow(this.position.y - playerY, 2));
        if (whistleActive && distanceToPlayer <= 20) {
            for (let i = 0; i < 20; i++) {
                const angle = Math.atan2(this.position.y - playerY, this.position.x - playerX);
                const newX = this.position.x + Math.round(Math.cos(angle));
                const newY = this.position.y + Math.round(Math.sin(angle));

                if (map.isWalkable(newX, newY)) {
                    this.position.x = newX;
                    this.position.y = newY;
                    break;
                }
            }
            return;
        }

        let annisPosition = enemies.find((enemy) => enemy.name === "Black Annis").position;
        if (this.isNearAnnis) {
            const dx = annisPosition.x - this.position.x;
            const dy = annisPosition.y - this.position.y;
            const angle = Math.atan2(dy, dx);

            const newX = this.position.x + Math.round(Math.cos(angle));
            const newY = this.position.y + Math.round(Math.sin(angle));

            if (map.isWalkable(newX, newY)) {
                this.position.x = newX;
                this.position.y = newY;
            }
        }

        if (whistleActive) {
            this.char = "d";
        }
    }
}

class ChildSkeleton extends Enemy {
    constructor(position) {
        super("Child Skeleton", position, 14, 8, "s");
    }

    move() {
        let distanceToPlayer = Math.sqrt(Math.pow(this.position.x - playerX, 2) + Math.pow(this.position.y - playerY, 2));

        if (distanceToPlayer <= (hiding ? player.stealth : 12)) {
            if (Math.random() < 0.6) {
                return;
            }
        } else {
            if (Math.random() < 0.9) {
                return;
            }
        }

        const direction = Math.floor(Math.random() * 4);
        let newX = this.position.x;
        let newY = this.position.y;

        switch (direction) {
            case 0:
                newY--;
                break; // up
            case 1:
                newY++;
                break; // down
            case 2:
                newX--;
                break; // left
            case 3:
                newX++;
                break; // right
        }

        if (map.isWalkable(newX, newY)) {
            this.position.x = newX;
            this.position.y = newY;
        }
    }
}

class Ghoul extends Enemy {
    constructor(guardedItemPosition) {
        super("Ghoul", guardedItemPosition, 43, 5, "g");
        this.guardedItemPosition = guardedItemPosition;
        this.position.x = guardedItemPosition.x + Math.floor(Math.random() * 15) - 8;
        this.position.y = guardedItemPosition.y + Math.floor(Math.random() * 15) - 8;
        this.phaseThroughWalls = true;
    }

    move() {
        const distanceToPlayer = Math.sqrt(Math.pow(this.position.x - playerX, 2) + Math.pow(this.position.y - playerY, 2));

        if (distanceToPlayer <= (hiding ? player.stealth : 12)) {
            this.speed = 5;
            this.char = "G";
        } else {
            this.speed = 15;
            this.char = "g";
        }
        if (this.ticksSinceLastMove < this.speed) {
            this.ticksSinceLastMove++;
            return;
        }
        this.ticksSinceLastMove = 0;

        const maxAttempts = 20;
        let attempts = 0;
        while (attempts < maxAttempts) {
            if (distanceToPlayer <= (hiding ? player.stealth : 12)) {
                if (this.moveNearPlayer(distanceToPlayer)) break;
            } else {
                if (this.moveAlone()) break;
            }
            attempts++;
        }
    }

    moveNearPlayer(currentDistanceToPlayer) {
        const dx = playerX - this.position.x;
        const dy = playerY - this.position.y;
        const angle = Math.atan2(dy, dx);

        const newX = this.position.x + Math.round(Math.cos(angle));
        const newY = this.position.y + Math.round(Math.sin(angle));

        const newDistanceToPlayer = Math.sqrt(Math.pow(newX - playerX, 2) + Math.pow(newY - playerY, 2));

        if (newDistanceToPlayer < currentDistanceToPlayer) {
            this.position.x = newX;
            this.position.y = newY;
            return true;
        }
    }

    moveAlone() {
        return;
        const angle = (Math.floor(Math.random() * 8) * Math.PI) / 4;
        const newX = this.position.x + Math.round(Math.cos(angle));
        const newY = this.position.y + Math.round(Math.sin(angle));

        if (["X", "#"].includes(map.getCell(newX, newY))) {
            return false;
        }

        const currentDistance = Math.sqrt(
            Math.pow(this.position.x - this.guardedItemPosition.x, 2) + Math.pow(this.position.y - this.guardedItemPosition.y, 2)
        );
        const newDistance = Math.sqrt(Math.pow(newX - this.guardedItemPosition.x, 2) + Math.pow(newY - this.guardedItemPosition.y, 2));

        if (currentDistance > 9) {
            if (newDistance < currentDistance) {
                this.position.x = newX;
                this.position.y = newY;
                return true;
            }
        } else {
            this.position.x = newX;
            this.position.y = newY;
            return true;
        }
    }
}

class BlackAnnis extends Enemy {
    constructor(position) {
        super("Black Annis", position, 200, 20, "A");
    }

    move() {
        for (let i = 0; i++; i < 20) {
            const angle = (Math.floor(Math.random() * 8) * Math.PI) / 4;
            const newX = this.position.x + Math.round(Math.cos(angle));
            const newY = this.position.y + Math.round(Math.sin(angle));

            if (map.isWalkable(newX, newY, false)) {
                this.position.x = newX;
                this.position.y = newY;
                return;
            }
        }
    }
}
