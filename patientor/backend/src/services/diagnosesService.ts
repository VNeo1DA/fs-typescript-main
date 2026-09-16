import diagnosesInfo from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getDiagnosesInfo = ():Diagnosis[]  => {
  return diagnosesInfo;
};

const addDiagnosesInfo = () => {
  return null;
};

export default {
  getDiagnosesInfo,
  addDiagnosesInfo
};