package com.astraflow.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@SpringBootApplication
@EnableScheduling 
public class ProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}
	
	@GetMapping("/")
	public String hello(){
		return "/*\n"
				+ "    ____________________________________________________________________________________________________________\n"
				+ "\n"
				+ "        Astra Flow | 2026  © Toute reproduction interdite sans l'autorisation de l'auteur. \n"
				+ "        https://astraflow.tv/\n"
				+ "    ____________________________________________________________________________________________________________\n"
				+ "*/";
	}
	
	

}
