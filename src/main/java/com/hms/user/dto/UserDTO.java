package com.hms.user.dto;

import com.hms.user.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
    private Long id;// mã user
    @NotBlank(message = "Name is mandatory")
    private String name;// tên user
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;// tên đăng nhập
    @NotBlank(message = "Password is mandatory")
    @Pattern(
    regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    message = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be 8 characters long"
)
    private String password;// mật khẩu
    private Roles role;// quyền đăng nhập

    public User toEntity() {
        return new User(this.id, this.name, this.email, this.password, this.role);
    }
}
