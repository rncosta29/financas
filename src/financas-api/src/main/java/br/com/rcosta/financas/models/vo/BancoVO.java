package br.com.rcosta.financas.models.vo;

import java.io.Serializable;
import java.util.Objects;

import org.springframework.hateoas.RepresentationModel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.github.dozermapper.core.Mapping;

@JsonPropertyOrder({"id", "nomeBanco", "urlImagem", "userId"})
public class BancoVO extends RepresentationModel<BancoVO> implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonProperty("id")
	@Mapping("id")
	private Long key;
	private String nomeBanco;
	private String urlImagem;
	private Long user_id;
	
	public BancoVO() { }

	public Long getKey() {
		return key;
	}

	public void setKey(Long key) {
		this.key = key;
	}

	public String getNomeBanco() {
		return nomeBanco;
	}

	public void setNomeBanco(String nomeBanco) {
		this.nomeBanco = nomeBanco;
	}

	public String getUrlImagem() {
		return urlImagem;
	}

	public void setUrlImagem(String urlImagem) {
		this.urlImagem = urlImagem;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + Objects.hash(key, nomeBanco, urlImagem, user_id);
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
		BancoVO other = (BancoVO) obj;
		return Objects.equals(key, other.key) && Objects.equals(nomeBanco, other.nomeBanco)
				&& Objects.equals(urlImagem, other.urlImagem) && Objects.equals(user_id, other.user_id);
	}
}
