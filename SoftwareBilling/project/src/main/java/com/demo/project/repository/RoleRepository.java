package com.demo.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.project.model.ERole;
import com.demo.project.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

	 Optional<Role> findByName(ERole name);
	
}
