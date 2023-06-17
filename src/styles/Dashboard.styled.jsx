import styled from "styled-components";

export const DashSection = styled.section`
  background: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 96vw;
    height: 96vh;
    background-color: #43435e;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    border-radius: 10px;
    padding: 10px 5px;
  }

  .content {
    margin-left: 10px;
    padding: 8px;
    height: 94vh;
    width: calc(100% - 200px);
    background: #fff;
    border-radius: 10px;

    @media only screen and (max-width: 500px) {
      width: 100%;
      padding: 0;
      margin-left: 0;
    }
  }
  .content_header {
    display: none;

    @media only screen and (max-width: 500px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #43435e;
      color: #f0f1f0;
      border-radius: 10px 10px 0 0;
      padding: 10px;
      font-size: 1.2rem;
      svg {
        cursor: pointer;
      }
      .nav_title {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          margin-right: 10px;
          color: green;
          font-size: 1.5rem;
        }
      }
    }
  }

  .sidebar {
    padding: 8px;
    height: 100%;
    width: 200px;
    background-color: #43435e;
    color: #f0f1f0;
    overflow: hidden;
  }

  @media only screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    * {
      padding: 0;
      margin: 0;
    }
    .container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .logo {
      display: none;
    }
    .sidebar {
      position: fixed;
      left: -100%;
      z-index: 9999;
      padding-top: 50px;
      transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .sidebar.open {
      left: 0;
    }

    .content {
      width: 100%;
      padding: 6px;
      overflow: hidden;
    }
  }
`;
