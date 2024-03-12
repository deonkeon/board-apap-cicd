package com.bit.boardapp.dto;

import com.bit.boardapp.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class UserDTO {
    private long id;
    private String userId;
    private String userPw;
    private String userName;
    private String userEmail;
    private String userTel;
    private String userRegdate;
    private String role;
    private String curUserPw;
    private boolean isActive;
    private String lastLoginDate;
    // 인증된 사용자인지 판별하기 위한 jwt(token)
    private String token;

    // 반환타입이 entity형태여야 하니까 User 타입으로 생성
    public User toEntity() {
        return User.builder()
                .id(this.id)
                .userId(this.userId)
                .userPw(this.userPw)
                .userName(this.userName)
                .userEmail(this.userEmail)
                .userTel(this.userTel)
                .userRegdate(LocalDateTime.parse(this.userRegdate))
                .role(this.role)
                .isActive(this.isActive)
                .lastLoginDate(LocalDateTime.parse(this.lastLoginDate))
                .build();
    }
}
