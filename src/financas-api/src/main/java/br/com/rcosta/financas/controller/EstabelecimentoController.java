package br.com.rcosta.financas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.rcosta.financas.models.vo.BancoVO;
import br.com.rcosta.financas.models.vo.EstabelecimentoVO;
import br.com.rcosta.financas.services.EstabelecimentoService;
import br.com.rcosta.financas.util.MediaType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/estabelecimento")
@Tag(name = "Estabelecimento", description = "Endpoints para gerenciar todas as compras")
public class EstabelecimentoController {

	@Autowired
	private EstabelecimentoService estabelecimentoService;
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Encontrar todas as compras", description = "Encontre todas as compras", tags = {"Estabelecimento"}, responses = {
			@ApiResponse(description = "Success", responseCode = "200", content = {
					@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = EstabelecimentoVO.class)))
			}),
			@ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public List<EstabelecimentoVO> findAll() throws Exception {
		return estabelecimentoService.findAll();
	}
	
	@GetMapping(value = "/{banco_id}/{user_id}",produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Encontrar todas as compras", description = "Encontre todas as compras", tags = {"Estabelecimento"}, responses = {
			@ApiResponse(description = "Success", responseCode = "200", content = {
					@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = EstabelecimentoVO.class)))
			}),
			@ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public List<EstabelecimentoVO> findByAllByBanco(@PathVariable(value = "banco_id") Long banco_id, @PathVariable(value = "user_id") Long user_id) throws Exception {
		return estabelecimentoService.findAllByBanco(banco_id, user_id);
	}
	
	@CrossOrigin(origins = "http://localhost:8088")
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Encontre uma compra", description = "Encontre uma compra por id", tags = {"Estabelecimento"}, responses = {
			@ApiResponse(description = "Success", responseCode = "200", content = 
					@Content(schema = @Schema(implementation = EstabelecimentoVO.class))
			),
			@ApiResponse(description = "Bad Request", responseCode = "204", content = @Content),
			@ApiResponse(description = "No Content", responseCode = "400", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public EstabelecimentoVO findById(@PathVariable(value = "id") Long id) throws Exception {
		
		return estabelecimentoService.findById(id);
	}
	
	@CrossOrigin(origins = { "http://localhost:8088", "http://localhost:19002" })
	@PostMapping(value = "/create", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML }, consumes = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Criando um novo consumo", description = "Criando um novo consumo", tags = {"Estabelecimento"}, responses = {
			@ApiResponse(description = "Success", responseCode = "200", content = 
					@Content(schema = @Schema(implementation = BancoVO.class))
			),
			@ApiResponse(description = "Bad Request", responseCode = "204", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public ResponseEntity<EstabelecimentoVO> create(@RequestBody EstabelecimentoVO model) throws Exception {
		return estabelecimentoService.save(model);
	}
	
	@PutMapping(produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML }, consumes = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Atualizando uma conta", description = "Atualizando uma conta", tags = {"Estabelecimento"}, responses = {
			@ApiResponse(description = "Updated", responseCode = "200", content = 
					@Content(schema = @Schema(implementation = BancoVO.class))
			),
			@ApiResponse(description = "Bad Request", responseCode = "204", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public ResponseEntity<EstabelecimentoVO> update(@RequestBody EstabelecimentoVO estabelecimentoVO) throws Exception {
		
		return ResponseEntity.ok(estabelecimentoService.update(estabelecimentoVO));
	}
}
