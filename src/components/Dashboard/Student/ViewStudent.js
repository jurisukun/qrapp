import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
const ViewSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  padding: 30px;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 767px) {
    .inputs {
      height: 20px;
      font-size: 12px;
      gap: 6px;
    }
  }
  .t-head {
    text-align: center;
    color: #131313;
    align-self: center;
    margin-top: 30px;
    font-size: 20px;
    font-weight: 600;
  }

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border: 1px solid #131313;
    border-radius: 50%;

    img {
      width: 99%;
      height: 99%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30px;

    label {
      width: 30%;
      color: #131313;
      font-size: 12px;
      font-weight: 600;
    }
    span {
      width: 70%;
      color: #131313;
      font-size: 14px;
      font-weight: 500;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  }
  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    gap: 10px;
    margin-top: 20px;

    button {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 500;
      background-color: #43435e;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(0.98);
      }
    }
  }
  @media only screen and (max-width: 500px) {
    * {
      padding: 0;
      margin: 0;
    }
    width: 80%;
  }
`;
const ViewStudent = ({ selectedStudent, setSelectedStudent, setIsViewing }) => {
  useEffect(() => {
    if (typeof selectedStudent === "string") {
      let getStudentInfo = async (id) => {
        const res = await axios.get(`http://localhost:3010/studentbyid/${id}`);
        console.log(res);
        // const data = await res.json();
        setSelectedStudent(res.data.stinfo);
      };
      getStudentInfo(selectedStudent);
    }
  }, []);

  return (
    <ViewSection>
      <h2 className="t-head">Students Profile</h2>
      <div className="image">
        <img
          src={`http://localhost:3010/std_image/${selectedStudent?.id}`}
          alt="student"
        />
      </div>
      <div className="inputs">
        <label>Student ID</label>
        <span>{selectedStudent?.id}</span>
      </div>
      <div className="inputs">
        <label>Student Name</label>
        <span>{selectedStudent?.std_name}</span>
      </div>
      <div className="inputs">
        <label>Student Email</label>
        <span>{selectedStudent?.std_email}</span>
      </div>
      <div className="inputs">
        <label>Student Phone</label>
        <span>{selectedStudent?.std_phone}</span>
      </div>
      <div className="inputs">
        <label>Sex</label>
        <span>{selectedStudent?.sex}</span>
      </div>
      <div className="inputs">
        <label>Course</label>
        <span>{selectedStudent?.course}</span>
      </div>
      <div className="inputs">
        <label>Year and Section</label>
        <span>{selectedStudent?.year_and_section}</span>
      </div>
      <div className="inputs">
        <label>Guardian Name</label>
        <span>{selectedStudent?.guardian_name}</span>
      </div>
      <div className="inputs">
        <label>Guardian Phone</label>
        <span>{selectedStudent?.guardian_phone}</span>
      </div>

      {/* <p>{selectedStudent?.std_name}</p>
      <p>Email: {selectedStudent?.std_email}</p>
      <p>Phone: {selectedStudent?.std_phone}</p>
      <p>Sex: {selectedStudent?.sex}</p>
      <p>Course: {selectedStudent?.course}</p>
      <p>Year and Section: {selectedStudent?.year_and_section}</p>
      <p>Guardian Name: {selectedStudent?.guardian_name}</p>
      <p>Guardian Phone: {selectedStudent?.guardian_phone}</p> */}

      <div className="btns">
        <button
          onClick={() => {
            setSelectedStudent({});
            setIsViewing(false);
          }}
        >
          Close
        </button>
      </div>
    </ViewSection>
  );
};

export default ViewStudent;
