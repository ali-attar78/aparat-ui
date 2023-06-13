import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  InputBase,
  FormControl,
  Box,
} from "@mui/material";
import { Helmet } from "react-helmet";
import Logo from "../../components/Logo/Logo";
import PersonIcon from "@mui/icons-material/Person";
import EastIcon from "@mui/icons-material/East";
import PasswordIcon from "@mui/icons-material/VpnKey";
import { useState, useEffect } from "react";
import Alert from "../../components/Alert/alert";
import auth_service from "../../services/auth-service";
import RegisterUserService from "../../services/RegisterUserApi/RegisterUserApi";
import VerifyRegisterUserService from "../../services/VerifyRegisterUserApi/VerifyRegisterUserApi";
import ResendVarificationUserCodeService from "../../services/ResendVarificationUserCodeApi/ResendVarificationUserCodeApi";

import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg.jpg";
import styled from "styled-components";
import { ROUTE_HOME, ROUTE_DASHBOARD } from "./../../routes";
import Loading from "../../components/LoadingWithText";
import Notification from "../../components/Notifications";
import { converSecondToTime } from "./../../utils/helpers";

const LoginWrapper = styled(Grid)`
  background-image: url(${bgImage});

  width: 100vw;
  max-width: 100vw;
  height: 100vh;

  .wrapper {
    max-width: 600px;
  }
  .MuiBox-root.css-0 {
    margin-top: 20px;
  }

  .inputPaper {
    margin-bottom: 0px;
  }
  .inputVerifyCode {
    margin-top: 10px;
    margin-bottom: 0px;
  }
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("user1@aparat.me");
  const [password, setPassword] = useState("123456");
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [responseLogin, setResponseLogin] = useState(false);
  const [registerUser, setRegisterUser] = useState(false);
  const [verifyCounter, setVerifyCounter] = useState(0);
  const [registerVerifyCode, sertRegisterVerifyCode] = useState("");

  const [register, setRegister] = useState(null);

  console.log(registerUser);

  const authService = auth_service();
  const RegisterUserApi = RegisterUserService();
  const VerifyRegisterUserApi = VerifyRegisterUserService();
  const ResendVarificationUserCodeApi = ResendVarificationUserCodeService();

  let response = "";
  let verifyTimerHandler = null;

  function toggleRegisterUserForm() {
    setRegisterUser(!registerUser);
    setUsername("");
    setPassword("");
  }

  useEffect(() => {
    setVerifyCounter(59);
  }, [register]);

  useEffect(() => {
    let timer = null;
    if (verifyCounter > 0) {
      timer = setTimeout(() => {
        setVerifyCounter(verifyCounter - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [verifyCounter]);

  async function handleLoginUser(verifiedUsername) {
    setShowLoader(true);
    if (!verifiedUsername) {
      if (!username || !password) {
        setMessageError("لطفا شماره تلفن/ایمیل و پسورد خود را وارد کنید");
        setError(true);
        return;
      }
    }
    response = await authService.Login(
      verifiedUsername ? verifiedUsername : username,
      verifiedUsername ? verifiedUsername : password,
      "/login"
    );
    if (response.error) {
      setMessageError("اطلاعات وارد شده مطابقت ندارد");
      setError(true);
    } else if (response.result) {
      setError(false);
      setResponseLogin(response.result);
      if (verifiedUsername) {
        navigate(ROUTE_DASHBOARD, {
          state: {
            message:
              "گذرواژه شما همان ایمیل یا موبایل وارد شده میباشد برای تغییر به پروفایل خود مراجعه کنید",
          },
        });
      } else {
        navigate(ROUTE_DASHBOARD);
      }

      window.location.reload();
    }
    console.log(response.result);
  }

  async function handleRegisterUser() {
    const data = {
      [username.includes("@") ? "email" : "mobile"]: username,
    };

    try {
      const response = await RegisterUserApi.RegisterUser(data, "/register");
      if (response.error) {
        console.log(response.error);
        setErrorMessage("لطفا ایمیل یا شماره موبایل خود را به درستی وارد کنید");
      } else {
        console.log(response.result);
        setRegister(response.result);
        setSuccessMessage(response.result.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleVerifyRegisterUser() {
    const data = {
      [username.includes("@") ? "email" : "mobile"]: username,
      code: registerVerifyCode,
    };
    try {
      const response = await VerifyRegisterUserApi.VerifyRegisterUser(
        data,
        "/register-verify"
      );
      if (response.error) {
        console.log(response.error);
        setErrorMessage("کد تایید یا نام کاربری صحیح نیست");
      } else {
        console.log(response.result);
        handleLoginUser(username);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleResendVarificationCode() {
    const data = {
      [username.includes("@") ? "email" : "mobile"]: username,
    };

    try {
      const response =
        await ResendVarificationUserCodeApi.ResendVarificationUserCode(
          data,
          "/resend-verification-code"
        );
      if (response.error) {
        console.log(response.error);
        setErrorMessage("لطفا ایمیل یا شماره موبایل خود را به درستی وارد کنید");
      } else {
        console.log(response.result);
        setRegister(response.result);
        setSuccessMessage(response.result.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <LoginWrapper
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      padding="10px"
      className="mainGrid"
    >
      <Helmet>
        <title>صفحه ورود آپارات</title>
        <meta name="login" content="login page" />
      </Helmet>

      {showLoader && !responseLogin && (
        <LoadingWrapper>
          <Loading text="لطفا منظر بمانید" />
        </LoadingWrapper>
      )}

      <Grid item xs={12} sm={8} md={6} lg={5} className="wrapper">
        <Grid item xs={12}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Button
            spacing={1}
            variant="outlined"
            color="gray"
            size="small"
            startIcon={<EastIcon style={{ marginLeft: 5 }} />}
            onClick={() => {
              navigate(ROUTE_HOME);
            }}
          >
            <span style={{ marginRight: 2 }}>بازگشت</span>
          </Button>
        </Grid>
        <Grid item xs={12} marginTop={2}>
          {error ? (
            <Alert
              show={error}
              message={messageError}
              onClose={() => setError(false)}
            />
          ) : null}

          {registerUser && (
            <Card>
              <Grid
                paddingX={"16px"}
                paddingY={"20px"}
                container
                alignItems={"center"}
                style={{ borderBottom: "1px solid #eeee" }}
              >
                <Grid item xs={12} md={8} marginBottom={2}>
                  <span>اگر در آپارات حساب کاربری دارید وارد شوید:</span>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    size="small"
                    color="danger"
                    variant="contained"
                    fullWidth
                    onClick={toggleRegisterUserForm}
                    style={{ color: "#ffff", marginBottom: "10px" }}
                  >
                    ورود به حساب کاربری
                  </Button>
                </Grid>
              </Grid>

              <CardContent>
                <Grid
                  spacing={2}
                  container
                  alignItems="flex-end"
                  direction="row"
                  justifyContent="center"
                >
                  <Grid item xs={12} md={9}>
                    <Box>
                      <Paper
                        className="inputPaper"
                        component="form"
                        sx={{
                          display: "flex",
                          minWidth: "100%",
                          alignItems: "center",
                          marginBottom: "8px",
                          boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.1)",
                          border: "1px solid #eee",
                          borderBottom: "none",
                        }}
                      >
                        <PersonIcon
                          style={{ color: "#aaa", marginInline: "7px" }}
                        />
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="ایمیل یا موبایل خود را وارد کنید"
                          onChange={(e) => setUsername(e.target.value.trim())}
                          defaultValue={username}
                        />
                      </Paper>

                      {register && (
                        <Paper
                          color="info"
                          className="inputVerifyCode"
                          component="form"
                          sx={{
                            display: "flex",
                            minWidth: "100%",
                            alignItems: "center",
                            marginBottom: "8px",
                            boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.1)",
                            border: "1px solid #eee",
                            borderBottom: "none",
                          }}
                        >
                          <PersonIcon
                            style={{ color: "#aaa", marginInline: "7px" }}
                          />
                          <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="کد تایید را وارد نمایید"
                            onChange={(e) => {
                              sertRegisterVerifyCode(e.target.value.trim());
                            }}
                          />
                        </Paper>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      variant="contained"
                      size="small"
                      color="danger"
                      fullWidth
                      style={{ color: "#ffff" }}
                      disabled={
                        !!!username.trim().length ||
                        (register && !!!registerVerifyCode.trim().length)
                      }
                      onClick={() => {
                        !!register
                          ? handleVerifyRegisterUser()
                          : handleRegisterUser();
                      }}
                    >
                      {!!register ? "تایید" : "ادامه"}
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    {register && (
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={verifyCounter !== 0}
                        fullWidth
                        onClick={handleResendVarificationCode}
                      >
                        ارسال مجدد (
                        {converSecondToTime(verifyCounter).substr(3)})
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {!registerUser && (
            <Card>
              <Grid
                paddingX={"16px"}
                paddingY={"20px"}
                container
                alignItems={"center"}
                style={{ borderBottom: "1px solid #eeee" }}
              >
                <Grid item xs={12} md={8} marginBottom={2}>
                  <span>در آپارات حساب کاربری ندارید؟ ثبت نام کنید:</span>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    size="small"
                    color="danger"
                    variant="contained"
                    fullWidth
                    onClick={toggleRegisterUserForm}
                    style={{ color: "#ffff", marginBottom: "10px" }}
                  >
                    ایجاد حساب کاربری
                  </Button>
                </Grid>
              </Grid>

              <CardContent>
                <p>اگر در آپارات حساب کاربری دارید وارد شوید :</p>
                <Grid
                  spacing={2}
                  container
                  alignItems="flex-end"
                  direction="row"
                  justifyContent="center"
                >
                  <Grid item xs={12} md={9}>
                    <Box>
                      <Paper
                        component="form"
                        sx={{
                          display: "flex",
                          minWidth: "100%",
                          alignItems: "center",
                          marginBottom: "8px",
                          boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.1)",
                          border: "1px solid #eee",
                          borderBottom: "none",
                        }}
                      >
                        <PersonIcon
                          style={{ color: "#aaa", marginInline: "7px" }}
                        />
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="ایمیل یا موبایل را وارد کنید"
                          onChange={(e) => setUsername(e.target.value.trim())}
                          defaultValue={username}
                        />
                      </Paper>

                      <Paper
                        component="form"
                        sx={{
                          display: "flex",
                          minWidth: "100%",
                          alignItems: "center",
                          boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.1)",
                          border: "1px solid #eee",
                          borderBottom: "none",
                        }}
                      >
                        <PasswordIcon
                          style={{ color: "#aaa", marginInline: "7px" }}
                        />
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="گذرواژه خود را وارد کنید"
                          onChange={(e) => setPassword(e.target.value.trim())}
                          defaultValue={password}
                        />
                      </Paper>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      variant="contained"
                      size="small"
                      color="danger"
                      fullWidth
                      style={{ color: "#ffff" }}
                      onClick={() => {
                        handleLoginUser();
                      }}
                    >
                      ورود
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      <Notification
        message={successMessage || errorMessage}
        severity={successMessage ? "success" : "error"}
        onClose={() => {
          setSuccessMessage(null);
          setErrorMessage(null);
        }}
      />
    </LoginWrapper>
  );
};

export default LoginPage;
