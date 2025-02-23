class Texts {
    constructor() {
        this.Welcome = `You wake in a cold mist, dew coating your skin. You don’t remember how you got here, only that this place is not of the natural world. An underlying sense of evil seems to permeate everything, a cold chill that seems to be permanently on the back of your neck and in the joins of your knees. As you sit up, you can see a forest extending in front of you, the mist receding into darkness about forty meters ahead of you, the trees looking withered and dead. As you look around, a memory of an old folklore tale comes to your mind, or Black Annis. A crooked hag, with blue skin and iron claws in the place of her hands, a sadistic entity who has a taste for human flesh, especially that of children, of which you are one. You begin to shiver, and from the feel of this place, you know you want to get out as soon as you can.`;
        this.GameOver = `Game Over!`;

        this.CharacterSelect = `Please choose a character: ${Object.keys(classes).join(", ")}`;

        this.CreateHolyDagger = `The items ‘Dagger’, and ‘Holy Water’ combined into a divine weapon, the Holy Dagger! ‘The Holy Dagger’ was added to your inventory and equipped. This weapon of divine power shines with radiance and is capable of taking down the toughest evils. This dagger gives you a fighting chance against Black Annis. It now has a brilliant platinum blade, with the insignia of an angel inscribed on the white quartz hilt. Attacks against Black Annis now deal 50 damage, and any attack against an undead kills it instantly. `;
    }

    ItemFound(item) {
        switch (item) {
            case "Religious Cross": {
                return `In a circle in front of you, barren of vegetation, a carved piece of wood lying in its centre. As you look closer, it appears as an oaken cross laced with silver and gold, with an iron bramble design along its branches. It exudes spiritual energy, and you can tell that it would be dangerous to the ghostly undead.`;
            }
            case "Speed Boots": {
                return `This area seems like a beauty spot among the withered trees, a pair of well-worn leather boots with curled tips sitting together in the centre. They are quite comfortable, lined with fleece inside and with a shockingly hard exterior, as if they are coated in resin.`;
            }
            case "Dagger": {
                return `You enter into a clearing, an object lying in the middle. A wicked fish-hook type dagger with a black metal blade sits there in the dirt, the handle wrapped in resin-hardened cloth.`;
            }
            case "Health Potion": {
                return `In a circle in front of you, barren of vegetation, a thin vial of liquid lays. Its swirling miasma of reds and dark greens, starkly separated within an orb shaped bottle.`;
            }
            case "Whetstone": {
                return `You enter into a clearing, an object lying in the middle. A circular plate of blue-flecked granite looking stone lies propped against a tree stump. It is about three inches thick, and incredibly hard, although strangely light. `;
            }
            case "Armor": {
                return `This area seems like a beauty spot among the withered trees, a breastplate in a design of looking melted to the body lying on the ground, swirling with runic patterns and emitting an unnatural light. Beside it lies a pair of chainmail leggings, the interconnected chains switching between silver and black metals.`;
            }
            case "Holy Water": {
                return `In a circle in front of you, which is barren of vegetation, a glass phial of the clearest, purest water you’ve ever seen sits, with a shimmering aura of calm to it. The phial is clear, the little light that exists in this forest refracting around inside like a laser-cut diamond.`;
            }
        }
    }

    ItemPickedUp(item) {
        switch (item) {
            case "Religious Cross": {
                return `‘The Religious Cross’ was added to your inventory and equipped. Ghouls will die instantly if they approach you, due to the piercing light that can emit from the cross. `;
            }
            case "Speed Boots": {
                return `‘The Boots of Speed’ were added to your inventory and equipped. Your movement speed increased. These fine-crafted boots double your movement speed, allowing you to run away from enemies much faster, and collect items more efficiently. `;
            }
            case "Dagger": {
                return `‘The Dagger’ was added to your inventory. Your strength stat increased by 5! (8 if the class is Bandit) Your attacks now deal more damage. This is also the second of two items needed to create the weapon to kill Annis. When the Holy Water enters your inventory, the Holy Dagger will be forged instantly`;
            }
            case "Health Potion": {
                return `‘The Healing Elixir’ was added to your inventory. This liquid contrast of the two separating colours can heals you fully and beyond, restoring all lost hitpoints and then some, depending on your hitpoints currently. You gained 35 hitpoints! It tastes of the cookies your grandparents used to make, and provides an almost reminiscent feeling when drunk.`;
            }
            case "Whetstone": {
                return `‘The Whetstone’ was added to your inventory. Your strength stat increased by 4! (if class is Warrior or Bandit the increase is 8) This sharpening stone increases the damage of your attacks, adding a superior edge that can’t be worn away. `;
            }
            case "Armor": {
                return `‘The Armour’ was added to your inventory and equipped. You are now partially protected against Black Annis’s attacks, all incoming damage from her is quartered. `;
            }
            case "Holy Water": {
                return `‘Holy Water’ was added to your inventory. This can be used to enchant The Dagger to create a weapon capable of killing Black Annis. It activates when the Dagger enters your inventory`;
            }
            case "Dog Whistle": {
                return `‘The Dog Whistle’ was added to your inventory. It emits a frequency that is only audible to canines and is excruciatingly painful to Hellhounds. While being blown, Hellhounds cannot attack you and retreat if you approach them. The magic of this whistle seems to keep a constant flowing stream of air going once it is given air.`;
            }
        }
    }

    EnemyDefeated(enemy) {
        switch (enemy) {
            case "Black Annis": {
                return `Black Annis has been defeated! You have won the game!`;
            }
            case "Hellhound": {
                return `The Hellhound has been defeated!`;
            }
            case "Ghoul": {
                return `The Ghoul has been defeated!`;
            }
            case "Skeleton": {
                return `The Skeleton has been defeated!`;
            }
        }
    }
}
