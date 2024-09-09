package org.example.backend.repository;

import org.example.backend.domain.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
}
