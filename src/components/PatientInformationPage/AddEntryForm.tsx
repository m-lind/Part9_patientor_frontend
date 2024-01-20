import { useState, SyntheticEvent } from "react";
import { NewEntry } from "../../types";
import { TextField, Grid, Button } from "@mui/material";

interface Props {
  onSubmit: (values: NewEntry) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCode, setDiagnosisCode] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodes = diagnosisCode && diagnosisCode.split(", ");

    onSubmit({
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      type: "HealthCheck",
      diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
    });
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCode("");
  };

  const cancelEntry = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCode("");
  };

  return (
    <div>
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
        <TextField
          label="Healthcheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
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
  );
};

export default AddEntryForm;
