import * as React from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export class FirebaseAuth {
  private provider: GoogleAuthProvider;
  private static firebaseInstance: FirebaseAuth | undefined;

  constructor() {
    this.provider = new GoogleAuthProvider();
  }

  static Singleton() {
    if (this.firebaseInstance === undefined) {
      this.firebaseInstance = new FirebaseAuth();
    }
    return this.firebaseInstance;
  }

  public async signOutGoogle() {
    await signOut(auth);
  }

  public async signInGoogle() {
    await signInWithRedirect(auth, this.provider);
  }
}

export const EmailAlert: React.FC = () => {
  const navigate = useNavigate();
  const handleAlertClose = React.useCallback(() => {
    navigate('/');
  }, [navigate]);
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

export const Context = React.createContext<User | null>(null);

const AuthenticationContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);

  const handleAuthChange = React.useCallback(
    async (newUser: User | null) => {
      if (newUser) {
        if (
          newUser.email!.includes('@block8.io') ||
          newUser.email!.includes('@block8.com')
        ) {
          setUser(newUser);
          navigate('/dashboard');
        } else {
          await FirebaseAuth.Singleton().signOutGoogle();
          navigate('/not-b8');
        }
      }
    },
    [navigate]
  );

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    return unsubscribe;
  }, [handleAuthChange]);

  return <Context.Provider value={user}>{children}</Context.Provider>;
};

export default AuthenticationContext;
