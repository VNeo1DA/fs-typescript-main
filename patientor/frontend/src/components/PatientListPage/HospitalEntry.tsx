import type { HospitalEntry } from "../../types";
import { Box, Typography } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const HospitalEntry = ({ entry } : {entry : HospitalEntry}) => {
    return (
      <div> 
        <Box sx={{my: 0.5, p: 0.5, border: '1px solid grey', borderRadius: 1}}>
          <Box sx={{display: 'flex', gap: '1'}}>
            <Typography variant="body2">        
              {entry.date} 
              <MedicalInformationIcon fontSize="small" />
            </Typography>
          </Box>
          <Typography variant="body2">        
            criteria: {entry.discharge.criteria}
          </Typography>
          <Typography variant="body2">        
            {entry.description}
          </Typography>
          <Typography variant="body2">
            diagnose by {entry.specialist}
          </Typography>
        </Box>
      </div>
    );
};

export default HospitalEntry;