type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

interface ExerciseValues {
  target: number;
  dailyExerciseHours: number[];
}

const parseArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 5) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      dailyExerciseHours: args.slice(3).map(h => Number(h)),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
  let numberOfDays: number = dailyExerciseHours.length;
  let numberOfTrainingDays: number[] = dailyExerciseHours.filter(el => el);
  const sum = numberOfTrainingDays.reduce((acc, el) => acc + el, 0);
  let averageTime: number = sum / dailyExerciseHours.length;
  let ifSuccess: boolean = averageTime >= target;
  let ratingNumber: number = 0;
  let ratingDescription: string = '';

  if (target === 1) {
    ratingNumber = 0;
    ratingDescription = 'You should work more';
  } else if (target === 2) {
    ratingNumber = 2;
    ratingDescription = 'Not too bad but could be better';
  } else if (target === 2.5) {
    ratingNumber = 1;
    ratingDescription = 'Bad';
  } else if (target === 3) {
    ratingNumber = 3;
    ratingDescription = 'Excellent';
  }

  const obj = {
    periodLength: numberOfDays,
    trainingDays: numberOfTrainingDays.length,
    success: ifSuccess,
    rating: ratingNumber,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTime,
  };

  console.log(obj);
  return obj;
};

try {
  const { target, dailyExerciseHours } = parseArgs(process.argv);
  calculateExercises(dailyExerciseHours, target);
} catch (error: unknown) {
  let errmsg = 'Somenthing went wrong! ';
  if (error instanceof Error) {
    errmsg += `Error: ${error.message}`;
  }
  console.log(errmsg);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
// console.log(calculateExercises([1, 0, 2, 4.5, 0, 3, 1, 0, 4], 2));
