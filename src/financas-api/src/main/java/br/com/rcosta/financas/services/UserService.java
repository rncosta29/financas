package br.com.rcosta.financas.services;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.rcosta.financas.controller.UserController;
import br.com.rcosta.financas.exception.ResourceNotFoundException;
import br.com.rcosta.financas.mapper.DozzerMapper;
import br.com.rcosta.financas.models.vo.UserVO;
import br.com.rcosta.financas.repository.PermissionRepository;
import br.com.rcosta.financas.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

private Logger logger = Logger.getLogger(UserService.class.getName());
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PermissionRepository permissionRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		logger.info("Finding one user by name " + username + "!");
		var user = userRepository.findByUsername(username);
		
		if (user != null) {
			return user;
		} else {
			throw new UsernameNotFoundException("Username " + username + " not found!");
		}
	}
	
	public List<UserVO> findAll() {
		logger.info("Listar todos os usuários");
		
		var usuarios = DozzerMapper.parseListObjects(userRepository.findAll(), UserVO.class);
		usuarios
			.stream()
			.forEach(u -> {
				try {
					u.add(linkTo(methodOn(UserController.class).findById(u.getKey())).withSelfRel());
				} catch (Exception e) {
					e.printStackTrace();
				}
			});
		return usuarios;
	}
	
	public UserVO findById(Long id) throws Exception {
		logger.info("Encontrar um usuário por id");
		
		var usuario = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para esse id!!!"));
		
		var vo = DozzerMapper.parseObject(userRepository.save(usuario), UserVO.class);
		vo.add(linkTo(methodOn(UserController.class).findById(vo.getKey())).withSelfRel());
		
		return vo;
	}
	
	public UserVO update(UserVO userVO) throws Exception {
		logger.info("Updating one person!");
		
		var entity = userRepository.findById(userVO.getKey()).orElseThrow(() -> new ResourceNotFoundException("No records found this ID!!!"));
		
		entity.setUserName(userVO.getUserName());
		entity.setEmail(userVO.getEmail());
		entity.setDataAtualizacao(new Date());
		
		var vo = DozzerMapper.parseObject(userRepository.save(entity), UserVO.class);
		vo.add(linkTo(methodOn(UserController.class).findById(vo.getKey())).withSelfRel());
		
		return vo;
	}
}
