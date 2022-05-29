import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
export default function CreateEvent() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card style={{ padding: "15px" }}>
          <CardHeader title="Create Event"></CardHeader>
          <CardContent>
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Event Slug"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Event Slug"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Event Slug"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Event Slug"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary">
              Create
            </Button>
            <Button variant="contained">Discard</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
