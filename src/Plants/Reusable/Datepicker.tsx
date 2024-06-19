import React, { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import "./Datepicker.css";
import { getDate } from "../../helpers/date";

type TMyDatePicker = {
  onChange: (event: Date | null) => void;
  onLog: () => void;
  value: Date | null;
};

const MyDatePicker = ({ onChange, value, onLog }: TMyDatePicker) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const MyContainer = ({
    className,
    children,
  }: {
    className: string;
    children: any;
  }) => {
    return (
      <>
        <CalendarContainer className={`${className}`}>
          <div>{children}</div>
        </CalendarContainer>
      </>
    );
  };
  return (
    <div className="flex flex-row">
      <DatePicker
        selected={value}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => {
          setCurrentMonth(monthDate.getMonth());
          return (
            <>
              <button
                aria-label="Previous Month"
                className={
                  "react-datepicker__navigation react-datepicker__navigation--previous"
                }
                onClick={decreaseMonth}
              >
                <span
                  className={
                    "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                  }
                >
                  {"<"}
                </span>
              </button>

              <span className="react-datepicker__current-month">
                {monthDate.toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {console.log(monthDate.getMonth(), new Date().getMonth())}
              {
                <button
                  aria-label="Next Month"
                  className={`react-datepicker__navigation react-datepicker__navigation--next`}
                  disabled={monthDate.getMonth() === new Date().getMonth()}
                  onClick={increaseMonth}
                >
                  <span
                    className={`${
                      monthDate.getMonth() === new Date().getMonth() &&
                      "disabledArrow"
                    } react-datepicker__navigation-icon react-datepicker__navigation-icon--next`}
                  >
                    {">"}
                  </span>
                </button>
              }
            </>
          );
        }}
        calendarClassName="bg-lightest-green"
        onChange={(date) => onChange(date)}
        calendarContainer={MyContainer}
        className="px-1 w-11/12 bg-light-mint outline-none text-text-green border border-green rounded-lg text-xs focus:ring-text-green focus:ring-1 focus:border-text-green"
        excludeDateIntervals={[{ start: getDate(0), end: getDate(31) }]}
        renderDayContents={(day, month) => {
          return month.getMonth() !== currentMonth ? null : day;
        }}
      />
      <button
        onClick={onLog}
        className="text-text-green font-bold hover:bg-green bg-green bg-opacity-55 px-1.5  rounded-full active:scale-95"
      >
        +
      </button>
    </div>
  );
};

export default MyDatePicker;
