import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () =>{
 
  const {id} =useParams();
  const navigate=useNavigate();

  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmQ5ZWE5ZTJlM2VlNTZlNTI2ZWY4YjUwMzlkNjhhZiIsIm5iZiI6MTczMTc0Njk0MS4wNDY5OTU2LCJzdWIiOiI2NzM4NTkzZDExOTkxN2JjMWY1ZTY2M2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.y5A9TXVmJClnVIgRaPs5mhj8UXD0PkCIEcJpzIyH_SU'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

  },[])
  
 
  return(
    <div className="player">
    <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
    <iframe src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder="0"width="90%" height="90%" allowFullScreen></iframe>
    <div className="player-info">
      <p>{apiData.published_at.slice(0,10)}</p>
      <p>{apiData.name}</p>
      <p>{apiData.type}</p>
    </div>
    
    </div>
  )
}
export default Player