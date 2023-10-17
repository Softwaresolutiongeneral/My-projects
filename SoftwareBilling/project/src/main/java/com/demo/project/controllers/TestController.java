package com.demo.project.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.project.model.Menufeature;
import com.demo.project.model.Role;
import com.demo.project.model.Roledata;
import com.demo.project.repository.MenuRepository;
import com.demo.project.repository.RoleRepository;
import com.demo.project.repository.RoledataRepository;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {
	
	@Autowired
	MenuRepository menuRepo;
	
	@Autowired 
	RoledataRepository roleRepo;

	@GetMapping("/all")
	  public String allAccess() {
	    return "Public Content.";
	  }

	  @GetMapping("/user")
	  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	  public String userAccess() {
	    return "User Content.";
	  }

	  @GetMapping("/mod")
	  @PreAuthorize("hasRole('MODERATOR')")
	  public String moderatorAccess() {
	    return "Moderator Board.";
	  }

	  @GetMapping("/admin")
	  public String adminAccess() {
	    return "Admin Board.";
	  }
	  
	  
	  // Get screen based on role
	  @GetMapping("/menu/{roleId}")
	  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	  public List<Menufeature> getMenu(@PathVariable Integer roleId){
		  return menuRepo.findByRoleId(roleId);
	  }
	  
	  //Get roles by name
	  @GetMapping ("/roles/{name}")
	  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	  public Optional<Roledata> getAllRoles(@PathVariable String name){
		  return roleRepo.findByName(name);
	  }
	  
	  //Get all roles 
	  @GetMapping("/all/roles")
	  public List<Roledata> getRoles(){
		  return roleRepo.findAll();
	  }
	  
}
