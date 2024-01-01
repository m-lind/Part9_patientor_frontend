import { Patient, Gender, Diagnosis } from "./../../types";
import { useMatch } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { useState, useEffect } from "react";
import patientService from "./../../services/patients";
import diagnosisService from "./../../services/diagnoses";

const PatientInformationPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAllSensitive();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosisList();
  }, []);

  const diagnosisCodeToName: Record<string, string> = {};
  diagnoses.map(diagnosis => {
    diagnosisCodeToName[diagnosis.code] = diagnosis.name;
  });

  const match = useMatch("/patients/:id");

  const patient = match
    ? patients.find(patient => patient.id === match.params.id)
    : null;

  if (patient) {
    return (
      <div>
        <h1>
          {patient.name}
          {patient.gender === Gender.Male && <MaleIcon fontSize="large" />}
          {patient.gender === Gender.Female && <FemaleIcon fontSize="large" />}
        </h1>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h2>entries</h2>
        <div>
          {patient.entries.map(entry => {
            return (
              <div key={entry.id}>
                {entry.date} {entry.description}
                <p></p>
                {entry.diagnosisCodes?.map(code => {
                  return (
                    <li key={code}>
                      {code} {diagnosisCodeToName[code]}
                    </li>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default PatientInformationPage;
