import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

export default function EventsAnalytics() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={6}>
      <Grid container item xs={12}>
        <Grid item xs={12} md={9}></Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              {t("Events.name")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container item={12} spacing={6}>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ minHeight: "200px" }}>
            Stats 1
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ minHeight: "200px" }}>
            Stats 1
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ minHeight: "200px" }}>
            Stats 1
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ minHeight: "200px" }}>
            Stats 1
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ minHeight: "200px" }}>
            Stats 1
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ minHeight: "200px" }}>
            Stats 1
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ minHeight: "200px" }}>
            Stats 1
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
