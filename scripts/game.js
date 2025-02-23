const urlParams = new URLSearchParams(window.location.search);
const characterClass = urlParams.get("character");
player = classes[characterClass] || classes["Athlete"];
let textControl = new TextControl();
let texts = new Texts();
let input = new Input(player.abilityName);
let enemies = [];
let map = new Map(256, 256);
playerX = 50;
playerY = 50;
map.updateMap(playerX, playerY);
let inventory = new Inventory();
let inCombat = false;
let hiding = false;
let whistleActive = false;
let armorActive = false;

if (urlParams.get("debug")) {
    whistleActive = true;
    armorActive = true;
    inventory.addItem("Dog Whistle");
    inventory.addItem("Armor");
    inventory.addItem("Holy Water");
    inventory.addItem("Dagger");
    player.health = 100000;
}

let lastTickTime = performance.now();
const TICK_RATE = 1000 / 20;

startGame();
gameLoop();

function startGame() {
    textControl.addText(texts.Welcome);
}

function gameLoop() {
    let now = performance.now();
    let elapsed = now - lastTickTime;
    while (elapsed >= TICK_RATE) {
        lastTickTime += TICK_RATE;
        gameTick();
        elapsed = now - lastTickTime;
    }
    requestAnimationFrame(gameLoop);
}

function gameTick() {
    if (inCombat) {
        return;
    }
    playerMovement();
    enemyMovement();
    checkForInteractions();
    checkForDead();
    map.updateMap(playerX, playerY);
}

let ticksSinceLastMove = 0;
let lastMoveAxis = "x";
function playerMovement() {
    let dx = 0;
    let dy = 0;

    if (input.pressed_keys["ArrowUp"] || input.pressed_keys["w"]) {
        dy = -1;
    }
    if (input.pressed_keys["ArrowDown"] || input.pressed_keys["s"]) {
        dy = 1;
    }
    if (input.pressed_keys["ArrowLeft"] || input.pressed_keys["a"]) {
        dx = -1;
    }
    if (input.pressed_keys["ArrowRight"] || input.pressed_keys["d"]) {
        dx = 1;
    }

    if (input.hideButtonPressed) {
        hiding = !hiding;
        input.hideButton.innerHTML = hiding ? "Unhide" : "Hide";
        input.hideButtonPressed = false;
    }

    if (ticksSinceLastMove >= (hiding ? 10 : player.speed) && (dx || dy)) {
        if (dx && dy) {
            if (lastMoveAxis === "x") {
                dx = 0;
                lastMoveAxis = "y";
            } else {
                dy = 0;
                lastMoveAxis = "x";
            }
        }

        let newX = playerX + dx;
        let newY = playerY + dy;
        if (map.isWalkable(newX, newY)) {
            playerX = newX;
            playerY = newY;
        }
        ticksSinceLastMove = 0;
    } else {
        ticksSinceLastMove++;
    }
}

function checkForDead() {
    for (let enemy of enemies) {
        if (enemy.health <= 0) {
            textControl.addText(texts.EnemyDefeated(enemy.name));
            enemies = enemies.filter((e) => e !== enemy);
        }
    }

    if (player.health <= 0) {
        window.location = "death.html";
    }
}

function enemyMovement() {
    for (let enemy of enemies) {
        enemy.move();
    }
}

function checkForInteractions() {
    let cell = map.getCell(playerX, playerY);
    let nearbyCells = map.getNearbyCells(playerX, playerY, 1);

    if (nearbyCells.includes("#")) {
        if (inventory.hasItem("Religious Cross")) {
            window.location = "win.html";
        } else {
            textControl.addText("This gate appears to be locked.");
        }
    }

    nearbyCells = map.getNearbyCells(playerX, playerY, 8);

    function getIntersection(arr1, arr2) {
        const set2 = new Set(arr2);
        return arr1.filter((item) => set2.has(item));
    }

    let intersectingItems = getIntersection(nearbyCells, ["!", "Ø", "[", ">", "/", "~", "@", "+", "^", "="]);
    if (intersectingItems) {
        for (let item of intersectingItems) {
            item = inventory.CharToName(item);
            if (inventory.IsFound(item)) {
                continue;
            }
            textControl.addText(texts.ItemFound(item));
            inventory.ItemFound(item);
        }
    }

    const pickupHandler = (item) => {
        if (inventory.hasItem(item)) {
            return;
        }
        inventory.addItem(item);
        map.removeItem(playerX, playerY);
        textControl.addText(texts.ItemPickedUp(item));

        if (item === "Speed Boots") {
            player.speed = Math.floor(player.speed * 0.5);
        } else if (item === "Dog Whistle") {
            whistleActive = true;
        } else if (item === "Whetstone") {
            player.attackDamage = Math.round(player.attackDamage * 1.2);
        } else if (item === "Armor") {
            armorActive = true;
        } else if (item === "View Extender") {
            map.viewDistance = 40;
        } else if (item === "Healing Potion") {
            player.health = player.maxHealth;
        } else if (item === "Dagger") {
            player.attackDamage += 5;
            if (["Ninja", "Warrior"].includes(player.name)) {
                player.attackDamage += 3;
            }
        }

        input.pickupButton.removeEventListener("mousedown", () => pickupHandler(item));
    };

    if (["o", "[", ">", "/", "~", "@", "+", "^", "="].includes(cell)) {
        let item = inventory.CharToName(cell);
        if (inventory.hasItem(item)) {
            return;
        }
        input.canPickup = true;
        input.updateButtons();
        input.pickupButton.removeEventListener("mousedown", () => pickupHandler(item));
        input.pickupButton.addEventListener("mousedown", () => pickupHandler(item));
    } else {
        input.pickupButton.removeEventListener("mousedown", () => pickupHandler(item));
        input.canPickup = false;
        input.updateButtons();
    }

    for (let enemy of enemies) {
        if (Math.abs(enemy.position.x - playerX) <= 1 && Math.abs(enemy.position.y - playerY) <= 1) {
            if (enemy.name === "Ghoul" && inventory.hasItem("Religious Cross")) {
                textControl.addText(texts.GhoulRepelled);
                enemies = enemies.filter((e) => e !== enemy);
                continue;
            }
            if (["Ghoul", "Child Skeleton"].includes(enemy.name) && inventory.hasItem("Holy Dagger")) {
                textControl.addText(texts.EnemyDefeated(enemy.name));
                enemies = enemies.filter((e) => e !== enemy);
                continue;
            }
            console.log("enemy nearby");
            inCombat = true;
            fight = new Fight(player, enemy);
            fight.nextTurn();
        }
    }

    input.updateButtons();
}
