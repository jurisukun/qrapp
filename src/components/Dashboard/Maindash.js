import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";
import { format, isValid } from "date-fns";
import CountUp from "react-countup";
import { DashContainer } from "../../styles/Maindash.styled";
function Maindash() {
  const [attendance, setAttendance] = useState();
  const [datess, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [total, setTotal] = useState(0);
  const countUpRef = useRef(0);

  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:3010/attendancedata", {
        params: { date: datess },
      });
      console.log(result.data);

      let d = [];
      let population = 0;
      result.data.map((key) => {
        console.log(key);
        population += key.gateincount + key.gateoutcount;
        d.push({
          id: key.course,
          label: key.course,
          value: key.gateincount + key.gateoutcount,
          color: ` hsl(${
            Math.floor(Math.random() * (200 - 25 + 1)) + 25
          }, 70%, 50%)`,
        });
      });
      setAttendance(d);
      setTotal(population);
    })();
  }, [datess]);

  return (
    <DashContainer>
      <div className="chart">
        <div>
          <label>Choose date</label>

          <input
            onChange={(e) => {
              if (isValid(new Date(e.target.value))) setDate(e.target.value);
            }}
            type="date"
            defaultValue={datess}
            max={new Date().toISOString().substring(0, 10)}
          />
        </div>
        <h2>Student Populations</h2>

        {attendance && attendance?.length > 0 ? (
          <>
            <input
              key={total}
              ref={countUpRef}
              style={{ display: "none" }}
              type="number"
              defaultValue={total}
            />
            <div className="totaldiv">
              <h4>
                {" "}
                Total:
                <CountUp
                  id="totalspan"
                  start={countUpRef.current?.value}
                  end={total}
                  duration={2}
                  delay={0}
                ></CountUp>
              </h4>
            </div>
            <div className="pie">
              <ResponsivePie
                data={attendance ? attendance : []}
                colors={{ scheme: "nivo" }}
                innerRadius={window.innerWidth <= 500 ? 0.7 : 0.6}
                padAngle={window.innerWidth <= 500 ? 0.4 : 0.7}
                margin={
                  window.innerWidth <= 500
                    ? { top: 40, right: 40, bottom: 40, left: 40 }
                    : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                cornerRadius={3}
                arcLinkLabelsColor={{
                  from: "color",
                }}
                arcLinkLabelsThickness={3}
                arcLinkLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 1.2]],
                }}
              />
            </div>
          </>
        ) : (
          <h5 style={{ display: "flex", justifyContent: "center" }}>
            ------ No attendance record found
          </h5>
        )}
      </div>
    </DashContainer>
  );
}

export default Maindash;
