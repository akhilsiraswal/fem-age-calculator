import { useState } from "react";
import "./App.css";
// import { ReactComponent as Arrow_icon } from "./assets/icon-arrow.svg";
import arrow_icon from "./assets/icon-arrow.svg";
function App() {
  const [values, setValues] = useState({
    dd: "",
    mm: "",
    yy: "",
    yys: "--",
    mms: "--",
    dds: "--",
    dd_msg: "must be a valid date",
    mm_msg: "must be a valid month",
    yy_msg: "must be a valid year",
  });

  const [error, setError] = useState(false);
  const [errorCal, setErrorCal] = useState({
    errorDay: false,
    errorMonth: false,
    errorYear: false,
  });

  const isValidated = (dd, mm, yy) => {
    let day = parseInt(dd);
    let month = parseInt(mm);
    let year = parseInt(yy);

    if (month > 12) {
      setValues({ ...values, mm_msg: "wrong month " });
      setError(true);
      setErrorCal({ ...errorCal, errorMonth: true });
      return false;
    }
    console.log("inside validation");
    const year_val = parseInt(new Date().getFullYear());
    console.log(year_val);

    if (year > year_val) {
      console.log("hehe");
      setValues({ ...values, yy_msg: "Wrong year" });
      setError(true);
      setErrorCal({ ...errorCal, errorYear: true });
      return false;
    }

    if (day > 31) {
      setValues({ ...values, dd_msg: "wrong day" });
      setError(true);
      setErrorCal({ ...errorCal, errorDay: true });
      return false;
    }

    let ListOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 || month > 2) {
      if (day > ListOfDays[month - 1]) {
        return false;
      }
    } else if (month === 2) {
      let leapyear = false;
      if (!(year % 4 && year % 100) || !(year % 400)) leapyear = true;
      if (leapyear === false && day >= 29) {
        setValues({ ...values, mm_msg: "wrong month" });
        setError(true);
        setErrorCal({ ...errorCal, errorMonth: true });
        return false;
      }
      if (leapyear === true && day > 29) {
        setValues({ ...values, dd_msg: "wrong date format" });
        setValues({ ...values, mm_msg: "wrong date format" });
        setValues({ ...values, yy_msg: "wrong date format" });
        setError(true);
        setErrorCal({
          ...errorCal,
          errorMonth: true,
          errorDay: true,
          errorYear: true,
        });
      }
    }

    return true;
  };

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const CalculateDMY = (dd, mm, yy) => {
    console.log("inside calculate");
    if (isValidated(dd, mm, yy)) {
      setError(false);
      let curr_day = parseInt(new Date().getDate());
      let curr_month = parseInt(new Date().getMonth()) + 1;
      let curr_year = parseInt(new Date().getFullYear());

      let numberOfYears;
      let numberOfMonths;
      let numberOfDays;

      if (curr_day < parseInt(dd)) {
        numberOfDays = curr_day - parseInt(dd) + 30;
        curr_month = curr_month - 1;
      } else {
        numberOfDays = curr_day - parseInt(dd);
      }

      if (curr_month < parseInt(mm)) {
        numberOfMonths = curr_month - parseInt(mm) + 12;
        curr_year = curr_year - 1;
      } else {
        numberOfMonths = curr_month - parseInt(mm);
      }

      numberOfYears = curr_year - parseInt(yy);

      setValues({
        ...values,
        yys: numberOfYears,
        mms: numberOfMonths,
        dds: numberOfDays,
      });
    }
    console.log(values);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("inside onsubmit");
    CalculateDMY(values.dd, values.mm, values.yy);
  };

  return (
    <div className="container">
      <div className="card">
        <form action="#">
          <div className="form_input">
            <label htmlFor="" className={error ? "label_error" : ""}>
              DAY
            </label>
            <input
              type="text"
              placeholder="DD"
              value={values.dd}
              name="dd"
              onChange={onChangeHandler}
              className={errorCal.errorDay ? "input_error_day" : ""}
            />
            <label
              htmlFor=""
              id={errorCal.errorDay ? "error_hidden_label" : "hidden_label"}
            >
              {`${values.dd_msg}`}
            </label>
          </div>
          <div className="form_input">
            <label htmlFor="" className={error ? "label_error" : ""}>
              MONTH
            </label>
            <input
              type="text"
              placeholder="MM"
              value={values.mm}
              onChange={onChangeHandler}
              className={errorCal.errorMonth ? "input_error_month" : ""}
              name="mm"
            />
            <label
              htmlFor=""
              id={errorCal.errorMonth ? "error_hidden_label" : "hidden_label"}
            >
              {`${values.mm_msg}`}
            </label>
          </div>
          <div className="form_input">
            <label htmlFor="" className={error ? "label_error" : ""}>
              YEAR
            </label>
            <input
              type="text"
              placeholder="YYYY"
              value={values.yy}
              onChange={onChangeHandler}
              className={errorCal.errorYear ? "input_error_year" : ""}
              name="yy"
            />
            <label
              htmlFor=""
              id={errorCal.errorYear ? "error_hidden_label" : "hidden_label"}
            >
              {`${values.yy_msg}`}
            </label>
          </div>
          <div className="submit_button" onClick={onSubmitHandler}>
            <img src={arrow_icon} alt="arrow-icon" />
          </div>
        </form>

        <div className="display">
          <h1 className="years">
            <span> {` ${values.yys} `}</span> years
          </h1>
          <h1 className="months">
            <span>{`${values.mms}  `} </span>months
          </h1>
          <h1 className="days">
            <span> {`${values.dds}  `}</span>days
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
