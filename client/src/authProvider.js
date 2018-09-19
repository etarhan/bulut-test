import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'react-admin';
// import decodeJwt from 'jwt-decode';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;

        const data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);
        data.append('grant_type', 'password');

        return fetch("http://localhost:4000/login", {
                method: "POST", 
                mode: "cors", 
                cache: "no-cache", 
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: data
            })
            .then(response => {
                if (response.status !== 200)
                    return Promise.reject();
                return response.json()
                
            })
            .then(({token}) => {
                localStorage.setItem('token', token);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unkown method');
};
