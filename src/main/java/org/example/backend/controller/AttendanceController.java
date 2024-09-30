package org.example.backend.controller;

import org.example.backend.dto.AttendanceDTO;
import org.example.backend.dto.auth.UserDTO;
import org.example.backend.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.backend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private UserService userService;

    // 사용자의 출석 정보를 가져오기 위해 사용합니다.
    @GetMapping("/user/{email}")
    public UserDTO getUserDetails(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    // 사용자의 모든 출석 항목을 가져오기 위해 사용합니다.
    @GetMapping("/all/{email}")
    public List<AttendanceDTO> getAttendanceByEmail(@PathVariable String email) {
        return attendanceService.getChecklistByEmail(email);
    }

    // 출석 엔드포인트
    @PostMapping("/check-in")
    public ResponseEntity<AttendanceDTO> checkIn(@RequestBody AttendanceDTO attendanceDTO) {
        try {
            System.out.println("Check-in Request: " + attendanceDTO);  // 로그 출력

            AttendanceDTO result = attendanceService.checkIn(attendanceDTO.getEmail(), attendanceDTO.getDate());

            System.out.println("Check-in Response: " + result);  // 로그 출력
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            System.err.println("Check-in Error: " + e.getMessage());  // 에러 로그 출력
            return ResponseEntity.badRequest().body(null);
        }
    }


    // 오늘의 출석 상태 조회 엔드포인트
    @GetMapping("/today/{email}")
    public AttendanceDTO getTodayAttendance(@PathVariable String emailId) {
        return attendanceService.getTodayAttendance(emailId);
    }
}
