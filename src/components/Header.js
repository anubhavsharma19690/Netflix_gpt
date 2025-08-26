import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { BiLogOutCircle } from "react-icons/bi";

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
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      {/* <img className="w-36 mx-auto md:mx-0" src={LOGO} alt="Netflix Logo" /> */}
      <img
        className="w-36 md:w-44 mx-auto md:mx-0 transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-125 cursor-pointer"
        src={LOGO}
        alt="Netflix Logo"
        onClick={() => navigate('/browse')}
      />
      {/* <img className="w-44" src="/Setflixlogo.png" alt="Netflix Logo" /> */}
      {user && (
        <div className="flex p-3 justify-between">
          {showgptSearch && (
            // <select
            //   className="p-2 m-2 bg-gray-900 text-white rounded-lg"
            //   onChange={handleLanguageChange}
            // >
            //   {SUPPORTED_LANGUAGES.map((lang) => (
            //     <option key={lang.identifier} value={lang.identifier}>
            //       {lang.name}
            //     </option>
            //   ))}
            // </select>
            <select
              className="p-2 px-4 m-2 bg-red-800 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-red-600 cursor-pointer outline-none"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                  className="bg-gray-900 hover:bg-gray-800 py-2"
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-6 mx-4 my-2 bg-red-800 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-red-600 flex items-center gap-2"
            onClick={handleGptSearchClick}
          >
            {showgptSearch ? "Home" : "GPT Search"}
          </button>


          <img
            className="hidden md:block w-12 h-12 rounded-xl mt-2 mx-2 border-2 border-transparent hover:border-red-600 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg object-cover"
            alt="User icon"
            src={user?.photoURL}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/netflix_usericon.jpg";
            }}
          />



          <button
            onClick={handleSignout}
            className="w-12 h-12 text-white bg-red-800 hover:bg-red-700 rounded-xl mx-2 my-2 flex justify-center items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg border-2 border-transparent hover:border-red-600"
          >
            <BiLogOutCircle className="w-6 h-6 hover:rotate-12 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
