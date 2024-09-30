package org.example.backend.service;

import jakarta.transaction.Transactional;
import org.example.backend.domain.Checklist;
import org.example.backend.domain.User;
import org.example.backend.dto.ChecklistDTO;
import org.example.backend.repository.ChecklistRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ChecklistService {
    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private UserRepository userRepository;

    // 이메일로 체크리스트 가져오기
    public List<ChecklistDTO> getChecklistByEmail(String emailId) {
        return checklistRepository.findByUserEmailId(emailId)  // 수정된 메소드명 사용
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 새 체크리스트 항목 추가
    public ChecklistDTO addTask(String emailId, String text) {
        // 이메일로 유저 검색
        Optional<User> optionalUser = userRepository.findByEmailId(emailId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();  // 유저가 존재하면 가져옴

            Checklist task = new Checklist();
            task.setUser(user);  // 체크리스트에 유저 연결
            task.setText(text);
            task.setCompleted(false);

            return convertToDTO(checklistRepository.save(task));  // 저장 후 DTO로 반환
        } else {
            throw new RuntimeException("User not found");  // 유저가 없을 경우 예외 발생
        }
    }

    // 체크리스트 항목 삭제
    public void deleteTask(Long id) {
        checklistRepository.deleteById(id);
    }

    // 체크 했는지 안 했는지 확인
    public ChecklistDTO updateTask(Long id, ChecklistDTO checklistDTO) {
        Optional<Checklist> optionalTask = checklistRepository.findById(id);
        if (optionalTask.isPresent()) {
            Checklist task = optionalTask.get();
            task.setCompleted(checklistDTO.isCompleted()); // 업데이트할 상태 설정
            return convertToDTO(checklistRepository.save(task)); // 저장 후 DTO 반환
        } else {
            throw new RuntimeException("Task not found");
        }
    }

    // Checklist 엔티티를 ChecklistDTO로 변환
    private ChecklistDTO convertToDTO(Checklist checklist) {
        ChecklistDTO dto = new ChecklistDTO();
        dto.setId(checklist.getId());
        dto.setText(checklist.getText());
        dto.setCompleted(checklist.isCompleted());
        return dto;
    }

    // ChecklistDTO를 Checklist 엔티티로 변환
    private Checklist convertToEntity(ChecklistDTO checklistDTO, User user) {
        Checklist checklist = new Checklist();
        checklist.setId(checklistDTO.getId());
        checklist.setText(checklistDTO.getText());
        checklist.setCompleted(checklistDTO.isCompleted());
        checklist.setUser(user);
        return checklist;
    }
}
