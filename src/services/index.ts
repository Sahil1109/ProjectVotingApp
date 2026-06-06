import { auth, database } from '../utils/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { ITheme } from '../components/Voting/Themes';

export const addTheme = async (name: string) => {
  try {
    const user = auth.currentUser;
    await addDoc(collection(database, 'Themes'), {
      name,
      createdBy: user!.email,
      votedBy: [user!.email],
      voteCount: 1
    });
  } catch (err) {
    console.log('error : ', err);
  }
};

export const upVote = async (theme: ITheme) => {
  try {
    const user = auth.currentUser;
    const instance = doc(database, 'Themes', theme!.objRef!);
    theme!.votedBy!.push(user!.email!);
    await setDoc(instance, {
      ...theme,
      voteCount: theme!.voteCount! + 1,
      votedBy: theme!.votedBy!
    });
  } catch (err) {
    console.log('errror : ', err);
  }
};

export const downVote = async (theme: ITheme) => {
  try {
    const user = auth.currentUser;
    const instance = doc(database, 'Themes', theme!.objRef!);
    await setDoc(instance, {
      ...theme,
      voteCount: theme!.voteCount! - 1,
      votedBy: theme!.votedBy!.filter(email => email !== user!.email!)
    });
  } catch (err) {
    console.log('errror : ', err);
  }
};
