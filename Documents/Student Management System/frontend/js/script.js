const API_URL = "http://localhost:8080/api/students";


/* =====================================================
   ADD STUDENT
===================================================== */

const studentForm = document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const student = {

            name: document.getElementById("name").value.trim(),

            email: document.getElementById("email").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            age: Number(
                document.getElementById("age").value
            ),

            gender: document.getElementById("gender").value,

            course: document.getElementById("course").value.trim(),

            department:
                document.getElementById("department").value.trim(),

            year: Number(
                document.getElementById("year").value
            ),

            address:
                document.getElementById("address").value.trim()
        };


        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)
            });


            if (!response.ok) {

                const errorText =
                    await response.text();

                throw new Error(
                    errorText || "Failed to add student"
                );
            }


            alert("Student added successfully!");

            window.location.href =
                "students.html";


        } catch (error) {

            console.error(error);

            document.getElementById(
                "formMessage"
            ).innerHTML =
                `<div class="error">
                    ${error.message}
                </div>`;
        }

    });
}


/* =====================================================
   LOAD ALL STUDENTS
===================================================== */

async function loadStudents() {

    const table =
        document.getElementById("studentTable");

    if (!table) {
        return;
    }


    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Unable to load students"
            );
        }


        const students =
            await response.json();


        displayStudents(students);


    } catch (error) {

        console.error(error);

        table.innerHTML =
            `<tr>
                <td colspan="8">
                    Unable to connect to backend.
                </td>
            </tr>`;
    }
}


/* =====================================================
   DISPLAY STUDENTS
===================================================== */

function displayStudents(students) {

    const table =
        document.getElementById("studentTable");


    table.innerHTML = "";


    if (students.length === 0) {

        table.innerHTML =
            `<tr>
                <td colspan="8">
                    No students found.
                </td>
            </tr>`;

        return;
    }


    students.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.course}</td>

            <td>${student.department}</td>

            <td>${student.year}</td>

            <td>

                <a
                    href="student-details.html?id=${student.id}"
                    class="btn small">
                    View
                </a>

                <a
                    href="edit-student.html?id=${student.id}"
                    class="btn small">
                    Edit
                </a>

                <button
                    class="btn danger small"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>

            </td>
        `;


        table.appendChild(row);

    });
}


/* =====================================================
   SEARCH
===================================================== */

async function searchStudents() {

    const input =
        document.getElementById("searchInput");


    if (!input) {
        return;
    }


    const keyword =
        input.value.trim();


    if (keyword === "") {

        loadStudents();

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/search?keyword=${encodeURIComponent(keyword)}`
            );


        if (!response.ok) {

            throw new Error(
                "Search failed"
            );
        }


        const students =
            await response.json();


        displayStudents(students);


    } catch (error) {

        console.error(error);

        alert("Search failed");
    }
}


/* =====================================================
   DELETE STUDENT
===================================================== */

async function deleteStudent(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );
        }


        alert(
            "Student deleted successfully!"
        );


        loadStudents();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete student."
        );
    }
}


/* =====================================================
   LOAD EDIT STUDENT
===================================================== */

async function loadEditStudent() {

    const form =
        document.getElementById(
            "editStudentForm"
        );


    if (!form) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get("id");


    if (!id) {

        alert("Student ID is missing");

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Student not found"
            );
        }


        const student =
            await response.json();


        document.getElementById(
            "editId"
        ).value = student.id;


        document.getElementById(
            "editName"
        ).value = student.name;


        document.getElementById(
            "editEmail"
        ).value = student.email;


        document.getElementById(
            "editPhone"
        ).value = student.phone;


        document.getElementById(
            "editAge"
        ).value = student.age;


        document.getElementById(
            "editGender"
        ).value = student.gender;


        document.getElementById(
            "editCourse"
        ).value = student.course;


        document.getElementById(
            "editDepartment"
        ).value = student.department;


        document.getElementById(
            "editYear"
        ).value = student.year;


        document.getElementById(
            "editAddress"
        ).value = student.address || "";


    } catch (error) {

        console.error(error);

        alert(error.message);
    }
}


/* =====================================================
   UPDATE STUDENT
===================================================== */

const editStudentForm =
    document.getElementById(
        "editStudentForm"
    );


if (editStudentForm) {

    editStudentForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const id =
                document.getElementById(
                    "editId"
                ).value;


            const student = {

                name:
                    document.getElementById(
                        "editName"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "editEmail"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "editPhone"
                    ).value.trim(),

                age:
                    Number(
                        document.getElementById(
                            "editAge"
                        ).value
                    ),

                gender:
                    document.getElementById(
                        "editGender"
                    ).value,

                course:
                    document.getElementById(
                        "editCourse"
                    ).value.trim(),

                department:
                    document.getElementById(
                        "editDepartment"
                    ).value.trim(),

                year:
                    Number(
                        document.getElementById(
                            "editYear"
                        ).value
                    ),

                address:
                    document.getElementById(
                        "editAddress"
                    ).value.trim()
            };


            try {

                const response =
                    await fetch(
                        `${API_URL}/${id}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(student)
                        }
                    );


                if (!response.ok) {

                    const errorText =
                        await response.text();

                    throw new Error(
                        errorText ||
                        "Update failed"
                    );
                }


                alert(
                    "Student updated successfully!"
                );


                window.location.href =
                    "students.html";


            } catch (error) {

                console.error(error);

                document.getElementById(
                    "editMessage"
                ).innerHTML =
                    `<div class="error">
                        ${error.message}
                    </div>`;
            }

        }
    );
}


/* =====================================================
   STUDENT DETAILS
===================================================== */

async function loadStudentDetails() {

    const container =
        document.getElementById(
            "studentDetails"
        );


    if (!container) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get("id");


    if (!id) {

        container.innerHTML =
            `<div class="error">
                Student ID is missing.
            </div>`;

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Student not found"
            );
        }


        const student =
            await response.json();


        container.innerHTML = `

            <div class="details-grid">

                <div class="detail-item">
                    <strong>ID</strong>
                    ${student.id}
                </div>

                <div class="detail-item">
                    <strong>Name</strong>
                    ${student.name}
                </div>

                <div class="detail-item">
                    <strong>Email</strong>
                    ${student.email}
                </div>

                <div class="detail-item">
                    <strong>Phone</strong>
                    ${student.phone}
                </div>

                <div class="detail-item">
                    <strong>Age</strong>
                    ${student.age}
                </div>

                <div class="detail-item">
                    <strong>Gender</strong>
                    ${student.gender}
                </div>

                <div class="detail-item">
                    <strong>Course</strong>
                    ${student.course}
                </div>

                <div class="detail-item">
                    <strong>Department</strong>
                    ${student.department}
                </div>

                <div class="detail-item">
                    <strong>Year</strong>
                    ${student.year}
                </div>

                <div class="detail-item">
                    <strong>Address</strong>
                    ${student.address || "Not provided"}
                </div>

            </div>

            <br>

            <a
                href="edit-student.html?id=${student.id}"
                class="btn">
                Edit Student
            </a>

            <a
                href="students.html"
                class="btn secondary">
                Back
            </a>
        `;


    } catch (error) {

        console.error(error);

        container.innerHTML =
            `<div class="error">
                ${error.message}
            </div>`;
    }
}


/* =====================================================
   DASHBOARD
===================================================== */

async function loadDashboard() {

    const totalStudents =
        document.getElementById(
            "totalStudents"
        );


    if (!totalStudents) {
        return;
    }


    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Unable to load dashboard"
            );
        }


        const students =
            await response.json();


        /* Total students */

        document.getElementById(
            "totalStudents"
        ).textContent =
            students.length;


        /* Courses */

        const courses =
            new Set(
                students.map(
                    student => student.course
                )
            );


        document.getElementById(
            "totalCourses"
        ).textContent =
            courses.size;


        /* Departments */

        const departments =
            new Set(
                students.map(
                    student =>
                        student.department
                )
            );


        document.getElementById(
            "totalDepartments"
        ).textContent =
            departments.size;


        /* Recent students */

        const recentStudents =
            document.getElementById(
                "recentStudents"
            );


        recentStudents.innerHTML = "";


        const recent =
            students.slice(-5).reverse();


        recent.forEach(student => {

            recentStudents.innerHTML += `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.email}</td>

                    <td>${student.course}</td>

                    <td>${student.department}</td>

                </tr>

            `;
        });


    } catch (error) {

        console.error(error);
    }
}


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadStudents();

        loadEditStudent();

        loadStudentDetails();

        loadDashboard();

    }
);