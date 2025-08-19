import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";



const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showgptSearch = useSelector((store) => store.gpt.showgptSearch);
  const dispatch = useDispatch();

  const handleSignout = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };


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
    };
  }, []);

  const handleGptSearchClick = () => {
    // Toggle Gpt search button
    dispatch(toggleGptSearchView())
  }
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));


  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-36" src={LOGO} alt="Netflix Logo" />
      {/* <img className="w-44" src="/Setflixlogo.png" alt="Netflix Logo" /> */}
      {user && (
        <div className="flex p-2">
          {showgptSearch && <select className="p-2 m-2 bg-gray-900 text-white rounded-lg" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier} >{lang.name}</option>)}

          </select>}
          <button className="py-2 px-4 mx-4 my-2 bg-red-800 text-white rounded-lg"
            onClick={handleGptSearchClick}>
            {showgptSearch ? "Home" : "GPT Search"}
          </button>
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
