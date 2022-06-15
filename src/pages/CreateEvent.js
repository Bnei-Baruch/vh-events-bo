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
import { createEvent, editEvent } from '../services/events.service';
export default function CreateEvent(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [eventData, setEventData] = React.useState({
    eventStartDate: new Date(),
    eventEndDate: new Date()
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const submit = (event) => {
    event.preventDefault();
    const body = {
      name: eventData.name,
      slug: eventData.slug,
      starts_on: eventData.eventStartDate.toISOString(),
      ends_on: eventData.eventEndDate.toISOString()
    }
    if (isEdit) {
      const { id } = eventData;
      editEvent(id, body).then(() => {
        history.goBack();
      })
    } else {
      createEvent(body).then(res => {
        history.goBack();
      })
    }
  }

  const setData = (key, value) => {
    setEventData({ ...eventData, [key]: value });
  }

  React.useEffect(() => {
    if (props && props.location && props.location.state) {
      const { event } = props && props.location && props.location.state;
      setIsEdit(true);
      setEventData({
        id: event.id,
        name: event.name,
        slug: event.slug,
        eventStartDate: new Date(event.starts_on),
        eventEndDate: new Date(event.ends_on)
      })
    }
  // eslint-disable-next-line
  }, [])
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card style={{ padding: "15px" }}>
          <form onSubmit={(e) => submit(e)}>
            <CardHeader title={!isEdit ? t('CreateEvent.name') : t('CreateEvent.edit')}></CardHeader>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t('CreateEvent.eventName')}
                    name="name"
                    value={eventData.name}
                    onChange={(e) => setData('name', e.target.value)}
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
                    value={eventData.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label={t('CreateEvent.startDate')}
                    name="starts_on"
                    value={eventData.eventStartDate}
                    minDate={new Date('2017-01-01')}
                    onChange={(date) => setData('eventStartDate', date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label={t('CreateEvent.endDate')}
                    name="ends_on"
                    value={eventData.eventEndDate}
                    onChange={(date) => setData('eventEndDate', date)}
                    minDate={new Date('2017-01-01')}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button variant="contained" color="primary" type="submit">
                {!isEdit ? t('CreateEvent.create') : t('CreateEvent.edit')}
              </Button>
              <Button variant="contained" style={{backgroundColor : '#cdcdcd', color: '#777'}}>{t('CreateEvent.discard')}</Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
