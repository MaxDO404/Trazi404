const chai = require('chai');
const expect = chai.expect;
const {getPopulation, putPopulation} = require('../src/services/cityPopulationService');

describe('Database Functions', () => {
  let db = {};
  const state = 'California';
  const city = 'Los Angeles';
  const expectedPopulation = 500000;

  it('should test getPopulation', async () => {
    db.get = function (_sql, _params, callback) {
      callback(null, { population: expectedPopulation });
    };
    const population = await getPopulation(db, state, city);
    expect(population).to.equal(expectedPopulation);
  });

  it('should test putPopulation (UPDATE)', async () => {
    let population = expectedPopulation;
    db.run = function(_sql, _values, callback) {
      // Simulate an update
      global.changes = true;
      callback(null);
      delete global.changes;
    };
    const result = await putPopulation(db, state, city, population);
    expect(result.statusCode).to.equal(200);
  });
  
  it('should test putPopulation (INSERT)', async () => {
    let population = expectedPopulation;
    db.run = function(_sql, _values, callback) {
      callback(null);
    };
    const result = await putPopulation(db, state, city, population);
    expect(result.statusCode).to.equal(201);
  });
});
