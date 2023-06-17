import { useState, useEffect } from "react";
import axios from "axios";
import { AttendanceSection } from "../../styles/Attendance.styled";
import { DebounceInput } from "react-debounce-input";
import ViewStudent from "./Student/ViewStudent";
import { format, set, toDate } from "date-fns";
import { BiEditAlt, BiSearch, BiSearchAlt, BiSearchAlt2 } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { Navigate } from "react-router-dom";

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Attendance() {
  const role = localStorage.getItem("role");
  const [attendance, setAttendance] = useState([]);
  const [newAttendance, setNewAttendance] = useState({
    hashed_id: "",
  });
  const [selectedAttendance, setSelectedAttendance] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState();

  const [course, setCourse] = useState();
  const [tomap, setToMap] = useState();

  const [selected, setSelected] = useState([]);

  const [inout, setInOut] = useState();

  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:3010/attendance");
      setAttendance(result.data);
    })();

    (async () => {
      const result = await axios.get("http://localhost:3010/getcourse");

      setCourse(result.data);
    })();
  }, []);

  useEffect(() => {
    if (inout) {
      if (inout?.inside) {
        document.getElementById("edittimein").value =
          selectedAttendance.time_out;
        document.getElementById("edittimeout").value =
          selectedAttendance.time_in;
      } else if (inout?.outside) {
        document.getElementById("edittimein").value =
          selectedAttendance.time_out;
        document.getElementById("edittimeout").value =
          selectedAttendance.time_in;
      }
    }
  }, [inout]);

  const handleAddAttendance = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3010/attendance/", newAttendance);
    const result = await axios.get("http://localhost:3010/attendance");
    setAttendance(result.data);
    setNewAttendance({
      hashed_id: "",
    });
  };

  const handleUpdateAttendance = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:3010/attendance/${selectedAttendance.id}`,
      selectedAttendance
    );
    const result = await axios.get("http://localhost:3010/attendance");
    setAttendance(result.data);

    setSelectedAttendance({});
    setIsEditing(false);
  };

  const handleDeleteAttendance = async (id) => {
    const proceed = window.confirm("Are you sure?");
    if (!proceed) return;
    else {
      await axios.delete(`http://localhost:3010/attendance/${id}`);
      const result = await axios.get("http://localhost:3010/attendance");
      setAttendance(result.data);
      console.log(result.data);
      setSelectedAttendance({});
    }
  };
  const formatDate = (date) => {
    const d = new Date(date);

    const month =
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const formatTime = (time) => {
    const date = new Date();
    const d = new Date(date.toDateString() + " " + time);

    let hour =
      d.getHours() < 12
        ? d.getHours()
        : d.getHours() === 12
        ? d.getHours()
        : d.getHours() - 12;
    const minute = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    const ampm = d.getHours() < 12 ? "AM" : "PM";

    hour = hour < 10 ? `0${hour}` : hour;

    return `${hour}:${minute} ${ampm}`;
  };

  function setter(val, current) {
    let curr = [...current];
    if (val.target.checked) {
      curr.push(val.target.value);
    } else {
      curr.splice(curr.indexOf(val.target.value), 1);
    }
    console.log(curr);

    return curr;
  }
  const tableDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const weekday = date.toLocaleString("default", { weekday: "long" });

    return `${day} ${month} ${year} ${weekday}`;
  };
  const IconVisible = () => {
    let scrollLeftValue = document.querySelector(".tab_menu").scrollLeft;
    let scrollWidthValue =
      document.querySelector(".tab_menu").scrollWidth -
      document.querySelector(".tab_menu").clientWidth;
    let leftBtn = document.querySelector(".left");
    let rightBtn = document.querySelector(".right");

    leftBtn.style.display = scrollLeftValue > 0 ? "flex" : "none";
    rightBtn.style.display =
      scrollLeftValue < scrollWidthValue ? "flex" : "none";
  };

  if (role === "admin" || role === "super") {
    return (
      <AttendanceSection>
        <div className="header">
          <h2>Attendance Records</h2>
          <div className="search">
            <DebounceInput
              minLength={0}
              debounceTimeout={300}
              placeholder={"Search student details"}
              onChange={(event) => {
                setToMap(event.target.value);
              }}
            />
            <BiSearchAlt2 />
          </div>
        </div>

        <div className="filter">
          <div
            className="left"
            onClick={() => {
              let tab = document.querySelector(".tab_menu");
              tab.scrollLeft -= 150;
              IconVisible();
            }}
          >
            <RxCaretLeft />
          </div>
          <div
            className="right"
            onClick={() => {
              let tab = document.querySelector(".tab_menu");
              tab.scrollLeft += 150;
              IconVisible();
            }}
          >
            <RxCaretRight />
          </div>
          <div className="tab_menu">
            <div
              className="tab active"
              onClick={() => {
                let tabs = document.querySelectorAll(".tab");

                tabs.forEach((tab, i) => {
                  if (i === 0 && tab.classList.contains("active")) {
                    return;
                  } else if (i === 0 && !tab.classList.contains("active")) {
                    tab.classList.add("active");
                    setSelected([]);
                  } else {
                    tab.classList.remove("active");
                  }
                });
              }}
            >
              <span className="title">All</span>
              <span className="count">{attendance?.length}</span>
            </div>

            {course &&
              course.map((course) => {
                return (
                  <div
                    className="tab"
                    key={course?.course}
                    id={course.course}
                    onClick={() => {
                      let tabs = document.querySelectorAll(".tab");

                      tabs.forEach((tab, i) => {
                        if (i === 0 && tab.classList.contains("active")) {
                          tab.classList.remove("active");
                        } else if (
                          i === 0 &&
                          !tab.classList.contains("active")
                        ) {
                          return;
                        } else if (
                          tab.id === course.course &&
                          !tab.classList.contains("active")
                        ) {
                          tab.classList.add("active");
                          setSelected(course.course);
                        } else {
                          tab.classList.remove("active");
                        }
                      });
                    }}
                  >
                    <span className="title">{course?.course}</span>
                    <span className="count">
                      {
                        attendance.filter((x) => x?.course === course?.course)
                          .length
                      }
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        {/* <div className="header">
          <form onSubmit={handleAddAttendance}>
            <input
              type="text"
              placeholder="ID"
              value={newAttendance.hashed_id}
              onChange={(e) =>
                setNewAttendance({
                  ...newAttendance,
                  hashed_id: e.target.value,
                })
              }
            />
            <button type="submit">Add Attendance</button>
          </form>

          <div className="search">
            <DebounceInput
              minLength={0}
              debounceTimeout={300}
              placeholder={"Search student details"}
              onChange={(event) => {
                setToMap(event.target.value);
              }}
            />
            <BiSearchAlt2 />
          </div>
        </div> */}
        <div
          key={selectedAttendance?.id}
          style={isEditing ? { display: "flex" } : { display: "none" }}
          className="edit_att"
        >
          <h2>Edit Attendance</h2>
          <div className="edit_name">
            <label>Name</label>
            <span>{selectedAttendance?.std_name}</span>
          </div>
          <form onSubmit={handleUpdateAttendance}>
            <div className="edit_item">
              <label>Date</label>
              <input
                type="date"
                defaultValue={
                  selectedAttendance?.date
                    ? format(new Date(selectedAttendance?.date), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) =>
                  setSelectedAttendance({
                    ...selectedAttendance,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <div className="edit_item">
              <label>Time In</label>
              <input
                id="edittimein"
                type="time"
                disabled={selectedAttendance?.time_in ? false : true}
                defaultValue={
                  selectedAttendance?.time_in ? selectedAttendance?.time_in : ""
                }
                onChange={(e) =>
                  setSelectedAttendance({
                    ...selectedAttendance,
                    time_in: e.target.value,
                  })
                }
              />
            </div>
            <div className="edit_item">
              <label>Time Out</label>

              <input
                id="edittimeout"
                disabled={selectedAttendance.time_out ? false : true}
                type="time"
                defaultValue={
                  selectedAttendance?.time_out
                    ? selectedAttendance?.time_out
                    : ""
                }
                onChange={(e) =>
                  setSelectedAttendance({
                    ...selectedAttendance,
                    time_out: e.target.value,
                  })
                }
              />
            </div>
            <div className="edit_item">
              <label>Status</label>
              <select
                disabled={true}
                value={selectedAttendance.status}
                // onChange={(e) => {
                //   if (e.target.value === "inside") {
                //     setInOut({ inside: true });
                //   } else {
                //     setInOut({ outside: true });
                //   }
                //   setSelectedAttendance({
                //     ...selectedAttendance,
                //     status: e.target.value,
                //   });
                // }}
              >
                <option value="inside">Inside</option>
                <option value="outside">Outside</option>
              </select>
            </div>

            <div className="item_btn">
              <button type="submit">Update</button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Course / School level</th>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {attendance &&
                attendance
                  .filter((x) => {
                    if (selected.length > 0) {
                      return x.course === selected;
                    }
                    return true;
                  })
                  .filter((element) => {
                    if (tomap) {
                      for (let prop in element) {
                        if (
                          String(element[prop])
                            .toLowerCase()
                            .includes(tomap.toLowerCase())
                        ) {
                          return true;
                        }
                      }
                      return false;
                    }
                    return true;
                  })
                  .sort((a, b) => {
                    if (
                      a.time_in < b.time_in &&
                      a.time_out < b.time_out &&
                      a.date >= b.date
                    ) {
                      return -1;
                    }
                    if (
                      a.time_in > b.time_in &&
                      a.time_out > b.time_out &&
                      a.date <= b.date
                    ) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((attendance) => (
                    <tr key={attendance.id}>
                      {/* <td>{attendance.id}</td> */}
                      <td
                        onClick={() => {
                          setSelectedStudent(attendance.hashed_id);
                          setIsViewing(true);
                        }}
                      >
                        {attendance.hashed_id}
                      </td>
                      <td>{attendance.std_name}</td>
                      <td>
                        <b>{attendance.course}</b>
                      </td>
                      <td>{tableDate(attendance.date)}</td>
                      <td>
                        {attendance.time_in
                          ? format(
                              new Date(
                                new Date().toISOString().substring(0, 10) +
                                  "T" +
                                  attendance.time_in
                              ),
                              "hh:mm a"
                            )
                          : ""}
                      </td>
                      <td>
                        {attendance.time_out
                          ? format(
                              new Date(
                                new Date().toISOString().substring(0, 10) +
                                  "T" +
                                  attendance.time_out
                              ),
                              "hh:mm a"
                            )
                          : ""}
                      </td>
                      <td>
                        <div className={attendance.status}>
                          {attendance.status === "inside"
                            ? "Inside"
                            : "Outside"}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedAttendance(attendance);
                            console.log(attendance);
                            console.log(new Date(attendance.date));
                            setIsEditing(true);
                          }}
                        >
                          <BiEditAlt />
                        </button>
                        <button
                          onClick={() => handleDeleteAttendance(attendance.id)}
                        >
                          <BsTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                  .splice(0, 100)}
            </tbody>
          </table>
        </div>
        {isViewing && (
          <ViewStudent
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            setIsViewing={setIsViewing}
          />
        )}
      </AttendanceSection>
    );
  } else {
    return <Navigate to="/" replace={true} />;
  }
}

export default Attendance;
