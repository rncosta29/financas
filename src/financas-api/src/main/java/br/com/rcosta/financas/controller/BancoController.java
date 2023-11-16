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
import br.com.rcosta.financas.services.BancoService;
import br.com.rcosta.financas.util.MediaType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/banco")
@Tag(name = "Banco", description = "Endpoints para gerenciar os bancos")
public class BancoController {

	@Autowired
	private BancoService bancoService;
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Encontrar todos os bancos", description = "Encontre todos os bancos", tags = {"Banco"}, responses = {
			@ApiResponse(description = "Success", responseCode = "200", content = {
					@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = BancoVO.class)))
			}),
			@ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public List<BancoVO> findByAll() throws Exception {
		return bancoService.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:8088")
	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Encontre um banco", description = "Encontre um banco por id", tags = {"Banco"}, responses = {
			@ApiResponse(description = "Success", responseCode = "200", content = 
					@Content(schema = @Schema(implementation = BancoVO.class))
			),
			@ApiResponse(description = "Bad Request", responseCode = "204", content = @Content),
			@ApiResponse(description = "No Content", responseCode = "400", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public BancoVO findById(@PathVariable(value = "id") Long id) throws Exception {
		
		return bancoService.findById(id);
	}
	
	@CrossOrigin(origins = { "http://localhost:8088", "http://localhost:19002" })
	@PostMapping(value = "/create", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML }, consumes = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Criando um novo card de banco", description = "Criando um novo card de banco", tags = {"Banco"}, responses = {
			@ApiResponse(description = "Success", responseCode = "200", content = 
					@Content(schema = @Schema(implementation = BancoVO.class))
			),
			@ApiResponse(description = "Bad Request", responseCode = "204", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public ResponseEntity<BancoVO> create(@RequestBody BancoVO model) throws Exception {
		return bancoService.save(model);
	}
	
	@PutMapping(produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML }, consumes = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
	@Operation(summary = "Atualizando uma conta", description = "Atualizando uma conta", tags = {"Banco"}, responses = {
			@ApiResponse(description = "Updated", responseCode = "200", content = 
					@Content(schema = @Schema(implementation = BancoVO.class))
			),
			@ApiResponse(description = "Bad Request", responseCode = "204", content = @Content),
			@ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
			@ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
			@ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content)
	})
	public ResponseEntity<BancoVO> update(@RequestBody BancoVO bancoVO) throws Exception {
		
		return ResponseEntity.ok(bancoService.update(bancoVO));
	}
}
