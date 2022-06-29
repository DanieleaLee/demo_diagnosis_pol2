import CombinedCalendar from "./molecules/calendar/CombinedCalendar";
import Filter from "./molecules/filter/Filter";
import RangeBar from "./molecules/rangebar/RangeBar";
import RangeResultBtn from "./molecules/rangebar/RangeResultBtn";

const TestTemplate = (props) => {
  return (
    <>
      {/* <CombinedCalendar /> */}
      <Filter />
      {/* <RangeBar
        min={0}
        max={100}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
      /> */}
    </>
  );
};

export default TestTemplate;
