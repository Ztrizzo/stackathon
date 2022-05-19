import React from "react";


const SamplePage = (props) => {

  let [main, secondary, highlight] = props.colors;
  main = `rgb(${main.r}, ${main.b}, ${main.g})`;
  secondary = `rgb(${secondary.r}, ${secondary.b}, ${secondary.g})`;
  highlight = `rgb(${highlight.r}, ${highlight.b}, ${highlight.g})`

  return <div className="sample-page-container" style={{backgroundColor:main}}>
    <h3>Log In</h3>
    <input placeholder="Log In"></input>
    <input placeholder="Password"></input>
    <button style={{backgroundColor:highlight}}>Submit</button>
    <h5>Or</h5>
    <button style={{backgroundColor:secondary}}>Continue with Google</button>
    <button style={{backgroundColor:secondary}}>Continue with Facebook</button>
  </div>

}

export default SamplePage;