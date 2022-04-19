import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import PeopleIcon from '@material-ui/icons/People';
import getEvents, { getEventsAnalytics } from "../services/events.service";

export default function EventsAnalytics() {
  const [events, setEvents] = React.useState([]);
  const [analytics, setAnalytics] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(undefined);
  const { t } = useTranslation();
  React.useEffect(() => {
    getEvents().then((res) => {
      setEvents(res);
    });
    getAnalytics();
  }, []);

  const getAnalytics = (eventId) => {
    getEventsAnalytics(eventId).then((res) => {
      console.log(res)
      setAnalytics(res)
    })
  }
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
              label="event"
              value={selectedEvent}
              onChange={(e) => {
                getAnalytics(e.target.value);
                setSelectedEvent(e.target.value);
              }}
            >
              {events.map((event) => (
                <MenuItem value={event.id}>
                  <em>{event.name}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {analytics && <Grid container item={12} spacing={6}>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} style={{ padding: '20px', borderRadius: '5px' }}>
            <Grid container spacing={6}>
              <Grid item xs={4} style={{ textAlign: 'center', border: '1px solid rgb(102 100 100)', borderRadius: '15px' }}><PeopleIcon style={{ height: '50px', fontSize: '40px', color: 'rgb(102 100 100)' }} /></Grid>
              <Grid item xs={8} ><Typography variant="h6">Total Participants</Typography>
                <Typography variant="h4">{analytics.total_participant}</Typography></Grid>
            </Grid>
          </Paper>
        </Grid>
        {analytics && analytics.part_option_details.map((part) => (
          <Grid item xs={12} md={3}>
            <Paper elevation={2} style={{ padding: '20px', borderRadius: '5px' }}>
              <Grid container spacing={6}>
                <Grid item xs={4} style={{ textAlign: 'center', border: '1px solid rgb(102 100 100)', borderRadius: '15px' }}><PeopleIcon style={{ height: '50px', fontSize: '40px', color: 'rgb(102 100 100)' }} /></Grid>
                <Grid item xs={8} >
                  {part.participation_option === 'regular' && <Typography variant="h6">{t('Search.regular')}</Typography>}
                  {part.participation_option === 'sp-ukraine' && <Typography variant="h6">{t('Search.ukraine')}</Typography>}
                  {part.participation_option === 'sp-russia' && <Typography variant="h6">{t('Search.russia')}</Typography>}
                  {part.participation_option === 'hh-request' && <Typography variant="h6">{t('Search.helphaver')}</Typography>}
                  {part.participation_option !== 'regular' && 
                  part.participation_option !== 'sp-ukraine' && 
                  part.participation_option !== 'sp-russia' && 
                  part.participation_option !== 'hh-request' && <Typography variant="h6">{part.participation_option}</Typography>}
                  <Typography variant="h4">{part.count}</Typography></Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>}
    </Grid>
  );
}
