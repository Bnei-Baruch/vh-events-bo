import React from "react";
import { Drawer } from "@mui/material";
import ViewDetailsUser from "../pages/ViewDetailsUser";

const TableDrawer = ({ toggleDrawer, drawerState }) => {
  return (
    <Drawer
      anchor="right"
      open={drawerState?.isOpen}
      onClose={toggleDrawer({ id: null }, false)}
      PaperProps={{
        style: {
          width: "40%",
          maxWidth: "initial",
        },
      }}
    >
      <ViewDetailsUser id={drawerState?.id} />
    </Drawer>
  );
};

export default TableDrawer;
