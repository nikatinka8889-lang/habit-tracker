import dashboardCss from "./dashboard.module.css";
import WeeklyProgress from "../../components/WeeklyProgress/WeeklyProgress";
import Habits from "../../components/Habit/Habits";
import AddHabitForm from "../../components/Habit/AddHabitForm/AddHabitForm";
import Header from "../../components/Header/Header";
export default function Dashboard() {


  return (
    <div className={dashboardCss.dashboard}>
      <Header children={'Your Habit Dashboard'}/>

      <AddHabitForm/>
      <div className={dashboardCss.block}>
        <Habits Children={`Today's Focus`}/>
        <WeeklyProgress />
      </div>
    </div>
  );
}
