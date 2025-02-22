public class Monster {
    private int id; // monster id
    private String name; // monster name
    private String description; // monster name
    private int damage; // monster damage 
    private int health; // monster health
    private int points; // points for killing the monster
    private int defaultHealth; // the default or maximum monster health

    // constructor for monster attributes
    public Monster(int id, String name, String description, int damage, int health, int points, int defaultHealth){
        this.id = id;
        this.name = name;
        this.description = description;
        this.damage = damage;
        this.health = health;
        this.points = points;
        this.defaultHealth = defaultHealth;
    }

    // getter and setters for monster id, name, damage, health, point, and default health
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String name) {
        this.name = description;
    }

    public int getDamage() {
        return this.damage;
    }

    public void setDamage(int damage) {
        this.damage = damage;
    }

    public int getHealth() {
        return this.health;
    }

    public void setHealth(int health) {
        // makes sure the health cant be negative
        if (health < 0) {
            health = 0;
        }
        this.health = health;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getDefaulthealth() {
        return this.defaultHealth;
    }

    public void setDefaultHealth(int defaultHealth) {
        this.defaultHealth = defaultHealth;
    }
}