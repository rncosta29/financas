package br.com.rcosta.financas.models.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import org.springframework.hateoas.RepresentationModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.github.dozermapper.core.Mapping;

@JsonPropertyOrder({"id", "nomeBanco", "urlImagem", "userId"})
public class EstabelecimentoVO extends RepresentationModel<EstabelecimentoVO> implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonProperty("id")
	@Mapping("id")
	private Long key;
	private Date dataCompra;
	private String estabelecimento;
	private Double valor;
	private BancoVO banco;
	private Long banco_id;
	
	public EstabelecimentoVO() { }

	public Long getKey() {
		return key;
	}

	public void setKey(Long key) {
		this.key = key;
	}

	public Date getDataCompra() {
		return dataCompra;
	}

	public void setDataCompra(Date dataCompra) {
		this.dataCompra = dataCompra;
	}

	public String getEstabelecimento() {
		return estabelecimento;
	}

	public void setEstabelecimento(String estabelecimento) {
		this.estabelecimento = estabelecimento;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public Long getBanco_id() {
		return banco_id;
	}

	public void setBanco_id(Long banco_id) {
		this.banco_id = banco_id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + Objects.hash(banco_id, dataCompra, estabelecimento, key, valor);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		EstabelecimentoVO other = (EstabelecimentoVO) obj;
		return Objects.equals(banco_id, other.banco_id) && Objects.equals(dataCompra, other.dataCompra)
				&& Objects.equals(estabelecimento, other.estabelecimento) && Objects.equals(key, other.key)
				&& Objects.equals(valor, other.valor);
	}

	public BancoVO getBanco() {
		return banco;
	}

	public void setBanco(BancoVO banco) {
		this.banco = banco;
	}
}
