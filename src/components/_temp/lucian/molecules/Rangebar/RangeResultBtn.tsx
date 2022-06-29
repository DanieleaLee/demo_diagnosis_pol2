import React, { FC } from "react";
import { Container } from "./rangeResultStyle";
import { RangeResultBtnType } from "./rangeResultType";

const RangeResultBtn: FC<RangeResultBtnType> = ({
  startRangeNum = 0,
  endRangeNum = 100,
}) => {
  return (
    <Container>
      {startRangeNum}%-{endRangeNum}%
    </Container>
  );
};

export default RangeResultBtn;
