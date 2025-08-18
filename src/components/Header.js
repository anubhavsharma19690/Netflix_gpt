import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignout = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  console.log("auth", auth, "user", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });


    // unsubscribe from the auth state listener when the component unmounts
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-36"
        src={LOGO} alt="Netflix Logo" />
      {/* <img className="w-44" src="/Setflixlogo.png" alt="Netflix Logo" /> */}
      {user && (
        <div className="flex p-2">
          <img
            className="w-10 h-10 "
            alt="User icon"
            // src="/netflix_usericon.jpg"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignout}
            className="w-12 h-12 font-bold text-white"
          >
            Signout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
