package br.com.rcosta.financas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rcosta.financas.models.vo.UserVO;
import br.com.rcosta.financas.models.vo.security.AccountCredentialsVO;
import br.com.rcosta.financas.services.AuthService;
import br.com.rcosta.financas.util.MediaType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Authentication", description = "Authentication Endpoint")
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;
	
	@SuppressWarnings("rawtypes")
	@Operation(summary = "Authenticates a User and return token!", tags = {"Authentication"})
	@PostMapping(value = "/signin")
	public ResponseEntity signin(@RequestBody AccountCredentialsVO data) {
		
		if(checkIfParamsIsNotNull(data))
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
		
		var token = authService.signin(data);
		if(token == null)
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
		
		return token;
	}
	
	@SuppressWarnings("rawtypes")
	@Operation(summary = "Refresh token for authenticated user and return a token!", tags = {"Authentication"})
	@PutMapping(value = "/refresh/{username}")
	public ResponseEntity refreshToken(@PathVariable("username") String username, @RequestHeader("Authorization") String refreshToken) {
		
		if(checkIfParamsIsNotNull(username, refreshToken))
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
		
		var token = authService.refreshToken(username, refreshToken);
		if(token == null)
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
		
		return token;
	}
	
	@CrossOrigin(origins = { "http://localhost:8080" })
	@PostMapping(value = "/create", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML }, consumes = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Criando um novo usuário", description = "Criando um novo usuário", tags = {"Authentication"}, responses = {
			@ApiResponse(description = "Success", responseCode = "200", content = 
					@Content(schema = @Schema(implementation = UserVO.class))
			),
			@ApiResponse(description = "Bad Request", responseCode = "204", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public ResponseEntity<UserVO> create(@RequestBody UserVO vo) throws Exception {
		
		return authService.save(vo);
	}
	
	private boolean checkIfParamsIsNotNull(AccountCredentialsVO data) {
		return data == null || data.getUsername() == null || data.getUsername().isBlank() ||
				data.getPassword() == null || data.getPassword().isBlank();
	}
	
	private boolean checkIfParamsIsNotNull(String username, String refreshToken) {
		return refreshToken == null || refreshToken.isBlank() || username == null || username.isBlank();
	}
}
