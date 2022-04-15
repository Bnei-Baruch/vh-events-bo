import {
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useTranslation } from "react-i18next";
import TableDrawer from "../components/TableDrawer";
import getParticipants from "../services/participants.service";
export default function Search(props) {
  const [participants, setParticipants] = React.useState([]);
  const [limit, setLimit] = React.useState(100);
  const { t } = useTranslation();
  const options = {
    selectableRows: false,
    download: false,
    print: false,
    pagination: false,
    responsive: "scroll"
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

  const getParticipantsData = (email, lim) => {
    let query = undefined;
    if (email) {
      query = `?part_email=${email}`;
    }
    getParticipants(query, lim).then((res) => {
      setParticipants(res);
      if (lim > limit) {
        setLimit(lim);
      }
    });
  };
  const [drawerState, setDrawerState] = React.useState({
    isOpen: false,
    id: "",
  });

  const formSubmitted = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    getParticipantsData(email, limit);
  }

  const [selectedEvent, setSelectedEvent] = React.useState("");

  const toggleDrawer = (id, open) => () => {
    setDrawerState({ ...drawerState, id: id, isOpen: open });
  };
  return (
    <Grid container spacing={6}>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <form style={{display: 'flex'}} onSubmit={formSubmitted} noValidate autoComplete="off">
            <TextField style={{minWidth: '250px'}} id="outlined-basic" name="email" label="Enter Email" variant="outlined" required={true} /> &nbsp;
            <Button variant="contained" color="primary" type={'submit'}>{t('Search.name')}</Button>
          </form>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <MUIDataTable data={participants} options={options} columns={columns} />
        <TableDrawer toggleDrawer={toggleDrawer} drawerState={drawerState} />
      </Grid>
    </Grid>
  );
}
