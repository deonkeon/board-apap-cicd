import { createSlice } from "@reduxjs/toolkit";
import { getBoards, postBoard, removeBoard } from "../apis/boardApi";
import { login, join, logout } from "../apis/userApi";

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    isLogin: false,
    boards: [],
    searchCondition: "all",
    searchKeyword: "",
    page: 0,
    loginUserId: "",
  },
  reducers: {
    change_searchCondition: (state, action) => ({
      ...state,
      searchCondition: action.payload,
    }),
    change_searchKeyword: (state, action) => ({
      ...state,
      searchKeyword: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(join.fulfilled, (state, action) => {
      alert(`${action.payload.userId}님 회원가입을 축하합니다.`);
      window.location.href = "/app/login";
      return state;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      alert(`${action.payload.userId}님 환영합니다.`);
      sessionStorage.setItem("ACCESS_TOKEN", action.payload.token);

      return {
        ...state,
        isLogin: true,
        loginUserId: action.payload.userId,
      };
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      alert("로그아웃 성공");
      sessionStorage.removeItem("ACCESS_TOKEN");

      return {
        ...state,
        isLogin: false,
      };
    });
    builder.addCase(getBoards.fulfilled, (state, action) => ({
      ...state,
      boards: action.payload.pageItems,
      searchCondition: action.payload.item.searchCondition,
      searchKeyword: action.payload.item.searchKeyword,
      page: action.payload.pageItems.pageable.pageNumber,
    }));
    builder.addCase(postBoard.fulfilled, (state, action) => {
      alert("정상적으로 등록되었습니다.");
      return {
        ...state,
        boards: action.payload,
        searchCondition: "all",
        searchKeyword: "",
        page: 0,
      };
    });
    builder.addCase(removeBoard.fulfilled, (state, action) => {
      alert("정상적으로 삭제되었습니다.");
      return {
        ...state,
        boards: action.payload,
        searchCondition: "all",
        searchKeyword: "",
        page: 0,
      };
    });
    builder.addCase(join.rejected, (state, action) => {
      alert("에러발생. 관리자에게 문의하세요.");
      console.log(action.payload);
      //   이전 상태 리턴
      return state;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload === 200) {
        alert("존재하지 않는 아이디입니다.");
      } else if (action.payload === 201) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("알 수 없는 에러발생. 관리자에게 문의하세요.");
      }
      // 이전 상태를 그대로 리턴
      return state;
    });
    // 인증에러는 403이므로 403이면 로그인으로 보내도록 설계하면된다.
    builder.addCase(getBoards.rejected, (state, action) => {
      alert("에러발생");
      console.log(action.payload);
      return state;
    });
    builder.addCase(postBoard.rejected, (state, action) => {
      alert("에러발생");
      console.log(action.payload);
      return state;
    });
    builder.addCase(removeBoard.rejected, (state, action) => {
      alert("에러발생");
      console.log(action.payload);
      return state;
    });
  },
});

export const { change_searchCondition, change_searchKeyword } =
  boardSlice.actions;

export default boardSlice.reducer;
