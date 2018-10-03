const expect = require("chai").expect;
const query = require("./index");

describe('Query', () => {
    it('should parse and stringify', () => {
        let queryStr = 'name=ABC&company=XYZ&email=abc%40xyz.com';
        let json = query.parse(queryStr);
        let params = query.stringify(json);
        
        expect(params).to.equal(queryStr);
    });

    // it('database query', () => {
    //     let json = query.parse('where[age][$gte]=21&where[$lte]=65');
    //     //let json = query.parse('where[$or][0][status]=live&where[$or][1][status]=pending&option[skip]=1');
    //     console.log('Query JSON:', json);

    //     let flat = query.stringify(json);
    //     console.log(flat);
    // });

    it('should not translate undefined or null values', () => {
        let grade;
        let json = {
            employee: {
                name: 'ABC',
                salary: null
            }
        }
        
        json.grade = grade;
        
        let params = query.stringify(json);
        
        expect(params.indexOf('salary') < 0).to.be.ok;
        expect(params.indexOf('grade') < 0).to.be.ok;
    });
    
    it('should not parse id as number', () => {
        const id = '5bab6bbf919a157089c18d44';
        
        let params = query.parse('where[id]='+id);
        
        expect(params.where.id).to.equal(id);
    });
    
    it('should return an empty json on no query string', () => {
        let params = query.parse();
        expect(params).to.be.an('object').that.is.empty;
    });
    
    it('should return an empty json on blank query string', () => {
        let params = query.parse('');
        expect(params).to.be.an('object').that.is.empty;
    });
    
    it('should return an empty json on null query string', () => {
        let params = query.parse(null);
        expect(params).to.be.an('object').that.is.empty;
    });
    
    it('should return an empty json on invalid query string', () => {
        let params = query.parse('test');
        expect(params).to.be.an('object').that.is.empty;
    });
});
