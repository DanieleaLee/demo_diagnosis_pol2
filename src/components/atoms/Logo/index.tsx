import Image from "next/image";
import * as Typography from "@styles/typography";
import Link from "next/link";

// export const LogoWidth = 200;
export const LogoWidth = 142; // 0512
export const LogoHeight = 29; // 0512

const Logo = ({ href = '/', width = LogoWidth, height = LogoHeight }) => {
  return (
    <Link href={href} passHref={true}>
      <a>
        {/* <Image src="/logo.png" alt="logo" width={width} height={height} quality={100} /> */}
        <Image src="/company_logo.png" alt="logo" width={width} height={height} quality={100} />
      </a>
    </Link>
  );
};


export default Logo;