const Player = require('../lib/Player');
const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');

test('creates a player', () => {
    const player = new Player('Test');

    expect(player.name).toBe('Test');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)]));
});

test('gets player stats as an object', () => {
    const player = new Player("Test");

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player("Test");

    expect(player.getInventory()).toEqual(
        expect.any(Array));
    player.inventory = [];
    expect(player.getInventory()).toEqual(false);

});

test('get player\'s health value', () => {
    const player = new Player("Test");

    expect(player.getHealth()).toEqual(
        expect.stringContaining(player.health.toString()));
});

test('checks if player is alive or not', () => {
    const player = new Player("Test");

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
});

test("subtracts from player's health", () => {
    const player = new Player("Test");
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

test("gets player's attack value", () => {
    const player = new Player("Test");
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test('adds a potion to the inventory', () => {
    const player = new Player("Test");
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () => {
    const player = new Player("Test");
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});

