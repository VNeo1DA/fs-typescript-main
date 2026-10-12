import {  useState } from "react";
import type { 
Patient, 
AddEntryArgs, 
EntryWithoutId, 
EntryKey, 
Entry,
HealthCheckRating, 
Diagnosis 
} from "../../types.ts";
import { EntryTypes, HealthCheckRatingValues } from "../../types.ts";
import patientService from "../../services/patients.ts";
import { v4 as uuidv4 } from 'uuid';
import { 
Box, 
Typography, 
Button,
TextField, 
FormControl, 
InputLabel, 
Select, 
MenuItem, 
Grid, 
SelectChangeEvent,
OutlinedInput, 
ListItemText, 
Chip
} from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

interface Props {
  patient: Patient | null;
  diagnosis: Diagnosis[];
  addEntry: (args: AddEntryArgs) => void;
}


const AddEntryForm = ({ patient, diagnosis ,addEntry }: Props ) => {
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [type, setType] = useState<EntryKey>("HEALTHCHECK");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState<string>("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [selectedHealthRating, setSelectedHealthRating] = useState<HealthCheckRating>(HealthCheckRatingValues.Healthy);
  const [sickLeaveStartDate, setSLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSLeaveEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");
  const [employerName, setEmployerName] = useState("");


  const handleDisplayForm = (): void => {
    setDisplayForm((prevDispVal) => !prevDispVal);
  };

  const resetFields = (): void => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setSLeaveStartDate("");
    setSLeaveEndDate("");
    setEmployerName("");
    setDischargeDate("");
    setCriteria("");
    setSelectedCodes([]);
    setSelectedHealthRating(HealthCheckRatingValues.Healthy);  
    setErrorMessage(null); 
  };

  const handleTypeChange = (event: SelectChangeEvent<EntryKey>) => {
    setType(event.target.value as EntryKey);
    resetFields();
  };

  const handleCodesChange = (event: SelectChangeEvent<typeof selectedCodes>) => {
    const {
      target: { value },
    } = event;
    
    setSelectedCodes(
      typeof value === 'string' ? value.split(',') : value,
    );   
  };
 
  const handleRatingChange = (event: SelectChangeEvent<HealthCheckRating>) => {
    setSelectedHealthRating(event.target.value as HealthCheckRating);
  };

  const addNewEntry = async (event: React.SyntheticEvent) => {    
    event.preventDefault();
    setErrorMessage(null);   

    if(!patient)
        return;

    try {   
      let newEntry: EntryWithoutId | null = null;
      
      switch(EntryTypes[type]) {
        case "OccupationalHealthcare":
          newEntry = { 
            type: EntryTypes[type], 
            date,
            specialist, 
            description, 
            diagnosisCodes: selectedCodes,
            employerName,
            sickLeave: {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate 
          }
        };
        break;
        case "Hospital":
          newEntry = { 
            type: EntryTypes[type], 
            date,
            specialist, 
            description, 
            diagnosisCodes: selectedCodes,
            discharge: {
              date: dischargeDate,
              criteria: criteria
            }
          };
        break;
        case "HealthCheck":
          newEntry = { 
            type: EntryTypes[type], 
            date,
            specialist, 
            description, 
            diagnosisCodes: selectedCodes,
            healthCheckRating:  selectedHealthRating
        };
        break;
          default:
          newEntry= null;
      }

      if (newEntry === null) {
          return;
      }
      const entryData = await patientService.createEntry({ id: patient.id, newEntry });
      const createdEntry =
        entryData && typeof entryData === "object" && "type" in entryData
          ? (entryData as Entry)
          : {
              id: uuidv4(),
              ...newEntry,
            };

      addEntry({ id: patient.id, newEntry: createdEntry });
      resetFields(); 
      setDisplayForm((prevDispVal) => !prevDispVal);
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(errMessage);
    } 
  };

  const handleCancel = (): void => {
    resetFields();
    setDisplayForm((prevDispVal) => !prevDispVal);
  };

  
  return ( 
    <div>
      <Box>
        <div>
          {!displayForm && (
            <Box sx={{my: 2}}> 
              <Button variant="contained" onClick={handleDisplayForm}>
                ADD NEW ENTRY
              </Button>
            </Box >
          )}
          {displayForm === true && ( 
            <Box 
              component="form" 
              onSubmit={addNewEntry}
              sx={{my: 2, p: 1.1, border: '1.5px dotted grey', borderRadius: 1}}
            >
              <FormControl fullWidth sx={{py: 0.5}} >
                <InputLabel >Select type: </InputLabel>
                <Select<EntryKey> 
                  value={type}
                  label="Type" 
                  size="small"
                  onChange={handleTypeChange}
                >
                  {Object.entries(EntryTypes).map(([key, label]) => (
                    <MenuItem key={key} value={key}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>  
              {errorMessage && 
                <Typography variant="body2" color="error" >
                  <ReportGmailerrorredIcon /> 
                  {errorMessage}
                </Typography>
              }          
              <TextField 
                margin="normal" 
                slotProps={{ inputLabel: { shrink: true }}}
                fullWidth 
                type="date" 
                size="small"
                variant="outlined"
                label="Date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
              <TextField 
                margin="normal" 
                slotProps={{ inputLabel: { shrink: true }}}
                fullWidth 
                size="small"
                variant="outlined"
                label="Description"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              />
              <TextField 
                margin="normal" 
                slotProps={{ inputLabel: { shrink: true }}}
                fullWidth 
                size="small"
                variant="outlined"
                label="Specialist"
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Diagnosis Codes</InputLabel>
                <Select
                  multiple
                  value={selectedCodes}
                  onChange={handleCodesChange}
                  input={<OutlinedInput label="Diagnosis Codes" />}
                  size="small" 
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                {diagnosis.map((d, index) => (
                  <MenuItem key={index} value={d.code}>
                    <ListItemText primary={`${d.code} - ${d.name}`} />
                  </MenuItem>
                ))}
                </Select>
              </FormControl>
   
              {type === "HEALTHCHECK" && (
                <FormControl fullWidth margin="normal" >
                  <InputLabel>Health Check Rating: </InputLabel>
                  <Select<HealthCheckRating> 
                    value={selectedHealthRating}
                    label="Health Check Rating" 
                    size="small"
                    onChange={handleRatingChange}
                  >
                  {Object.entries(HealthCheckRatingValues).map(([key, rating]) => (
                    <MenuItem key={key} value={rating}>{`${key} - ${rating}`}</MenuItem>
                  ))}
                  </Select>
                </FormControl> 
              )}
        
              {type === "OCCUPATIONAL" && (
                <Box>
                  <TextField 
                    margin="normal" 
                    slotProps={{ inputLabel: { shrink: true }}}
                    fullWidth 
                    type="date"
                    size="small"
                    variant="outlined"
                    label="SickLeave Start" 
                    value={sickLeaveStartDate}
                    onChange={({ target }) => setSLeaveStartDate(target.value)}
                  />
                  <TextField 
                    margin="normal" 
                    slotProps={{ inputLabel: { shrink: true }}}
                    fullWidth 
                    type="date" 
                    size="small" 
                    variant="outlined"
                    label="SickLeave End" 
                    value={sickLeaveEndDate}
                    onChange={({ target }) => setSLeaveEndDate(target.value)}
                  />
                  <TextField 
                    margin="normal" 
                    slotProps={{ inputLabel: { shrink: true }}}
                    fullWidth 
                    size="small"
                    variant="outlined"
                    label="Employer Name"           
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                  />
                </Box>
              )}

              {type === "HOSPITAL" && (
                <Box>
                  <TextField 
                    margin="normal" 
                    slotProps={{ inputLabel: { shrink: true }}}
                    fullWidth 
                    type="date" 
                    size="small"
                    variant="outlined"
                    label="Discharge" 
                    value={dischargeDate}
                    onChange={({ target }) => setDischargeDate(target.value)}
                  />
                  <TextField 
                    margin="normal" 
                    slotProps={{ inputLabel: { shrink: true }}}
                    fullWidth 
                    size="small"
                    variant="outlined" 
                    label="Criteria"
                    value={criteria}
                    onChange={({ target }) => setCriteria(target.value)}
                  /> 
                </Box>
              )}
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid size="auto">
                  <Button type="submit" variant="contained">
                    Add
                  </Button>
                </Grid>
                <Grid size="auto">
                  <Button variant="outlined" type="button" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>        
            </Box> 
          )} 
        </div>
      </Box>
    </div>
  );
};

export default AddEntryForm;