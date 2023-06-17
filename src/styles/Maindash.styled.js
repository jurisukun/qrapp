import styled from "styled-components";

export const DashContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background-color: #f5f5f5;

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .chart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .pie {
    display: flex;

    height: 500px;
    width: 100%;
  }

  @media only screen and (max-width: 500px) {
    * {
      padding: 0;
      margin: 0;
    }
    heigt: 100%;
    width: 100%;
    .chart,
    .pie {
      width: 100%;
    }
    .chart {
      margin-top: 50px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;
