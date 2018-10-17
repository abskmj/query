const query = require('./index');

// query to get a list of 10 people between age 17 and 66, sorted by their age 

let filters = {
    where: {
        age: { $gt: 17, $lt: 66 },
    },
    options: {
        limit: 10,
        sort: { age: -1 }
    }
}

const queryString = query.stringify(filters);

console.log(queryString);

/*
console:
where[age][$gt]=17&where[age][$lt]=66&options[limit]=10&options[sort][age]=-1
*/


const json = query.parse(queryString);

console.log(JSON.stringify(json, null, 2));

/*
console:
{
  "where": {
    "age": {
      "$gt": 17,
      "$lt": 66
    }
  },
  "options": {
    "limit": 10,
    "sort": {
      "age": -1
    }
  }
}
*/
