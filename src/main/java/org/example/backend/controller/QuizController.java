package org.example.backend.controller;

import org.example.backend.domain.QuizQuestion;
import org.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public List<QuizQuestion> getAllQuizQuestions() {
        return quizService.getAllQuizQuestions();
    }

    @GetMapping("/{id}")
    public QuizQuestion getQuizQuestionById(@PathVariable Long id) {
        return quizService.getQuizQuestionById(id);
    }

    @PostMapping
    public QuizQuestion createQuizQuestion(@RequestBody QuizQuestion quizQuestion) {
        return quizService.createQuizQuestion(quizQuestion);
    }

    @PutMapping("/{id}")
    public QuizQuestion updateQuizQuestion(@PathVariable Long id, @RequestBody QuizQuestion updatedQuizQuestion) {
        return quizService.updateQuizQuestion(id, updatedQuizQuestion);
    }

    @DeleteMapping("/{id}")
    public void deleteQuizQuestion(@PathVariable Long id) {
        quizService.deleteQuizQuestion(id);
    }
}
