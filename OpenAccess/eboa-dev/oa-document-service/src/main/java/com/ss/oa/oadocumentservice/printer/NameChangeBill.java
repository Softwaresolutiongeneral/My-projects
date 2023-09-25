package com.ss.oa.oadocumentservice.printer;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


import com.ss.oashared.common.CommonUtils;
import com.ss.oashared.common.OpenAccessException;
import com.ss.oashared.model.PrintPayload;
import com.ss.oashared.model.NameChangeApplPaymentmodel;
import com.ss.oashared.model.NameChangeApplmodel;

@Service
public class NameChangeBill {

	@Value("${file.location}")
	private String fileLocation;
	
	@Value("${name_change_bill_recipt.url}")
	private String dataServiceUrl;
	
	@Autowired
	CommonUtils commonUtils;

	@Autowired
	private TemplateEngine htmlTemplateEngine;

	private  final String TEMPLATE_NAME = "name-transfer-reciept";
	private  final String FILE_EXTENSION = "pdf";
	
	public PrintPayload process(PrintPayload pl) {
		try {
			pl.setDocId(System.currentTimeMillis()+"");
			
			pl.setFileExtension(FILE_EXTENSION);
			pl.setFileName(TEMPLATE_NAME + pl.getDocId()+"."+pl.getFileExtension());
			pl.setFileNameToUser(pl.getFileName());
			pl.setDocPath(fileLocation  +"/"+TEMPLATE_NAME+"/"+ pl.getFileName());
			
			commonUtils.generatePdf(pl, this.htmlTemplateEngine.process(TEMPLATE_NAME, setContext(fetchReportData(pl))));

		} catch (OpenAccessException oae) {
			throw oae;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
		}

		return pl;	
	}
public NameChangeApplmodel fetchReportData(PrintPayload pl) {	
		
		Map<String, String> ipCriteria = pl.getFilterCriteria();
		String ip1 = ipCriteria.get("applicationid");
		
		String url = "";

		
			url += "?ApplicationId=" + ip1;
		
		
		System.out.println("url with crietria--"+url);

		
	

		return CommonUtils.getTemplate().getForObject(dataServiceUrl+ url, NameChangeApplmodel.class);
	}

public Context setContext(NameChangeApplmodel list) {
	final Context ctx = new Context(Locale.ENGLISH);
	
	
	try {
		Integer totalAmount = 0 ;
		System.out.println("in context--" + list.getBillPayment());
		
		
		System.out.println("test");
		
		for (int i=0; i<list.getBillPayment().size();i++) {
			
			totalAmount = totalAmount + Integer.parseInt(list.getBillPayment().get(i).getChargeTotalAmount()); 
			
		}

		ctx.setVariable("namechangeapplbill", list.getBillPayment());
		ctx.setVariable("billtotalamount",totalAmount );

	}catch(Exception e) {
		e.printStackTrace();
		throw new OpenAccessException(e.getLocalizedMessage());
	}
	return ctx;
}
	
	
	
}
