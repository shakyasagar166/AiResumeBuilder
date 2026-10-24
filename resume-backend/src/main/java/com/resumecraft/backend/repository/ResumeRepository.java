package com.resumecraft.backend.repository;

import com.resumecraft.backend.model.ResumeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<ResumeEntity, Long> {
    List<ResumeEntity> findByUserEmailOrderByUpdatedAtDesc(String userEmail);
    Optional<ResumeEntity> findFirstByUserEmailOrderByUpdatedAtDesc(String userEmail);
}
