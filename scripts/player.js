class Player {
    constructor(type, abilityName, health, strength, speed, stealth, itemCapacity) {
        this.maxHealth = health;
        this.type = type;
        this.abilityName = abilityName;
        this.health = health;
        this.strength = strength;
        this.speed = speed;
        this.stealth = stealth;
        this.itemCapacity = itemCapacity;
        this.armour = false;
    }

    damage(amount) {
        if (this.armour) {
            amount /= 2;
        }
        this.health -= amount;
    }
}

let classes = {
    Warrior: new Player("Warrior", "Double Attack", 48, 14, 3, 5, 5),
    Tank: new Player("Tank", "Defend", 65, 11, 4, 6, 7),
    Ninja: new Player("Ninja", "Dodge", 35, 9, 2, 2, 4),
    Medic: new Player("Medic", "Heal Self", 38, 7, 4, 3, 5),
    Athlete: new Player("Athlete", "Swift Disengage", 40, 10, 2, 4, 6),
};
