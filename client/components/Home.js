import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

/**
 * COMPONENT
 */
export const Home = props => {
  const [colors, setColors] = useState([]);
  const [whatStarsAreGold, setWhatStarsAreGold] = useState({});
  const [display, setDisplay] = useState('equal');
  
  useEffect(() => {
    async function getColors(){
      setColors((await axios.get('/api/colors')).data);
    }
    getColors();
  },[])

  const postRating = async(rating) => {
    
    setColors((await axios.post('/api/colors', {rating, colors})).data.colors);
  }

  const onMouseEnter = (hoveredStar) => {
    let whatStarsAreGold = {}
    for(let i = 1; i <= hoveredStar; i++){
      whatStarsAreGold[`star${i}`] = true;
    }
    setWhatStarsAreGold(whatStarsAreGold);
  }

  const onMouseLeave = () => {
    setWhatStarsAreGold({})
  }

  const copyToClipboard = (colorIndex) => {
    navigator.clipboard.writeText(`rgb(${colors[colorIndex].r}, ${colors[colorIndex].b}, ${colors[colorIndex].g})`);
  }

  if(colors.length === 0)
    return null;
  return (
    <div>
      <h1>Machine Learning Color Palette</h1>
      <div className='box-container'>
        <div className={`box ${display}-box box1`} style={{backgroundColor: `rgb(${colors[0].r}, ${colors[0].b}, ${colors[0].g})`}}><button className='copy-button' onClick={() => copyToClipboard(0)}>Copy rgb</button></div>
        <div className={`box ${display}-box box2`} style={{backgroundColor: `rgb(${colors[1].r}, ${colors[1].b}, ${colors[1].g})`}}><button className='copy-button' onClick={() => copyToClipboard(1)}>Copy rgb</button></div>
        <div className={`box ${display}-box box3`} style={{backgroundColor: `rgb(${colors[2].r}, ${colors[2].b}, ${colors[2].g})`}}><button className='copy-button' onClick={() => copyToClipboard(2)}>Copy rgb</button></div>
      </div>
      <div className='stars-container'>
        <button className={`star ${whatStarsAreGold.star1 ? 'gold' : ''}`} id='star1' onMouseEnter={() => onMouseEnter(1)} onMouseLeave={onMouseLeave} onClick={() => postRating(0)}>★</button>
        <button className={`star ${whatStarsAreGold.star2 ? 'gold' : ''}`}  id='star2' onMouseEnter={() => onMouseEnter(2)} onMouseLeave={onMouseLeave} onClick={() => postRating(1)}>★</button>
        <button className={`star ${whatStarsAreGold.star3 ? 'gold' : ''}`}  id='star3' onMouseEnter={() => onMouseEnter(3)} onMouseLeave={onMouseLeave} onClick={() => postRating(2)}>★</button>
        <button className={`star ${whatStarsAreGold.star4 ? 'gold' : ''}`}  id='star4' onMouseEnter={() => onMouseEnter(4)} onMouseLeave={onMouseLeave} onClick={() => postRating(3)}>★</button>
        <button className={`star ${whatStarsAreGold.star5 ? 'gold' : ''}`}  id='star5' onMouseEnter={() => onMouseEnter(5)} onMouseLeave={onMouseLeave} onClick={() => postRating(4)}>★</button>
      </div>
      <h3>Display</h3>
      <div className='display-options-container'>
        
        <button onClick={() => setDisplay('design')}>Design</button>
        <button onClick={() => setDisplay('equal')}>Equal</button>
      </div>
    </div>
  )
}



/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
