const expect = require("chai").expect;
const query = require("./index");

describe('Query', () => {
    it('should parse and stringify', () => {
        let queryStr = 'name=ABC&company=XYZ&email=abc%40xyz.com';
        let json = query.parse(queryStr);
        let params = query.stringify(json);

        expect(params).to.equal(queryStr);
    });

    it('should translate null values', () => {
        var string = 'employee[name]=ABC&employee[salary]=%00&grade=%00';

        let json = query.parse(string);

        expect(json.grade).to.equal(null);
        expect(json.employee.salary).to.equal(null);

        let params = query.stringify(json);

        expect(params).to.equal(string);
    });

    it('should translate empty values', () => {
        var string = 'employee[name]=ABC&employee[salary]=&grade=';

        let json = query.parse(string);

        expect(json.grade).to.equal('');
        expect(json.employee.salary).to.equal('');

        let params = query.stringify(json);

        expect(params).to.equal(string);
    });

    it('should translate arrays', () => {
        let json = {
            aggregate: [{
                    $match: {
                        player: 89
                    }
                },
                {
                    $group: {
                        _id: 'null',
                        sum: {
                            $sum: '$amount'
                        }
                    }
                }
            ]
        }
        
        let string = query.stringify(json);
        
        expect(string).to.equal('');
        
        let result = query.parse(string);
        
        expect(JSON.stringify(result)).to.equal('');
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
