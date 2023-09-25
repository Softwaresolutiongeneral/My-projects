package com.ss.smartoffice.sonotificationservice.employee;

import java.util.Locale;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.ss.smartoffice.shared.common.CommonUtils;
import com.ss.smartoffice.shared.model.SmartOfficeException;
import com.ss.smartoffice.sonotificationservice.common.SmsHelper;
import com.ss.smartoffice.sonotificationservice.model.Employee;
@Service
public class EmployeeAcc1ManagerUpdateService {
	private static final String EMAIL_ACC1_UPDATE_TEMPLATE_NAME="html/employee-acc1-update";
	@Autowired
	SmsHelper smsHelper;
	
	@Autowired
	CommonUtils commonUtils;

	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private TemplateEngine htmlTemplateEngine;
	public void updateAcc1ManagerToSelectedEmp(Employee employee) {
		try {
			final Context ctx = new Context(Locale.ENGLISH);
			ctx.setVariable("empName", employee.getEmpName());
			ctx.setVariable("managerName", employee.getManagerName());
			final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
			final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true /* multipart */, "UTF-8");
			message.setSubject("Your Acc-1 Manager has Been Changed");
			message.setFrom(commonUtils.getSenderEmail());
			message.setTo(employee.getContactEmailId());
			final String htmlContent= this.htmlTemplateEngine.process(EMAIL_ACC1_UPDATE_TEMPLATE_NAME, ctx);
			message.setText(htmlContent, true /* isHtml */);
			// Send mail
			this.mailSender.send(mimeMessage);
		}catch (Exception e) {
			e.printStackTrace();
			throw new SmartOfficeException(e.getMessage());
		}
		
	}

}
