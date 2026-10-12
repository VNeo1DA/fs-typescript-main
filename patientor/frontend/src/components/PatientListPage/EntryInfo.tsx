import type { Entry} from "../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryInfo = ({ entry } : { entry: Entry }) => {   

    switch(entry.type) {
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry}/>;
      case "Hospital":
        return <HospitalEntry entry={entry} />;

      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      default:
        return assertNever(entry);
  }

};

export default EntryInfo;