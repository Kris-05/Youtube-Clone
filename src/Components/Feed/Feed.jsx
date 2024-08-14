import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { valueConverter} from '../../data'
import moment from 'moment/moment'
const API_KEY = import.meta.env.VITE_API_KEY;

const Feed = ({category}) => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items));
    }

    useEffect(()=>{
        fetchData();
    },[category])

  return <>
    <div className='feed'>
        {data.map((item, index)=>{
            return (
                <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                    <img src={item.snippet.thumbnails.medium.url} alt="thumbnail"/>
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{valueConverter(item.statistics.viewCount)} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            )
        })}
        
    </div>
  </>
}

export default Feed
