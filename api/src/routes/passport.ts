import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import user from '../models/user';

const opts:StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'remilia'
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const $user = await user.findById(payload.id)
        if ($user) {done(null, $user)}
        else {done(null, false)};
    }
    catch (err) {console.log(err)}
});