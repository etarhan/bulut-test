const Op = require('sequelize').Sequelize.Op;

class QueryBuilder {

    contructor() {
        this.params = {};
        this.search = "";
        this.searchClauses = [];
        this.rangeClauses = {};
        this.filterClauses = {};
        this.associationClauses = {};
    }

    setParams(queryObject) {
        this.params = queryObject;
        const { q, ...filterClauses } = this.params.hasOwnProperty('filter') && this.params.filter;
        this.search = q;
        this.filterClauses = filterClauses;

        return this;
    }

    setEntity(entity) {
        this.entity = entity;
        if (this.params.hasOwnProperty('sort')) {
            const key = Object.keys(entity.associations).find((a) => a === this.params.sort[0]);
            if (key) {
                this.params.sort.unshift(key);
                this.params.sort[1] = key === 'groups' ? 'name' : key;
            }
        }
        const fields = this.entity.rawAttributes;

        this.searchClauses = this.search && Object.keys(fields)
            .filter((prop) => fields[prop].type.toSql().indexOf('VARCHAR') > -1)
            .map((prop) => ({ [prop]: { $like: '%' + this.search + '%' } }));

        return this;
    }

    setAssociation(association, alias) {
        this.association = association;
        this.alias = alias;
        return this;
    }

    splitFilterClauses() {
        this.rangeClauses = {};
        this.associationClauses = {};
        Object.entries(this.filterClauses).forEach((fc) => {
            const index = Object.keys(this.entity.associations).indexOf(fc[0]);
            if (index > -1) {
                const key = fc[0] === 'groups' ? 'name' : f[0];
                this.associationClauses[key] = fc[1];

                delete this.filterClauses[fc[0]];

            } else if (fc[0].indexOf("_gte") > -1 || fc[0].indexOf("_lte") > -1) {
                const op = fc[0].indexOf("_gte") > -1 ? '$gt' : '$lt';
                this.rangeClauses[fc[0].replace(/_gte|_lte/g, '')] = { [op]: fc[1] };

                delete this.filterClauses[fc[0]];

            } else if (Array.isArray(fc[1])) {
                this.filterClauses[fc[0]] = { [Op.in]: fc[1] };
            }
        });

        return this;
    }

    setExclude(exclude) {
        this.exclude = exclude;
        return this;
    }

    build() {
        this.whereClauses = { ...this.filterClauses };
        this.whereClauses = this.search ? { ...this.whereClauses, ...{ $or: this.searchClauses } } : this.whereClauses;
        this.whereClauses = this.rangeClause && Object.keys(this.rangeClauses).length > 0 ? { ...this.whereClauses, ...this.rangeClauses } : this.whereClauses;

        let query = {};
        if (this.association) {
            query.include = [{
                model: this.association,
                as: this.alias,
                required: false
            }];
            if (Object.keys(this.associationClauses).length > 0) {
                query.include[0].where = this.associationClauses;
                query.include[0].required = true;
            }
        }
        if (this.exclude) {
           this.exclude = ['created_at', 'updated_at', ...this.exclude];
        }
        query.attributes = { exclude: this.exclude };

        if (Object.keys(this.whereClauses).length > 0) {
            query.where = this.whereClauses;
        }
        
        if (this.params.sort && Array.isArray(this.params.sort)) {
            query.order = [this.params.sort];
        }

        return query;
    }
}
module.exports = QueryBuilder;