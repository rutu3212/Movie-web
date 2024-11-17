import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'



const TitleCard =({title,Category}) => {

  const [apiData,setApiData]=useState([]);
  const cardsRef =useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmQ5ZWE5ZTJlM2VlNTZlNTI2ZWY4YjUwMzlkNjhhZiIsIm5iZiI6MTczMTc0Njk0MS4wNDY5OTU2LCJzdWIiOiI2NzM4NTkzZDExOTkxN2JjMWY1ZTY2M2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.y5A9TXVmJClnVIgRaPs5mhj8UXD0PkCIEcJpzIyH_SU'
    }
  };
  
 

const handleWheel = (event) =>{
event.preventDefault();
cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${Category?Category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handleWheel);
},[])

  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
        return  <Link to={`/player/${card.id}`} className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500/` +card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
        </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCard