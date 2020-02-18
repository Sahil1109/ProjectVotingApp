import * as React from "react";
import { auth, Unsubscribe } from "firebase/app";
import app from "../../utils/firebase";
import { __RouterContext, Route } from "react-router";
import { BrowserRouterProps, Link } from "react-router-dom";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";

export class FirebaseAuth {
  private provider: auth.GoogleAuthProvider | undefined;
  private static firebaseInstance: FirebaseAuth | undefined;

  constructor() {
    this.provider = new app.auth.GoogleAuthProvider();
  }

  static Singleton() {
    if (this.firebaseInstance === undefined) {
      this.firebaseInstance = new FirebaseAuth();
      return this.firebaseInstance;
    }
    return this.firebaseInstance;
  }

  public async signOutGoogle() {
    await app.auth().signOut();
  }

  public async signInGoogle() {
    await app.auth().signInWithRedirect(this.provider!);
  }
}

const EmailAlert: React.FC = () => {
  const router = React.useContext(__RouterContext);
  const handleAlertClose = React.useCallback(() => {
    router.history.push("/");
  }, [router.history]);
  return (
    <Dialog open={true} onClose={handleAlertClose}>
      <DialogTitle>Sorry</DialogTitle>
      <DialogContent>
        <h5>Not a valid Block8 email address :/</h5>
      </DialogContent>
      <DialogActions>
        <Link to="/">
          <button>Close</button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export const Context = React.createContext<app.User | null>(null);

const AuthenticationContext: React.FC<BrowserRouterProps> = props => {
  const { children } = props;

  const router = React.useContext(__RouterContext);
  const history = router.history;

  const [user, setUser] = React.useState<app.User | null>(null);

  const handleAuthChange = React.useCallback(
    async (newUser: app.User | null) => {
      if (newUser) {
        if (
          newUser!.email!.includes("@block8.io") ||
          newUser!.email!.includes("@block8.com")
        ) {
          setUser(newUser);
          history.push("/dashboard");
        } else {
          await FirebaseAuth.Singleton().signOutGoogle();
          history.push("/not-b8");
        }
      }
    },
    []
  );

  let authObserver: Unsubscribe | undefined;

  React.useEffect(() => {
    authObserver = app
      .auth()
      .onAuthStateChanged(tempUser => handleAuthChange(tempUser));
  }, []);

  React.useEffect(() => {
    return () => {
      if (authObserver !== undefined) {
        authObserver();
      }
    };
  }, []);

  return (
    <>
      <Route path="/not-b8" component={EmailAlert} />
      <Context.Provider value={user}>{children}</Context.Provider>
    </>
  );
};

export default AuthenticationContext;
