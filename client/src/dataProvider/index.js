import jsonServerProvider from 'ra-data-json-server';
import { fetchUtils } from 'react-admin';

export default type => {
    switch (type) {
        case 'json':
            return new Promise((resolve, reject) => {
                const httpClient = (url, options = {}) => {
                    if (!options.headers) {
                        options.headers = new Headers({ Accept: 'application/json' });
                    }
                    // add your own headers here
                    options.headers.set('X-Custom-Header', 'foobar');
                    return fetchUtils.fetchJson(url, options);
                }
                resolve(jsonServerProvider('http://jsonplaceholder.typicode.com'), httpClient);
            });
        case 'rest':
            return import('./rest').then(provider => provider.default);
        case 'graphql':
            return import('./graphql').then(factory => factory.default());
        default:
            throw new Error(`Unknow dataProvider type ${type}`);
    }
};
