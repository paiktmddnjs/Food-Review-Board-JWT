package com.kh.crud.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "likes",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"userId", "post_id"})})
@Getter
@Setter
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
}
