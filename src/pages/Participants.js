import {
  Button,
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
import TableDrawer from "../components/TableDrawer";
import getEvents from "../services/events.service";
import getParticipants from "../services/participants.service";
export default function Participants(props) {
  const [events, setEvents] = React.useState([]);
  const [participants, setParticipants] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const { t } = useTranslation();
  const options = {
    selectableRows: false,
    download: false,
    print: false,
    count: participants.length + 1,
    responsive: "scroll",
    pagination: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [],
    serverSide: true,
    onTableChange: (action, tableState) => {
      if (action === "changePage") {
        if (page < tableState.page) {
          if (props && props.location && props.location.state) {
            const { eventId } = props.location.state;
            if (eventId) {
              getParticipantsData(eventId, limit + 10);
              setPage(tableState.page);
              getEvents().then((res) => {
                setEvents(res);
                setSelectedEvent(eventId);
              });
            }
          } else {
            getParticipantsData(undefined, limit + 10);
            setPage(tableState.page);
            getEvents().then((res) => {
              setEvents(res);
            });
          }
        } else if (page > tableState.page) {
          setLimit(limit - 10);
          setPage(tableState.page);
        }
      }
    }
  };
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
      name: "participation_option",
      label: t('common.participation_option'),
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
    {
      name: "part_keycloak_id",
      label: t("common.action"),
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Button
              variant="outlined"
              size="small"
              style={{ borderRadius: "10px" }}
              onClick={toggleDrawer(value, true)}
            >
              {t("Pariticipants.showDetail")}
            </Button>
          );
        },
      },
    },
  ];

  const getParticipantsData = (slug, lim) => {
    let query = undefined;
    if (slug) {
      query = `?eventid=${slug}`;
    }
    getParticipants(query, lim).then((res) => {
      setParticipants(res);
      if (lim > limit) {
        setLimit(lim);
      }
    });
  };

  React.useEffect(() => {
    if (props && props.location && props.location.state) {
      const { eventId } = props.location.state;
      if (eventId) {
        getParticipantsData(eventId);
        getEvents().then((res) => {
          setEvents(res);
          setSelectedEvent(eventId);
        });
      }
    } else {
      getParticipantsData();
      getEvents().then((res) => {
        setEvents(res);
      });
    }
  // eslint-disable-next-line
  }, [props]);
  const [drawerState, setDrawerState] = React.useState({
    isOpen: false,
    id: "",
  });

  const [selectedEvent, setSelectedEvent] = React.useState("");

  const toggleDrawer = (id, open) => () => {
    setDrawerState({ ...drawerState, id: id, isOpen: open });
  };
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
              value={selectedEvent}
              onChange={(e) => {
                getParticipantsData(e.target.value);
                setSelectedEvent(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {events.map((event, index) => (
                <MenuItem key={index} value={event.id}>
                  <em>{event.name}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <MUIDataTable data={participants.slice(limit - 10, limit)} options={options} columns={columns} />
        <TableDrawer toggleDrawer={toggleDrawer} drawerState={drawerState} />
      </Grid>
    </Grid>
  );
}
