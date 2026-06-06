import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addTheme } from '../../../services';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import { Context } from '../../AuthenticationContext';

const AddThemeDialog: React.FC = () => {
  const navigate = useNavigate();
  const user = React.useContext(Context);
  const [themeName, setThemeName] = React.useState<string>();

  const handleOnClose = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleAddTheme = React.useCallback(async () => {
    if (user !== null && user.email !== null) {
      if (themeName !== undefined && themeName.length !== 0) {
        try {
          await addTheme(themeName);
          handleOnClose();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [themeName, user, handleOnClose]);

  const handleFieldChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setThemeName(event.target.value);
    },
    []
  );

  return (
    <Dialog open={true} onClose={handleOnClose}>
      <DialogTitle>
        <h4 style={{ margin: '0em' }}>Add a new theme</h4>
      </DialogTitle>
      <DialogContent>
        <TextField
          label={<h5 style={{ margin: '0em' }}>Title</h5>}
          value={themeName ?? ''}
          onChange={handleFieldChange}
          helperText={
            <h6 style={{ margin: '0em' }}>
              Please enter a suitable title for your theme
            </h6>
          }
        />
      </DialogContent>
      <DialogActions
        style={{
          marginTop: '1em',
          paddingTop: '1em',
          borderTop: '2px solid rgb(49,0,72)'
        }}
      >
        <button onClick={handleAddTheme}>Add</button>
        <button className="background-secondary" onClick={handleOnClose}>
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default AddThemeDialog;
