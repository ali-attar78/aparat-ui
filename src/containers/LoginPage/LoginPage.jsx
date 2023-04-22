import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  InputBase,
  Divider,
  Link,
  FormControl,
  Box,
} from "@mui/material";
import { Helmet } from "react-helmet";
import Logo from "../../components/Logo/Logo";
import PersonIcon from '@mui/icons-material/Person';
import EastIcon from '@mui/icons-material/East';
const LoginPage = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Helmet>
        <title>صفحه ورود آپارات</title>
      </Helmet>
      <Grid item xs={12} sm={8} md={6} lg={5} style={{margin: '12px'}}>
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
            <Grid paddingX={"16px"} paddingY={"20px"} container alignItems={'center'} style={{ borderBottom: '1px solid #eeee' }}>
              <Grid item xs={12} md={8} marginBottom={2}  >
                <span>حساب کاربری ندارید ؟</span>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  size="small"
                  color="danger"
                  variant="contained"
                  fullWidth
                  style={{ color: '#ffff' }}
                >
                  ایجاد حساب کاربری
                </Button>
              </Grid>
            </Grid>
            <CardContent>
              <p>اگر در آپارات حساب کاربری دارید وارد شوید :</p>
              <Grid spacing={2} container alignItems={'center'}>
                <Grid item xs={12} md={9}>
                  <Box >
                    <Paper
                      component="form"
                      sx={{
                        display: "flex",
                        minWidth: '100%',
                        alignItems: "center",
                      }}
                    >
                      <PersonIcon
                        style={{ color: "#aaa", marginInline: "7px" }}
                      />
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="ایمیل یا موبایل را وارد کنید"
                      />
                      <Divider
                        sx={{ height: 15}}
                        orientation="vertical"
                      />
                      <Link style={{ cursor: 'pointer' }} padding={'2px 6px'} underline="hover" color="#7CC1F0">
                        فراموش کردید
                      </Link>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="contained" size="small" color="danger" fullWidth style={{ color: '#ffff' }}>ورود</Button>
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
