import { Patient, AddEntryArgs } from "../../types";
import { Box, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Diagnosis } from "../../types";
import AddEntryForm from "./AddEntryForm";
import Entries from "./Entries";

  

type Props = {
  patient: Patient | null;
  diagnosis : Diagnosis[];
  addEntry: (args: AddEntryArgs) => void;
};

const PatientDetails = ({ patient, addEntry, diagnosis } : Props ) => {
  //useState entries, setEntries

  if (!patient) {
    return (
      <div>
        <Typography variant="body1" >Patient not found</Typography>
      </div>      
      );
    }
    return (
      <div>
        <Box sx={{my: 1}}>
          <Box sx={{display: 'flex', gap: '1', my: 0.5}}>
            
              <h3>{patient.name}</h3>
            
            { patient.gender === 'male' ? <MaleIcon fontSize="small" /> 
              : patient.gender === 'female' ? <FemaleIcon fontSize="small"/>
              : <TransgenderIcon fontSize="small" />
            }
          </Box>
          <Box sx={{my: 0.5}}>
            <Typography variant="body2" >
              ssn: {patient.ssn}
            </Typography>
            <Typography variant="body2" >
              occupation: {patient.occupation}
            </Typography>
            <Typography variant="body2" >
              date of birth: {patient.dateOfBirth}
            </Typography>            
          </Box>
        </Box>
        <AddEntryForm patient={patient} diagnosis={diagnosis} addEntry={addEntry}/>
        <div>
          <Entries 
            entries={patient.entries} 
          />
        </div>
      </div>
    );
};

export default PatientDetails;