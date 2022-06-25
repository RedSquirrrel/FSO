interface Values {
  cm: number;
  kg: number;
}

export const parseArguments = (height: number, weight: number): Values => {
  if (process.argv.length < 2) throw new Error('Not enough arguments');
  if (process.argv.length > 4) throw new Error('Too manny arguments');


  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      cm: height,
      kg: weight
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const bmiCalculator = (cm: number, kg: number) => {
  const bmi = (kg / cm / cm) * 10000;
  const result = Math.floor(bmi * 100) / 100;


  if (result < 16) {
    console.log('Underweight (Severe thinness)');
    return 'Underweight (Severe thinness)';
  } else if (result < 16.9 && result > 16) {
    console.log('Underweight (Moderate thinness)');
    return 'Underweight (Moderate thinness)';
  } else if (result < 18.4 && result > 17) {
    console.log('Underweight (Mild thinness)');
    return 'Underweight (Mild thinness)';
  } else if (result < 24.9 && result > 18.5) {
    console.log('Normal (healty weight)');
    return 'Normal (healty weight)';
  } else if (result < 29.9 && result > 25) {
    console.log('Overweight (Pre-obese)');
    return 'Overweight (Pre-obese)';
  } else if (result < 34.9 && result > 30) {
    console.log('Obese (Class I)');
    return 'Obese (Class I)';
  } else if (result < 39.9 && result > 35) {
    console.log('Obese (Class II)');
    return 'Obese (Class II)';
  } else if (result > 40) {
    console.log('Obese (Class III)');
    return 'Obese (Class III)';
  }

  return result;
};

try {
  const { cm, kg } = parseArguments(Number(process.argv[2]), Number(process.argv[3]));
  bmiCalculator(cm, kg);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong! ';
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`;
  }
  console.log(errorMessage);
}
