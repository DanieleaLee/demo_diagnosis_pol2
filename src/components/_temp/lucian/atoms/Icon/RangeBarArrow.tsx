import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div``;

const RangeBarArrow = () => {
  return (
    <Container>
      <Image
        src="/img/lucian/rangebar-arrow.png"
        alt=""
        width={12.5}
        height={10.46}
      />
    </Container>
  );
};

export default RangeBarArrow;
