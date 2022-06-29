import Image from "next/image";
import React from "react";
import { css } from "@emotion/react";
import { flexCenter } from "@styles";

const Momemtum = () => {
  return (
    <div
      css={css`
        width: 22px;
        height: 22px;
        ${flexCenter}
      `}
    >
      <Image src="/img/icon_momentum.svg" alt="momentum" width={20} height={17.27} />
    </div>
  );
};

export default Momemtum;
