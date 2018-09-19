const Op = require('sequelize').Sequelize.Op;

class QueryBuilder {

  contructor() {
    this.params = {};
    this.search = "";
    this.searchClauses = [];
    this.rangeClauses = {};
    this.filterClauses = {};
    this.associationClauses = {};
    this.rangeClauses = {};
  }

  setParams(queryObject) {
    Object.entries(queryObject).forEach((entry) => {
      queryObject[entry[0]] = JSON.parse(entry[1]);
    });

    this.params = {
      ...queryObject
    };
    const { q, ...filterClauses } = this.params.filter;
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

    return this;
  }

  setAssociation(entity, alias) {
    this.association = entity;
    this.alias = alias;
    return this;
  }

  processSearch() {
    const fields = this.entity.rawAttributes;
  
    this.searchClauses = this.search && Object.keys(fields)
      .filter((prop) => fields[prop].type.toSql().indexOf('VARCHAR') > -1)
      .map((prop) => ({ [prop]: { $like: '%' + q + '%' } }));

    return this;
  }

  processFilters() {
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

  build() {
    this.whereClauses = { ...this.filterClauses };
    this.whereClauses = this.search ? { ...this.whereClauses, ...{ $or: this.searchClauses } } : this.whereClauses;
    this.whereClauses = !Object.is(this.rangeClauses, {}) ? { ...this.whereClauses, ...this.rangeClauses } : this.whereClauses;

    let query = {};
    query.attributes = { exclude: ['created_at', 'updated_at'] };

    if (!Object.is(this.associationClauses, {})) {
      console.log(this.entity.inspect());
      query.include = [{
        model: this.association,
        as: this.alias,
        where: this.associationClauses,
        required: false
      }];
    }
    if (Object.is(this.whereClauses, {})) {
      query.where = this.whereClauses;
    }
    if (Array.isArray(this.params.sort)) {
      query.order = [this.params.sort];
    }
    
    this.query = query;

    return this
  }

  
}
module.exports = QueryBuilder;