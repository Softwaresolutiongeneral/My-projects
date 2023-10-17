package com.demo.project.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdatePasswordRequest {
	
	@NotBlank
	  private String username;
	
	@NotBlank
	  @Size(min = 6, max = 40)
	  private String oldPassword;
	
	@NotBlank
	  @Size(min = 6, max = 40)
	    private String newPassword;
	
	
		public String getOldPassword() {
			return oldPassword;
		}
		public void setOldPassword(String oldPassword) {
			this.oldPassword = oldPassword;
		}
		public String getNewPassword() {
			return newPassword;
		}
		public void setNewPassword(String newPassword) {
			this.newPassword = newPassword;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
	    
	    
	    
	    
}
