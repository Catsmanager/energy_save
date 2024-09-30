package org.example.backend.controller;

import org.example.backend.dto.ChecklistDTO;
import org.example.backend.dto.auth.UserDTO;
import org.example.backend.service.ChecklistService;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checklist")
public class ChecklistController {

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private UserService userService;

    // 사용자의 정보를 가져오기 위해 사용합니다.
    @GetMapping("/user/{email}")
    public UserDTO getUserDetails(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    // 사용자의 체크리스트 항목을 가져오기 위해 사용합니다.
    @GetMapping("/list/{email}")
    public List<ChecklistDTO> getChecklistByEmail(@PathVariable String email) {
        return checklistService.getChecklistByEmail(email);
    }

    @PostMapping("/add")
    public ChecklistDTO addTask(@RequestBody ChecklistDTO checklistDTO) {
        return checklistService.addTask(checklistDTO.getEmail(), checklistDTO.getText());
    }

    // ChecklistController.java
    @PutMapping("/update/{id}")
    public ChecklistDTO updateTask(@PathVariable Long id, @RequestBody ChecklistDTO checklistDTO) {
        return checklistService.updateTask(id, checklistDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable Long id) {
        checklistService.deleteTask(id);
    }
}
