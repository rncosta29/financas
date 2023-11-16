package br.com.rcosta.financas.services;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.rcosta.financas.controller.BancoController;
import br.com.rcosta.financas.controller.UserController;
import br.com.rcosta.financas.exception.ResourceNotFoundException;
import br.com.rcosta.financas.mapper.DozzerMapper;
import br.com.rcosta.financas.models.BancoModel;
import br.com.rcosta.financas.models.vo.BancoVO;
import br.com.rcosta.financas.repository.BancoRepository;
import br.com.rcosta.financas.repository.UserRepository;

@Service
public class BancoService {

	private Logger logger = Logger.getLogger(BancoService.class.getName());
	
	@Autowired
	private BancoRepository bancoRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<BancoVO> findAll() {
		logger.info("Buscar todos os Bancos");
		
		var bancos = DozzerMapper.parseListObjects(bancoRepository.findAll(), BancoVO.class);
		
		bancos
			.stream()
			.forEach(b -> {
				try {
					b.add(linkTo(methodOn(BancoController.class).findById(b.getKey())).withSelfRel());
				}
				catch (Exception e) {
					e.printStackTrace();
				}
			});
		return bancos;
	}
	
	public BancoVO findById(Long id) throws Exception {
		logger.info("Encontrar um banco por id");
		
		var banco = bancoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para esse id!!!"));
		
		var vo = DozzerMapper.parseObject(banco, BancoVO.class);
		//var vo = DozzerMapper.parseObject(bancoRepository.save(banco), BancoVO.class);
		vo.add(linkTo(methodOn(BancoController.class).findById(vo.getKey())).withSelfRel());
		
		return vo;
	}
	
	public ResponseEntity<BancoVO> save(BancoVO model) throws Exception {
		logger.info("Criando uma nova conta");
		
		var user = userRepository.findById(model.getUser_id()).orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para esse id!!!"));
		var entity = DozzerMapper.parseObject(model, BancoModel.class);
		
		entity.setNomeBanco(model.getNomeBanco());
		entity.setUrlImagem(model.getUrlImagem());
		entity.setUser(user);
		entity.setUser_id(user.getId());
		
		var vo = DozzerMapper.parseObject(bancoRepository.save(entity), BancoVO.class);
		vo.add(linkTo(methodOn(BancoController.class).findById(vo.getKey())).withSelfRel());
		
		return ResponseEntity.ok(vo);
	}
	
	public BancoVO update(BancoVO bancoVO) throws Exception {
		logger.info("Atualizando um banco!");
		
		var entity = bancoRepository.findById(bancoVO.getKey()).orElseThrow(() -> new ResourceNotFoundException("No records found this ID!!!"));
		
		entity.setNomeBanco(bancoVO.getNomeBanco());
		entity.setUrlImagem(bancoVO.getUrlImagem());
		
		var vo = DozzerMapper.parseObject(bancoRepository.save(entity), BancoVO.class);
		vo.add(linkTo(methodOn(UserController.class).findById(vo.getKey())).withSelfRel());
		
		return vo;
	}
}
