import type { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../../types";
import { Box, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntry = ({ entry } : { entry: OccupationalHealthcareEntryType } ) => {
    return (
      <div> 
          <Box sx={{my: 0.5, p: 0.5, border: '1px solid grey', borderRadius: 1}}>
            <Box sx={{display: 'flex', gap: '1'}}>
              <Typography variant="body2">        
                {entry.date} 
                <WorkIcon fontSize="small" />
                {entry.employerName}
              </Typography>
            </Box>
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

export default OccupationalHealthcareEntry;