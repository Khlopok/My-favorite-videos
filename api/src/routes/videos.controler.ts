import { RequestHandler } from 'express';
import video, { IVideo } from '../models/video';
import user, { IUser } from '../models/user';

export const createVideo:RequestHandler = async (req, res) => {
    const $user:IUser | null = await user.findById(req.params.id);
    if ($user) {
        const compareVideos:string[] = [];
        for (const id of $user.videos) {
            const videoFound = await video.findById(id);
            if (videoFound) compareVideos.push(videoFound.url);
        };
        if (compareVideos.includes(req.body.url)) {return res.status(301).json({message: 'The ulr already exist'})}
        else {
            const $video = new video(req.body);
            const savedVideo = await $video.save();
            res.json(savedVideo);
        };
    } else {res.status(401).json({msg: 'Refused'})};
};

export const getVideo:RequestHandler = async (req, res) => {
    const videoFound:IVideo | null = await video.findById(req.params.id);
    if (!videoFound) return res.status(204).json();
    return res.json(videoFound);
};

export const getVideos:RequestHandler = async (req, res) => {
    const $user:IUser | null = await user.findById(req.params.id);
    if ($user) {
        const videos:IVideo[] = [];
        for (const id of $user.videos) {
            const videoFound = await video.findById(id);
            if (videoFound) videos.push(videoFound);
        }
        res.json(videos);
    } else {res.status(401).json({msg: 'Refused'})};
};

export const updateVideo:RequestHandler = async (req, res) => {
    const videoUpdated:IVideo | null = await video.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (!videoUpdated) return res.status(204).json();
    res.json(videoUpdated);
};

export const deleteVideo:RequestHandler = async (req, res) => {
    const videoFound:IVideo | null = await video.findByIdAndDelete(req.params.id);
    if (!videoFound) return res.status(204).json();
    return res.json(videoFound);
};

export const updateUser:RequestHandler = async (req, res) => {
    const userUpdated = await user.findByIdAndUpdate(req.params.id, {$push: {videos: req.body.id}});
    res.json(userUpdated);
}