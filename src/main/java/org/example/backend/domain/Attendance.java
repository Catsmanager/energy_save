package org.example.backend.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Table(name = "attendance")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "email_id")
    private User user;  // User 엔티티와 연관관계

    @Column(name = "check_in_date", nullable = false)  // 테이블 필드명에 맞춰서 변경
    private LocalDate date;  // 출석한 날짜
}
