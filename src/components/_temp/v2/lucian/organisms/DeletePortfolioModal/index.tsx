import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { css } from "@emotion/react";
import Colors from "@styles/colors";
import { flexColumn, flexRow } from "@styles";
import * as Typography from "@styles/typography";
import Modal from "@tempComponents/v2/molecules/Modal";
import * as TextButton from "@components/atoms/TextButton";

const DeletePfModalBodyCss = (width = 479) => css`
  width: ${width}px;
  height: auto;
  background: ${Colors.backgroundWhite};
  ${flexColumn}
  align-items: center;
  padding: 51px 0 52px 0;
`;

const DeletePfModalWrapCss = css`
  ${flexRow};
  padding: 10px 0 4px 29px;
`;

const DeletePfModalTitleCss = css`
  ${flexRow}
`;

const DeletePfModalBtnCss = css`
  ${flexRow};
  justify-content: center;
  padding-top: 50px;

  & > button {
    margin-right: 5.5px;
  }
`;

interface Props {
  closeModal: () => void;
  deleteSelectedTable?: () => void;
  width?: number;
}

const DeletePortfolioModal = ({
  closeModal,
  deleteSelectedTable,
  width,
}: Props) => {
  return (
    <Modal closeModal={closeModal}>
      <div css={[DeletePfModalBodyCss(width)]}>
        <div css={DeletePfModalWrapCss}>
          <BiTrashAlt size={25} color={Colors.buttonSubmit} />
          <Typography.Title2
            color={Colors.buttonSubmit}
            css={DeletePfModalTitleCss}
          >
            Delete your Portfolio
          </Typography.Title2>
        </div>
        <Typography.Body2 color={Colors.selectBoxBorder}>
          Are you sure you want to delete this Portfolio?
        </Typography.Body2>
        <div css={DeletePfModalBtnCss}>
          <TextButton.Normal
            bgTheme="accent"
            title="Cancel"
            onClick={closeModal}
          />
          <TextButton.Normal
            bgTheme="common"
            title="Delete"
            onClick={() => {
              deleteSelectedTable();
              closeModal();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeletePortfolioModal;
