import { useState, SyntheticEvent } from "react";
import { NewEntry } from "../../types";
import { TextField, Grid, Button } from "@mui/material";

interface Props {
  onSubmit: (values: NewEntry) => void;
  entryType?: NewEntry["type"];
}

const AddEntryForm = ({ onSubmit, entryType }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  let entry: NewEntry;

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodes = diagnosisCode && diagnosisCode.split(", ");

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
    };

    switch (entryType) {
      case "HealthCheck":
        entry = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: Number(healthCheckRating),
        };
        break;
      case "Hospital":
        entry = {
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        entry = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }
              : undefined,
        };
        break;
      default:
        break;
    }

    onSubmit(entry);
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCode("");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
  };

  const cancelEntry = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCode("");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
  };

  return (
    <div>
      {entryType && (
        <div>
          <h3>New entry</h3>
          <form onSubmit={addEntry}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              label="Date"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            {entryType === "HealthCheck" && (
              <TextField
                label="Healthcheck rating"
                fullWidth
                value={healthCheckRating}
                onChange={({ target }) => setHealthCheckRating(target.value)}
              />
            )}
            {entryType === "Hospital" && (
              <div>
                <TextField
                  label="Discharge date"
                  fullWidth
                  value={dischargeDate}
                  onChange={({ target }) => setDischargeDate(target.value)}
                />
                <TextField
                  label="Discharge criteria"
                  fullWidth
                  value={dischargeCriteria}
                  onChange={({ target }) => setDischargeCriteria(target.value)}
                />
              </div>
            )}
            {entryType === "OccupationalHealthcare" && (
              <div>
                <TextField
                  label="Employer name"
                  fullWidth
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                />
                <TextField
                  label="Sick leave start date"
                  fullWidth
                  value={sickLeaveStart}
                  onChange={({ target }) => setSickLeaveStart(target.value)}
                />
                <TextField
                  label="Sick leave end date"
                  fullWidth
                  value={sickLeaveEnd}
                  onChange={({ target }) => setSickLeaveEnd(target.value)}
                />
              </div>
            )}
            <TextField
              label="Diagnosis codes"
              fullWidth
              value={diagnosisCode}
              onChange={({ target }) => setDiagnosisCode(target.value)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={() => cancelEntry()}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddEntryForm;
