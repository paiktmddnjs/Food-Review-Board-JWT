package com.kh.crud.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kh.crud.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


public class UserDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {

        @NotBlank(message = "사용자 ID는 필수입니다")
        private String userId;   // 로그인 ID

        @NotBlank(message = "비밀번호는 필수입니다")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]+$",
                message = "비밀번호는 영문, 숫자, 특수문자를 포함해야 한다.")
        private String pw;

        private String phone;
    }



    @Getter
    @AllArgsConstructor
    @Builder
    public static class LoginRequest{

        @NotBlank(message = "사용자 ID는 필수입니다")
        private String userId;   // 로그인 ID

        @NotBlank(message = "비밀번호는 필수입니다")
        private String pw;

        public static Request from(User user) {
            return Request.builder()
                    .userId(user.getUserId())
                    .phone(user.getPhone())
                    .build();
        }


    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class LoginResponse {


        private String userId;   // 로그인 ID

        private String role;

        private String token;


    }
}