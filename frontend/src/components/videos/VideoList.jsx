import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as videoService from './videoService';
import ReactPlayer from "react-player";

const VideoList = _=> {
    const [videos, setVideos] = useState([])

    const videoLoader = async _=> {
        try {
            const res = await videoService.getVideos()
            try {
                const sorteredVideos = res.data.map((video) => ({
                    ...video,
                    createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
                    updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date()
                }))
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

                setVideos(sorteredVideos);
            } catch (err) { console.log(err) }
        } catch (err) { if (err.response.status === 401) history.push('/session') };
    }

    useEffect(_=> {
        videoLoader()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const history = useHistory();

    const handleDelete = async (id) => {
        await videoService.deleteVideo(id);
        videoLoader();
    };

    return (
        <main className="list-container">
            {videos.map((video) => (
                <article key={video._id}>
                    <div className="video-info">
                        <span onClick={_=> handleDelete(video._id)}>X</span>
                        <div onClick={_=> history.push(`/update/${video._id}`)}>
                            <h2>{video.title}</h2>
                            <p>{video.description}</p>
                        </div>
                    </div>
                    <ReactPlayer url={video.url} />
                </article>
            ))}
        </main>
    )
};

export default VideoList;