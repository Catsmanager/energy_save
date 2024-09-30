package org.example.backend.service;

import jakarta.transaction.Transactional;
import org.example.backend.domain.Attendance;
import org.example.backend.domain.User;
import org.example.backend.dto.AttendanceDTO;
import org.example.backend.repository.AttendanceRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    // 이메일로 사용자의 모든 출석 데이터 가져오기
    public List<AttendanceDTO> getChecklistByEmail(String emailId) {
        return attendanceRepository.findByUser_EmailId(emailId)  // 수정된 메소드명 사용
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Attendance 엔티티를 AttendanceDTO로 변환
    private AttendanceDTO convertToDTO(Attendance attendance) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setId(attendance.getId());
        dto.setEmail(attendance.getUser().getEmailId()); // 이메일 설정
        dto.setDate(attendance.getDate()); // LocalDate 타입으로 설정
        return dto;
    }

    // AttendanceDTO를 Attendance 엔티티로 변환
    private Attendance convertToEntity(AttendanceDTO attendanceDTO, User user) {
        // 빌더 패턴을 사용하여 Attendance 객체 생성
        return Attendance.builder()
                .id(attendanceDTO.getId())  // id 설정
                .date(attendanceDTO.getDate())  // 날짜 설정
                .user(user)  // 유저 설정
                .build();
    }
    // 출석 체크 로직
    public AttendanceDTO checkIn(String emailId, LocalDate date) {
        // 이메일로 유저 검색
        Optional<User> optionalUser = userRepository.findByEmailId(emailId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // 이미 오늘 출석한 기록이 있는지 확인
            boolean alreadyCheckedIn = attendanceRepository.existsByUser_EmailIdAndDate(emailId, date);
            if (alreadyCheckedIn) {
                throw new RuntimeException("You have already checked in today.");
            }

            // 빌더 패턴을 사용하여 새로운 출석 엔티티 생성
            Attendance attendance = Attendance.builder()
                    .user(user)
                    .date(date)
                    .build();

            // 저장 후 DTO로 변환하여 반환
            return convertToDTO(attendanceRepository.save(attendance));
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // 오늘의 출석 상태 조회
    public AttendanceDTO getTodayAttendance(String email) {
        LocalDate today = LocalDate.now();  // 오늘 날짜 가져오기

        // 오늘 출석한 기록이 있는지 확인
        Optional<Attendance> attendance = attendanceRepository.findByUser_EmailIdAndDate(email, today);

        // 오늘 출석한 경우 DTO로 변환하여 반환하고, 그렇지 않으면 예외 발생
        return attendance.map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("No attendance found for today"));
    }

}
