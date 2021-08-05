import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import debounce from "lodash.debounce";
import { googleAuthProvider, auth, firestore } from "../lib/firebase";
export default function Enter({}) {
  const user = null;
  const username = null;

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      {/* <img src={'google.png'} alt="Google"/>Sign in with google */}
      Google
    </button>
  );
}
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
}

function UsernameForm(): JSX.Element {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);

  const onChange = (e: any) => {
    //Force form value typed in form to match correct format
    const val = e.target.value;
    const reg = /^(?=[a-zA-Z0-9_]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setIsValid(false);
      setLoading(false);
    }
    if (reg.test(val)) {
      setFormValue(val);
      setIsValid(true);
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`username/${username}`);
        const { exists } = await ref.get();
        console.log("read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const userDoc = firestore.doc(`user/${user.uid}`);
    const usernameDoc = firestore.doc(`username/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoUrl: user.photoUrl,
      display: user.display,
    });
    batch.set(usernameDoc, { uid: user.uid });
    await batch.commit();
  };
  function UsernameMessage({
    username,
    isValid,
    loading,
  }: {
    username: string;
    isValid: boolean;
    loading: boolean;
  }) {
    if (loading) {
      return <div>Loading...</div>;
    } else if (isValid) {
      return <p className="text-success">{username}is available</p>;
    } else if (!isValid && username) {
      return <p className="text-danger">{username}is taken</p>;
    } else {
      return <p></p>;
    }
  }

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  return (
    <>
      {!username && (
        <section>
          <h3>Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input
              name="username"
              placeholder="username"
              value={formValue}
              onChange={onChange}
            />
            <UsernameMessage
              username={username}
              isValid={isValid}
              loading={loading}
            />

            <button className="btn-blue" type="submit" disabled={!isValid}>
              Choose
            </button>
          </form>
        </section>
      )}
    </>
  );
}
