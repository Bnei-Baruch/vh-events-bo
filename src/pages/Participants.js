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
import getParticipants, {
  downloadParticipantCSV,
} from "../services/participants.service";
import { setUserProfileDetails } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
export default function Participants(props) {
  const dispatch = useDispatch();
  const [events, setEvents] = React.useState([]);
  const [participants, setParticipants] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { t } = useTranslation();
  const options = {
    selectableRows: false,
    print: false,
    count: totalCount,
    responsive: "standard",
    filter: false,
    search: false,
    download: true,
    pagination: true,
    rowsPerPageOptions: [10, 25, 50, 100],
    rowsPerPage: rowsPerPage,
    serverSide: true,
    onDownload: () => {
      let eventId;
      let query;
      if (selectedEvent) {
        eventId = selectedEvent;
      } else if (props.location.state) {
        eventId = props.location.state;
      }
      if (eventId) {
        query = `?eventid=${eventId}`;
      }
      downloadParticipantCSV(query, rowsPerPage, page * rowsPerPage);
      return false;
    },
    onTableChange: (action, tableState) => {
      if (action === "changeRowsPerPage") {
        setRowsPerPage(tableState.rowsPerPage);
        if (props && props.location && props.location.state) {
          const { eventId } = props.location.state;
          if (eventId) {
            getParticipantsData(
              eventId,
              tableState.rowsPerPage,
              tableState.rowsPerPage * page
            );
            getEvents().then((res) => {
              setEvents(res);
              setSelectedEvent(eventId);
            });
          }
        } else {
          getParticipantsData(
            undefined,
            tableState.rowsPerPage,
            tableState.rowsPerPage * page
          );
          getEvents().then((res) => {
            setEvents(res);
          });
        }
      }
      if (action === "changePage") {
        if (props && props.location && props.location.state) {
          const { eventId } = props.location.state;
          if (eventId) {
            getParticipantsData(
              eventId,
              rowsPerPage,
              tableState.page * rowsPerPage
            );
            setPage(tableState.page);
            getEvents().then((res) => {
              setEvents(res);
              setSelectedEvent(eventId);
            });
          }
        } else {
          getParticipantsData(
            undefined,
            rowsPerPage,
            tableState.page * rowsPerPage
          );
          setPage(tableState.page);
          getEvents().then((res) => {
            setEvents(res);
          });
        }
      }
    },
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
      label: t("common.participation_option"),
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

  const getParticipantsData = (slug, lim, skip) => {
    let query = undefined;
    if (slug) {
      query = `?eventid=${slug}`;
    }
    getParticipants(query, lim, skip).then((res) => {
      setParticipants(res.data);
      setTotalCount(res.totalCount);
    });
  };

  React.useEffect(() => {
    if (props && props.location && props.location.state) {
      const { eventId } = props.location.state;
      if (eventId) {
        getParticipantsData(eventId, rowsPerPage, 0);
        getEvents().then((res) => {
          setEvents(res);
          setSelectedEvent(eventId);
        });
      }
    } else {
      getParticipantsData(undefined, rowsPerPage, 0);
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

  const [selectedEvent, setSelectedEvent] = React.useState(1);

  const toggleDrawer = (id, open) => () => {
    if (!open) {
      dispatch(setUserProfileDetails(undefined));
    }
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
                getParticipantsData(e.target.value, rowsPerPage, 0);
                setPage(0);
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
        {participants && participants.length > 0 && (
          <MUIDataTable
            data={participants.slice(
              participants.length - rowsPerPage,
              participants.length
            )}
            options={options}
            columns={columns}
          />
        )}
        <TableDrawer toggleDrawer={toggleDrawer} drawerState={drawerState} />
      </Grid>
    </Grid>
  );
}
