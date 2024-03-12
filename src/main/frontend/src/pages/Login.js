import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../apis/userApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    userId: "",
    userPw: "",
  });

  const navi = useNavigate();

  const dispatch = useDispatch();

  const TextFieldchanged = useCallback(
    (e) => {
      setForm({
        ...form,
        // name은 input (타겟의 벨류)의 name속성을 뜻함
        [e.target.name]: e.target.value,
      });
    },
    [form]
  );

  // 로그인
  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(login(form));
      navi("/app/");
    },
    [form, dispatch]
  );
  return (
    <Container component="div" maxWidth="xs" style={{ marginTop: "8%" }}>
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="right">
            <TextField
              name="userId"
              variant="outlined"
              required
              id="userId"
              label="아이디"
              autoFocus
              fullWidth
              value={form.userId}
              onChange={TextFieldchanged}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="userPw"
              variant="outlined"
              required
              id="userPw"
              label="비밀번호"
              fullWidth
              type="password"
              value={form.userPw}
              onChange={TextFieldchanged}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/app/join" variant="body2">
              계정이 없으시면 회원가입하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
