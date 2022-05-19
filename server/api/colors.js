const router = require('express').Router()
module.exports = router;
const brain = require('brain.js');
const trainingData = [];

router.get('/', async(req, res, next) => {
  try{
    res.send(generateRandomColors());
  }
  catch(error){
    next(error);
  }
})

router.post('/', async(req, res, next) => {
  try{

    const { rating } = req.body;
    const colors = req.body.colors
    trainingData.push({
      input: [
        Math.round(colors[0].r / 2.55) / 100,
        Math.round(colors[0].g / 2.55) / 100,
        Math.round(colors[0].b / 2.55) / 100,
        Math.round(colors[1].r / 2.55) / 100,
        Math.round(colors[1].g / 2.55) / 100,
        Math.round(colors[1].b / 2.55) / 100,
        Math.round(colors[2].r / 2.55) / 100,
        Math.round(colors[2].g / 2.55) / 100,
        Math.round(colors[2].b / 2.55) / 100,
      ],
      output: [rating / 4]
    })

    res.send(predictColors());
    console.log(trainingData);

  }
  catch(error){
    next(error);
  }
})

const predictColors = () => {
  const net = new brain.NeuralNetwork({activation: 'leaky-relu'});
  const results = [];
  net.train(trainingData/*, { log: stats => console.log(stats)}*/);

  for(let i = 0; i < 100000; i++){
    let colors = generateRandomColors();

    const normalizedColors = [
      Math.round(colors[0].r / 2.55) / 100,
      Math.round(colors[0].g / 2.55) / 100,
      Math.round(colors[0].b / 2.55) / 100,
      Math.round(colors[1].r / 2.55) / 100,
      Math.round(colors[1].g / 2.55) / 100,
      Math.round(colors[1].b / 2.55) / 100,
      Math.round(colors[2].r / 2.55) / 100,
      Math.round(colors[2].g / 2.55) / 100,
      Math.round(colors[2].b / 2.55) / 100,
    ]
    const [ score ] = net.run(normalizedColors);
    results.push({colors: [colors[0], colors[1], colors[2]], score})
  };

  const sortedResults = results.sort((a, b) => {
    a = a.score;
    b = b.score;

    return b - a;
  })

  return sortedResults[0];


}


const generateRandomColors = () => {
  const colors = [];
  for( let i = 0; i < 3; i++){
    colors.push(getRandomRGB());
  }
  return colors;
}

const getRandomRGB = () => {
  return {
    r: Math.round(Math.random() * 255),
    g: Math.round(Math.random() * 255),
    b: Math.round(Math.random() * 255)
  }
}