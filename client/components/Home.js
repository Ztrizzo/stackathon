import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import SamplePage from './SamplePage';

/**
 * COMPONENT
 */
export const Home = props => {
  const [colors, setColors] = useState([]);
  const [whatStarsAreGold, setWhatStarsAreGold] = useState({});
  const [display, setDisplay] = useState('equal');
  const [lockedColors, setLockedColors] = useState([false, false, false]);
  
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

  const toggleLockColor = (colorIndex) => {
    const newLockedColers = lockedColors;
    newLockedColers[colorIndex] = !newLockedColers[colorIndex];
    setLockedColors([...newLockedColers]);
  }

  if(colors.length === 0)
    return null;

  console.log(lockedColors);
  return (
    <div className='home-container'>
      <h1>Machine Learning Color Palette</h1>
      <div className='box-container'>
        {colors.map((color, idx) => {
          return <div key={idx} className={`box ${display}-box box${idx}`} style={{backgroundColor: `rgb(${color.r}, ${color.b}, ${color.g})`}}>
              <button className='copy-button' onClick={() => copyToClipboard(idx)}>Copy rgb</button>
              <button className='lock-button' onClick={() => toggleLockColor(idx)}>{lockedColors[idx] ? 'Locked' : 'Unlocked'}</button>
            </div>
            
        })}
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
      <h3 className='sample-page-header'>Sample Page</h3>
      <SamplePage colors={colors}/>
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
