import { useState, useEffect } from "react";
import axios from "axios";
import {  Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { apiBaseUrl } from "./constants";
import { Patient, AddEntryArgs, Diagnosis } from "./types";
import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientListPage/PatientDetails";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnosisList = await diagnosisService.getAll();
      setDiagnosis(diagnosisList);
    };
    void fetchDiagnosisList();

  }, []);

  
  const addPatientEntry = ( {id ,newEntry} : AddEntryArgs) => {     
    const newPatients = patients.map( patient => {
      if(patient.id === id){
        return { 
          ...patient,
          entries: [
            ...patient.entries,
            newEntry
          ]
        };
        
      } else {       
        return patient;
      }
    }); 
    setPatients(newPatients);
  };

  const match = useMatch('/patients/:id');
  const patient: Patient | null = match
  ? patients.find((p) => p.id === match.params.id) ?? null
  : null;
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route 
              path="/" 
              element={<PatientListPage patients={patients} 
              setPatients={setPatients} />} 
            />
            <Route 
              path="/patients/:id" 
              element={<PatientDetails 
                patient={patient} 
                addEntry={addPatientEntry} 
                diagnosis={diagnosis}
              />} 
            />
          </Routes>
        </Container>

    </div>
  );
};

export default App;
