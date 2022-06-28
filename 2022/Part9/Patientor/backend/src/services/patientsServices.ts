import patientsData from '../../data/patients';

import { PatientsEntry } from '../types';
import { NoneSensitivePatientEntry } from '../types';

const patients: Array<PatientsEntry> = patientsData as Array<PatientsEntry>;

const getPatients = (): Array<PatientsEntry> => {
    return patients;
};

const getNoneSensitiveEntries = (): NoneSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

export default { getPatients, getNoneSensitiveEntries };