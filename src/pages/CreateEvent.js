import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { createEvent } from '../services/events.service';
export default function CreateEvent() {
  const { t } = useTranslation();
  const history = useHistory();
  const [eventStartDate, setEventStartDate] = React.useState(new Date());
  const [eventEndDate, setEndDate] = React.useState(new Date());

  const submit = (event) => {
    event.preventDefault();
    const body = {
      name: event.target.name.value,
      slug: event.target.slug.value,
      starts_on: eventStartDate.toISOString(),
      ends_on: eventEndDate.toISOString()
    }
    createEvent(body).then(res => {
      history.goBack();
    })
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card style={{ padding: "15px" }}>
        <form onSubmit={(e) => submit(e)}>
          <CardHeader title={t('CreateEvent.name')}></CardHeader>
          <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t('CreateEvent.eventName')}
                    name="name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t('CreateEvent.eventSlug')}
                    name="slug"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label={t('CreateEvent.startDate')}
                    name="starts_on"
                    value={eventStartDate}
                    minDate={new Date('2017-01-01')}
                    onChange={(date) => setEventStartDate(date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label={t('CreateEvent.endDate')}
                    onChange={(date) => setEndDate(date)}
                    name="ends_on"
                    value={eventEndDate}
                    minDate={new Date('2017-01-01')}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    required
                  />
                </Grid>
              </Grid>
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" type="submit">
              {t('CreateEvent.create')}
            </Button>
            <Button variant="contained">{t('CreateEvent.discard')}</Button>
          </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
