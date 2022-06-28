export type Code =
    "M24.2" |
    "M51.2" |
    "S03.5" |
    "J10.1" |
    "J06.9" |
    "Z57.1" |
    "N30.0" |
    "H54.7" |
    "J03.0" |
    "L60.1" |
    "Z74.3" |
    "L20" |
    "F43.2" |
    "S62.5" |
    "H35.29" |
    "J12.82";

export type Name = "Disorder of ligament" |
    "Other specified intervertebral disc displacement" |
    "Sprain and strain of joints and ligaments of other and unspecified parts of head" |
    "Influenza with other respiratory manifestations, other influenza virus codeentified" |
    "Acute upper respiratory infection, unspecified" |
    "Occupational exposure to radiation" |
    "Acute cystitis" |
    "Unspecified visual loss" |
    "Streptococcal tonsillitis" |
    "Onycholysis" |
    "Need for continuous supervision" |
    "Atopic dermatitis" |
    "Adjustment disorders" |
    "Fracture of thumb" |
    "Other proliferative retinopathy" |
    "Pneumonia due to coronavirus disease";


export interface DiagnosesEntry {
    code: Code;
    name: Name;
    latin?: string;
}

// TYPE PATIENTS

export type PatientName =
    "John McClane" |
    "Martin Riggs" |
    "Hans Gruber" |
    "Dana Scully" |
    "Matti Luukkainen";

export type Ocupation =
    "New york city cop" |
    "Cop" |
    "Technician" |
    "Forensic Pathologist" |
    "Digital evangelist";

export interface PatientsEntry {
    id: string;
    name: PatientName;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: Ocupation
}

export type NoneSensitivePatientEntry = Omit<PatientsEntry, 'ssn'>


