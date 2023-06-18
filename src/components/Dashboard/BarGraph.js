import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../styles/Bargraph.css";
import { addDays, format, subDays, isValid } from "date-fns";
import CountUp from "react-countup";
import { Navigate, useNavigate } from "react-router-dom";
// const data = [
//   {
//     country: "Monday",
//     "hot dog": 14,
//     "hot dogColor": "hsl(271, 70%, 50%)",
//     burger: 135,
//     burgerColor: "hsl(304, 70%, 50%)",
//     sandwich: 41,
//     sandwichColor: "hsl(110, 70%, 50%)",
//     kebab: 64,
//     kebabColor: "hsl(138, 70%, 50%)",
//     fries: 7,
//     friesColor: "hsl(157, 70%, 50%)",
//     donut: 196,
//     donutColor: "hsl(10, 70%, 50%)",
//   },
//   {
//     country: "Tuesday",
//     "hot dog": 189,
//     "hot dogColor": "hsl(320, 70%, 50%)",
//     burger: 179,
//     burgerColor: "hsl(25, 70%, 50%)",
//     sandwich: 25,
//     sandwichColor: "hsl(143, 70%, 50%)",
//     kebab: 103,
//     kebabColor: "hsl(133, 70%, 50%)",
//     fries: 169,
//     friesColor: "hsl(37, 70%, 50%)",
//     donut: 47,
//     donutColor: "hsl(34, 70%, 50%)",
//   },
//   {
//     country: "Wednesday",
//     "hot dog": 62,
//     "hot dogColor": "hsl(128, 70%, 50%)",
//     burger: 167,
//     burgerColor: "hsl(129, 70%, 50%)",
//     sandwich: 49,
//     sandwichColor: "hsl(227, 70%, 50%)",
//     kebab: 162,
//     kebabColor: "hsl(93, 70%, 50%)",
//     fries: 152,
//     friesColor: "hsl(104, 70%, 50%)",
//     donut: 2,
//     donutColor: "hsl(325, 70%, 50%)",
//   },
//   {
//     country: "Thursday",
//     "hot dog": 76,
//     "hot dogColor": "hsl(96, 70%, 50%)",
//     burger: 37,
//     burgerColor: "hsl(123, 70%, 50%)",
//     sandwich: 65,
//     sandwichColor: "hsl(249, 70%, 50%)",
//     kebab: 20,
//     kebabColor: "hsl(324, 70%, 50%)",
//     fries: 105,
//     friesColor: "hsl(83, 70%, 50%)",
//     donut: 92,
//     donutColor: "hsl(67, 70%, 50%)",
//   },
//   {
//     country: "Friday",
//     "hot dog": 48,
//     "hot dogColor": "hsl(257, 70%, 50%)",
//     burger: 77,
//     burgerColor: "hsl(269, 70%, 50%)",
//     sandwich: 37,
//     sandwichColor: "hsl(26, 70%, 50%)",
//     kebab: 129,
//     kebabColor: "hsl(31, 70%, 50%)",
//     fries: 136,
//     friesColor: "hsl(143, 70%, 50%)",
//     donut: 16,
//     donutColor: "hsl(171, 70%, 50%)",
//   },
//   {
//     country: "Saturday",
//     "hot dog": 164,
//     "hot dogColor": "hsl(147, 70%, 50%)",
//     burger: 159,
//     burgerColor: "hsl(54, 70%, 50%)",
//     sandwich: 161,
//     sandwichColor: "hsl(251, 70%, 50%)",
//     kebab: 73,
//     kebabColor: "hsl(333, 70%, 50%)",
//     fries: 133,
//     friesColor: "hsl(113, 70%, 50%)",
//     donut: 51,
//     donutColor: "hsl(273, 70%, 50%)",
//   },
//   {
//     country: "Sunday",
//     "hot dog": 120,
//     "hot dogColor": "hsl(335, 70%, 50%)",
//     burger: 36,
//     burgerColor: "hsl(152, 70%, 50%)",
//     sandwich: 156,
//     sandwichColor: "hsl(196, 70%, 50%)",
//     kebab: 119,
//     kebabColor: "hsl(283, 70%, 50%)",
//     fries: 108,
//     friesColor: "hsl(166, 70%, 50%)",
//     donut: 63,
//     donutColor: "hsl(118, 70%, 50%)",
//   },
// ];

function MyResponsiveBar() {
  const role = localStorage.getItem("role");
  const [data2, setData] = useState();
  const [datafil, setDataFil] = useState();
  const [barData, setBarData] = useState();
  const [barOutData, setBarOutData] = useState();
  const [barKey, setBarKey] = useState();

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [course, setCourse] = useState();
  const [total, setTotal] = useState();

  const countUpRef = useRef(0);

  useEffect(() => {
    if (course) {
    }
  }, [course]);

  useEffect(() => {
    (async () => {
      let datecourse = {};

      datecourse.course = course;

      datecourse.date = date;
      await axios
        .get("http://localhost:3010/attendancebygate", {
          params: datecourse,
        })
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [date, course]);

  useEffect(() => {
    if (data2) {
      const days = [];
      let population = 0;
      console.log(data2);
      for (let i = 0; i < 7; i++) {
        days[i] = format(
          new Date(subDays(new Date(date), i).toISOString().substring(0, 10)),
          "MMM d"
        );
      }
      console.log(days);

      let keys = ["super", "admin", "gate0", "gate1", "gate2", "gate3"];
      let insidefiltered = [];
      let outsidefiltered = [];
      const colors = [
        "hsl(283, 70%, 50%)",
        "hsl(143, 70%, 50%)",
        "hsl(53, 70%, 50%)",
        "hsl(5, 70%, 50%)",
        "hsl(212, 70%, 50%)",
        "hsl(150, 70%, 50%)",
        "hsl(196, 70%, 50%)",
        "hsl(166, 70%, 50%)",
        "hsl(118, 70%, 50%)",
        "hsl(335, 70%, 50%)",
        "hsl(152, 70%, 50%)",
        "hsl(178, 70%, 50%)",
      ];

      days.forEach((day, index) => {
        let perdayinside = {};
        perdayinside.country = day;
        perdayinside.super = Math.floor(Math.random() * 100);
        // perdayinside.superColor = colors[index];
        perdayinside.gate1 = Math.floor(Math.random() * 100);
        // perdayinside.gate1Color = colors[index];
        perdayinside.gate2 = Math.floor(Math.random() * 100);
        // perdayinside.gate2Color = colors[index];
        perdayinside.gate3 = Math.floor(Math.random() * 100);
        // perdayinside.gate3Color = colors[index];
        insidefiltered[index] = perdayinside;

        let perdayoutside = {};
        perdayoutside.country = day;
        perdayoutside.super = Math.floor(Math.random() * 100);
        // perdayoutside.superColor = colors[index];
        perdayoutside.gate1 = Math.floor(Math.random() * 100);
        // perdayoutside.gate1Color = colors[index];
        perdayoutside.gate2 = Math.floor(Math.random() * 100);
        // perdayoutside.gate2Color = colors[index];
        perdayoutside.gate3 = Math.floor(Math.random() * 100);
        // perdayoutside.gate3Color = colors[index];
        outsidefiltered[index] = perdayoutside;

        data2.map((data, i) => {
          // console.log(data);
          if (!keys.includes(data.gatein) && data.gatein) {
            keys.push(data.gatein);
          }
          if (!keys.includes(data.gateout) && data.gateout) {
            keys.push(data.gateout);
          }

          if (data.hasOwnProperty("gatein")) {
            if (data?.country === day) {
              perdayinside.country = data?.country;
              perdayinside[data.gatein] = data?.gatecountin;

              // perdayinside[data.gate + "Color"] = colors[index];
              insidefiltered[index] = perdayinside;
              console.log(insidefiltered);
              population += data.gatecountin;
            }
          } else if (data.hasOwnProperty("gateout")) {
            if (data?.country === day) {
              perdayoutside.country = data.country;
              perdayoutside[data.gateout] = data.gatecountout;
              // perdayoutside[data.gate + "Color"] = colors[index];
              outsidefiltered[index] = perdayoutside;
              population += data.gatecountout;
            }
          }
        });
      });

      console.log(insidefiltered);
      console.log(keys);
      setBarData(insidefiltered);
      setBarOutData(outsidefiltered);
      setBarKey(keys);
      setTotal(population);
    }
  }, [data2]);

  if (role === "admin" || role === "super") {
    return (
      <div className="bar" style={{ height: "100%", width: "100%" }}>
        <div className="topdiv" style={{ height: "10%", width: "100%" }}>
          <div className="subtop">
            <h3>Weekly Population Graph</h3>
          </div>
          <div className="datecourse">
            <div className="datediv">
              <label>Choose Date: </label>
              <input
                type="date"
                defaultValue={date}
                max={format(new Date(), "yyyy-MM-dd")}
                onChange={(e) => {
                  if (isValid(new Date(e.target.value)))
                    setDate(e.target.value);
                }}
              />
            </div>
            <div className="coursediv">
              <label>Course: </label>
              <input
                id="course"
                placeholder="Type course"
                type="text"
                onChange={(e) => {
                  let cinput = e.target.value.replace(/[^\w\s]|_/g, "");
                  if (!cinput) {
                    setCourse();
                  }
                }}
              />
              <button
                onClick={() => {
                  let courseval = document
                    .getElementById("course")
                    .value.replace(/[^\w\s]|_/g, "");
                  if (courseval) setCourse(courseval);
                }}
              >
                Go
              </button>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <h4 id="total" key={total}>
              <input
                key={total}
                ref={countUpRef}
                style={{ display: "none" }}
                type="number"
                defaultValue={total}
              />
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
        </div>
        <div style={{ height: "45%", width: "100%" }} className="bardiv">
          {barData && (
            <ResponsiveBar
              data={barData}
              groupMode="grouped"
              keys={barKey}
              indexBy="country"
              margin={{ top: 50, right: 130, bottom: 100, left: 50 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "set3" }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "#38bcb2",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "#eed312",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              // fill={[
              //   {
              //     match: {
              //       id: "fries",
              //     },
              //     id: "dots",
              //   },
              //   {
              //     match: {
              //       id: "sandwich",
              //     },
              //     id: "lines",
              //   },
              // ]}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Gates",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time in",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              isInteractive={true}
              motionConfig="wobbly"
              role="application"
              ariaLabel="Nivo bar chart demo"
              barAriaLabel={(e) =>
                e.id + ": " + e.formattedValue + " in date: " + e.indexValue
              }
            />
          )}
        </div>
        <div
          style={{
            height: "45%",
            width: "100%",
          }}
          className="bardiv"
        >
          {barOutData && (
            <ResponsiveBar
              data={barOutData}
              groupMode="grouped"
              keys={barKey}
              indexBy="country"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              reverse={true}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "set3" }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "#38bcb2",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "#eed312",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              // fill={[
              //   {
              //     match: {
              //       id: "fries",
              //     },
              //     id: "dots",
              //   },
              //   {
              //     match: {
              //       id: "sandwich",
              //     },
              //     id: "lines",
              //   },
              // ]}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Gates",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time out",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",

                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              barWidth={20}
              motionConfig="wobbly"
              role="application"
              ariaLabel="Nivo bar chart demo"
              barAriaLabel={(e) =>
                e.id + ": " + e.formattedValue + " in date: " + e.indexValue
              }
            />
          )}
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" replace={true} />;
  }
}

export default MyResponsiveBar;
