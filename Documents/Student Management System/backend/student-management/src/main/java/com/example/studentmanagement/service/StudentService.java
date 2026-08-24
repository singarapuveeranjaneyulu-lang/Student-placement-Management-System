package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Student addStudent(Student student) {

        if (repository.findByEmailIgnoreCase(student.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        return repository.save(student);
    }

    // READ ALL
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    // READ ONE
    public Student getStudentById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found with ID: " + id
                        )
                );
    }

    // UPDATE
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = getStudentById(id);

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setAge(student.getAge());
        existingStudent.setGender(student.getGender());
        existingStudent.setCourse(student.getCourse());
        existingStudent.setDepartment(student.getDepartment());
        existingStudent.setYear(student.getYear());
        existingStudent.setAddress(student.getAddress());

        return repository.save(existingStudent);
    }

    // DELETE
    public void deleteStudent(Long id) {

        Student student = getStudentById(id);

        repository.delete(student);
    }

    // SEARCH
    public List<Student> searchStudents(String keyword) {

        return repository.findByNameContainingIgnoreCase(keyword);
    }
}