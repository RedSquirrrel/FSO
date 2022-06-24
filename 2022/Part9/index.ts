import express from 'express';
const app = express();

import { parseArguments, bmiCalculator } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res):any => {

  const height:any = req.query.height;
  const weight:any = req.query.weight;

  if(!height || ! weight){
   return res.json({error: 'malformated parameters'})
  }

  const {cm, kg } = parseArguments(height, weight);

  const bmi = bmiCalculator(cm, kg);

  const result = { weight,height,bmi }
  res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
