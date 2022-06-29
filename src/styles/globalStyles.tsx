import { css, Global, useTheme } from "@emotion/react";

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Titillium Web, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Titillium Web sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
          outline: none;
        }
        a:hover,
        a:active {
          text-decoration: none;
          outline: none;
        }

        * {
          box-sizing: border-box;
        }

        input:disabled,
        textarea:disabled,
        input:disabled::placeholder,
        textarea:disabled::placeholder {
          -webkit-text-fill-color: currentcolor;
          opacity: 1;
        }


        img {
          image-rendering: auto;
          //image-rendering: -moz-crisp-edges; /* Firefox */
          //image-rendering: -o-crisp-edges; /* Opera */
          image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
          //image-rendering: crisp-edges;
          //-ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
        }

        p {
          word-wrap: break-word;
          line-break: normal;
        }

        ol,
        ul {
          padding-left: 0;
          margin-bottom: 0;
        }

        .tooltip {
          font-size: 0.875rem;
          font-weight: bold;
          border: none !important;
        }

        &::-webkit-scrollbar {
          background: #ececec;
          border-radius: 1.5px;
          width: 3px;
          height: 5px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background: #2E3B43;
          /* height: 177px; */
        }
      `}
    />
  );
};