import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useTranslation } from "react-i18next";
import TableDrawer from "../components/TableDrawer";
import getEvents from "../services/events.service";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import getParticipants, {
  downloadParticipantCSV,
} from "../services/participants.service";
import { setUserProfileDetails } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import SearchDrawer from "../components/SearchDrawer";
import {
  setEventList,
  setSelectedEventId,
} from "../redux/actions/eventActions";
import { useHistory } from "react-router-dom";
export default function Participants(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const eventId = useSelector((state) => state.eventReducer.eventId);

  const [page, setPage] = React.useState(0);
  const [events, setEvents] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchEmail, setSearchEmail] = React.useState("");
  const [participants, setParticipants] = React.useState([]);
  const [drawerState, setDrawerState] = React.useState({
    isOpen: false,
    id: "",
    participationDetail: {},
  });
  const [searchDrawerState, setsearchDrawerState] = React.useState({
    isOpen: false,
    id: "",
  });

  const options = {
    selectableRows: "none",
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
    page: page,
    onDownload: () => {
      let query;
      if (eventId) {
        query = `?eventid=${eventId}`;
      }
      downloadParticipantCSV(query, rowsPerPage, page * rowsPerPage);
      return false;
    },
    onTableChange: (action, tableState) => {
      if (action === "changeRowsPerPage") {
        setRowsPerPage(tableState.rowsPerPage);
        if (eventId) {
          if (eventId) {
            getParticipantsData(
              eventId,
              tableState.rowsPerPage,
              tableState.rowsPerPage * page
            );
            getEvents().then((res) => {
              if (res && res.length > 0) {
                setEvents(res.filter((res) => !res.deleted));
              }
            });
          }
        } else {
          getParticipantsData(
            undefined,
            tableState.rowsPerPage,
            tableState.rowsPerPage * page
          );
          getEvents().then((res) => {
            if (res && res.length > 0) {
              setEvents(res.filter((res) => !res.deleted));
            }
          });
        }
      }
      if (action === "changePage") {
        if (eventId) {
          if (eventId) {
            getParticipantsData(
              eventId,
              rowsPerPage,
              tableState.page * rowsPerPage
            );
            setPage(tableState.page);
            getEvents().then((res) => {
              if (res && res.length > 0) {
                setEvents(res.filter((res) => !res.deleted));
              }
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
            if (res && res.length > 0) {
              setEvents(res.filter((res) => !res.deleted));
            }
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
              onClick={() => toggleDrawer(value, true)}
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
      query = `eventid=${slug}`;
    }
    getParticipants(query, lim, skip).then((res) => {
      setParticipants(res.data);
      setTotalCount(res.totalCount);
    });
  };

  React.useEffect(() => {
    if (eventId) {
      if (eventId) {
        getParticipantsData(eventId, rowsPerPage, 0);
        getEvents().then((res) => {
          if (res && res.length > 0) {
            setEvents(res.filter((res) => !res.deleted));
          }
          dispatch(setEventList(res));
        });
      }
    } else {
      getParticipantsData(undefined, rowsPerPage, 0);
      getEvents().then((res) => {
        if (res && res.length > 0) {
          setEvents(res.filter((res) => !res.deleted));
        }
        dispatch(setEventList(res));
      });
    }
    // eslint-disable-next-line
  }, [eventId]);

  const toggleDrawer = (id, open, refreshData = false) => {
    if (!open) {
      dispatch(setUserProfileDetails(undefined));
    }
    let participationDetail = id
      ? participants.find((item) => item.part_keycloak_id === id)
      : undefined;
    setDrawerState({
      ...drawerState,
      id: id,
      participationDetail: participationDetail,
      isOpen: open,
    });
    if (refreshData) {
      getParticipantsData(eventId, rowsPerPage, rowsPerPage * page);
    }
  };
  const navigateTo = (path) => {
    history.push(path);
  };
  const toggleSearchDrawer = (id, open) => () => {
    setsearchDrawerState({ ...searchDrawerState, id: id, isOpen: open });
  };

  return (
    <Grid container spacing={6}>
      <Grid container item xs={12}>
        <Grid item xs={12} md={9}>
          {/* <Button
            variant="contained"
            onClick={() => navigateTo("/admin/events/participants/add")}
          >
            <AddIcon /> {t("Pariticipants.addParticipant")}
          </Button>
          &nbsp; &nbsp;
          <TextField
            id="outlined-basic"
            placeholder="enter email to search"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            variant="outlined"
            inputProps={{ style: { padding: "8px 15px", minWidth: "150px" } }}
          />{" "}
          &nbsp;
          <Button
            variant="outlined"
            onClick={() =>
              setsearchDrawerState({ ...searchDrawerState, isOpen: true })
            }
          >
            <SearchIcon />
          </Button> */}
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              {t("Events.name")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="events"
              value={eventId}
              onChange={(e) => {
                getParticipantsData(e.target.value, rowsPerPage, 0);
                setPage(0);
                dispatch(setSelectedEventId(e.target.value));
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
      <Grid item xs={12}>
        {participants && participants.length >= 0 && (
          <MUIDataTable
            data={
              totalCount > rowsPerPage
                ? participants.slice(
                    participants.length - rowsPerPage,
                    participants.length
                  )
                : participants
            }
            options={options}
            columns={columns}
          />
        )}
        <TableDrawer toggleDrawer={toggleDrawer} drawerState={drawerState} />
        <SearchDrawer
          toggleDrawer={toggleSearchDrawer}
          drawerState={searchDrawerState}
        />
      </Grid>
    </Grid>
  );
}
