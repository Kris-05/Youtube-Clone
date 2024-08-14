import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { valueConverter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
const API_KEY = import.meta.env.VITE_API_KEY;

const PlayVideo = () => {

  const {videoId} = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    // for video data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    await fetch(videoDetails_url).then(res=>res.json()).then(data => setApiData(data.items[0]));
  }
  const fetchOtherData = async () => {
    // for channel data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    await fetch(channelData_url).then(res=>res.json()).then(data => setChannelData(data.items[0]))
    // fetch comment data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResult=50&videoId=${videoId}&key=${API_KEY}`
    await fetch(comment_url).then(res=>res.json()).then(data => setCommentData(data.items))
  }

  useEffect(()=>{
    fetchVideoData();
  },[videoId])

  useEffect(()=>{
    fetchOtherData();
  },[apiData])

  return (
    <div className='play-video'> 
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
      <div class="play-video-info">
        <p>{apiData?valueConverter(apiData.statistics.viewCount):"16K"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
        <div>
          <span><img src={like} alt="like"/>{apiData?valueConverter(apiData.statistics.likeCount):"69"}</span>
          <span><img src={dislike} alt="dislike"/></span>
          <span><img src={share} alt="share"/>Share</span>
          <span><img src={save} alt="save"/>Save</span>
        </div>
      </div>
      <hr/>
      <div class="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="Uploader"/>
        <div>
          <p>{apiData?apiData.snippet.channelTitle:""}</p>
          <span>{channelData?valueConverter(channelData.statistics.subscriberCount):"69K"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div class="video-description">
        <p>{apiData?apiData.snippet.description.slice(0,250):"Description Here"}</p>
        <hr/>
        <h4>{apiData?valueConverter(apiData.statistics.commentCount):69} comments</h4>
        {commentData.map((item,index)=>{
          return (
            <div key={index} class="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user-profile"/>
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div class="comment-action">
                  <img src={like} alt="like"/><span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="dislike"/><span></span>
                </div>
              </div>
            </div>
          )
        })}
        
      </div>
    </div>
  )
}

export default PlayVideo
