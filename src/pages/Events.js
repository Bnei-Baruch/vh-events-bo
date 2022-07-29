import { Button, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { EVENTS_ROUTES } from "../routes/dashboardRoutes";
import AddIcon from "@mui/icons-material/Add";
import getEvents, { deleteEvent } from "../services/events.service";
const options = {
  selectableRows: "none",
  download: false,
  print: false,
  pagination: false,
  filter: false,
  search: false,
  responsive: "standard",
};
export default function Events() {
  const history = useHistory();
  const { t } = useTranslation();
  const [events, setEvents] = React.useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState(null);

  const navigateToParticipant = (eventId) => {
    history.push(EVENTS_ROUTES.EventsParticipants, { eventId: eventId });
  };

  const navigateToCreateEvent = () => {
    history.push(EVENTS_ROUTES.CreateEvents);
  };

  const editEvent = (eventId) => {
    const eventData = events.find((e) => e.id === eventId);
    history.push(EVENTS_ROUTES.ModifyEvents, { event: eventData });
  };

  const showDeleteConfirmation = (eventDetail) => {
    setDeleteConfirmation(true);
    setSelectedEventId(eventDetail);
  };

  const handleClose = () => {
    setDeleteConfirmation(false);
    setSelectedEventId(null);
  };

  const deleteEventItem = () => {
    deleteEvent(selectedEventId)
      .then(() => {
        setDeleteConfirmation(false);
        setSelectedEventId(null);
        getAllEvents();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      name: "starts_on",
      label: t("common.startDate"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => <>{moment(value).format("DD-MM-YYYY")} </>,
      },
    },
    {
      name: "ends_on",
      label: t("common.endDate"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => <>{moment(value).format("DD-MM-YYYY")} </>,
      },
    },
    {
      name: "name",
      label: t("common.name"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "slug",
      label: t("common.event_slug"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "registration_status",
      label: t("common.registration_status"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: t("common.participant"),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Button
              variant="outlined"
              size="small"
              style={{ borderRadius: "10rem", minWidth: "150px" }}
              onClick={() => navigateToParticipant(value)}
            >
              {t("Events.viewparticipants")}
            </Button>
          );
        },
      },
    },
    {
      name: "id",
      label: t("common.action"),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <div style={{ minWidth: "150px" }}>
              <Button
                variant="contained"
                size="small"
                style={{ borderRadius: "10rem" }}
                onClick={() => editEvent(value)}
              >
                {t("common.edit")}
              </Button>{" "}
              &nbsp;
              <Button
                variant="outlined"
                size="small"
                style={{ borderRadius: "10rem" }}
                onClick={() => showDeleteConfirmation(value)}
              >
                {t("common.delete")}
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const getAllEvents = () => {
    getEvents().then((res) => {
      if (res && res.length > 0) {
        setEvents(res.filter((res) => !res.deleted));
      }
    });
  };

  React.useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} style={{ textAlign: "end" }}>
        <Button
          onClick={navigateToCreateEvent}
          variant="contained"
          color="primary"
        >
          <AddIcon /> &nbsp; Create Event
        </Button>
      </Grid>
      <br />
      <br />
      <br />
      <Grid item xs={12}>
        <MUIDataTable data={events} options={options} columns={columns} />
      </Grid>
      <Dialog
        open={deleteConfirmation}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Events.delete_event_confirmation_title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("Events.delete_event_confirmation_message")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("common.disagree")}</Button>
          <Button
            onClick={deleteEventItem}
            autoFocus
            variant="contained"
            size="small"
          >
            {t("common.agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
