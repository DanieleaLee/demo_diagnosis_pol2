import * as yup from "yup";
import ThemeColors from "@styles/colors";
import {reqListAAModelPortfolio} from "src/api/mp";

export const emailYup = yup.string()
  .required("\"Email\" is a required field.")
  .email("\"Email\" must be a valid email").trim();

export const emailLoginYup = emailYup.test(
  "not_yet",
  "Unregisterd Email Address",
  async function () {
    return true;
  },
);

const portfolioNameYup = yup.string()
  .required("\"Portfolio Name\" is a required field.");

export const createPortfolioYup = portfolioNameYup.test(
  "name_exists",
  "name duplicated",
  async function(name){
    const mps = await reqListAAModelPortfolio();
    const exists = mps.map(m=>m.name).includes(name);
    return !exists;
  },
);


// const svgBsCheck = "<svg stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 16 16\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z\"></path></svg>"
// const svgBsX = "<svg stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 16 16\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"></path></svg>";

const vMsgMinLengthMsg = "be at least 8 characters long.";
const vMsgBothCase = "include at least one lower and upper case characters";
const vMsgSpecChar = "include at least one number or symbol";

const commonStyle = `<style>
      ul li.check:before {
          content: "\\f26e";
          font-family: bootstrap-icons;
          color: ${ThemeColors.pass};
          /*margin-left: -1.0em;*/
          /*margin-right: 0.5em;*/
        }
      ul li.check small{
          color: ${ThemeColors.pass};
      }
      ul li.x:before {
          content: "\\f5ee";
          font-family: bootstrap-icons;
          color: ${ThemeColors.error};
          /*margin-left: -1.0em;*/
          /*margin-right: 0.5em;*/
        }
      ul li.x small{
          color: ${ThemeColors.error};
      }
    </style>`;

export const passwordYup = yup
  .string()
  // .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,20}$/, "validation:password_format")
  .matches(/^(?=.{8,20})(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*])/,
    commonStyle +
    "<p><b>You password needs to :</b></p>" +
    "<ul>" +
    `<li class='check'><small>${vMsgMinLengthMsg}</small></li>` +
    `<li class='check'><small>${vMsgBothCase}</small></li>` +
    `<li class='x'><small>${vMsgSpecChar}</small></li>` +
    "</ul>"
  )
  .matches(/^(?=.{8,20})(?=.*[A-Z])/,
    commonStyle +
    "<p><b>You password needs to :</b></p>" +
    "<ul>" +
    `<li class='check'><small>${vMsgMinLengthMsg}</small></li>` +
    `<li class='x'><small>${vMsgBothCase}</small></li>` +
"</ul>"
  )
  .matches(/^(?=.{8,20})/,
    commonStyle +
    "<p><b>You password needs to :</b></p>" +
    "<ul>" +
    `<li class="x"><small>${vMsgMinLengthMsg}</small></li>` +
    "</ul>"
  )
  .required("\"Password\" is a required field.");