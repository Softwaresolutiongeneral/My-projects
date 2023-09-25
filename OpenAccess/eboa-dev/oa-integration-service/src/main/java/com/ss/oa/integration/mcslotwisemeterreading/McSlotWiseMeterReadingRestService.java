package com.ss.oa.integration.mcslotwisemeterreading;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss.oa.common.IntegrationRestService;
import com.ss.oa.vo.McSlotWiseMeterReading;
import com.ss.oashared.common.OpenAccessException;

@RestController
public class McSlotWiseMeterReadingRestService extends IntegrationRestService {
	@Autowired
	McSlotWiseMeterReadingService service;
	
 @RequestMapping(value="/mc-slotwise-meterreadings", method = RequestMethod.GET)
	public ResponseEntity<List<McSlotWiseMeterReading>> getAllSlotWiseMeterReading(@RequestParam(name="meter-number",required=false) String meterNumber,			
     	@RequestParam(name="service-number",required=false) String serviceNumber,
	    @RequestParam(name="initial-reading-date",required=false) String initialReadingDate,
	    @RequestParam(name="final-reading-date",required=false) String finalReadingDate,
	    @RequestParam(name="month",required=false) String month,
	    @RequestParam(name="year",required=false) String year
	   )
  {

try {
			
	Map<String,String> criteria =new HashMap<String,String>();
	if(meterNumber!=null) {
		criteria.put("meter-number",meterNumber);
	}
	if(serviceNumber!=null) {
		criteria.put("service-number",serviceNumber);
	}
	if(initialReadingDate!=null) {
		criteria.put("initial-reading-date",initialReadingDate);
	}	
	if(finalReadingDate!=null) {
		criteria.put("final-reading-date",finalReadingDate);
	}		
	if(month!=null) {
		criteria.put("month",month);
	}
	if(year!=null) {
		criteria.put("year",year);
	}
	return ResponseEntity.ok(service.getAllSlotWiseMeterReading(criteria));
	
} catch(Exception e) {
	e.printStackTrace();				
	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
}

  }
 
	@RequestMapping(value="/mc-slotwise-meterreadings/{id}", method = RequestMethod.GET)
	public ResponseEntity<McSlotWiseMeterReading> getSlotWiseMeterReadingById(@PathVariable("id")String id)
	{
		try {
			return ResponseEntity.ok(service.getSlotWiseMeterReadingById(id));
		}catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}
	@RequestMapping(value="/_internal/mc-slotwise-meterreadings", method = RequestMethod.GET)
	public ResponseEntity<List<McSlotWiseMeterReading>> getSlotWiseMeterReadingInternal(@RequestParam(name="meter-number",required=false) String meterNumber,			
	     	@RequestParam(name="service-number",required=false) String serviceNumber,
		    @RequestParam(name="initial-reading-date",required=false) String initialReadingDate,
		    @RequestParam(name="final-reading-date",required=false) String finalReadingDate,
		    @RequestParam(name="month",required=false) String month,
		    @RequestParam(name="year",required=false) String year
		   )throws OpenAccessException{
			return getAllSlotWiseMeterReading(meterNumber, serviceNumber, initialReadingDate, finalReadingDate, month, year);
		
	}

}
