import * as React from "react";
import { Grid, Paper } from "@material-ui/core";
import { cx } from "emotion";
import { Context } from "../../AuthenticationContext";
import UpVote from "@material-ui/icons/KeyboardArrowUp";
import DownVote from "@material-ui/icons/KeyboardArrowDown";
import { database } from "../../../utils/firebase";
import { Unsubscribe } from "firebase";
import { upVote, downVote } from "../../../services";
import { classes } from "./style";

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

  const handleUpVote = React.useCallback(async theme => {
    await upVote(theme);
  }, []);

  const handleDownVote = React.useCallback(async theme => {
    await downVote(theme);
  }, []);

  let unsubscribe: Unsubscribe | undefined;

  React.useEffect(() => {
    unsubscribe = database.collection("Themes").onSnapshot(resTheme => {
      let tp: ITheme[] = [];
      resTheme.forEach(tempObj => {
        const obj: Partial<ITheme> = tempObj.data();
        obj.objRef = tempObj.id;
        tp.push(obj);
      });

      setThemes(tp);
    });
  }, []);

  React.useEffect(() => {
    return () => {
      if (unsubscribe !== undefined) {
        unsubscribe();
      }
    };
  }, []);

  if (user === null) {
    return <h1>Cannot find the user</h1>;
  } else {
    return (
      <Grid>
        {themes !== undefined ? (
          themes
            .sort((a, b) => (a.voteCount! < b.voteCount! ? 1 : -1))
            .map(theme => {
              return (
                <Paper className={classes.theme}>
                  <Grid
                    container
                    className={classes.divider}
                    justify={"space-between"}
                  >
                    <div className={cx(classes.theme, classes.themeName)}>
                      <h5 className={classes.marginForTitles}>{theme.name}</h5>
                    </div>
                    <div className={cx(classes.theme, classes.upvoteTheme)}>
                      <h5 className={classes.marginForTitles}>
                        {theme.voteCount}
                      </h5>
                      <div
                        className={cx(
                          classes.upvoteTheme,
                          classes.pointerOnHover
                        )}
                      >
                        {theme.votedBy!.includes(user.email!) ? (
                          theme.createdBy! !== user.email! ? (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                              onClick={() => {
                                handleDownVote(theme);
                              }}
                            >
                              <DownVote className={classes.upvoteButton} />

                              {/* <h6 className={cx(classes.marginForTitles)}>
                                Down Vote
                              </h6> */}   
                            </div>
                          ) : null
                        ) : (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={() => {
                              handleUpVote(theme);
                            }}
                          >
                            <UpVote className={classes.upvoteButton} />
                            {/* <h6 className={cx(classes.marginForTitles)}>
                              Up Vote
                            </h6> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </Grid>

                  <h6 style={{ margin: "0 1em 0.5em 1em" }}>
                    {theme.votedBy!.map(person => {
                      if (person === user.email!) {
                        return "You | ";
                      }
                      return person + " | ";
                    })}
                  </h6>
                </Paper>
              );
            })
        ) : (
          <h1>Loading Data</h1>
        )}
      </Grid>
    );
  }
};

export default Themes;
