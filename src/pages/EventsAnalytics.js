import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import PeopleIcon from "@mui/icons-material/People";
import getEvents, {
  getEventsAnalytics,
  getEventsPaymentsAnalytics,
} from "../services/events.service";
import { setSelectedEventId } from "../redux/actions/eventActions";
import { useDispatch, useSelector } from "react-redux";

export default function EventsAnalytics() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [events, setEvents] = React.useState([]);
  const [analytics, setAnalytics] = React.useState(null);
  const [paymentAnalytics, setPaymentAnalytics] = React.useState(null);

  const eventId = useSelector((state) => state.eventReducer.eventId);

  React.useEffect(() => {
    getEvents().then((res) => {
      if (res && res.length > 0) {
        setEvents(res.filter((res) => !res.deleted));
      }
    });
    getEventsPaymentsAnalytics().then((res) => setPaymentAnalytics(res));
    if (eventId) {
      getAnalytics(eventId);
      return;
    }
    getAnalytics();
  }, []);

  const getAnalytics = (eventId) => {
    getEventsAnalytics(eventId).then((res) => {
      setAnalytics(res);
    });
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
              label="event"
              value={eventId}
              onChange={(e) => {
                getAnalytics(e.target.value);
                dispatch(setSelectedEventId(e.target.value));
              }}
            >
              {events.map((event) => (
                <MenuItem key={event._id} value={event.id}>
                  <em>{event.name}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {analytics && (
        <Grid container item={12} spacing={6}>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={2}
              style={{ padding: "20px", borderRadius: "5px", height: "100%" }}
            >
              <Grid container style={{ alignItems: "center" }}>
                <Grid
                  item
                  xs={4}
                  style={{
                    textAlign: "center",
                    border: "1px solid rgb(102 100 100)",
                    borderRadius: "15px",
                  }}
                >
                  <PeopleIcon
                    style={{
                      height: "50px",
                      fontSize: "40px",
                      color: "rgb(102 100 100)",
                    }}
                  />
                </Grid>
                <Grid item xs={8} style={{ paddingLeft: "5px" }}>
                  <Typography variant="h6">
                    {t("Analytics.TotalParticipant")}
                  </Typography>
                  <Typography variant="h4">
                    {analytics.total_participant}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {analytics &&
            analytics.part_option_details.map((part, index) => (
              <Grid key={index} item xs={12} md={3}>
                <Paper
                  elevation={2}
                  style={{
                    padding: "20px",
                    borderRadius: "5px",
                    height: "100%",
                  }}
                >
                  <Grid container style={{ alignItems: "center" }}>
                    <Grid
                      item
                      xs={4}
                      style={{
                        textAlign: "center",
                        border: "1px solid rgb(102 100 100)",
                        borderRadius: "15px",
                      }}
                    >
                      <PeopleIcon
                        style={{
                          height: "50px",
                          fontSize: "40px",
                          color: "rgb(102 100 100)",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} style={{ paddingLeft: "5px" }}>
                      {part.participation_option === "regular" && (
                        <Typography variant="h6">
                          {t("Search.regular")}
                        </Typography>
                      )}
                      {part.participation_option === "sp-ukraine" && (
                        <Typography variant="h6">
                          {t("Search.ukraine")}
                        </Typography>
                      )}
                      {part.participation_option === "sp-russia" && (
                        <Typography variant="h6">
                          {t("Search.russia")}
                        </Typography>
                      )}
                      {part.participation_option === "hh-request" && (
                        <Typography variant="h6">
                          {t("Search.helphaver")}
                        </Typography>
                      )}
                      {part.participation_option !== "regular" &&
                        part.participation_option !== "sp-ukraine" &&
                        part.participation_option !== "sp-russia" &&
                        part.participation_option !== "hh-request" && (
                          <Typography variant="h6">
                            {part.participation_option}
                          </Typography>
                        )}
                      <Typography variant="h4">{part.count}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          {false && paymentAnalytics &&
            Object.keys(paymentAnalytics).map((key, index) => (
              <Grid key={index} item xs={12} md={3}>
                <Paper
                  elevation={2}
                  style={{
                    padding: "20px",
                    borderRadius: "5px",
                    height: "100%",
                  }}
                >
                  <Grid container style={{ alignItems: "center" }}>
                    <Grid
                      item
                      xs={4}
                      style={{
                        textAlign: "center",
                        border: "1px solid rgb(102 100 100)",
                        borderRadius: "15px",
                      }}
                    >
                      <PeopleIcon
                        style={{
                          height: "50px",
                          fontSize: "40px",
                          color: "rgb(102 100 100)",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} style={{ paddingLeft: "5px" }}>
                      {key === "total_people_paid" && (
                        <Typography variant="h6">
                          {t("Analytics.TotalPaid")}
                        </Typography>
                      )}
                      {key === "total_people_paid_with_cc" && (
                        <Typography variant="h6">
                          {t("Analytics.TotalPaidWithCC")}
                        </Typography>
                      )}
                      {key === "total_ticket_sold" && (
                        <Typography variant="h6">
                          {t("Analytics.TotalSold")}
                        </Typography>
                      )}
                      <Typography variant="h4">
                        {paymentAnalytics[key]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
        </Grid>
      )}
    </Grid>
  );
}
