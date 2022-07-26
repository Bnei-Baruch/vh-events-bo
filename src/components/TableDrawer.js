import React from "react";
import { Drawer } from "@mui/material";
import ViewDetailsUser from "../pages/ViewDetailsUser";

const TableDrawer = ({ toggleDrawer, drawerState }) => {
  const closeAndRefresh = () => {
    toggleDrawer({ id: null }, false, true);
  };
  return (
    <Drawer
      anchor="right"
      open={drawerState?.isOpen}
      onClose={() => toggleDrawer({ id: null }, false)}
      PaperProps={{
        style: {
          width: "40%",
          maxWidth: "initial",
        },
      }}
    >
      <ViewDetailsUser
        id={drawerState?.id}
        participationDetails={drawerState?.participationDetail}
        toggleDrawer={closeAndRefresh}
      />
    </Drawer>
  );
};

export default TableDrawer;
