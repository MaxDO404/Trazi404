const getPopulation = (db, state, city) => {
    return new Promise((resolve, reject) => {
        if (!state || !city) reject(new Error("Missing state/city data")); 
        let sql = `SELECT population from city_population where state = ? and city = ?`; //prevent injection
        db.get(sql, [state.toLowerCase(), city.toLowerCase()], (err, row) => { //data in db is already in lowercase (saves time)
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.population : null);
            }
        });
    });
};


const putPopulation = async (db, state, city, population) => {
    let result = {};
    result.statusCode = 400;
    try {
        // we try to do an upsert by trying to update first, if there where no changes then we do an insert
        let wasUpdated = await updatePopulation(db, state, city, population);
        if (!wasUpdated) {
            await insertPopulation(db, state, city, population);
            result.statusCode = 201;
            result.message = "Record was created successfully";
        } else {
            result.statusCode = 200;
            result.message = "Record was updated successfully";
        }
    } catch (error) {
        result.message = error.message;
    }
    return result;
};

const insertPopulation = (db, state, city, population) => {
    return new Promise((resolve, reject) => {
        if (!state || !city || !population) reject(new Error("Missing state/city/population data"));
        let s = state.toLowerCase();
        let c = city.toLowerCase();
        let p = population;
        let values = [s,c,p]; 
        let sql =  `INSERT INTO city_population (state, city, population) SELECT ?, ?, ?;`;
        db.run(sql, values, function (err) {
            if (err) {
                reject("There was an error while trying to insert data");
            } else {
                resolve(this.lastID);
            }
        });
    });
}

const updatePopulation = (db, state, city, population) => {
    return new Promise((resolve, reject) => {
        if (!state || !city || !population) reject(new Error("Missing state/city/population data"));
        let s = state.toLowerCase();
        let c = city.toLowerCase();
        let p = population;
        let values = [p,s,c]; 
        let sql =  `UPDATE city_population SET population = ? WHERE state = ? and city = ?;`;
        db.run(sql, values, function (err) {
            if (err) {
                reject("There was an error while trying to update data");
            } else {
                resolve(this.changes);
            }
        });
    });
}

module.exports = {
    putPopulation,
    getPopulation,
};