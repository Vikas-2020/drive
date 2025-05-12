import { signInWithPopup } from "firebase/auth";
import { auth, provider} from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setMessage } from "../slices/authSlice";
import img from "../assets/img.jpg";
import drive_logo from "../assets/drive-logo.png";
import MessageAlert from "../components/MessageAlert";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginWithGoogle = async () => {
    try {
      dispatch(setLoading(true));
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // Extract only serializable fields
      const cleanUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      dispatch(setUser(cleanUser)); // Only store cleanUser
      dispatch(setMessage("Logged in successfully ✅"));
      navigate("/"); // Go to Home after login
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        dispatch(setMessage("Login cancelled by user ❌"));
      } else {
        console.error("Login error:", error);
        dispatch(setMessage("Login failed ❌"));
      }
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-18 py-4 min-h-[15dvh]">
        <div className="flex items-center space-x-2">
          <img src={drive_logo} alt="drive-logo" className="w-9 h-9" />
          <span className="text-2xl text-gray-500">Drive</span>
        </div>
        <div>
          <button
            onClick={loginWithGoogle}
            className="bg-blue-500 hover:bg-blue-600 text-gray-100 font-medium py-2.5 px-9 rounded-md text-[1.1rem] cursor-pointer"
          >
            Log In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-between bg-white px-6 md:px-18 py-12 min-h-[85dvh]">
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight mb-6">
            Easy and secure access to your content
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl mb-8">
            Store, share, and collaborate on files and folders from your mobile
            device, tablet, or computer
          </p>
          <button
            onClick={loginWithGoogle}
            className="bg-blue-500 hover:bg-blue-600 text-gray-100 font-medium py-2.5 px-9 rounded-md text-[1.1rem] cursor-pointer"
          >
            Log In
          </button>
        </div>

        {/* Right Side - Image (Hidden on md and smaller) */}
        <div className="hidden md:flex w-1/2 justify-center">
          <img
            src={img}
            alt="Login Visual"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      </div>
      <MessageAlert />
    </>
  );
}

export default Login;
