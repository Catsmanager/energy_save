package org.example.backend.repository;

import org.example.backend.domain.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, String> {
    // 이메일과 날짜로 출석 기록 존재 여부 확인
    boolean existsByUser_EmailIdAndDate(String emailId, LocalDate date);

    // 이메일과 날짜로 출석 기록 조회
    Optional<Attendance> findByUser_EmailIdAndDate(String emailId, LocalDate date);

    // 이메일로 출석 기록 조회
    List<Attendance> findByUser_EmailId(String email);
}
