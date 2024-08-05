package org.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 이메일 중복 확인 응답을 위한 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailCheckResponse {

    private boolean exists;
}
