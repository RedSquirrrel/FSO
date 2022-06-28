import diagnosesData from '../../data/diagnoses';

import { DiagnosesEntry } from '../types';

const diagnoses: Array<DiagnosesEntry> = diagnosesData as Array<DiagnosesEntry>;

const getDiagnoses = (): Array<DiagnosesEntry> => {
    return diagnoses;
};

const addDiagnoses = () => {
    return null;
};

export default { getDiagnoses, addDiagnoses };