package com.ss.oa.master.namechangeappl;

import org.springframework.data.jpa.repository.JpaRepository;


import com.ss.oashared.model.NameChangeApplStatuslogmodel;

public interface NameChangeAppStatusRepository extends JpaRepository<NameChangeApplStatuslogmodel, String>  {

	
	
}
