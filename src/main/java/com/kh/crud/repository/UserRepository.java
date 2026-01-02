package com.kh.crud.repository;

import com.kh.crud.entity.User;
import com.kh.crud.global.common.CommonEnums;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

//JpaRepository<엔티티, PK타입>
public interface UserRepository extends JpaRepository<User, String> {
    List<User> findByStatus(CommonEnums.Status status);

    List<User> findByUserNameContainingAndStatus(String keyword, CommonEnums.Status status);

    Optional<User> findByUserIdAndStatus(String userId, CommonEnums.Status status);

    boolean existsByUserId(String userId);
}
