import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import Navbar from "./component/navbar/page";

import { authOptions, getSessionServer } from "./api/lib/auth";



type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {
  const session = await getSessionServer(); // Get session before rendering anything
  
  return (
   <>
   <Navbar session={session} />
    Hello  
   </>
  );
}


