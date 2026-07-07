package com.astraflow.project.mapper;

import com.astraflow.project.model.User;

public class DtoMapperUtils {

    private DtoMapperUtils() {
    }

    public static void mapCommonUserFields(
            User user,
            String email,
            String password,
            String fullName,
            String phone,
            String username
    ) {
        if (user == null) {
            return;
        }
        user.setEmail(email);
        user.setPassword(password);
        user.setFullName(fullName);
        user.setPhone(phone);
        user.setUsername(username);
    }
}