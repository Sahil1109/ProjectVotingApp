import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import { cx } from '@emotion/css';
import { Context } from '../../AuthenticationContext';
import UpVote from '@mui/icons-material/KeyboardArrowUp';
import DownVote from '@mui/icons-material/KeyboardArrowDown';
import { database } from '../../../utils/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { upVote, downVote } from '../../../services';
import { classes } from './style';

export interface ITheme {
  name?: string;
  objRef?: string;
  voteCount?: number;
  votedBy?: string[];
  createdBy?: string;
}

const Themes: React.FC = () => {
  const user = React.useContext(Context);
  const [themes, setThemes] = React.useState<ITheme[] | undefined>();

  const handleUpVote = React.useCallback(async (theme: ITheme) => {
    await upVote(theme);
  }, []);

  const handleDownVote = React.useCallback(async (theme: ITheme) => {
    await downVote(theme);
  }, []);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'Themes'), resTheme => {
      const tp: ITheme[] = [];
      resTheme.forEach(tempObj => {
        const obj: Partial<ITheme> = tempObj.data();
        obj.objRef = tempObj.id;
        tp.push(obj as ITheme);
      });
      setThemes(tp);
    });
    return unsubscribe;
  }, []);

  if (user === null) {
    return <h1>Cannot find the user</h1>;
  }

  return (
    <Grid>
      {themes !== undefined ? (
        themes
          .sort((a, b) => (a.voteCount! < b.voteCount! ? 1 : -1))
          .map(theme => (
            <Paper key={theme.objRef} className={classes.theme}>
              <Grid
                container
                className={classes.divider}
                justifyContent="space-between"
              >
                <div className={cx(classes.theme, classes.themeName)}>
                  <h5 className={classes.marginForTitles}>{theme.name}</h5>
                </div>
                <div className={cx(classes.theme, classes.upvoteTheme)}>
                  <h5 className={classes.marginForTitles}>{theme.voteCount}</h5>
                  <div className={cx(classes.upvoteTheme, classes.pointerOnHover)}>
                    {theme.votedBy!.includes(user.email!) ? (
                      theme.createdBy! !== user.email! ? (
                        <div
                          style={{ display: 'flex', alignItems: 'center' }}
                          onClick={() => handleDownVote(theme)}
                        >
                          <DownVote className={classes.upvoteButton} />
                        </div>
                      ) : null
                    ) : (
                      <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={() => handleUpVote(theme)}
                      >
                        <UpVote className={classes.upvoteButton} />
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
              <h6 style={{ margin: '0 1em 0.5em 1em' }}>
                {theme.votedBy!.map(person =>
                  person === user.email! ? 'You | ' : person + ' | '
                )}
              </h6>
            </Paper>
          ))
      ) : (
        <h1>Loading Data</h1>
      )}
    </Grid>
  );
};

export default Themes;
