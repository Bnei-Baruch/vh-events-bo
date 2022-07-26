import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { createEvent, editEvent } from "../services/events.service";
export default function CreateEvent(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [eventData, setEventData] = React.useState({
    eventStartDate: new Date(),
    eventEndDate: new Date(),
    date_confirmed: true,
    registration_status: true,
    published: true,
    content: {
      en: {
        title: "",
        description: "",
      },
      ru: {
        title: "",
        description: "",
      },
      he: {
        title: "",
        description: "",
      },
      es: {
        title: "",
        description: "",
      },
    },
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const submit = (event) => {
    event.preventDefault();
    const body = {
      name: eventData.name,
      slug: eventData.slug,
      starts_on: eventData.eventStartDate.toISOString(),
      ends_on: eventData.eventEndDate.toISOString(),
      date_confirmed: eventData.date_confirmed,
      registration_status: eventData.registration_open ? "open" : "closed",
      event_published: eventData.event_published,
      content: JSON.stringify(eventData.content),
    };
    if (isEdit) {
      const { id } = eventData;
      editEvent(id, body).then(() => {
        history.goBack();
      });
    } else {
      createEvent(body).then((res) => {
        history.goBack();
      });
    }
  };

  const setData = (key, value) => {
    setEventData({ ...eventData, [key]: value });
  };

  const setContentData = (key, lang, value) => {
    let content = { ...eventData.content };
    content[lang] = { ...content[lang], [key]: value };
    setEventData({
      ...eventData,
      content: content,
    });
  };

  React.useEffect(() => {
    if (props && props.location && props.location.state) {
      const { event } = props && props.location && props.location.state;
      console.log(event);
      setIsEdit(true);
      setEventData({
        id: event.id,
        name: event.name,
        slug: event.slug,
        eventStartDate: new Date(event.starts_on),
        eventEndDate: new Date(event.ends_on),
        date_confirmed:
          event.date_confirmed !== undefined ? event.date_confirmed : true,
        registration_status:
          event.registration_status !== undefined &&
          event.registration_status === "open"
            ? true
            : false,
        published:
          event.event_published !== undefined ? event.event_published : true,
        content: event.content
          ? event.content
          : {
              en: {
                title: "",
                description: "",
              },
              ru: {
                title: "",
                description: "",
              },
              he: {
                title: "",
                description: "",
              },
              es: {
                title: "",
                description: "",
              },
            },
      });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card style={{ padding: "15px" }}>
          <form onSubmit={(e) => submit(e)}>
            <CardHeader
              title={!isEdit ? t("CreateEvent.name") : t("CreateEvent.edit")}
            ></CardHeader>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.eventName")}
                    name="name"
                    value={eventData.name}
                    onChange={(e) => setData("name", e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.eventSlug")}
                    name="slug"
                    value={eventData.slug}
                    onChange={(e) => setData("slug", e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label={t("CreateEvent.startDate")}
                    name="starts_on"
                    value={eventData.eventStartDate}
                    minDate={new Date("2017-01-01")}
                    onChange={(date) => setData("eventStartDate", date)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label={t("CreateEvent.endDate")}
                    name="ends_on"
                    value={eventData.eventEndDate}
                    onChange={(date) => setData("eventEndDate", date)}
                    minDate={new Date("2017-01-01")}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                    required
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "15px" }}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked
                        value={eventData.date_confirmed}
                        onChange={() =>
                          setData("date_confirmed", !eventData.date_confirmed)
                        }
                      />
                    }
                    label={t("CreateEvent.confirmedDate")}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "15px" }}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked
                        value={eventData.registration_open}
                        onChange={() =>
                          setData(
                            "registration_open",
                            !eventData.registration_open
                          )
                        }
                      />
                    }
                    label={t("CreateEvent.registrationOpen")}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "15px" }}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked
                        value={eventData.event_published}
                        onChange={() =>
                          setData("event_published", !eventData.event_published)
                        }
                      />
                    }
                    label={t("CreateEvent.eventPublished")}
                  />
                </FormGroup>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={12}
                spacing={2}
                style={{ marginTop: "15px" }}
              >
                <Grid item xs={12}>
                  <Typography variant="h4">
                    {t("CreateEvent.english")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.title")}
                    name="name"
                    value={eventData.content.en.title}
                    onChange={(e) =>
                      setContentData("title", "en", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.description")}
                    name="name"
                    value={eventData.content.en.description}
                    onChange={(e) =>
                      setContentData("description", "en", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={12}
                spacing={2}
                style={{ marginTop: "15px" }}
              >
                <Grid item xs={12}>
                  <Typography variant="h4">
                    {t("CreateEvent.hebrew")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.title")}
                    name="name"
                    value={eventData.content.he.title}
                    onChange={(e) =>
                      setContentData("title", "he", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.description")}
                    name="name"
                    value={eventData.content.he.description}
                    onChange={(e) =>
                      setContentData("description", "he", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={12}
                spacing={2}
                style={{ marginTop: "15px" }}
              >
                <Grid item xs={12}>
                  <Typography variant="h4">
                    {t("CreateEvent.russian")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.title")}
                    name="name"
                    value={eventData.content.ru.title}
                    onChange={(e) =>
                      setContentData("title", "ru", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.description")}
                    name="name"
                    value={eventData.content.ru.description}
                    onChange={(e) =>
                      setContentData("description", "ru", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={12}
                spacing={2}
                style={{ marginTop: "15px" }}
              >
                <Grid item xs={12}>
                  <Typography variant="h4">
                    {t("CreateEvent.spanish")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.title")}
                    name="name"
                    value={eventData.content.es.title}
                    onChange={(e) =>
                      setContentData("title", "es", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label={t("CreateEvent.description")}
                    name="name"
                    value={eventData.content.es.description}
                    onChange={(e) =>
                      setContentData("description", "es", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button variant="contained" color="primary" type="submit">
                {!isEdit ? t("CreateEvent.create") : t("CreateEvent.edit")}
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#cdcdcd", color: "#777" }}
              >
                {t("CreateEvent.discard")}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
