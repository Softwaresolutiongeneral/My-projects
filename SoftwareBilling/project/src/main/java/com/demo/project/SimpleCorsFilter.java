package com.demo.project;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class SimpleCorsFilter implements Filter{

	public SimpleCorsFilter() {
	}



	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
	throws IOException, ServletException {
	HttpServletResponse response = (HttpServletResponse) res;
	HttpServletRequest request = (HttpServletRequest) req;
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
	response.setHeader("Access-Control-Max-Age", "3600");
	response.setHeader("Access-Control-Allow-Headers", "*");



	if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
	response.setStatus(HttpServletResponse.SC_OK);
	} else {
	chain.doFilter(req, res);
	}
	}



	@Override
	public void init(FilterConfig filterConfig) {
	}



	@Override
	public void destroy() {
	}

	
}
