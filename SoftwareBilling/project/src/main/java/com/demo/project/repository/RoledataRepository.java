package com.demo.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.project.model.Roledata;

@Repository
public interface RoledataRepository extends JpaRepository<Roledata, Integer>{

	Optional<Roledata> findByName(String name);

}
