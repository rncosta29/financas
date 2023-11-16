package br.com.rcosta.financas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.rcosta.financas.models.EstabelecimentoModel;

@Repository
public interface EstabelecimentoRepository extends JpaRepository<EstabelecimentoModel, Long> {

}
