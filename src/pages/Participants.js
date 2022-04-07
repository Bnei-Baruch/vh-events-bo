import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useTranslation } from "react-i18next";
import getEvents from "../services/events.service";
import getParticipants from "../services/participants.service";
const options = {
  selectableRows: false,
  download: false,
  print: false,
  pagination: false,
  responsive: "scroll",
};
export default function Participants() {
  const [events, setEvents] = React.useState([]);
  const [participants, setParticipants] = React.useState([]);
  const { t } = useTranslation();
  const columns = [
    {
      name: "created_at",
      label: t("common.date"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <>{moment(value).format("DD-MM-YYYY HH:MM:SS")} </>
        ),
      },
    },
    {
      name: "part_first_name",
      label: t("common.firstName"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "part_last_name",
      label: t("common.lastName"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "part_email",
      label: t("common.email"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "part_gender",
      label: t("common.gender"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "part_country",
      label: t("common.country"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "event_name",
      label: t("common.event"),
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const getParticipantsData = (slug) => {
    let query = undefined;
    if (slug) {
      query = `?eventid=${slug}`;
    }
    getParticipants(query).then((res) => {
      setParticipants(res);
      console.log(res);
    });
  };

  React.useEffect(() => {
    getParticipantsData();
    getEvents().then((res) => {
      setEvents(res);
    });
  }, []);
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
              label="events"
              onChange={(e) => getParticipantsData(e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {events.map((event) => (
                <MenuItem value={event.id}>
                  <em>{event.name}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <MUIDataTable data={participants} options={options} columns={columns} />
      </Grid>
    </Grid>
  );
}
