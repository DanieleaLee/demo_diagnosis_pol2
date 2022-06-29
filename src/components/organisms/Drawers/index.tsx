import { useState } from "react";
import IndexsetLoadDrawer from "./IndexsetLoadDrawer";

export const useDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);
  const openDrawer = () => setDrawerOpen(true);

  return { drawerOpen, closeDrawer, openDrawer };
};


export default {
  IndexsetLoadDrawer
};