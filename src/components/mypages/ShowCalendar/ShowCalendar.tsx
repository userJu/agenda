import React, { useEffect } from "react";
import styled from "styled-components";
import { Calendar, Day, momentLocalizer } from "react-big-calendar";
import moment, { CalendarSpec } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // css모양 받아오기...휴..
import { useRecoilState, useRecoilValue } from "recoil";
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
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { fStore } from "../../../service/fireBase";
import { IUserCalendars, userCalendars } from "../../../atoms";
import { domMax } from "framer-motion";

// import "./ShowCalendar.module.css";
// import "react-big-calendar/lib/sass/styles";

const Container = styled.div`
  position: relative;
`;

const FormBox = styled.div`
  height: 40%;
  width: 60%;
  background-color: rgb(255, 255, 255, 0.7);
  border: 0.5px solid ${(props) => props.theme.colors.buttonColor};
  box-shadow: ${(props) => props.theme.bigShadow};

  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 50%;

    input {
      width: 90%;
      height: 60%;
      border: 1px solid ${(props) => props.theme.colors.buttonColor};
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 5px;
      width: 90%;
      margin-top: 8px;
      border: none;
      outline: none;
      background-color: ${(props) => props.theme.colors.buttonColor};
      color: white;
      cursor: pointer;
    }
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  outline: none;
  color: white;
  background-color: ${(props) => props.theme.colors.buttonColor};
  cursor: pointer;
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
    end: "March 10, 2022 11:13:00",
    start: "March 09, 2022 11:13:00",
    title: "hi",
  },
  {
    allDay: true,
    end: "March 02, 2022 11:13:00",
    start: "March 02, 2022 11:13:00",
    title: "All Day Event",
  },
  {
    allDay: true,
    end: "March 17 2022 11:13:00",
    start: "March 15 2022 11:10:00",
    title: "td",
  },
];

interface IShowCalendar {
  uid: string;
}

// export interface IUserCalendars {
//   allDay?: boolean;
//   end: string;
//   start: string;
//   title?: string;
// }

const ShowCalendar = ({ uid }: IShowCalendar) => {
  const localizer = momentLocalizer(moment);
  const [openForm, setOpenForm] = useState(false);
  const { register, setValue, handleSubmit } = useForm();
  const [calendarEvents, setCalendarEvents] = useRecoilState(userCalendars);
  const [calendarEventDummy, setCalendarEventDummy] =
    useState<IUserCalendars>();

  const closeFormBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenForm((prev) => !prev);
  };
  const [selected, setSelected] = useState();
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
    uploadFStore(calendarEvent);
  };
  // firebase
  const progressRef = collection(fStore, `${uid}`);

  // upload fireStore
  const uploadFStore = async (calendarEvent: IUserCalendars) => {
    try {
      console.log("배열 요소를 업데이트");
      await updateDoc(doc(progressRef, "calendar"), {
        calendarEvent: arrayUnion(calendarEvent), // todo쪽도 다음에 이렇게 바꿔야겠다 효율적으로
      });
    } catch (err) {
      console.log("setDoc로 업데이트");
      await setDoc(doc(progressRef, "calendar"), {
        calendarEvent: [calendarEvent], // 만약 처음 만들어질 때는 setDoc를 먼저 한다
      });
    }
  };

  // download firestore
  const downloadFStore = async () => {
    onSnapshot(query(progressRef), (querySnapshot) => {
      const afterData: any = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().calendarEvent !== undefined) {
          console.log(doc.data().calendarEvent);
          doc.data().calendarEvent.forEach((bF: any) => {
            afterData.push({
              allDay: bF.allDay!,
              end: moment(bF.end?.seconds * 1000 - 1).format(
                "MMMM DD YYYY hh:mm:ss"
              ),
              start: moment(bF.start?.seconds * 1000).format(
                "MMMM DD YYYY hh:mm:ss"
              ),
              title: bF.title!,
            });
            // (bF.end = moment(bF.end?.seconds * 1000).format(
            //   "MMMM DD YYYY hh:mm:ss"
            // )),
            //   (bF.start = moment(bF.start?.seconds * 1000).format(
            //     "MMMM DD YYYY hh:mm:ss"
            //   ));
            // afterData.push(bF);
            // Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions
          });
        }
        setCalendarEvents([...afterData]);
      });
    });
  };

  useEffect(() => {
    downloadFStore();
  }, []);

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
        <FormBox>
          <CloseBtn onClick={closeFormBtn}>✖</CloseBtn>
          <form onSubmit={handleSubmit(calendarTxt)}>
            <input
              {...register("title")}
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
