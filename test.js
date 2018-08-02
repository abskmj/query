const expect = require("chai").expect;
const query = require("./index");

describe('Query', () => {
    it('Simple', () => {
        let json = query.parse('name=ABC&company=XYZ&email=abc%40xyz.com');
        console.log('Query JSON:', json);
        
        let flat = query.stringify(json);
        console.log(flat);
    });
    
    it('database query', () => {
        let json = query.parse('where[age][$gte]=21&where[$lte]=65');
        //let json = query.parse('where[$or][0][status]=live&where[$or][1][status]=pending&option[skip]=1');
        console.log('Query JSON:', json);
        
        let flat = query.stringify(json);
        console.log(flat);
    });
});