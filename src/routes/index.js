import React from "react";
import async from "../components/Async";
import { EVENTS_ROUTES } from "./dashboardRoutes";
import EventIcon from "@mui/icons-material/Event";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAdd from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
const EventsPage = async(() => import("../pages/Events"));
const EventsAnalyticsPage = async(() => import("../pages/EventsAnalytics"));
const ParticipantsPage = async(() => import("../pages/Participants"));
const SearchPage = async(() => import("../pages/Search"));
const CreateEventsPage = async(() => import("../pages/CreateEvent"));

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
    path: EVENTS_ROUTES.CreateEvents,
    id: "CreateEvents",
    icon: <EventIcon />,
    enableHeader: true,
    breadcrumbs: [
      { name: "Events", path: EVENTS_ROUTES.Events },
      { name: "CreateEvents", path: EVENTS_ROUTES.CreateEvents },
    ],
    component: CreateEventsPage,
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
const sideBarRoutes = [
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
export const sidebarRoutes = [...sideBarRoutes];
