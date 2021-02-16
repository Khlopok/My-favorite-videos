import React, { useState, useEffect } from 'react';
import * as videoService from './videoService';
import { useParams, useHistory } from 'react-router-dom';

const VideoForm = () => {
    const params = useParams()
    const history = useHistory()

    const stateReset = {
        title: '',
        description: '',
        url: ''
    }
    const [msg, setMsg] = useState('')
    const [video, setVideo] = useState(stateReset)
    
    const handleChange = (e) => {
        // Form value
        setVideo({...video, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // If there is a parameter is update video, if don't, is create video
        if(!params.id) {
            setVideo(stateReset)
            try {
                const res = await videoService.createVideo(video)
                if (res.status === 200) {
                    await videoService.updateUser({id: res.data._id});
                    e.target.classList.toggle('success');
                    setMsg('Video created successfully!');
                    setTimeout(_=> {
                        e.target.classList.toggle('success');
                        setMsg('');
                    }, 5000);
                } 
            } catch(err) {
                if (err.response.status === 301) {
                    e.target.classList.toggle('repeated');
                    setMsg('This video already exist!');
                    setTimeout(_=> {
                        e.target.classList.toggle('repeated');
                        setMsg('');
                    }, 5000);
                } else {
                    e.target.classList.toggle('error');
                    setMsg('Oops :(. Something went wrong.');
                    console.log(err)
                    setTimeout(_=> {
                        e.target.classList.toggle('error');
                        setMsg('');
                    }, 5000);
                }
            }
        } else {
            await videoService.updateVideo(params.id, video)
            history.push('/')
        };
    };

    const getVideo = async (id) => {
        const res = await videoService.getVideo(id);
        const { title, description, url } = res.data;
        setVideo({ title, description, url })
    }

    useEffect(_=> {
        if (params.id) getVideo(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className="form-container">
            <form onSubmit={handleSubmit}>
            {
            params.id?
            <h2>Update video</h2>:
            <h2>New video</h2>
            }
                <div>
                    <input type="text" name="title" value={video.title} placeholder="Write a title for this video" autoComplete="off" required autoFocus onChange={handleChange}/>
                    <input type="text" name="url" value={video.url} placeholder="Youtube link" autoComplete="off" required onChange={handleChange}/>
                    <textarea name="description" value={video.description} cols="30" rows="3" placeholder="Write a description" autoComplete="off" onChange={handleChange}></textarea>
                    {
                    params.id?
                    <input type="submit" value="Update video" className="update-btn"/>:
                    <input type="submit" value="Create video" className="create-btn"/>
                    }
                </div>
                <div>
                    <span className="msg">{msg}</span>
                </div>
            </form>
        </main>
    )
}

export default VideoForm;