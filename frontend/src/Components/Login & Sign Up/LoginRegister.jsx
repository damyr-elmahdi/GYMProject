import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import "./LoginRegister.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "boxicons/css/boxicons.min.css";

const LoginRegister = () => {
  const { setToken, user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [registerErrors, setRegisterErrors] = useState({});

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Fill in all fields before proceeding!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      console.log("Login response:", data);

      if (data.errors) {
        setLoginErrors(data.errors);
        toast.error("Login failed. Please check your credentials.");
      } else {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        toast.success("Login successful!");

        setTimeout(() => {
          if (data.user && data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/client/dashboard");
          }
        }, 100);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginErrors({ general: ["An error occurred during login."] });
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!registerData.name || !registerData.email || !registerData.password) {
      toast.error("Fill in all fields before proceeding!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (data.errors) {
        setRegisterErrors(data.errors);
        toast.error("Registration failed. Please check the form.");
      } else {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response && error.response.status === 422) {
        const errorMessage =
          error.response.data.errors?.email?.[0] || "Email already exists!";
        toast.error(errorMessage);
        setRegisterErrors({ email: [errorMessage] });
      } else {
        setRegisterErrors({
          general: ["An error occurred during registration."],
        });
        toast.error("An error occurred during registration.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      {user ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className={`container ${isActive ? "active" : ""}`}>
          <div className="form-box login">
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              {loginErrors.general && (
                <p className="error">{loginErrors.general[0]}</p>
              )}

              <div className="input-box">
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <i className="bx bxs-envelope"></i>
              </div>
              {loginErrors.email && (
                <p className="error">{loginErrors.email[0]}</p>
              )}

              <div className="input-box">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />

                <i
                  className={`bx ${showPassword ? "bxs-hide" : "bxs-show"}`} // Toggle eye icon
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              {loginErrors.password && (
                <p className="error">{loginErrors.password[0]}</p>
              )}

              <div className="forgot-link">
                <a href="#">Forgot password ?</a>
              </div>

              <button type="submit" className="btn">
                Login
              </button>
              <br />
              <br />
              <p>or login with social platforms</p>
              <div className="social-icons">
                <a href="#">
                  <i className="bx bxl-google"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-github"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </form>
          </div>

          <div className="form-box register">
            <form onSubmit={handleRegister}>
              <h1>Registration</h1>
              {registerErrors.general && (
                <p className="error">{registerErrors.general[0]}</p>
              )}

              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                />
                <i className="bx bxs-user"></i>
              </div>
              {registerErrors.name && (
                <p className="error">{registerErrors.name[0]}</p>
              )}

              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
                <i className="bx bxs-envelope"></i>
              </div>
              {registerErrors.email && (
                <p className="error">{registerErrors.email[0]}</p>
              )}
              <div className="input-box">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder="Password"
                  required
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />

                <i
                  className={`bx ${showPassword ? "bxs-hide" : "bxs-show"}`} // Toggle eye icon
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              {registerErrors.password && (
                <p className="error">{registerErrors.password[0]}</p>
              )}

              <div className="input-box">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder="Confirm Password"
                  required
                  value={registerData.password_confirmation}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password_confirmation: e.target.value,
                    })
                  }
                />

                <i
                  className={`bx ${showPassword ? "bxs-hide" : "bxs-show"}`} // Toggle eye icon
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>

              <button type="submit" className="btn">
                Register
              </button>

              <p>or register with social platforms</p>
              <div className="social-icons">
                <a href="#">
                  <i className="bx bxl-google"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-github"></i>
                </a>
                <a href="#">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </form>
          </div>

          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button
                className="btn register-btn"
                onClick={() => setIsActive(true)}
              >
                Register
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button
                className="btn login-btn"
                onClick={() => setIsActive(false)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;
