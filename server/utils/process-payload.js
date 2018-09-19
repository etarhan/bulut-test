const QueryBuilder = require('./query-builder')

module.exports = function (entity, association, alias, req, res, exclude) {
    let query = req.query;
    Object.entries(query).forEach((entry) => {
        query[entry[0]] = JSON.parse(entry[1]);
    });

    if (req.params.id)
        query.filter = { id:  req.params.id };

    const dbQuery = new QueryBuilder()
        .setParams(query)
        .setExclude(exclude)
        .setEntity(entity)
        .setAssociation(association, alias)
        .splitFilterClauses()
        .build();
    

    return entity.findAll(dbQuery).then((entities) => {
        const total = entities.length;
        let processedEntities = entities;
        if (query.hasOwnProperty('range')) {
            if (alias === 'groups')
                processedEntities.forEach((c) => c.total_spent = parseFloat(c.total_spent).toFixed(2));
            processedEntities = entities.slice(query.range[0], query.range[1])
            res.header("Content-Range", `objects ${query.range[0]}-${query.range[1]}/${total}`);
        }
        processedEntities = alias === 'groups' ? convertGroupsToString(processedEntities) : processedEntities;
        return req.params.id ? processedEntities[0] : processedEntities;
    });

    function convertGroupsToString(customers) {
        return customers.map((customer) => {
          let plainCustomer = customer.get({ plain: true });
          plainCustomer.groups = plainCustomer.hasOwnProperty('groups') 
            ? plainCustomer.groups.map((group) => group.name) 
            : [];
          return plainCustomer;
        });
    }

}

