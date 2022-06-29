import Image from "next/image";
import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  cursor: pointer;
`;

const CloseIcon = () => {
  return (
    <Container>
      <Image
        src="/img/lucian/close-range.png"
        alt="닫기"
        width={14}
        height={14.39}
      />
    </Container>
  );
};

export default CloseIcon;
