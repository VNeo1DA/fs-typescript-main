import { Entry} from "../../types";
import EntryInfo from "./EntryInfo";
import { Box, Typography } from "@mui/material";

interface Props {
  entries : Entry[];
}

const Entries = ({ entries } : Props ) => {
  return (
    <div>
        <Box >
          {entries.length > 0 && (
            <Typography variant="body2" ><strong>entries</strong> </Typography>
          )}
          <div>
            {entries?.map((entry, index) => (
                <EntryInfo key={index} entry={ entry }/>
            ))}
          </div>
        </Box>
    </div>
  );
};

export default Entries;