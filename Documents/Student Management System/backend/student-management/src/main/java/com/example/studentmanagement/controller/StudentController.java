package com.example.studentmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    // =====================================================
    // CREATE STUDENT
    // POST: /api/students
    // =====================================================

    @PostMapping
    public ResponseEntity<Student> addStudent(
            @Valid @RequestBody Student student) {

        Student savedStudent = service.addStudent(student);

        return new ResponseEntity<>(
                savedStudent,
                HttpStatus.CREATED
        );
    }


    // =====================================================
    // GET ALL STUDENTS
    // GET: /api/students
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {

        List<Student> students = service.getAllStudents();

        return ResponseEntity.ok(students);
    }


    // =====================================================
    // SEARCH STUDENTS
    // GET: /api/students/search?keyword=Ravi
    //
    // IMPORTANT:
    // Keep this BEFORE /{id}
    // =====================================================

    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(
            @RequestParam String keyword) {

        List<Student> students =
                service.searchStudents(keyword);

        return ResponseEntity.ok(students);
    }


    // =====================================================
    // GET STUDENT BY ID
    // GET: /api/students/1
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(
            @PathVariable Long id) {

        Student student =
                service.getStudentById(id);

        return ResponseEntity.ok(student);
    }


    // =====================================================
    // UPDATE STUDENT
    // PUT: /api/students/1
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {

        Student updatedStudent =
                service.updateStudent(id, student);

        return ResponseEntity.ok(updatedStudent);
    }


    // =====================================================
    // DELETE STUDENT
    // DELETE: /api/students/1
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(
            @PathVariable Long id) {

        service.deleteStudent(id);

        return ResponseEntity.ok(
                "Student deleted successfully"
        );
    }
}