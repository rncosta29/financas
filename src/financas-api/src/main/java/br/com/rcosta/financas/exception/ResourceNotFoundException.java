package br.com.rcosta.financas.exception;

public class ResourceNotFoundException extends RuntimeException {

private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundException(String ex) {
		super(ex);
	}
}
