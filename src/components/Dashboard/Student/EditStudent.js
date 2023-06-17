import { set } from "date-fns";
import { BiCamera } from "react-icons/bi";
import styled from "styled-components";
const EditSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
    form {
      font-size: 12px;
    }
    .inputs {
      height: 20px;
      font-size: 12px;
      gap: 6px;
      margin: 6px;
    }
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .inputs {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    label {
      width: 30%;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
    }
    input,
    select {
      width: 70%;
      padding: 10px;
      border: 1px solid #131313;
      border-radius: 5px;
      outline: none;
      &:focus {
        border: 1px solid #000;
      }

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }

  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    button {
      width: 100%;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;

      &:first-child {
        background: #43435e;
        color: #fff;
      }

      &:last-child {
        background: #fff;
        color: #43435e;
        border: 1px solid #43435e;
      }

      &:hover {
        transform: scale(0.98);
      }
    }
  }

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: relative;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: contain;
      border: 1px solid #131313;
    }

    label {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      right: 0;
      background: #f3f3f3;
      color: #131313;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      cursor: pointer;
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
const EditStudent = ({
  selectedStudent,
  handleUpdateStudent,
  setSelectedStudent,
  setIsEditing,
}) => {
  const handleChange = (e) => {
    setSelectedStudent({
      ...selectedStudent,
      sex: e.target.value,
    });
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return alert("File not exist.");

    if (file?.type !== "image/jpeg" && file?.type !== "image/png") {
      return alert("File not supported.");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedStudent({
        ...selectedStudent,
        image: file,
        img: reader.result,
      });
    };
  };
  return (
    <EditSection>
      <form id="stdedit" onSubmit={handleUpdateStudent}>
        <h2>Edit Student</h2>
        <div className="image">
          <input
            type="file"
            id="img"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <img
            src={
              selectedStudent?.img
                ? selectedStudent?.img
                : `http://localhost:3010/std_image/${selectedStudent?.id}`
            }
            alt="student"
          />
          <label htmlFor="img">
            <BiCamera />
          </label>
        </div>
        <div className="inputs">
          <label>Student Name</label>
          <input
            type="text"
            placeholder="Name"
            defaultValue={selectedStudent?.std_name}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                std_name: e.target.value,
              })
            }
          />
        </div>
        <div className="inputs">
          <label>Student Email</label>
          <input
            type="email"
            placeholder="Email"
            defaultValue={selectedStudent?.std_email}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                std_email: e.target.value,
              })
            }
          />
        </div>

        <div className="inputs">
          <label>Student Phone</label>
          <input
            type="text"
            placeholder="Phone"
            defaultValue={selectedStudent?.std_phone}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                std_phone: e.target.value,
              })
            }
          />
        </div>
        <div className="inputs">
          <label>Course</label>
          <input
            type="text"
            placeholder="Course"
            defaultValue={selectedStudent?.course}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                course: e.target.value,
              })
            }
          />
        </div>
        <div className="inputs">
          <label>Year and Section</label>
          <input
            type="text"
            placeholder="Year and Section"
            defaultValue={selectedStudent?.year_and_section}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                year_and_section: e.target.value,
              })
            }
          />
        </div>
        <div className="inputs">
          <label>Guardian Name</label>
          <input
            type="text"
            placeholder="Guardian Name"
            defaultValue={selectedStudent?.guardian_name}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                guardian_name: e.target.value,
              })
            }
          />
        </div>
        <div className="inputs">
          <label>Guardian Phone</label>
          <input
            type="text"
            placeholder="Guardian Phone"
            defaultValue={selectedStudent?.guardian_phone}
            onChange={(e) =>
              setSelectedStudent({
                ...selectedStudent,
                guardian_phone: e.target.value,
              })
            }
          />
        </div>

        <div className="inputs">
          <label>Sex</label>
          <select value={selectedStudent?.sex} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="btns">
          <button type="submit">Update Student</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(false);
              setSelectedStudent({});
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </EditSection>
  );
};

export default EditStudent;
