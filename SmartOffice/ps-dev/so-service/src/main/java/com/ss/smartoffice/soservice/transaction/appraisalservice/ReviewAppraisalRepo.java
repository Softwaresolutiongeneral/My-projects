package com.ss.smartoffice.soservice.transaction.appraisalservice;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReviewAppraisalRepo extends CrudRepository<ReviewAppraisal, Integer>{
	
	@Query("select i from com.ss.smartoffice.soservice.transaction.appraisalservice.ReviewAppraisal i "
			+ "where ifnull(LOWER(i.empId),'') LIKE LOWER(CONCAT('%',ifnull(:empId,''), '%')) "
			+ "AND ifnull(LOWER(i.metricId),'') LIKE LOWER(CONCAT('%',ifnull(:metricId,''), '%'))"
			+ "AND ifnull(LOWER(i.reviewTypeCode),'') LIKE LOWER(CONCAT('%',ifnull(:reviewTypeCode,''), '%'))")
	
	Iterable<ReviewAppraisal> fetchByAdvanceFilter(
			@Param("empId")String empId,
			@Param("metricId") String metricId,
			@Param("reviewTypeCode")String reviewTypeCode
			);

	Iterable<ReviewAppraisal> findByFyCode(String fyCode);
		

}
