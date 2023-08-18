package br.com.rcosta.financas.services;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Arrays;
import java.util.Date;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.rcosta.financas.controller.UserController;
import br.com.rcosta.financas.exception.ResourceNotFoundException;
import br.com.rcosta.financas.mapper.DozzerMapper;
import br.com.rcosta.financas.models.Permission;
import br.com.rcosta.financas.models.UserModel;
import br.com.rcosta.financas.models.vo.UserVO;
import br.com.rcosta.financas.models.vo.security.AccountCredentialsVO;
import br.com.rcosta.financas.models.vo.security.TokenVO;
import br.com.rcosta.financas.repository.PermissionRepository;
import br.com.rcosta.financas.repository.UserRepository;
import br.com.rcosta.financas.security.jwt.JwtTokenProvider;

@Service
public class AuthService {

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PermissionRepository permissionRepository;
	
	@Autowired
	private DelegatingPasswordEncoder passwordEncode;
	
	private Logger logger = Logger.getLogger(AuthService.class.getName());
	
	public ResponseEntity<TokenVO> signin(AccountCredentialsVO data) {
		try {
			var username = data.getUsername();
			var password = data.getPassword();
			
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			var user = userRepository.findByUsername(username);
			var tokenResponse = new TokenVO();
			if(user != null) {
				tokenResponse = tokenProvider.createAccessToken(username, user.getRoles());
			} else {
				throw new UsernameNotFoundException("Username "+username+" not found!!");
			}
			
			return ResponseEntity.ok(tokenResponse);
		} catch (Exception e) {
			throw new BadCredentialsException("Invalid username/password !!!!");
		}
	}

	public ResponseEntity<TokenVO> refreshToken(String username, String refreshToken) {
		var user = userRepository.findByUsername(username);
		var tokenResponse = new TokenVO();
		if(user != null) {
			tokenResponse = tokenProvider.refreshToken(refreshToken);
		} else {
			throw new UsernameNotFoundException("Username "+username+" not found!!");
		}
		
		return ResponseEntity.ok(tokenResponse);
	}
	
	public ResponseEntity<UserVO> save(UserVO model) throws Exception {
		logger.info("Criando um novo usuário");
		
		Permission permission = permissionRepository.findById(2L).orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para esse id!!!"));
		var entity = DozzerMapper.parseObject(model, UserModel.class);
		
		entity.setAccountNonExpired(true);
		entity.setAccountNonLocked(true);
		entity.setCredentialsNonExpired(true);
		entity.setDataCriacao(new Date());
		entity.setEnabled(true);
		entity.setPassword(passwordEncode.encode(model.getPassword()));
		entity.setPermissions(Arrays.asList(permission));
		
		var vo = DozzerMapper.parseObject(userRepository.save(entity), UserVO.class);
		vo.add(linkTo(methodOn(UserController.class).findById(vo.getKey())).withSelfRel());
		
		return ResponseEntity.ok(vo);
	}
	
	public ResponseEntity<UserVO> getUserByToken(String token) {
		String username = tokenProvider.getIdUsuario(token);
		var model = userRepository.findByUsername(username);
		var vo = DozzerMapper.parseObject(model, UserVO.class);
		
		return ResponseEntity.ok(vo);
	}
	/*
	public ResponseEntity<UserVO> save(UserVO model) throws Exception {
		logger.info("Criando um novo usuário");
		
		List<Permission> permission = permissionRepository.findAll();
		var entity = DozzerMapper.parseObject(model, UserModel.class);
		
		entity.setAccountNonExpired(true);
		entity.setAccountNonLocked(true);
		entity.setCredentialsNonExpired(true);
		entity.setDataCriacao(new Date());
		entity.setEnabled(true);
		entity.setPassword(passwordEncode.encode(model.getPassword()));
		entity.setPermissions(permission);
		
		var vo = DozzerMapper.parseObject(userRepository.save(entity), UserVO.class);
		vo.add(linkTo(methodOn(UserController.class).findById(vo.getKey())).withSelfRel());
		
		return ResponseEntity.ok(vo);
	}
	*/
}
