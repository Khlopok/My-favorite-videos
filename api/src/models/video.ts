import {Schema, model, Document} from 'mongoose';

export interface IVideo extends Document {
    title:string;
    description:string;
    url:string;
};

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model<IVideo>('video', videoSchema);