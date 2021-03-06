const _ = require('lodash');
const debug = require('debug')('abskmj:query');

module.exports.parse = (query, options) => {
    query = query || '';

    const pairSeparator = '&';
    const valueSeparator = '=';

    let parameters = {};

    let nameValuePairs = query.split(pairSeparator);

    nameValuePairs.forEach((pair) => {
        let parts = pair.split(valueSeparator);

        if (parts.length === 2) {
            let name = parts[0];
            let value = parseValue(parts[1]);

            _.set(parameters, name, value);
        }
        else {
            debug(`Doesn't seem be a name value pair: ${pair}`);
        }
    });

    return parameters;
}

let parseValue = (value) => {
    if (value === '%00') {
        return null;
    }
    else if (value === '') {
        return '';
    }

    value = decodeURIComponent(value);

    try {
        // try to parse value as a JSON
        
        return JSON.parse(value);
    }
    catch (e) {
        // try to parse value as a Number
        
        let temp = Number(value);

        if (!isNaN(temp)) {
            return temp;
        }
    }

    return value;
}


module.exports.stringify = (query, options) => {
    let flat = flatten(query, { prepend: '[', append: ']' });

    let str = '';

    _.each(flat, (value, key) => {
        if (str !== '') {
            str += '&';
        }
        str += `${key}=${value}`;
    });

    return str;
}

let flatten = (obj, options = {}) => {
    let defaults = {
        start: '',
        prepend: '.',
        append: ''
    }

    options = _.assign(defaults, options);

    let flat = {};

    _.each(obj, (value, key) => {
        let start = '';
        if (options.start !== '') {
            start = `${options.start}${options.prepend}${key}${options.append}`;
        }
        else {
            start = key;
        }

        if (_.isObject(value)) {
            _.assign(flat, flatten(value, { start: start, prepend: options.prepend, append: options.append }));
        }
        else if (value !== undefined && value !== null) {
            flat[start] = encodeURIComponent(value);
        }
        else if (value == null) {
            flat[start] = '%00';
        }
    });

    return flat;
}
