const { getPopulation, putPopulation } = require('../services/cityPopulationService');

exports.get = async (req, res, db) => {
    let response = {};
    res.statusCode = 400;
    const {state, city} = req.params;
    try {
        let population = await getPopulation(db, state, city);
        if (!population) { response.message = `No data was found using the provided values  ${state}:${city}` }
        else {
            response.population = population;
            res.statusCode = 200;
        }
    } catch (error) {
        console.log(error.message);
        response.message = "There was an error with the data provided";
    }
    res.end(JSON.stringify(response));
}

exports.put = (req, res, db) => {
    let response = {};
    let data = '';
    const {state, city} = req.params;
    res.statusCode = 400;
    
    req.on('data', (chunk) => data += chunk);
    req.on('end', async() => {
        try {
            const jsonData = JSON.parse(data);
            const population = jsonData?.population;
            if (!population) {
                response.message = "population param needed";
            } else {
                res.statusCode = 200;
                let result = await putPopulation(db, state, city, population);
                response.message = result.message;
                res.statusCode = result.statusCode;
            }
        } catch (error) {
            console.log(error.message);
            response.message = "An internal error occurred";
        }
        res.end(JSON.stringify(response));
    });
}