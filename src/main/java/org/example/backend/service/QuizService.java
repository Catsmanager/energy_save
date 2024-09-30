package org.example.backend.service;

import org.example.backend.domain.QuizQuestion;
import org.example.backend.repository.QuizQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    public List<QuizQuestion> getAllQuizQuestions() {
        return quizQuestionRepository.findAll();
    }

    public QuizQuestion getQuizQuestionById(Long id) {
        return quizQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz question not found"));
    }

    public QuizQuestion createQuizQuestion(QuizQuestion quizQuestion) {
        return quizQuestionRepository.save(quizQuestion);
    }

    public QuizQuestion updateQuizQuestion(Long id, QuizQuestion updatedQuizQuestion) {
        return quizQuestionRepository.findById(id)
                .map(quizQuestion -> {
                    quizQuestion.setQText(updatedQuizQuestion.getQText());
                    quizQuestion.setAnswer(updatedQuizQuestion.isAnswer());
                    return quizQuestionRepository.save(quizQuestion);
                })
                .orElseThrow(() -> new RuntimeException("Quiz question not found"));
    }

    public void deleteQuizQuestion(Long id) {
        quizQuestionRepository.deleteById(id);
    }
}
