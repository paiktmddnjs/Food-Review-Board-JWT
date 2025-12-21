package com.kh.crud.repository;

import com.kh.crud.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

                                   //JpaRepository<엔티티, PK타입>
public interface UserRepository extends JpaRepository<User, String> {
}
