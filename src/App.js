import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NepaliDate from "nepali-date/cjs/NepaliDate";
export default function App() {
  const months = [
    "Baisakh",
    "Jestha",
    "Ashad",
    "Shrawan",
    "Bhadra",
    "Asoj",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
  ];
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getDate = () => {
    const { month, day, year } = new NepaliDate(new Date());
    return { month, day, year };
  };

  const subtractDays = (date, days) => {
    date.setDate(date.getDate() - days);
    return date;
  };
  const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  const getWeek = () => {
    let week = [];
    let date = new Date();
    let days = date.getDay();
    days = days == 7 ? 0 : days;
    const startDate = subtractDays(date, days + 1);
    for (let i = 0; i < 7; i++) {
      const thisDate = addDays(startDate, 1);
      const { month, day, year } = new NepaliDate(thisDate);
      const weekday = thisDate.getDay() == 7 ? 1 : thisDate.getDay() + 1;
      const weekdayName = weekDays[weekday - 1];
      week = [
        ...week,
        {
          year,
          month,
          day,
          weekday,
          weekdayName,
          weekdayNameShort: weekdayName.slice(0, 3),
        },
      ];
    }
    return { week, today: week[days] };
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/week" element={JSON.stringify(getWeek())} />
        <Route
          path="/withYear"
          element={`${months[getDate().month]} ${getDate().day},${
            getDate().year
          }`}
        />
        <Route path="/year" element={getDate().year} />
        <Route path="/month" element={getDate().month} />
        <Route path="/monthInWord" element={months[getDate().month]} />
        <Route path="/day" element={getDate().day} />
      </Routes>
    </BrowserRouter>
  );
}
