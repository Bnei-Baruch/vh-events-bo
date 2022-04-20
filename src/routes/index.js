import React from "react";
import async from "../components/Async";
import { EVENTS_ROUTES } from "./dashboardRoutes";
import EventIcon from "@material-ui/icons/Event";
import BarChartIcon from '@material-ui/icons/BarChart';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
const EventsPage = async(() => import("../pages/Events"));
const EventsAnalyticsPage = async(() => import("../pages/EventsAnalytics"));
const ParticipantsPage = async(() => import("../pages/Participants"));
const SearchPage = async(() => import("../pages/Search"));

const dashboardRoutes = [
  {
    path: EVENTS_ROUTES.Events,
    id: "Events",
    icon: <EventIcon />,
    enableHeader: true,
    breadcrumbs: [{ name: "Events", path: EVENTS_ROUTES.Events }],
    component: EventsPage,
  },
  {
    path: EVENTS_ROUTES.EventsAnalytics,
    id: "Analytics",
    icon: <BarChartIcon />,
    enableHeader: true,
    breadcrumbs: [{ name: "Analytics", path: EVENTS_ROUTES.EventsAnalytics }],
    component: EventsAnalyticsPage,
  },
  {
    path: EVENTS_ROUTES.EventsParticipants,
    id: "Pariticipants",
    icon: <PersonAdd />,
    enableHeader: true,
    breadcrumbs: [
      { name: "Pariticipants", path: EVENTS_ROUTES.EventsParticipants },
    ],
    component: ParticipantsPage,
  },
  {
    path: EVENTS_ROUTES.EventsSearch,
    id: "Search",
    icon: <SearchIcon />,
    enableHeader: true,
    breadcrumbs: [{ name: "Search", path: EVENTS_ROUTES.EventsSearch }],
    component: SearchPage,
  },
];

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [...dashboardRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [...dashboardRoutes];
