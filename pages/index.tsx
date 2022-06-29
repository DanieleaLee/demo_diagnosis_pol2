import RootContainer from "@components/containers/RootContainer";
import MainTemplate from "@components/template/MainTemplate";
import {GetServerSideProps} from "next";


const Index = () => {
  return (
    <RootContainer>
      <MainTemplate/>
    </RootContainer>
  )
};

export default Index;
