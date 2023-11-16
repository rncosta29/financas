package br.com.rcosta.financas.models;

import java.io.Serializable;
import java.util.Date;
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
@Table(name = "estabelecimento")
public class EstabelecimentoModel implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "data_compra")
	private Date dataCompra;
	
	@Column(name = "estabelecimento")
	private String estabelecimento;
	
	@Column(name = "valor")
	private Double valor;
	
	@Column(name = "banco_id")
	private Long banco_id;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinTable(name = "estabelecimento_banco", joinColumns = {@JoinColumn (name = "id_estabelecimento")},
		inverseJoinColumns = {@JoinColumn (name = "id_banco")})
	private BancoModel banco;
	
	public EstabelecimentoModel() { }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public BancoModel getBanco() {
		return banco;
	}

	public void setBanco(BancoModel banco) {
		this.banco = banco;
	}

	public Long getBanco_id() {
		return banco_id;
	}

	public void setBanco_id(Long banco_id) {
		this.banco_id = banco_id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(banco, banco_id, dataCompra, estabelecimento, id, valor);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EstabelecimentoModel other = (EstabelecimentoModel) obj;
		return Objects.equals(banco, other.banco) && Objects.equals(banco_id, other.banco_id)
				&& Objects.equals(dataCompra, other.dataCompra)
				&& Objects.equals(estabelecimento, other.estabelecimento) && Objects.equals(id, other.id)
				&& Objects.equals(valor, other.valor);
	}
}
