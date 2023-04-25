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
import { useState } from "react";
import dump from "../../components/Dump/dump";
import Alert from "../../components/Alert/alert";
import auth_service from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("user1@aparat.me");
  const [password, setPassword] = useState("123456");
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState(false);

  const authService = auth_service();
  let response = "";

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" padding='10px'>
      <Helmet>
        <title>صفحه ورود آپارات</title>
        <meta name="login" content="login page"/>
      </Helmet>
      <Grid item xs={12} sm={8} md={6} lg={5} style={{ margin: "12px" }}>
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
                    onClick={async () => {
                      if (!username || !password) {
                        setMessageError(
                          "لطفا شماره تلفن/ایمیل و پسورد خود را وارد کنید"
                        );
                        setError(true);
                        return;
                      }

                      response = await authService.Login(
                        username,
                        password,
                        "/login"
                      );
                      if (response.error) {
                        setMessageError("اطلاعات وارد شده مطابقت ندارد");
                        setError(true);
                      } else if (response.result) {
                        setError(false);
                        navigate("/dashboard");
                      }
                      console.log(response.result);
                    }}
                  >
                    ورود
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
