import { Grid } from "@material-ui/core";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useTranslation } from "react-i18next";
import getEvents from "../services/events.service";
const options = {
  selectableRows: false,
  download: false,
  print: false,
  pagination: false,
  responsive: "scroll",
};
export default function Events() {
  const [events, setEvents] = React.useState([]);
  const { t } = useTranslation();
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
