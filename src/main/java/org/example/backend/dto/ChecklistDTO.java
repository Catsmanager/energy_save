package org.example.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChecklistDTO {
    private Long id;
    private String email;
    private String text;
    private boolean completed;
}
