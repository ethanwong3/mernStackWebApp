import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

// flex-wrap: wrap // wrap children onto new line when don't fit in a row instead of shrinking (nowrap)
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          <div>Card</div>
          <div>Card</div>
          <div>Card</div>
        </FlexWrap>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
