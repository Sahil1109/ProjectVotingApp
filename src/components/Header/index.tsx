import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import { Context, FirebaseAuth } from '../AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';

const classes = {
  email: css`
    margin: 1em;
  `
};

const Header: React.FC = () => {
  const context = React.useContext(Context);
  const navigate = useNavigate();

  const handleSignout = React.useCallback(async () => {
    await FirebaseAuth.Singleton().signOutGoogle();
    navigate('/');
    window.location.reload();
  }, [navigate]);

  return (
    <Paper>
      <Grid container>
        <Grid item xs={10}>
          <h4 className={classes.email}>
            Welcome , <br />
            <b>{context!.displayName}</b>
          </h4>
        </Grid>
        <Grid item xs={2} container justifyContent="center" alignItems="center">
          <button
            style={{ border: '1px orange solid', padding: '5px' }}
            onClick={handleSignout}
          >
            Sneek Out
          </button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
