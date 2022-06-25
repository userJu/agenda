import React, { useEffect } from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // css모양 받아오기...휴..
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { fStore } from "../../../service/fireBase";
import { IUserCalendars, userCalendars, userInfo } from "../../../atoms";
import InputBoard from "../../Layout/UI/InputBoard";

// import "./UserCalendar.module.css";
// import "react-big-calendar/lib/sass/styles";

const Container = styled.div`
  position: relative;
`;

const calendarStyle = () => {
  return {
    style: {
      backgroundColor: "red",
      color: "green",
    },
  };
};

interface IUserCalendar {
  uid: string;
  fireStore: any;
}

const UserCalendar = ({ uid, fireStore }: IUserCalendar) => {
  const localizer = momentLocalizer(moment);
  const [openForm, setOpenForm] = useState(false);
  const { register, setValue, handleSubmit } = useForm();
  const [selected, setSelected] = useState();
  const [calendarEvents, setCalendarEvents] = useRecoilState(userCalendars);
  const [calendarEventDummy, setCalendarEventDummy] =
    useState<IUserCalendars>();

  const closeFormBtn = () => {
    setOpenForm((prev) => !prev);
  };

  const handleSelected = (e: any) => {
    setSelected(e);
    setOpenForm((prev) => !prev);
    setCalendarEventDummy({
      allDay: true,
      start: e.start,
      end: e.end,
      title: "",
    });
  };

  const calendarTxt = ({ title }: any) => {
    setValue("title", "");
    const calendarEvent: any = calendarEventDummy;
    if (calendarEvent !== undefined) {
      calendarEvent.title = title;
    }
    console.log(title);
    uploadFStore(calendarEvent);
  };
  // firebase

  // upload fireStore
  const uploadFStore = async (calendarEvent: IUserCalendars) => {
    const progressReff = collection(fStore, `${uid}`);
    try {
      await updateDoc(doc(progressReff, "calendar"), {
        calendarEvent: arrayUnion(calendarEvent),
      });
    } catch (err) {
      await setDoc(doc(progressReff, "calendar"), {
        calendarEvent: [calendarEvent], // 만약 처음 만들어질 때는 setDoc를 먼저 한다
      });
    }
  };

  const getData = (datas: any) => {
    const afterData: any = [];
    if (datas) {
      datas.forEach((bF: any) => {
        calcDataToObj(afterData, bF);
      });
    }
    setCalendarEvents((prev) => [...afterData]);
  };

  const calcDataToObj = (afterData: any, bF: any) => {
    afterData.push({
      allDay: bF.allDay!,
      end: moment(bF.end?.seconds * 1000 - 1).format("MMMM DD YYYY hh:mm:ss"),
      start: moment(bF.start?.seconds * 1000).format("MMMM DD YYYY hh:mm:ss"),
      title: bF.title!,
    });
  };

  useEffect(() => {
    if (uid !== "") {
      const progressRef = collection(fStore, `${uid}`);
      fireStore.downloadData(progressRef, getData, "calendarEvent");
    }
    return () => {
      console.log("언마운트");
    };
  }, [uid]);

  return (
    <Container>
      <Calendar
        selectable={true}
        localizer={localizer}
        style={{ height: 500 }}
        startAccessor="start"
        endAccessor="end"
        events={calendarEvents}
        selected={selected}
        onSelectEvent={handleSelected}
        onSelectSlot={handleSelected}
      />
      {openForm && (
        <InputBoard
          closeFormBtn={closeFormBtn}
          submitForm={calendarTxt}
          formName="calendar"
        >
          <form onSubmit={handleSubmit(calendarTxt)}>
            <input
              {...(register("title"), { required: true })}
              type="text"
              placeholder="일정을 적어주세요"
            />
            <button>click</button>
          </form>
        </InputBoard>
      )}
    </Container>
  );
};

export default UserCalendar;
