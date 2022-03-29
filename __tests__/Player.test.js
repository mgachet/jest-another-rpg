const Player = require('../lib/Player');
const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');

test('creates a player', ()=>{
    const player = new Player('Test');

    expect(player.name).toBe('Test');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)]));
})