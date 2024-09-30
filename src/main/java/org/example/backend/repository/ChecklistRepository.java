package org.example.backend.repository;

import org.example.backend.domain.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
    // 'User' 엔티티의 'emailId' 필드를 참조하도록 수정
    List<Checklist> findByUserEmailId(String emailId);
}
