import React from "react";
import { withRouter } from "react-router";
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent as MuiCardContent,
  TextField,
} from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { updateUserStatus, setUserDetails } from '../redux/actions/userActions'
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import Helmet from "react-helmet";
import Badge from "@material-ui/core/Badge";
import {
  setUserProfileDetails,
  updateUserStatus,
} from "../redux/actions/userActions";
import { getUserDetails, postUserStatus } from "../services/user.service";

const useStyles = makeStyles((theme) => ({
  location: {
    width: "120px",
    fontSize: 16,
    marginBottom: "1rem",
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000000",
    marginBottom: "2rem",
    width: "fit-content",
  },
  langCommunication: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000000",
    marginTop: "4rem",
    width: "fit-content",
  },
  regionalContainer: {
    height: "100%",
  },
  status: {
    borderRadius: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "6rem",
    height: "28px",
    color: "white",
  },
  typography: {
    fontSize: 16,
    marginBottom: "1rem",
  },
  contentPadding: {
    padding: "15px",
  },
}));

const CardContent = styled(MuiCardContent)`
  display: flex;
  flex-directon: row
  justify-content: space-between;
`;
const textFieldText = {
  fontSize: "16px",
};
const typographyWidth = {
  width: "89.2px",
};

const ViewDetailsUser = (props) => {
  const user = useSelector((state) => state.userReducer.userDetails);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userId = props?.id;

  const classes = useStyles();
  React.useEffect(() => {
    getUserDetails(userId).then((res) => dispatch(setUserProfileDetails(res)));
  // eslint-disable-next-line
  }, [userId]);

  React.useEffect(() => {
    postUserStatus(userId, user?.primary_email).then((res) =>
      dispatch(updateUserStatus(res))
    );
  // eslint-disable-next-line
  }, [userId, user]);

  const galaxy = {
    backgroundColor: `${user?.status?.galaxy ? "#4CAF50" : "#7D7D7D"}`,
  };
  const membership = {
    backgroundColor: `${user?.status?.membership ? "#4CAF50" : "#7D7D7D"}`,
  };
  const ticket = {
    backgroundColor: `${user?.status?.ticket ? "#4CAF50" : "#7D7D7D"}`,
  };
  const convention = {
    backgroundColor: `${user?.status?.convention ? "#4CAF50" : "#7D7D7D"}`,
  };

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

      <Grid container className={classes.contentPadding}>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={6}>
            <Grid item xs={12}>
              <Card>
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
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container direction="column">
                    <Typography className={classes.cardHeaderText}>
                      {t("common.status")}
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      spacing={6}
                      alignItems="flex-start"
                      justify="space-between"
                      xl={8}
                    >
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography
                              className={classes.typography}
                              style={typographyWidth}
                            >
                              {t("common.galaxy")}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Badge style={galaxy} className={classes.status}>
                              {user?.status?.galaxy ? "yes" : "n/a"}
                            </Badge>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography
                              className={classes.typography}
                              style={typographyWidth}
                            >
                              {t("common.convention")}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Badge
                              style={convention}
                              className={classes.status}
                            >
                              {user?.status?.convention
                                ? t("common.registered")
                                : t("common.notRegistered")}
                            </Badge>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography className={classes.typography}>
                              {t("common.membership")}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Badge
                              style={membership}
                              className={classes.status}
                            >
                              {user?.status?.membership
                                ? t("common.searchFieldsLabels.active")
                                : t("common.searchFieldsLabels.inActive")}
                            </Badge>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography
                              className={classes.typography}
                              style={typographyWidth}
                            >
                              {t("common.ticket")}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography
                              style={ticket}
                              className={classes.status}
                            >
                              {user?.status?.ticket
                                ? t("common.ticket")
                                : t("common.noTicket")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.regionalContainer}>
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
