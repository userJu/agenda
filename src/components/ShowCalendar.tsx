import React, { useEffect } from "react";
import styled from "styled-components";
import { Calendar, Day, momentLocalizer } from "react-big-calendar";
import moment, { CalendarSpec } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // css모양 받아오기...휴..
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarPlan, ICalendarPlan, userInfo } from "../atoms";
import { useState } from "react";
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
import { fStore } from "../service/fireBase";

// import "./ShowCalendar.module.css";
// import "react-big-calendar/lib/sass/styles";

const Form = styled.div`
  height: 500px;
  background-color: rgb(0, 0, 0, 0.3);
`;

const calendarStyle = () => {
  return {
    style: {
      backgroundColor: "red",
      color: "green",
    },
  };
};

interface ICalendarArray {
  id: string;
  plan: [];
}

const ShowCalendar = () => {
  const localizer = momentLocalizer(moment);
  const userId = useRecoilValue(userInfo);
  // const [openForm, setOpenForm] = useState(false);
  const [plan, setPlan] = useRecoilState<ICalendarPlan[]>(calendarPlan);
  const [selected, setSelected] = useState();
  const [plans, setPlans] = useState([]);

  const handleSelected = (e: any) => {
    setSelected(e);
    if (e.action === "click") {
      console.log("click이벤트인", e);
      const selectDate = {
        allDay: true,
        start: e.start,
        end: e.end,
        title: "오늘이다",
        userId,
      };
      setPlan([selectDate]);
    } else if (e.action === "select") {
      console.log("select이벤트인", e);
    }
    // fB에 업로드
    if (userId === "" || plan.length < 1) {
      return;
    } else {
      addDoc(collection(fStore, `calendar : ${userId}`), { plan });
    }
  };

  console.log(plan);

  useEffect(() => {
    const q = query(collection(fStore, `calendar : ${userId}`));
    // const querySnapshot = await getDocs(q);
    onSnapshot(q, (snapshot) => {
      const calendarArray = snapshot.docs.map((date) => {
        date.data();
      });
      setPlans(calendarArray as any); // 어떻게 할지 모르겠어서 any 써버림 ㅜㅜ
    });
    console.log("뭐라ㄴㅁㄴㅁㅇㄴㅇㅁ도");
  }, [plan]);

  // console.log(date.data().plan[0]),

  console.log(plans);
  const events = plans;

  // [
  //   {
  //     allDay: false,
  //     start: "January 09, 2022 11:13:00",
  //     end: "January 10, 2022 11:13:00",
  //     title: "hi",
  //   },
  //   {
  //     allDay: true,
  //     start: "January 02, 2022 11:13:00",
  //     end: "January 02, 2022 11:13:00",
  //     title: "All Day Event",
  //   },
  //   {
  //     allDay: true,
  //     start: "January 30, 2022 11:10:00",
  //     end: "January 30, 2022 11:13:00",
  //     title: "td",
  //   },
  // ];
  return (
    <div>
      <Calendar
        selectable={true}
        localizer={localizer}
        style={{ height: 500 }}
        startAccessor="start"
        endAccessor="end"
        events={events}
        selected={selected}
        onSelectSlot={handleSelected}
      />
      {/* {openForm && (
        <Form>
          <form>
            <input type="text" />
            <button>click</button>
          </form>
        </Form>
      )} */}
    </div>
  );
};

export default ShowCalendar;
