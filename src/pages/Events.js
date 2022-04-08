import { Button, Grid } from "@material-ui/core";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { EVENTS_ROUTES } from "../routes/dashboardRoutes";
import getEvents from "../services/events.service";
const options = {
  selectableRows: false,
  download: false,
  print: false,
  pagination: false,
  responsive: "scroll",
};
export default function Events() {
  const history = useHistory();
  const [events, setEvents] = React.useState([]);
  const { t } = useTranslation();
  const navigate = (eventId) => {
    history.push(EVENTS_ROUTES.EventsParticipants, { eventId : eventId})
  }
  const columns = [
    {
      name: "starts_on",
      label: t("common.startDate"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <>{moment(value).format("DD-MM-YYYY HH:MM:SS")} </>
        ),
      },
    },
    {
      name: "ends_on",
      label: t("common.endDate"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <>{moment(value).format("DD-MM-YYYY HH:MM:SS")} </>
        ),
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
      label: t("common.action"),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Button variant="outlined" size="small" style={{ borderRadius: '10rem' }} onClick={() => navigate(value)}>
              {t('Events.viewparticipants')}
            </Button>
          )
        },
      },
    },
  ];

  React.useEffect(() => {
    getEvents().then((res) => {
      setEvents(res);
    });
  }, []);
  return (
    <Grid container spacing={6}>
      <Grid xs={12}>
        <MUIDataTable data={events} options={options} columns={columns} />
      </Grid>
    </Grid>
  );
}
