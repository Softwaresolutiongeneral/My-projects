package com.demo.project.model;

import java.math.BigInteger;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="menufeature")
public class Menufeature {
	@Id
	private Integer Id;
	private Integer roleId;
	private BigInteger menuId;
	private String menuName;
	private String Icon;
	private String Landingpage;
	
	public Menufeature() {
		
	}

	public Menufeature(Integer id, Integer roleId, BigInteger menuId, String menuName, String icon,
			String landingpage) {
		super();
		Id = id;
		this.roleId = roleId;
		this.menuId = menuId;
		this.menuName = menuName;
		Icon = icon;
		Landingpage = landingpage;
	}

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public BigInteger getMenuId() {
		return menuId;
	}

	public void setMenuId(BigInteger menuId) {
		this.menuId = menuId;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getIcon() {
		return Icon;
	}

	public void setIcon(String icon) {
		Icon = icon;
	}

	public String getLandingpage() {
		return Landingpage;
	}

	public void setLandingpage(String landingpage) {
		Landingpage = landingpage;
	}

	
}
