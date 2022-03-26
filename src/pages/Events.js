import { Grid } from "@material-ui/core";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useTranslation } from "react-i18next";
const options = {
  selectableRows: false,
  download: false,
  print: false,
  pagination: false,
  responsive: "scroll",
};
export default function Events() {
  const { t } = useTranslation();
  const columns = [
    {
      name: "payment_date",
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
      name: "type",
      label: t("common.type"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "product_type",
      label: t("common.product"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "amount",
      label: t("common.amount"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "currency",
      label: t("common.currency"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "payment_id",
      label: t("common.paymentId"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "cc_number",
      label: t("common.paymentMethod"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "payment_status",
      label: t("common.status"),
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  return (
    <Grid container spacing={6}>
      <Grid xs={12}>
        <MUIDataTable data={[]} options={options} columns={columns} />
      </Grid>
    </Grid>
  );
}
