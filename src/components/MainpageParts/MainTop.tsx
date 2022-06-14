import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../atoms";
import moment from "moment";
import { IWeather } from "../../routes/Mainpage/MainPage";

const HomeContainer = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.whiteColor};
`;

const MyHome = styled.div`
  width: 100%;
  height: 30vh;
`;

// const UsefulThings = styled.div`
//   width: 100%;
//   height: 25%;
// `;

const Weather = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  img {
    width: 2rem;
    height: 2rem;
  }
`;

const CurWeather = styled.div`
  display: flex;
  flex: 0.3;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 1rem;
  h3 {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
  }
`;

const DailyWeather = styled.ul`
  display: flex;
  flex-direction: row;
  flex: 0.7;
  padding-left: 10px;
  li {
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
  }
`;

const DateName = styled.span`
  font-weight: bold;
`;

interface IMyPage {
  isLoading: boolean;
  data: IWeather | undefined;
}

const MyPage = ({ isLoading, data }: IMyPage) => {
  const userI = useRecoilValue(userInfo);
  const ddd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <HomeContainer>
      {userI ? (
        <Container>
          {/* <AppHeader /> */}
          <MyHome>
            {/* <UsefulThings> */}
            {isLoading ? (
              <h1>Loading</h1>
            ) : (
              <Weather>
                <CurWeather>
                  <img
                    src={`http://openweathermap.org/img/wn/${data?.current.weather[0].icon}@2x.png`}
                  />
                  <h3>{data?.current.weather[0].main}</h3>
                  <h3>{data?.current.temp}</h3>
                </CurWeather>
                <DailyWeather>
                  {data?.daily.slice(0, 5).map((day: any) => (
                    <li key={day.dt}>
                      <DateName>{ddd[moment(day.dt * 1000).day()]}</DateName>
                      <img
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt=""
                      />
                      <span>
                        {day.temp.max.toFixed(0)} / {day.temp.min.toFixed(0)}{" "}
                      </span>
                    </li>
                  ))}
                </DailyWeather>
              </Weather>
            )}
            {/* </UsefulThings> */}
          </MyHome>
        </Container>
      ) : (
        <h1>loading...</h1>
      )}
    </HomeContainer>
  );
};

export default MyPage;
