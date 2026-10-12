import { Diagnosis } from "../../types";

interface Props {
  diagnosisCode: string;
  diagnosisList: Diagnosis[];
}

const DiagnosisInfo = ({diagnosisCode, diagnosisList} : Props) => {   
  const diagnosisDetails: Diagnosis | undefined = diagnosisList.find( diagnosis => diagnosis.code === diagnosisCode );
 
  if(diagnosisDetails)
     return (
      <li>{diagnosisDetails.code} {diagnosisDetails.name}</li>
     );
};

export default DiagnosisInfo;