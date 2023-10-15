const cityPopulationController = require('./controllers/cityPopulationController');
const init = (router, db) => {
  router.on('GET', '/api/population/state/:state/city/:city', (req, res) => cityPopulationController.get(req, res, db));
  router.on('PUT', '/api/population/state/:state/city/:city', (req, res) => cityPopulationController.put(req, res, db));
}
module.exports = init;