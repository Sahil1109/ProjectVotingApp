import app, { database } from "../utils/firebase";
import { ITheme } from "../components/Voting/Themes";

export const addTheme = async (name: string) => {
  try {
    const user = app.auth().currentUser;
    const themes = database.collection(`Themes`);
    await themes.add({
      name,
      createdBy: user!.email,
      votedBy: [user!.email],
      voteCount: 1
    });
  } catch (err) {
    console.log("error : ", err);
  }
};

export const upVote = async (theme: ITheme) => {
  try {
    const user = app.auth().currentUser;
    const themes = database.collection("Themes");
    const instance = themes.doc(theme!.objRef!);
    theme!.votedBy!.push(user!.email!);
    await instance.set({
      ...theme,
      voteCount: theme!.voteCount! + 1,
      votedBy: theme!.votedBy!
    });
  } catch (err) {
    console.log("errror : ", err);
  }
};

export const downVote = async (theme: ITheme) => {
  try {
    const user = app.auth().currentUser;
    const themes = database.collection("Themes");
    const instance = themes.doc(theme!.objRef!);

    // theme!.votedBy!.push(user!.email!);

    await instance.set({
      ...theme,
      voteCount: theme!.voteCount! - 1,
      votedBy: theme!.votedBy!.filter(email => email != user!.email!)
    });
  } catch (err) {
    console.log("errror : ", err);
  }
};
