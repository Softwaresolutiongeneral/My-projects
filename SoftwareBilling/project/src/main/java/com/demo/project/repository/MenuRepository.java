package com.demo.project.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.project.model.Menufeature;

@Repository
public interface MenuRepository extends JpaRepository<Menufeature,Integer>{

	@Query(value="select * from menufeature where role_id=?1",nativeQuery=true)
	List<Menufeature> findByRoleId(Integer roleId);


}
