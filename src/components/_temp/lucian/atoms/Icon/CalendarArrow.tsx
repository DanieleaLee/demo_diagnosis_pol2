import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div`
  position: absolute;
  top: -7.7px;
  left: 35px;
`;

// Calendar Layout 상단에 있는 화살표 모양
const CalendarArrow = () => {
  return (
    <Container>
      <Image
        src="/img/lucian/calendar-arrow.png"
        alt=""
        width={17}
        height={10}
      />
    </Container>
  );
};

export default CalendarArrow;
