# System Overview

Welcome to our system! Here's an overview of how it works:

## Framework

We use the __0http__ framework as the backbone of our system. The main reason for this choice is its speed and efficiency.

## Data Persistence

To store and manage data, we employ __SQLite__, a lightweight and efficient relational database. Our database is located in `data/data.db`. SQLite is a great choice for our data storage needs as it is known for its simplicity and performance.

Database contains the following data: [city_populations.csv](https://github.com/Trazi-Ventures/sample-data-interview/blob/main/city_populations.csv)

## Running Tests

You can run these tests by executing the following command:

```sh
npm test
```

## Starting the Server

Run:

```sh
npm start
```

ps: I use "we" to make it sound more like a real-life team. In reality, it is just myself.