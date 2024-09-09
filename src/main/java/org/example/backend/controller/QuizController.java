package org.example.backend.controller;

import org.example.backend.domain.QuizQuestion;
import org.example.backend.repository.QuizQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    // 모든 퀴즈 질문 가져오기
    @GetMapping
    public List<QuizQuestion> getAllQuizQuestions() {
        return quizQuestionRepository.findAll();
    }

    // 특정 ID의 퀴즈 질문 가져오기
    @GetMapping("/{id}")
    public QuizQuestion getQuizQuestionById(@PathVariable Long id) {
        Optional<QuizQuestion> quizQuestion = quizQuestionRepository.findById(id);
        return quizQuestion.orElseThrow(() -> new RuntimeException("Quiz question not found"));
    }

    // 새 퀴즈 질문 추가하기
    @PostMapping
    public QuizQuestion createQuizQuestion(@RequestBody QuizQuestion quizQuestion) {
        return quizQuestionRepository.save(quizQuestion);
    }

    // 특정 ID의 퀴즈 질문 업데이트하기
    @PutMapping("/{id}")
    public QuizQuestion updateQuizQuestion(@PathVariable Long id, @RequestBody QuizQuestion updatedQuizQuestion) {
        return quizQuestionRepository.findById(id)
                .map(quizQuestion -> {
                    quizQuestion.setQText(updatedQuizQuestion.getQText());
                    quizQuestion.setAnswer(updatedQuizQuestion.isAnswer());
                    return quizQuestionRepository.save(quizQuestion);
                })
                .orElseThrow(() -> new RuntimeException("Quiz question not found"));
    }

    // 특정 ID의 퀴즈 질문 삭제하기
    @DeleteMapping("/{id}")
    public void deleteQuizQuestion(@PathVariable Long id) {
        quizQuestionRepository.deleteById(id);
    }
}
