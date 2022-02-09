import React, { useEffect } from "react";
import styled from "styled-components";
import { Calendar, Day, momentLocalizer } from "react-big-calendar";
import moment, { CalendarSpec } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // css모양 받아오기...휴..
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarPlan, ICalendarPlan, userInfo } from "../../../atoms";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { fStore } from "../../../service/fireBase";

// import "./ShowCalendar.module.css";
// import "react-big-calendar/lib/sass/styles";

const Container = styled.div`
  position: relative;
`;

const FormBox = styled.div`
  height: 50%;
  width: 70%;
  background-color: rgb(0, 0, 0, 0.7);
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 50%;

    input {
      width: 60%;
      height: 60%;
    }

    button {
      padding: 5px;
      width: 60%;
      margin-top: 8px;
    }
  }
`;

const calendarStyle = () => {
  return {
    style: {
      backgroundColor: "red",
      color: "green",
    },
  };
};

const dummyEvents = [
  {
    allDay: false,
    end: "January 10, 2022 11:13:00",
    start: "January 09, 2022 11:13:00",
    title: "hi",
  },
  {
    allDay: true,
    end: "January 02, 2022 11:13:00",
    start: "January 02, 2022 11:13:00",
    title: "All Day Event",
  },
  {
    allDay: true,
    end: "January 30, 2022 11:13:00",
    start: "January 30, 2022 11:10:00",
    title: "td",
  },
];

const ShowCalendar = () => {
  const localizer = momentLocalizer(moment);
  const userId = useRecoilValue(userInfo);
  const [openForm, setOpenForm] = useState(false);
  const [plan, setPlan] = useRecoilState<ICalendarPlan[]>(calendarPlan);
  const { register, watch, setValue, handleSubmit } = useForm();

  return (
    <Container>
      <Calendar
        selectable={true}
        localizer={localizer}
        style={{ height: 500 }}
        startAccessor="start"
        endAccessor="end"
        events={dummyEvents}
        // selected={selected}
        // onSelectEvent={handleSelected}
        // onSelectSlot={handleSelected}
      />
      {openForm && (
        <FormBox>
          <form>
            <input
              {...(register("title"), { required: true })}
              type="text"
              placeholder="일정을 적어주세요"
            />
            <button>click</button>
          </form>
        </FormBox>
      )}
    </Container>
  );
};

export default ShowCalendar;
