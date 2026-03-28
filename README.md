# vh-events-bo

Admin back-office for managing Virtual Home events. Provides a UI for creating events, tracking participant registrations, viewing analytics, and sending notifications.

## Tech Stack

- **React 18** (Create React App)
- **Material-UI 5** component library
- **Redux** state management
- **Keycloak** authentication
- **Nginx** for production serving

## Features

- **Event management** — create, edit, delete events
- **Participant tracking** — view registrations, update status, CSV export
- **Analytics** — event participation and payment stats
- **User lookup** — search and view participant details
- **i18n** — multi-language with RTL support

## Development

```bash
# Install dependencies
yarn install

# Start dev server (port 3004)
npm start
```

The app runs at `http://localhost:3004/admin/events` in development.

## Configuration

Runtime config is generated via gomplate from `config-templates/config.js` using these environment variables (stored in `.env` on VMs):

| Variable | Description |
|----------|-------------|
| `VH_API_BASE_URL` | Backend API base URL |
| `KEYCLOAK_REALM` | Keycloak realm |
| `KEYCLOAK_URL` | Keycloak auth server URL |
| `KEYCLOAK_CLIENT_ID` | Keycloak client ID |

## Deployment

CI/CD runs via GitHub Actions (`workflow_dispatch`):

1. **Build** — Docker image (Node 21 build + Nginx 1.25 runtime) pushed to `ghcr.io/bnei-baruch/vh-events-bo`
2. **Deploy** — Image pulled on target VM, runtime config generated via gomplate

Trigger manually from the Actions tab, selecting `staging` or `production`.

## API Dependencies

This app is a frontend for [vh-srv-events](https://github.com/Bnei-Baruch/vh-srv-events). All data comes from the events API at `VH_API_BASE_URL/events/v1/`.
