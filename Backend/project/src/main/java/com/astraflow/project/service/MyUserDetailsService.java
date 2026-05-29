package com.astraflow.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.astraflow.project.repository.UserRepository;
import com.astraflow.project.model.User;
import com.astraflow.project.model.UserPrincipal;


@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository repo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		
		User user = repo.findByUsername(username);
		
		if(user == null) {
			throw new UsernameNotFoundException(username + "not found");
		}
		
		return new UserPrincipal(user);
		
	}

}
