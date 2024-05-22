import React from "react";
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon } from "@material-ui/core";
import { Drawer } from "@material-ui/core"; // No need for "as MUIDrawer"
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";

const DrawerComponent = () => {
  return (
    <Drawer variant="permanent"> 
      <List>
        {["Dashboard", "Requirement", "Feedback", "Payment"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={`/${text.toLowerCase()}`}> {/* Added Link and dynamic route */}
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
