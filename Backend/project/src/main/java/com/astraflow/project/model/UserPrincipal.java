package com.astraflow.project.model;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {

	private User user;
	
	
	public UserPrincipal(User user) {
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
	    String role = switch (user) {
	        case Owner ignored -> "ROLE_OWNER";
	        case Admin ignored -> "ROLE_ADMIN";
	        case Client ignored -> "ROLE_CLIENT";
	        default -> throw new IllegalStateException("Unknown user type");
	    };

	    return List.of(new SimpleGrantedAuthority(role));
	}

	@Override
	public @Nullable String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getUsername();
	}
	
	@Override
	public boolean isEnabled() {
	    return true;
	}

}
