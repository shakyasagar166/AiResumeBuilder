package com.resumecraft.backend.repository;

import com.resumecraft.backend.model.AllowedEmailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AllowedEmailRepository extends JpaRepository<AllowedEmailEntity, Long> {
    Optional<AllowedEmailEntity> findByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCase(String email);
    List<AllowedEmailEntity> findByIsActiveTrue();
}
