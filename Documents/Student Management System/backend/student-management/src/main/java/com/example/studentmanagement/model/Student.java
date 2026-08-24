package com.example.studentmanagement.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phone;

    private Integer age;

    private String gender;

    private String course;

    private String department;

    private Integer year;

    private String address;


    // Default Constructor
    public Student() {
    }


    // Constructor
    public Student(
            String name,
            String email,
            String phone,
            Integer age,
            String gender,
            String course,
            String department,
            Integer year,
            String address) {

        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.gender = gender;
        this.course = course;
        this.department = department;
        this.year = year;
        this.address = address;
    }


    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // NAME
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    // EMAIL
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // PHONE
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    // AGE
    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }


    // GENDER
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    // COURSE
    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }


    // DEPARTMENT
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }


    // YEAR
    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }


    // ADDRESS
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}