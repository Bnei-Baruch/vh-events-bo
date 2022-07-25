import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function AddParticipant() {
  const { t } = useTranslation();
  const events = useSelector((state) => state.eventReducer.events);
  const [participationData, setParticipationData] = React.useState({
    event: "",
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card style={{ padding: "15px" }}>
          <Grid container>
            <Grid item xs={12}>
              <h1>Add Participant</h1>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  {t("Events.name")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="events"
                  value={participationData.event}
                  onChange={(e) => {
                    setParticipationData({
                      ...participationData,
                      event: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {events && events.map((event, index) => (
                    <MenuItem key={index} value={event.id}>
                      <em>{event.name}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
