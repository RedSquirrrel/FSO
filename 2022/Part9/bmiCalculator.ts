interface Values {
  cm: number;
  kg: number;
}

// Formula [weight (kg) / height (cm) / height (cm)] x 10,000

const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too manny arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      cm: Number(args[2]),
      kg: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const bmiCalculator = (cm: number, kg: number) => {
  const bmi = (kg / cm / cm) * 10000;
  const result = Math.floor(bmi * 100) / 100;

  switch (true) {
    case result < 16:
      console.log('Underweight (Severe thinness)');
      break;
    case result < 16.9 && result > 16:
      console.log('Underweight (Moderate thinness)');
      break;
    case result < 18.4 && result > 17:
      console.log('Underweight (Mild thinness)');
      break;
    case result < 24.9 && result > 18.5:
      console.log('Normal (healty weight)');
      break;
    case result < 29.9 && result > 25:
      console.log('Overweight (Pre-obese)');
      break;
    case result < 34.9 && result > 30:
      console.log('Obese (Class I)');
      break;
    case result < 39.9 && result > 35:
      console.log('Obese (Class II)');
      break;
    case result > 40:
      console.log('Obese (Class III)');
  }
};

try {
  const { cm, kg } = parseArguments(process.argv);
  bmiCalculator(cm, kg);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong! ';
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`;
  }
  console.log(errorMessage);
}
