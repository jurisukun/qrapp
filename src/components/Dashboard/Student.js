import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AddStudent from "./Student/AddStudent";
import EditStudent from "./Student/EditStudent";
import ViewStudent from "./Student/ViewStudent";
import { StudentSection } from "../../styles/Studinfo.styled";
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiEditAlt,
  BiSearchAlt,
} from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  AiOutlineCaretDown,
  AiOutlineCaretRight,
  AiOutlineEye,
  AiOutlineSearch,
} from "react-icons/ai";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { BsTrash } from "react-icons/bs";
import csv from "csvtojson";
import { set } from "date-fns";

const StudentImage = ({ student, imageVersion, onUpdateImage }) => {
  return (
    <div>
      <img
        src={`http://localhost:3010/std_image/${student.id}?version=${imageVersion}`}
        alt="student"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
        }}
      />
      {/* <button onClick={() => onUpdateImage(student.id)}>Update Image</button> */}
      {/* Other student information */}
    </div>
  );
};

const Student = () => {
  const role = localStorage.getItem("role");
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const [course, setCourse] = useState();
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [year, setYear] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [toMap, setToMap] = useState();
  const [imageVersions, setImageVersions] = useState({});

  const handleUpdateImage = (studentId) => {
    setImageVersions((prevVersions) => ({
      ...prevVersions,
      [studentId]: prevVersions[studentId] ? prevVersions[studentId] + 1 : 1,
    }));
  };
  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:3010/student");
      setStudents(result.data);
    })();

    (async () => {
      const result = await axios.get("http://localhost:3010/getcourse");
      setCourse(result.data);
    })();
  }, []);

  // const handleAddStudent = async (e) => {
  //   e.preventDefault();
  //   await axios.post("http://localhost:3010/student/", newStudent);
  //   toast.success("Student has been added!");
  //   const result = await axios.get("http://localhost:3010/student");
  //   setStudents(result.data);

  //   setNewStudent({
  //     id: "",
  //     std_name: "",
  //     std_email: "",
  //     std_phone: "",
  //     course: "",
  //     year_and_section: "",
  //     guardian_name: "",
  //     guardian_phone: "",
  //     sex: "",
  //   });
  // };
  const handleAddStudent = async (e) => {
    e.preventDefault();
    let novalues = 0;
    document.getElementsByName("new").forEach((inp) => {
      if (inp.value.trim("").replace(/([^\w ]|_)/g, "") == "") {
        novalues++;
        //return;
      }
    });
    if (novalues > 0) {
      //alert("Please fill in all required input");
      toast.error("Please fill all required inputs");
      return;
    } else {
      const formData = new FormData();
      for (const key in newStudent) {
        if (newStudent.hasOwnProperty(key) && key !== "image") {
          formData.append(key, newStudent[key]);
        }
      }
      formData.append("image", newStudent?.image);

      const add = await axios.post("http://localhost:3010/student/", formData);

      if (add.data.message === "Student created") {
        toast.success("Student has been added!");
        const result = await axios.get("http://localhost:3010/student");
        setStudents(result.data);

        setNewStudent({});
        setIsAdding(false);
        document.getElementById("stdadd").reset();
      } else {
        toast.error(add.data.message);
      }
    }
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    const newformData = new FormData();
    for (const key in selectedStudent) {
      if (
        selectedStudent.hasOwnProperty(key) &&
        key !== "image" &&
        key !== "img"
      ) {
        newformData.append(key, selectedStudent[key]);
      }
    }
    newformData.append("image", selectedStudent?.image);

    const data = await axios.put(
      `http://localhost:3010/student/${selectedStudent.id}`,
      newformData
    );
    if (data.data.message === "Student updated") {
      toast.success("Student has been updated!");
      const result = await axios.get("http://localhost:3010/student");
      setStudents(result.data);
      setSelectedStudent({});
      setIsEditing(false);
      document.getElementById("stdedit").reset();
      // window.location.reload();
      handleUpdateImage(selectedStudent.id);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirm = confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await axios.delete(`http://localhost:3010/student/${id}`);
            const result = await axios.get("http://localhost:3010/student");
            toast.success("Student has been deleted!");
            setStudents(result.data);
            setToMap(result.data);
            setSelectedStudent({});
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.error("Student has not been deleted!");
          },
        },
      ],
    });
  };

  const handleUpload = async (e) => {
    const f = e.target.files[0];
    const reader = new FileReader();
    if (f?.type !== "text/csv") {
      toast.error("Invalid file type");

      return;
    }
    reader.onload = async () => {
      const text = reader.result;
      const json = await csv().fromString(text);

      await axios
        .post(
          "http://localhost:3010/studentbulk",
          json.filter((x) => x.id !== "")
        )
        .then((res, err) => {
          if (err) toast.error("An error occurred");
          else {
            if (res.data.message === "No new students to add") {
              toast.success(res.data.message);
              return;
            } else if (res.data?.affectedRows > 0) {
              toast.success(
                `Successfully added ${res.data?.affectedRows} students`
              );
            } else {
              toast.error("An error occurred");
            }

            const result = axios.get("http://localhost:3010/student");
            setStudents(result.data);
          }
        });
    };
    reader.readAsText(f);
  };
  const formatPhone = (phone) => {
    if (phone) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
  };
  const IconVisible = () => {
    let scrollLeftValue = document.querySelector(".tabs").scrollLeft;
    let scrollWidthValue =
      document.querySelector(".tabs").scrollWidth -
      document.querySelector(".tabs").clientWidth;
    let leftBtn = document.querySelector(".arrow_left");
    let rightBtn = document.querySelector(".arrow_right");

    leftBtn.style.display = scrollLeftValue > 0 ? "flex" : "none";
    rightBtn.style.display =
      scrollLeftValue < scrollWidthValue ? "flex" : "none";
  };

  if (role == "super" || role === "admin") {
    return (
      <StudentSection>
        <h2>Student Records</h2>
        <div className="filter_nav">
          <div
            className="arrow_left"
            onClick={() => {
              document.querySelector(".tabs").scrollLeft -= 150;
              IconVisible();
            }}
          >
            <RxCaretLeft />
          </div>
          <div
            className="arrow_right"
            onClick={() => {
              document.querySelector(".tabs").scrollLeft += 150;
              IconVisible();
            }}
          >
            <RxCaretRight />
          </div>
          <div className="tabs">
            <div
              className="filter_item active"
              id="filterall"
              onClick={() => {
                const nav_items = document.querySelectorAll(".filter_item");

                nav_items.forEach((item, i) => {
                  if (i === 0) {
                    if (!item.classList.contains("active")) {
                      item.classList.add("active");

                      setFilter([]);
                    }
                  } else {
                    item.classList.remove("active");
                  }
                });
              }}
            >
              <label>All</label>
              <span className="count">
                <p>{students.length}</p>
              </span>
            </div>
            {students &&
              students
                .filter(
                  (x, i, a) => a.findIndex((t) => t.course === x.course) === i
                )
                .sort((a, b) => {
                  if (
                    students.filter((x) => x.course === a.course).length >
                    students.filter((x) => x.course === b.course).length
                  ) {
                    return -1;
                  } else {
                    return 1;
                  }
                })
                // .sort((a, b) => a.course.localeCompare(b.course))
                .map((student) => {
                  return (
                    <div
                      className="filter_item"
                      id={student?.course}
                      key={student?.course}
                      onClick={() => {
                        const nav_items =
                          document.querySelectorAll(".filter_item");
                        // const line = document.querySelector(".line");
                        // let width = 0;
                        nav_items.forEach((item, i) => {
                          // width += item.offsetWidth + 20;

                          if (item.id === student.course) {
                            if (!item.classList.contains("active")) {
                              item.classList.add("active");

                              // line.style.width = `${width}px`;
                              setFilter(student.course);
                            }
                          } else {
                            item.classList.remove("active");
                          }
                        });
                      }}
                    >
                      <label>{student?.course}</label>
                      <span className="count">
                        <p>
                          {
                            students.filter((x) => x.course === student.course)
                              .length
                          }
                        </p>
                      </span>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="header">
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                setIsEditing(false);
                setIsViewing(false);
                setIsAdding(true);
              }}
            >
              Add Student
            </button>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
            <label htmlFor="file" className="button">
              Upload CSV
            </label>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="Search"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <AiOutlineSearch />
          </div>
        </div>

        <div className="forms-container">
          <div style={isAdding ? { display: "flex" } : { display: "none" }}>
            <AddStudent
              handleAddStudent={handleAddStudent}
              newStudent={newStudent}
              setNewStudent={setNewStudent}
              setIsAdding={setIsAdding}
            />
          </div>
          <div style={isEditing ? { display: "flex" } : { display: "none" }}>
            <EditStudent
              selectedStudent={selectedStudent}
              handleUpdateStudent={handleUpdateStudent}
              setIsEditing={setIsEditing}
              setSelectedStudent={setSelectedStudent}
            />
          </div>
          <div style={isViewing ? { display: "flex" } : { display: "none" }}>
            <ViewStudent
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              setIsViewing={setIsViewing}
            />
          </div>
        </div>
        <div className="tablee">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Phone</th>
                <th>Course / School level</th>
                <th>Year and Section</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students
                  .filter((student) => {
                    if (filter.length === 0 && search === "") {
                      return student;
                    } else {
                      if (filter.includes(student.course) && search === "") {
                        return student;
                      } else if (filter.length === 0 && search.length > 0) {
                        if (
                          student.std_name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          student.course
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          student.year_and_section
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          student.id
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return student;
                        }
                      } else if (
                        filter.includes(student.course) &&
                        search.length > 0
                      ) {
                        if (
                          student.std_name
                            .toLowerCase()
                            .includes(
                              search.toLowerCase() ||
                                student.course
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                student.year_and_section
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                            )
                        ) {
                          return student;
                        }
                      } else {
                        return;
                      }
                    }
                  })
                  .sort((a, b) => {
                    if (a.course < b.course) {
                      return -1;
                    }
                    if (a.course > b.course) {
                      return 1;
                    }
                  })
                  .map((student) => {
                    return (
                      <tr key={student.id}>
                        <td>
                          <StudentImage
                            student={student}
                            imageVersion={imageVersions[student.id]}
                            onUpdateImage={handleUpdateImage}
                          />
                        </td>
                        {/* <td>{student.id}</td> */}
                        <td>{student.std_name}</td>
                        <td>{formatPhone(student.std_phone)}</td>
                        <td>
                          <b>{student.course}</b>
                        </td>
                        <td>{student.year_and_section}</td>
                        <td>
                          <div className="btn">
                            <button
                              className="view"
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsViewing(true);
                                setIsEditing(false);
                                setIsAdding(false);
                              }}
                              // onMouseEnter={() => {
                              //   setSelectedStudent(student);
                              //   setIsEditing(false);
                              //   setIsViewing(true);
                              //   setIsAdding(false);
                              // }}
                              // onMouseLeave={() => {
                              //   setSelectedStudent({});
                              //   setIsEditing(false);
                              //   setIsViewing(false);
                              //   setIsAdding(false);
                              // }}
                            >
                              <AiOutlineEye />
                            </button>
                            <button
                              className="edit"
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsEditing(true);
                                setIsViewing(false);
                                setIsAdding(false);
                              }}
                            >
                              <BiEditAlt />
                            </button>
                            <button
                              className="delete"
                              onClick={() => {
                                handleDeleteStudent(student.id);
                              }}
                            >
                              <BsTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                  .slice(0, 100)}
            </tbody>
          </table>
        </div>

        <Toaster />
      </StudentSection>
    );
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

export default Student;
