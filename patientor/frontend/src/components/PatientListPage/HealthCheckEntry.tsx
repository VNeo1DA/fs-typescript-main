import type { HealthCheckEntry as HealthCheckEntryType } from "../../types";
import { Box, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntry = ({ entry } : {entry: HealthCheckEntryType }) => {
 const healthRatingColor = entry.healthCheckRating === 0 ? 'success.main'
                          : entry.healthCheckRating === 1 ? 'warning.main'
                          : entry.healthCheckRating === 2 ? 'error.light'
                          : 'error.dark';

    return (
      <div>
        <Box sx={{my: 0.5, p: 0.5, border: '1px solid grey', borderRadius: 1}}>
          <Box sx={{display: 'flex', gap: '1'}}>
            <Typography variant="body2">        
              {entry.date} 
              <MedicalServicesIcon fontSize="small" />
            </Typography>
          </Box>
          <Typography variant="body2">        
            {entry.description}
          </Typography>
          <Typography variant="body2">        
            <FavoriteIcon fontSize="small" sx={{color:`${healthRatingColor}`}}/>
          </Typography>
          <Typography variant="body2">
            diagnose by {entry.specialist}
          </Typography>
       </Box>
      </div>
    );
};

export default HealthCheckEntry;