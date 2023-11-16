package br.com.rcosta.financas.models;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "banco")
public class BancoModel implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome_banco")
	private String nomeBanco;
	
	@Column(name = "url_imagem")
	private String urlImagem;
	
	@Column(name = "user_id")
	private Long user_id;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinTable(name = "user_banco", joinColumns = {@JoinColumn (name = "id_banco")},
		inverseJoinColumns = {@JoinColumn (name = "id_user")})
	private UserModel user;

	public BancoModel() { }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public UserModel getUser() {
		return user;
	}

	public void setUser(UserModel user) {
		this.user = user;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, nomeBanco, urlImagem, user, user_id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BancoModel other = (BancoModel) obj;
		return Objects.equals(id, other.id) && Objects.equals(nomeBanco, other.nomeBanco)
				&& Objects.equals(urlImagem, other.urlImagem) && Objects.equals(user, other.user)
				&& Objects.equals(user_id, other.user_id);
	}
}
