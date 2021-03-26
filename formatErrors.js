import _ from 'lodash';
import { ValidationError } from 'sequelize';

export default (e, models) => {
    if (e instanceof ValidationError) {
        // _.pick({a: 1, b: 2}, 'a') => {a: 1}
        return e.errors.map(x => _.pick(x, ['path', 'message']));
    }
    // if(e.message === "Cannot read property 'id' of undefined") {
    //     return [{ path: 'name', message: 'You need to login first!' }];
    // }
    return [{ path: 'name', message: 'Something went wrong...' }];

};