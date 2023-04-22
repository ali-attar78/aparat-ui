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
import auth_service from "../../services/auth-service";
const LoginPage = () => {


  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const authService =auth_service();


  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Helmet>
        <title>صفحه ورود آپارات</title>
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
          <Card>
            <Grid
              paddingX={"16px"}
              paddingY={"20px"}
              container
              alignItems={"center"}
              style={{ borderBottom: "1px solid #eeee" }}
            >
              <Grid item xs={12} md={8} marginBottom={2}>
                <span>حساب کاربری ندارید ؟</span>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  size="small"
                  color="danger"
                  variant="contained"
                  fullWidth
                  style={{ color: "#ffff" }}
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
                    onClick={async ()=> { const result = await authService.Login(username,password,'/login');console.log(result)}}
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
