package br.com.rcosta.financas.services;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.rcosta.financas.controller.BancoController;
import br.com.rcosta.financas.controller.EstabelecimentoController;
import br.com.rcosta.financas.controller.UserController;
import br.com.rcosta.financas.exception.ResourceNotFoundException;
import br.com.rcosta.financas.mapper.DozzerMapper;
import br.com.rcosta.financas.models.EstabelecimentoModel;
import br.com.rcosta.financas.models.vo.EstabelecimentoVO;
import br.com.rcosta.financas.repository.BancoRepository;
import br.com.rcosta.financas.repository.EstabelecimentoRepository;

@Service
public class EstabelecimentoService {

	private Logger logger = Logger.getLogger(EstabelecimentoService.class.getName());
	
	@Autowired
	private EstabelecimentoRepository estabelecimentoRepository;
	
	@Autowired
	private BancoRepository bancoRepository;
	
//	@Autowired
//	private UserRepository userRepository;
	
	public List<EstabelecimentoVO> findAll() {
		logger.info("Buscando todas as receitas e despesas!");
		
		var estabelecimentos = DozzerMapper.parseListObjects(estabelecimentoRepository.findAll(), EstabelecimentoVO.class);
		
		estabelecimentos
			.stream()
			.forEach(e -> {
				try {
					e.add(linkTo(methodOn(EstabelecimentoController.class).findById(e.getKey())).withSelfRel());
				}
				catch (Exception ex) {
					ex.printStackTrace();
				}
			});
		return estabelecimentos;
	}
	
	public List<EstabelecimentoVO> findAllByBanco(Long banco_id, Long user_id) {
		logger.info("Buscar todos os estabelecimentos do banco");
		
		//var banco = bancoRepository.findById(banco_id).filter(b -> b.getUser_id() == user_id).get();
		var estabelecimentos = DozzerMapper.parseListObjects(estabelecimentoRepository.findAll().stream().filter(e -> e.getBanco_id() == banco_id && e.getBanco().getUser_id() == user_id).toList(), EstabelecimentoVO.class);
		
		return estabelecimentos;
	}
	
	public EstabelecimentoVO findById(Long id) throws Exception {
		logger.info("Buscando uma compra por Id!");
		
		var estabelecimento = estabelecimentoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para esse id!!!"));
		var vo = DozzerMapper.parseObject(estabelecimento, EstabelecimentoVO.class);
		
		vo.add(linkTo(methodOn(EstabelecimentoController.class).findById(vo.getKey())).withSelfRel());
		
		return vo;
	}
	
	public ResponseEntity<EstabelecimentoVO> save(EstabelecimentoVO model) throws Exception {
		logger.info("Criando uma nova conta");
		
		var banco = bancoRepository.findById(model.getBanco_id()).orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para esse id!!!"));
		var entity = DozzerMapper.parseObject(model, EstabelecimentoModel.class);
		
		entity.setEstabelecimento(model.getEstabelecimento());
		entity.setDataCompra(model.getDataCompra());
		entity.setValor(model.getValor());
		entity.setBanco_id(banco.getId());
		entity.setBanco(banco);
		
		var vo = DozzerMapper.parseObject(estabelecimentoRepository.save(entity), EstabelecimentoVO.class);
		vo.add(linkTo(methodOn(BancoController.class).findById(vo.getKey())).withSelfRel());
		
		return ResponseEntity.ok(vo);
	}
	
	public EstabelecimentoVO update(EstabelecimentoVO estabelecimentoVO) throws Exception {
		logger.info("Atualizando um banco!");
		
		var banco = bancoRepository.findById(estabelecimentoVO.getBanco_id()).orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para esse id!!!"));
		var entity = estabelecimentoRepository.findById(estabelecimentoVO.getKey()).orElseThrow(() -> new ResourceNotFoundException("No records found this ID!!!"));
		
		entity.setEstabelecimento(estabelecimentoVO.getEstabelecimento());
		entity.setDataCompra(estabelecimentoVO.getDataCompra());
		entity.setValor(estabelecimentoVO.getValor());
		entity.setBanco(banco);
		
		var vo = DozzerMapper.parseObject(estabelecimentoRepository.save(entity), EstabelecimentoVO.class);
		vo.add(linkTo(methodOn(UserController.class).findById(vo.getKey())).withSelfRel());
		
		return vo;
	}
}
