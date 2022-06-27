import express from 'express';
const app = express();

app.use(express.json())

import { parseArguments, bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res): any => {

  const height: any = req.query.height;
  const weight: any = req.query.weight;

  if (!height || !weight) {
    return res.json({ error: 'malformated parameters' })
  }

  const { cm, kg } = parseArguments(height, weight);

  const bmi = bmiCalculator(cm, kg);

  const result = { weight, height, bmi }
  res.send(result);
});

app.post('/exercises', (req, res): any => {
  const { daily_exercises, target } = req.body

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'Parameters missing' })
  }

  const isAllNumber = daily_exercises.every((val: any) => {
    return typeof val === 'number'
  })

  if (!isAllNumber || (typeof target !== 'number')) {
    return res.status(400).json({ error: 'Malformated parameters' })
  }

  const result = calculateExercises(daily_exercises, Number(target))

  res.send(result)
})


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
