import { embedDashboard } from '@preset-sdk/embedded';
import { useState } from 'react';

import classes from './EmbeddedDashboardPage.module.css';

const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME;
const TOKEN_SECRET = process.env.REACT_APP_TOKEN_SECRET;

const DASHBOARD_ID = process.env.REACT_APP_DASHBOARD_ID;
const SUPERSET_DOMAIN = process.env.REACT_APP_SUPERSET_DOMAIN;
const WORKSPACE_ID = process.env.REACT_APP_WORKSPACE_ID;
const TEAM_ID = process.env.REACT_APP_TEAM_ID;

const EmbeddedDashboardPage = () => {
  const [accessToken, setAccessToken] = useState('');

  const getAuth = async () => {
    const fetchGuestTokenFromBackend = async () => {
      // Here should be logic for fetching access_token from backend

      return accessToken;
    };

    embedDashboard({
      id: DASHBOARD_ID || '',
      supersetDomain: SUPERSET_DOMAIN || '',
      mountPoint: document.getElementById('dashboard-container') as HTMLDivElement, // any html element that can contain an iframe
      fetchGuestToken: async () => fetchGuestTokenFromBackend(),
      dashboardUiConfig: {
        // dashboard UI config: hideTitle, hideChartControls, filters (all optional)
        hideTitle: false, // change it to `true` to hide the dashboard title
        hideChartControls: false, // change it to `true` to hide the chart controls (ellipses menu)
        filters: {
          expanded: true // change it to `false` so that dashboard filters are collapsed (for vertical filter bar)
        }
      }
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(e.target.value);
  };

  const handleClear = () => {
    setAccessToken('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        margin: '0 auto'
      }}
    >
      <h1 style={{ margin: '10px auto 0' }}>Embedded Dashboard</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        <input
          value={accessToken}
          onChange={handleChangeInput}
          style={{ height: '32px', fontSize: '1rem' }}
          placeholder="Guest Token"
        />
        <button style={{ background: 'green', color: 'white', height: '32px' }} onClick={getAuth}>
          Add dashboard
        </button>
        <button style={{ background: 'red', color: 'white', height: '32px' }} onClick={handleClear}>
          Clear Guest Token
        </button>
      </div>

      <div id="dashboard-container" className={classes.dashboardContainer}></div>
    </div>
  );
};

export default EmbeddedDashboardPage;
