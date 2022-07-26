import React from "react";
import { Drawer } from "@mui/material";

const SearchDrawer = ({ toggleDrawer, drawerState }) => {
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
      Hello
    </Drawer>
  );
};

export default SearchDrawer;
