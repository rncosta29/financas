package br.com.rcosta.financas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.rcosta.financas.models.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {

	@Query("SELECT p FROM Permission p WHERE p.description = :description")
	List<Permission> findByRole(@Param("description") String description);
}
