class Map {
    constructor(width, height) {
        this.mapElement = document.getElementById("gameMap");
        this.width = width;
        this.height = height;
        this.map = this.generateMap();
        this.viewDistance = 20;
    }

    removeItem(x, y) {
        this.map[y][x] = " ";
    }

    getCell(x, y) {
        return this.map[y][x];
    }

    getNearbyCells(x, y, distance) {
        let cells = [];
        for (let cy = Math.max(0, y - distance); cy < Math.min(this.height, y + distance); cy++) {
            for (let cx = Math.max(0, x - distance); cx < Math.min(this.width, x + distance); cx++) {
                cells.push(this.map[cy][cx]);
            }
        }
        return cells;
    }

    isWalkable(x, y, includeEnemies = true) {
        if (x < 1 || x >= this.width - 1 || y < 1 || y >= this.height - 1) {
            return false;
        }

        if (x === playerX && y === playerY) {
            return false;
        }

        if (includeEnemies && enemies.some((enemy) => enemy.position.x === x && enemy.position.y === y)) {
            return false;
        }

        return !["X", "T", "#"].includes(this.map[y][x]);
    }

    generateTreeBlob(map, x, y) {
        let treeCount = Math.floor(Math.random() * 28) + 7;
        for (let i = 0; i < treeCount; i++) {
            let offsetX = Math.floor(Math.random() * 7) - 3;
            let offsetY = Math.floor(Math.random() * 7) - 3;
            let treeX = x + offsetX;
            let treeY = y + offsetY;

            if (treeX > 0 && treeX < this.width - 1 && treeY > 0 && treeY < this.height - 1) {
                map[treeY][treeX] = "T";
            }
        }
        map[y][x] = "T";

        return map;
    }

    generateEnemies(map) {
        for (let i = 0; i < 30; i++) {
            let x = Math.floor(Math.random() * this.width - 2) + 1;
            let y = Math.floor(Math.random() * this.height - 2) + 1;

            enemies.push(new ChildSkeleton({ x: x, y: y }));
        }

        enemies.push(new BlackAnnis({ x: 128, y: 32 }));
        enemies.push(new Hellhound({ x: 127, y: 31 }, true));
        enemies.push(new Hellhound({ x: 127, y: 32 }, true));
        enemies.push(new Hellhound({ x: 127, y: 33 }, true));
        enemies.push(new Hellhound({ x: 129, y: 31 }, true));
        enemies.push(new Hellhound({ x: 129, y: 32 }, true));
        enemies.push(new Hellhound({ x: 129, y: 33 }, true));

        return map;
    }

    generateItems(map) {
        let itemChars = ["o", "[", ">", "/", "~", "@", "="];

        for (let i = 0; i < itemChars.length - 1; i++) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);

            for (let cy = Math.max(0, y - 8); cy < Math.min(this.height, y + 9); cy++) {
                for (let cx = Math.max(0, x - 8); cx < Math.min(this.width, x + 9); cx++) {
                    if (Math.pow(cx - x, 2) + Math.pow(cy - y, 2) <= 63.9) {
                        if (!itemChars.includes(map[cy][cx]) && map[cy][cx] !== "X") {
                            map[cy][cx] = " ";
                        }
                    }
                }
            }
            if (x > 0 && x < this.width - 1 && y > 0 && y < this.height - 1) {
                enemies.push(new Ghoul({ x: x, y: y }));
            }
            map[y][x] = itemChars[i];
        }

        let x = Math.floor(Math.random() * this.width);
        let y = Math.floor(Math.random() * this.height);
        for (let cy = Math.max(0, y - 8); cy < Math.min(this.height, y + 9); cy++) {
            for (let cx = Math.max(0, x - 8); cx < Math.min(this.width, x + 9); cx++) {
                if (Math.pow(cx - x, 2) + Math.pow(cy - y, 2) <= 63.9) {
                    if (!itemChars.includes(map[cy][cx]) && map[cy][cx] !== "X") {
                        map[cy][cx] = " ";
                    }
                }
            }
        }
        map[y][x] = "+";
        enemies.push(new Hellhound({ x: x - 1, y: y }, false));
        enemies.push(new Hellhound({ x: x + 1, y: y }, false));

        return map;
    }

    generateMap() {
        let map = Array(this.height)
            .fill()
            .map(() => Array(this.width).fill(" "));
        for (let i = 0; i < this.height; i++) {
            if (i === 0) {
                map[i] = [...Array((this.width - 8) / 2).fill("X"), ...Array(8).fill("#"), ...Array((this.width - 8) / 2).fill("X")];
            } else if (i === this.height - 1) {
                map[i] = Array(this.width).fill("X");
            } else {
                map[i][0] = "X";
                for (let j = 1; j < this.width - 1; j++) {
                    let random = Math.random();
                    if (random < 0.05) {
                        map[i][j] = "¶";
                    } else if (random < 0.06) {
                        map[i][j] = "B";
                    } else if (random < 0.07) {
                        map[i][j] = "T";
                    } else {
                        map[i][j] = "Y";
                    }
                }
                map[i][this.width - 1] = "X";
            }
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (map[y][x] === "B") {
                    map = this.generateTreeBlob(map, x, y);
                }
            }
        }

        map = this.generateItems(map);
        map = this.generateEnemies(map);

        return map;
    }

    unlockGate() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.map[y][x] === "#") {
                    this.map[y][x] = " ";
                }
            }
        }
    }

    updateMap(playerX, playerY) {
        let viewDistance = this.viewDistance;
        let cellSize = 8 / (viewDistance / 40);
        let fontSize = 12 / (viewDistance / 40);

        let boundedPlayerX = Math.max(viewDistance, Math.min(this.width - viewDistance, playerX));
        let boundedPlayerY = Math.max(viewDistance, Math.min(this.height - viewDistance, playerY));

        let cellMap = {
            X: "wall",
            Y: "grass",
            T: "tree",
            "¶": "tallGrass",
            P: "player",
            " ": "empty",
            "#": "gate",
            o: "item",
            "[": "item",
            ">": "item",
            "/": "item",
            "~": "item",
            "@": "item",
            "+": "item",
            "^": "item",
            "=": "item",
            A: "annis",
            G: "enemy",
            g: "enemy",
            D: "enemy",
            d: "enemy",
            S: "enemy",
            s: "enemy",
        };

        let visibleMap = [];
        for (let y = Math.max(0, boundedPlayerY - viewDistance); y <= Math.min(this.height - 1, boundedPlayerY + viewDistance); y++) {
            let row = [];
            for (let x = Math.max(0, boundedPlayerX - viewDistance); x <= Math.min(this.width, boundedPlayerX + viewDistance); x++) {
                let content;
                if (y === playerY && x === playerX) {
                    content = "P";
                } else if (enemies.some((enemy) => enemy.position.x === x && enemy.position.y === y)) {
                    for (let i = 0; i < enemies.length; i++) {
                        let enemy = enemies[i];
                        if (enemy.position.x === x && enemy.position.y === y) {
                            content = enemy.char;
                        }
                    }
                } else {
                    content = this.map[y][x];
                }
                if (Math.pow(Math.abs(playerX - x), 2) + Math.pow(Math.abs(playerY - y), 2) > Math.pow(viewDistance - 0.01, 2)) {
                    content = " ";
                }
                if (!content) {
                    content = " ";
                }
                let cellClass = cellMap[content];
                let cell = `<div class="cell ${cellClass}" style="font-size:${fontSize}px;">${content}</div>`;

                row.push(cell);
            }
            visibleMap.push(row);
        }

        let rows = visibleMap.map((row) => row.join("")).join("");

        this.mapElement.style.gridTemplateColumns = `repeat(${visibleMap[0].length}, ${cellSize}px)`;
        this.mapElement.style.gridTemplateRows = `repeat(${visibleMap[0].length}, ${cellSize}px)`;
        this.mapElement.innerHTML = rows;
    }
}
