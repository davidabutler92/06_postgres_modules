const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Animal = require('../lib/models/Animal');
const pool = require('../lib/utils/pool');

describe('app tests', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a animal using POST', async() => {
    const response = await request(app)
      .post('/api/v1/animals')
      .send({
        color: 'brown',
        type: 'mammal'
      });

    expect(response.body).toEqual({
      id: '1',
      color: 'brown',
      type: 'mammal'
    });
  });

  it('should get and animal by id',  async() => {
    const animal = await Animal.insert({ color: 'white', type: 'reptile' });

    const response = await request(app)
      .get(`/api/v1/animals/${animal.id}`);
    
    expect(response.body).toEqual(animal);
  });

  it('should update and animal by id', async() => {
    const animal = await Animal.insert({ color: 'brown', type: 'mammal' });

    const response = await request(app)
      .put(`/api/v1/animals/${animal.id}`)
      .send({
        color: 'red',
        type: 'bird'
      });

    expect(response.body).toEqual({
      id: '1',
      color: 'red',
      type: 'bird'
    });
  });

  it('should delete an animal by id', async() => {
    const animal = await Animal.insert({ color: 'brown', type: 'mammal' });
    
    const response = await request(app)
      .delete(`/api/v1/animals/${animal.id}`);
    
    expect(response.body).toEqual(animal);
  });

});
