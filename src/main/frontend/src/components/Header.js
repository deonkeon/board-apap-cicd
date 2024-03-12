import React, { useCallback, useEffect } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../apis/userApi";

const Header = () => {
  const navi = useNavigate();
  const isLogin = useSelector((state) => state.boards.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isLogin);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navi("/app/login");
  }, [dispatch, navi]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navi("/app/")}
            style={{ cursor: "pointer" }}
          >
            Home
          </Typography>
          <Button color="inherit" onClick={() => navi("/app/board-list")}>
            게시판
          </Button>
          {isLogin ? (
            <>
              <Button color="inherit" onClick={() => navi("/app/mypage")}>
                마이페이지
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navi("/app/join")}>
                회원가입
              </Button>
              <Button color="inherit" onClick={() => navi("/app/login")}>
                로그인
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
