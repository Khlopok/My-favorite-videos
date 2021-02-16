import { RequestHandler } from 'express';
import user, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';

const createToken = (user:IUser) => {
    return jwt.sign({id: user.id, name: user.name}, 'remilia', {expiresIn: 86400});
}

export const singUp:RequestHandler = async (req, res) => {
    if (!req.body.name || !req.body.password) {return res.status(400).json({msg: 'Please. Send a name and password'})}
    else {
        const $user:IUser | null = await user.findOne({name: req.body.name});
        if ($user) {res.status(401).json({msg: 'The user already exist'})}
        else {
            const newUser = new user(req.body);
            await newUser.save();
            return res.status(201).json(newUser);
        };
    };
};
export const singIn:RequestHandler = async (req, res) => {
    if (!req.body.name || !req.body.password) {return res.status(400).json({msg: 'Please. Send a name and password'})}
    else {
        const $user:IUser | null = await user.findOne({name: req.body.name});
        if (!$user) {res.status(400).json({msg: 'The user does not exist'})}
        else {
            const isMatch:boolean = await $user.comparePassword(req.body.password)
            if (isMatch) {return res.status(200).json({token: createToken($user), user: $user.id})}
            else {return res.status(401).json({msg: 'The name or password are inconrrect'})};
        };
    };
};