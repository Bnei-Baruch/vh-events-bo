import React from "react";
import { withRouter } from "react-router";
import {
  Grid,
  Typography,
  Card,
  CardContent as MuiCardContent,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import Helmet from "react-helmet";
import { setUserProfileDetails } from "../redux/actions/userActions";
import { getMembershipStatus, getUserDetails } from "../services/user.service";

const useStyles = makeStyles(() => ({
  location: {
    width: "120px !important",
    fontSize: '16 !important',
    marginBottom: "1rem !important",
  },
  cardHeaderText: {
    fontSize: '16 !important',
    fontWeight: '600 !important',
    color: "#000000 !important",
    marginBottom: "2rem !important",
    width: "fit-content !important",
  },
  langCommunication: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000000 !important",
    marginTop: "4rem !important",
    width: "fit-content !important",
  },
  regionalContainer: {
    height: "100% !important",
  },
  status: {
    borderRadius: "5rem !important",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    width: "6rem !important",
    height: "28px !important",
    color: "white !important",
  },
  typography: {
    fontSize: 16,
    marginBottom: "1rem !important",
  },
  contentPadding: {
    padding: "15px !important",
    '& .MuiPaper-elevation': {
      boxShadow: '0 0 14px 0 rgba(53,64,82,.05) !important'
    }
  },
}));

const CardContent = styled(MuiCardContent)`
  display: flex !important;
  flex-directon: row !important;
  justify-content: space-between !important;
`;
const textFieldText = {
  fontSize: "16px",
};

const active = {
  backgroundColor: "rgb(52, 168, 83)",
  padding: "5px 10px",
  borderRadius: "5px",
  color: "white",
};
const inactive = {
  padding: "5px 10px",
  borderRadius: "5px",
  backgroundColor: "#d70000",
  color: "white",
};
const ViewDetailsUser = (props) => {
  const user = useSelector((state) => state.userReducer.userDetails);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [membership, setMembership] = React.useState({});

  const userId = props?.id;

  const classes = useStyles();
  React.useEffect(() => {
    if (userId && typeof userId === "string") {
      getUserDetails(userId).then((res) =>
        dispatch(setUserProfileDetails(res))
      );
    }
    // eslint-disable-next-line
  }, [userId]);

  React.useEffect(() => {
    if (user && user.primary_email) {
      getMembershipStatus(user?.primary_email).then((res) =>
        setMembership(res)
      );
    }
    // eslint-disable-next-line
  }, [userId, user]);

  if (isEmpty(user)) {
    return <></>;
  }
  const personalTextFields = [
    {
      label: t("common.firstName"),
      defaulValue: user?.first_name_vernacular,
    },
    {
      label: t("common.lastName"),
      defaulValue: user?.last_name_vernacular,
    },
    {
      label: t("common.tables.eventParticipation.dob"),
      defaulValue: user?.date_of_birth,
    },
    {
      label: t(
        "common.tables.eventParticipation.searchHiddenFields.maritalStatus"
      ),
      defaulValue: user?.marital_status,
    },
    {
      label: t("common.tables.eventParticipation.gender"),
      defaulValue: user?.gender,
    },
    {
      label: t("common.tables.eventParticipation.email"),
      defaulValue: user?.primary_email,
    },
  ];
  const regionalInfoFields = [
    {
      label: t("common.streetAddress"),
      defaulValue: user?.street_address,
    },
    {
      label: t(
        "common.tables.eventParticipation.searchHiddenFields.postalCode"
      ),
      defaulValue: user?.postal_code,
    },
    {
      label: t("common.tables.eventParticipation.country"),
      defaulValue: user?.country,
    },
    {
      label: t("common.stateRegion"),
      defaulValue: user?.state_region,
    },
  ];
  const languagesFields = [
    {
      label: t("common.other_language_1"),
      defaulValue: user?.other_language_1,
    },
    {
      label: t("common.other_language_2"),
      defaulValue: user?.other_language_2,
    },
    {
      label: t("common.other_language_3"),
      defaulValue: user?.other_language_3,
    },
    {
      label: t("common.other_language_4"),
      defaulValue: user?.other_language_4,
    },
  ];
  console.log(membership);
  return (
    <React.Fragment>
      <Helmet title={t("common.registration")} />
      <Typography
        variant="h3"
        gutterBottom
        display="inline"
        className={classes.contentPadding}
      >
        {t("common.details")}
      </Typography>

      <Grid container className={classes.contentPadding} spacing={3}>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={6}>
            <Grid item xs={12}>
              <Card raised={true}>
                <CardContent>
                  <Grid container direction="column">
                    <Typography className={classes.cardHeaderText}>
                      {t("common.personal")}
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      spacing={8}
                      alignContent="flex-start"
                      justify="space-between"
                    >
                      {personalTextFields.map((field, index) => {
                        return (
                          <Grid
                            item
                            sm={12}
                            xl={12}
                            md={12}
                            lg={6}
                            key={`${field}-${index}`}
                          >
                            <TextField
                              label={field.label}
                              className={classes.MuiTextField}
                              InputLabelProps={{ shrink: true }}
                              defaultValue={field.defaulValue}
                              inputProps={{
                                readOnly: true,
                                style: textFieldText,
                              }}
                              fullWidth={true}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={6}>
            <Grid item xs={12}>
              <Card raised={true}>
                <CardContent>
                  <Grid container direction="column">
                    <Typography className={classes.cardHeaderText}>
                      {t("common.membership")}
                    </Typography>
                    <Typography>
                      <span style={membership.membership ? active : inactive}>
                        {membership.membership ? "Active" : "Inactive"}
                      </span>
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card raised={true} className={classes.regionalContainer}>
            <CardContent>
              <Grid container>
                <Grid container direction="column">
                  <Typography className={classes.cardHeaderText}>
                    {t("common.regionalInfo")}
                  </Typography>
                  <Grid container direction="row" spacing={8}>
                    {regionalInfoFields?.map((field, index) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={6}
                          xl={6}
                          key={`${field}-${index}`}
                        >
                          <TextField
                            label={field.label}
                            InputLabelProps={{ shrink: true }}
                            defaultValue={field.defaulValue}
                            inputProps={{
                              readOnly: true,
                              style: textFieldText,
                            }}
                            fullWidth={true}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>

                <Grid container spacing={8}>
                  <Grid item sm={12} xs={12} md={12} lg={6} xl={6}>
                    <Grid container direction="column" spacing={8}>
                      <Grid item sm={12}>
                        <Typography className={classes.langCommunication}>
                          {t("common.languages")}
                        </Typography>
                      </Grid>
                      {languagesFields?.map((field, index) => {
                        return (
                          <Grid item sm={12} key={`${field}-${index}`}>
                            <TextField
                              label={field.label}
                              defaultValue={field.defaultValue}
                              InputLabelProps={{ shrink: true }}
                              inputProps={{
                                readOnly: true,
                                style: textFieldText,
                              }}
                              fullWidth={true}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                  <Grid item sm={12} xs={12} md={12} lg={6} xl={6}>
                    <Grid container direction="column" spacing={8}>
                      <Grid item>
                        <Typography className={classes.langCommunication}>
                          {t("common.communication")}
                        </Typography>
                      </Grid>

                      <Grid item sm={12}>
                        <TextField
                          label={t(
                            "common.tables.eventParticipation.searchHiddenFields.email_language"
                          )}
                          defaultValue={user?.email_language}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            readOnly: true,
                            style: textFieldText,
                          }}
                          fullWidth={true}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withRouter(ViewDetailsUser);
