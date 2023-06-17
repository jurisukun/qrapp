import { useEffect, useState } from "react";
import BarcodeReader from "react-barcode-reader";
import axios from "axios";
import { QrScanSection2 } from "../../styles/QRscan.styled";
import male from "../../styles/images/male.jpg";
import female from "../../styles/images/female.png";
import toast, { Toaster } from "react-hot-toast";

import { io } from "socket.io-client";
import Incount from "../Incount";

const socket = io.connect("http://localhost:3010/getcount");

function QRscan() {
  const [student, setStudent] = useState();
  const [attendance, setAttendance] = useState();
  const [isScanData, setIsScanData] = useState(false);
  const [students, setStudents] = useState([]);
  const [recentScans, setRecentScans] = useState([]);
  const [dots, setDots] = useState("");
  const [status, setStatus] = useState("inside");
  const [success, setSuccess] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);

  const role = window.localStorage.getItem("role");

  socket.on("newcount", (data) => {
    setCurrentCount(data);
    console.log(data);
  });

  useEffect(() => {
    socket.emit("updateCount", { currentCount });
  }, []);

  useEffect(() => {
    (async () => {
      await axios.get("http://localhost:3010/student").then((response) => {
        setStudents(response.data);
      });
    })();
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 500);

    if (localStorage.getItem("gatestatus")) {
      setStatus(localStorage.getItem("gatestatus"));
    }

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (attendance) {
      (async () => {
        await axios
          .post("http://localhost:3010/student/hash", attendance)
          .then((response) => {
            setStudent({
              id: response.data.id,
              std_name: response.data.std_name,
              std_email: response.data.std_email,
              std_phone: response.data.std_phone,
              course: response.data.course,
              year_and_section: response.data.year_and_section,
              guardian_name: response.data.guardian_name,
              guardian_phone: response.data.guardian_phone,
              sex: response.data.sex,
            });

            setSuccess(true);
          });
      })();
    }
  }, [attendance]);

  const handleScan = (data) => {
    if (data) {
      const currentTime = new Date().getTime();

      const isDuplicate = recentScans.some((scan) => {
        return scan.hashed_id === data && currentTime - scan.timestamp <= 60000;
      });

      if (isDuplicate) {
        toast.error("Duplicate scan");
        return;
      } else {
        setRecentScans((prevScans) => [
          ...prevScans,
          { hashed_id: data, timestamp: currentTime },
        ]);
        setAttendance({
          hashed_id: data,
          gate: localStorage.getItem("role"),
          status: status,
        });

        setRecentScans((prevScans) =>
          prevScans.filter((scan) => currentTime - scan.timestamp <= 60000)
        );

        setIsScanData(true);
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsScanData(false);
    }, 15000);
  }, [isScanData]);

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    if (student) {
      (async () => {
        await axios
          .post("http://localhost:3010/attendance/auto", attendance)
          .then((res) => {
            if (res.data.status === 200) {
              socket.emit("updateCount");
              toast.success("Attendance has been recorded!");
            } else {
              toast.error("Attendance has not been recorded!");
            }
          })
          .catch((err) => {
            toast.error("Error occured, try again");
          });

        setTimeout(() => {
          setStudent();
        }, 10000);
      })();
    }
  }, [student]);
  return (
    <>
      <div key={currentCount}>
        <Incount count={currentCount} />
      </div>

      <QrScanSection2>
        <BarcodeReader onError={handleError} onScan={handleScan} />
        <Toaster />
        <div className="scanner">
          <div className="scan">
            <div className="qrcode"></div>
          </div>

          <h2>Scanning{dots}</h2>

          <div className="manualform">
            <select
              className="select"
              id="status"
              defaultValue={localStorage.getItem("gatestatus") ?? ""}
              onChange={(e) => {
                if (e) {
                  setStatus(e.target.value);
                  localStorage.setItem("gatestatus", e.target.value);
                }
              }}
            >
              <option value="inside">Time In</option>
              <option value="outside">Time Out</option>
            </select>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (e.target.stdID.value === "") {
                  toast.error("Student ID is required");
                  return;
                }

                const std =
                  students.find((s) => {
                    return parseInt(s.id) === parseInt(e.target.stdID.value);
                  }) || null;
                if (std === null) {
                  toast.error("Student ID is not found");
                  return;
                }
                if (!status) {
                  toast.error("Please set gate status");
                  return;
                }

                const currentTime = new Date().getTime();

                const isDuplicate = recentScans.some((scan) => {
                  return (
                    scan.hashed_id === std.hashed_id &&
                    currentTime - scan.timestamp <= 60000
                  );
                });

                if (isDuplicate) {
                  toast.error("Duplicate scan");
                  return;
                } else {
                  setRecentScans((prevScans) => [
                    ...prevScans,
                    { hashed_id: std.hashed_id, timestamp: currentTime },
                  ]);
                  setAttendance({
                    hashed_id: std.hashed_id,
                    gate: localStorage.getItem("role"),
                    status: status,
                  });

                  setRecentScans((prevScans) =>
                    prevScans.filter(
                      (scan) => currentTime - scan.timestamp <= 60000
                    )
                  );

                  setIsScanData(true);
                }
              }}
            >
              <input
                type="text"
                placeholder="Student ID"
                id="stdID"
                list="studentid"
              />
              <datalist id="studentid">
                {students.map((student, key) => {
                  return (
                    <option key={key} value={student.id}>
                      {student.id}
                    </option>
                  );
                })}
              </datalist>
              <button type="submit" className="btn">
                Manually add
              </button>
            </form>
          </div>
        </div>
        <div className="studentinfo">
          <div className="info">
            <h2>Student Information</h2>
            <div className="image">
              {/* {student?.sex == "female" ? (
              <img src={female} alt="" />
            ) : (
              <img src={male} alt="" />
            )} */}
              {student && (
                <img
                  src={`http://localhost:3010/std_image/${student?.id}`}
                  alt="student image"
                />
              )}
            </div>
            <div className="details">
              <div>
                <p>Scanned ID:</p>
                <span className="std-data">{student?.id}</span>
              </div>
              <div>
                <p>Student Name: </p>
                <span className="std-data">{student?.std_name}</span>
              </div>
              <div>
                <p>Student Email:</p>
                <span className="std-data">{student?.std_email}</span>
              </div>
              <div>
                <p>Student Phone:</p>
                <span className="std-data">{student?.std_phone}</span>
              </div>
              <div>
                <p> Sex:</p>
                <span className="std-data">{student?.sex}</span>
              </div>
              <div>
                <p>Course:</p>
                <span className="std-data">{student?.course}</span>
              </div>
              <div>
                <p>Year and Section:</p>
                <span className="std-data">{student?.year_and_section}</span>
              </div>
              <div>
                <p>Guardian Name: </p>
                <span className="std-data">{student?.guardian_name}</span>
              </div>
              <div>
                <p>Guardian Phone: </p>
                <span className="std-data">{student?.guardian_phone}</span>
              </div>
            </div>
          </div>
        </div>
      </QrScanSection2>
    </>
  );
}

export default QRscan;
