import { AddSection } from "../../../styles/AddStudent.styled";
import { useState, useEffect } from "react";
import male from "../../../styles/images/avatar.jpg";
import { set } from "date-fns";
const AddStudent = ({
  handleAddStudent,
  newStudent,
  setNewStudent,
  setIsAdding,
}) => {
  const [tempImage, setTempImage] = useState(null);
  const handleChange = (event) => {
    setNewStudent({ ...newStudent, sex: event.target.value });
  };

  useEffect(() => {
    if (newStudent?.image) {
      setTempImage(URL.createObjectURL(newStudent.image));
    } else {
      setTempImage(null);
    }
  }, [newStudent]);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return alert("File not exist.");
    if (file?.type !== "image/jpeg" && file?.type !== "image/png")
      return alert("File not supported.");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTempImage(reader.result);
    };

    setNewStudent({ ...newStudent, image: file });
  };

  return (
    <AddSection>
      <form id="stform" onSubmit={handleAddStudent}>
        <h2>Add Student</h2>
        <div className="image">
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <img src={tempImage ? tempImage : male} alt="student" />
          </label>
        </div>
        <div className="inputs">
          <label>Student ID</label>
          <input
            name="new"
            type="text"
            placeholder="ID"
            defaultValue={newStudent?.id}
            onChange={(e) =>
              setNewStudent({ ...newStudent, id: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          <label>Student Name</label>
          <input
            name="new"
            type="text"
            placeholder="Name"
            defaultValue={newStudent?.std_name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, std_name: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          <label>Student Email</label>
          <input
            name="new"
            type="email"
            placeholder="Email"
            defaultValue={newStudent?.std_email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, std_email: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          <label>Student Phone</label>
          <input
            name="new"
            type="text"
            placeholder="Phone (e.g 9123456789)"
            defaultValue={newStudent?.std_phone}
            onChange={(e) =>
              setNewStudent({ ...newStudent, std_phone: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          <label>Course</label>
          <input
            name="new"
            type="text"
            placeholder="Course (e.g BS Computer Science)"
            defaultValue={newStudent?.course}
            onChange={(e) =>
              setNewStudent({ ...newStudent, course: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          <label>Year and Section</label>
          <input
            name="new"
            type="text"
            placeholder="Year and Section"
            defaultValue={newStudent?.year_and_section}
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                year_and_section: e.target.value,
              })
            }
          />
        </div>
        <div className="inputs">
          <label>Guardian Name</label>
          <input
            name="new"
            type="text"
            placeholder="Guardian Name"
            defaultValue={newStudent?.guardian_name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, guardian_name: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          <label>Guardian Phone</label>
          <input
            name="new"
            type="text"
            placeholder="Guardian Phone"
            defaultValue={newStudent?.guardian_phone}
            onChange={(e) =>
              setNewStudent({ ...newStudent, guardian_phone: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          <label>Student gender</label>
          <select name="new" value={newStudent?.sex} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="buttons">
          <button type="submit">Add Student</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsAdding(false);
              document.getElementById("stform").reset();
              setNewStudent({});
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </AddSection>
  );
};

export default AddStudent;
