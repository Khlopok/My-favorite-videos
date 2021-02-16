import {Schema, model, Document} from 'mongoose';
import { hash as getHash, compare, genSalt } from 'bcryptjs';

export interface IUser extends Document {
    name:string;
    password:string;
    videos:string[];
    comparePassword:(password:string) => Promise<boolean>;
};

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    videos: [String]
}, {
    versionKey: false,
});

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await genSalt(10);
    const hash = await getHash(user.password, salt);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password:string):Promise<boolean> { return await compare(password, this.password) };

export default model<IUser>('user', userSchema);