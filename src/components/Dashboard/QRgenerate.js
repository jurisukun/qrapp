import QRCode from "qrcode";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { QRcode } from "../../styles/QRgenerate.styled";

function QRgenerate() {
  const role = localStorage.getItem("role");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [value, setValue] = useState("");
  const [qr, setQR] = useState("");
  const [student, setStudent] = useState([]);
  const GenerateQRCode = async () => {
    try {
      const findstudent = student.find((s) => s.id == value);
      if (!findstudent) {
        alert("Student doesn't exists");
      } else {
        const response = await QRCode.toDataURL(findstudent.hashed_id);
        setQR(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const checkString = (input) => {
    for (let i = 0; i < input.length; i++) {
      const code = input.charCodeAt(i);
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        return true;
      }
    }
    return false;
  };
  useEffect(() => {
    (async () => {
      if (value) {
        const string = {
          idLike: value + "%",
        };
        const result = await axios.post(
          `http://localhost:3010/student/like`,
          string
        );
        setStudent(result.data);

        const result1 = checkString(value);
        if (result1) {
          setShowSuggestion(false);
        } else if (result.data.length == 0) {
          setShowSuggestion(false);
        } else {
          setShowSuggestion(true);
        }

        const std = student.find((s) => s.id == value);
        if (std) {
          setShowSuggestion(false);
        }
      } else {
        setShowSuggestion(false);
      }
    })();
  }, [value]);

  // useEffect(() => {
  //   if (!value) {
  //     setShowSuggestion(false);
  //   }
  //   const textPattern = "[a-zA-Z]*";
  //   const pattern = new RegExp(textPattern);
  //   console.log(pattern.test(value));
  //   if (pattern.test(value)) {
  //     setShowSuggestion(false);
  //   }
  //   setShowSuggestion(true);

  //   const std = student.find((s) => s.id == value);
  //   if (std) {
  //     setShowSuggestion(false);
  //   }
  // }, [value]);
  if (role === "admin" || role === "super") {
    return (
      <QRcode>
        <div className="wrapper">
          <div className="title">
            <h2>QR Generator</h2>
          </div>
          <div className="search-container">
            <div className="inner-search">
              <input
                type="text"
                placeholder="Search here..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                pattern="[0-9]*"
              />
              <button onClick={GenerateQRCode}>Generate</button>
            </div>

            {showSuggestion && (
              <div className="suggestion">
                {student
                  .filter((s) => {
                    const searchValue = value;
                    const fullValue = s.id;
                    return searchValue && s && searchValue !== fullValue;
                  })
                  .map((s) => {
                    return (
                      <div
                        className="suggest-item"
                        key={s.id}
                        onClick={() => {
                          setValue(s.id);
                        }}
                      >
                        {s.id}
                      </div>
                    );
                  })
                  .slice(0, 10)}
              </div>
            )}
          </div>

          <div className="qrgenerate">
            <div className="image">
              {qr && (
                <a href={qr} download>
                  <img src={qr} />
                </a>
              )}
            </div>
            {qr && <p>click the image to download</p>}
            <div className="button">
              <button
                onClick={() => {
                  setQR("");
                  setValue("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </QRcode>
    );
  } else {
    return <Navigate to="/" replace={true} />;
  }
}

export default QRgenerate;
