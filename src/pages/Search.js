import {
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React from "react";
import { useTranslation } from "react-i18next";
import TableDrawer from "../components/TableDrawer";
import getParticipants from "../services/participants.service";
import countries from "../constants/countries";
export default function Search(props) {
  const [participants, setParticipants] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);
  const [params, setParams] = React.useState(undefined);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { t } = useTranslation();
  const options = {
    selectableRows: false,
    download: false,
    print: false,
    search: false,
    filter: false,
    pagination: true,
    responsive: "scroll",
    count: totalCount,
    rowsPerPageOptions: [10, 25, 50, 100],
    rowsPerPage: rowsPerPage,
    serverSide: true,
    onTableChange: (action, tableState) => {
      if (action === 'changeRowsPerPage') {
        setRowsPerPage(tableState.rowsPerPage);
        if (params) {
          getParticipantsData(params, tableState.rowsPerPage, tableState.rowsPerPage * page);
          setPage(tableState.page);
        } else {
          getParticipantsData(undefined, tableState.rowsPerPage, tableState.rowsPerPage * page);
          setPage(tableState.page);
        }
      }
      if (action === "changePage") {
        if (params) {
          getParticipantsData(params, rowsPerPage, tableState.page * rowsPerPage);
          setPage(tableState.page);
        } else {
          getParticipantsData(undefined, rowsPerPage, tableState.page * rowsPerPage);
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

  const getParticipantsData = (params, lim, skip) => {
    let query = undefined;
    if (params) {
      query = params;
    }
    getParticipants(query, lim, skip).then((res) => {
      setParticipants(res.data);
      setTotalCount(res.totalCount);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };
  const [drawerState, setDrawerState] = React.useState({
    isOpen: false,
    id: "",
  });

  const formSubmitted = (event) => {
    setLoading(true);
    event.preventDefault();
    let params = '';
    for (var i = 0; i < event.target.length; i++) {
      var fieldName = event.target[i].name;
      var fieldValue = event.target[i].value;
      if (fieldName && fieldValue && fieldValue.trim() !== '') {
        if (params !== '') {
          params += '&';
        }
        params += fieldName + '=' + fieldValue;
      }
    }
    setParams(params);
    getParticipantsData(params, rowsPerPage, page * rowsPerPage);
  }

  const toggleDrawer = (id, open) => () => {
    setDrawerState({ ...drawerState, id: id, isOpen: open });
  };

  const resetForm = () => {
    document.getElementById('searchForm').reset();
  }
  return (
    <form id="searchForm" onSubmit={formSubmitted} noValidate autoComplete="off">
      <Grid container spacing={6}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={3}>
            <TextField id="outlined-basic" fullWidth name="email" label={t('Search.enterEmail')} variant="outlined" /> &nbsp;
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" fullWidth name="fname" label={t('Search.enterFirstName')} variant="outlined" /> &nbsp;
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" fullWidth name="lname" label={t('Search.enterLastName')} variant="outlined" /> &nbsp;
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">{t('Search.country')}</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="country"
              >
                {countries.map(item => {
                  return <MenuItem value={item.ISO}>{item.label}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">{t('Search.gender')}</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="gender"
              >
                <MenuItem value={'male'}>{t('Search.male')}</MenuItem>
                <MenuItem value={'female'}>{t('Search.female')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">{t('common.participation_option')}</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="part-option"
              >
                <MenuItem value={'sp-russia'}>{t('Search.russia')}</MenuItem>
                <MenuItem value={'sp-ukraine'}>{t('Search.ukraine')}</MenuItem>
                <MenuItem value={'hh-request'}>{t('Search.helphaver')}</MenuItem>
                <MenuItem value={'regular'}>{t('Search.regular')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} style={{display: 'flex'}}>
            <Button variant="contained" color="primary" type={'submit'}>{t('Search.name')}</Button> &nbsp;&nbsp;
            <Button variant="contained" color="default" onClick={resetForm} >{t('Search.reset')}</Button>
          </Grid>
        </Grid>
        <Grid xs={12}>
          {!loading  ? <MUIDataTable data={participants && participants.length > 0 ? participants.slice(participants.length - rowsPerPage, participants.length) : []} options={options} columns={columns} /> : <div style={{ margin: '20px', textAlign: 'center' }}><CircularProgress m={2} color="secondary" /></div>}
          <TableDrawer toggleDrawer={toggleDrawer} drawerState={drawerState} />
        </Grid>
      </Grid>
    </form>
  );
}
