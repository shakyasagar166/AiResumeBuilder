package com.resumecraft.backend.repository;

import com.resumecraft.backend.model.UserUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserUsageRepository extends JpaRepository<UserUsage, Long> {
    Optional<UserUsage> findByUserIdentifier(String userIdentifier);
}
