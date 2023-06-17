import styled from "styled-components";

export const QRgeneratee = styled.div`
  display: flex;
  width: 75vw;
  height: 90vh;
  align-items: center;
  justify-content: center;
  .cont {
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    width: 50%;
    height: 80%;
    background-color: #fff;
    padding: 20px;
    div {
      position: relative;
      input {
        width: 75%;
        font-size: 16px;
        padding: 10px;
        border: 1px solid grey;
        outline: none;

        border-radius: 10px;
      }
    }

    button {
      background-color: #43435e;
      cursor: pointer;
      outline: none;
      color: #fff;
      border: none;
      font-size: 16px;
      padding: 10px;
      border-radius: 5px;
      margin-left: 5px;
    }
    h1 {
      text-align: center;
      padding: 20px 0px;
    }
    .suggestion {
      position: absolute;
      width: 75%;
      top: 0;
      left: 0;
      margin: 43px 0px;
      border-radius: 5px;
      padding: 10px;
      h2 {
        font-size: 18px;
      }
    }
  }
  .pill {
    cursor: pointer;
    background-color: #43435e;
    color: #fff;
    padding: 8px;
    border-radius: 5px;
    margin: 8px;
    width: 50%;
    text-align: center;
    font-size: 16px;
  }
  .pill:hover {
    background-color: #fff;
    color: #43435e;
    border: 2px solid #43435e;
  }
`;

export const QRcode = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  .wrapper {
    height: 500px;
    width: 450px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .title {
      width: 100%;
      height: 50px;
      background-color: #43435e;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px 8px 0px 0px;

      h2 {
        font-size: 22px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }

    .search-container {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .inner-search {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        input {
          width: calc(80% - 10px);
          height: 40px;
          border: none;
          outline: none;
          border-radius: 5px;
          padding: 0px 10px;
          font-size: 16px;
          border: 1px solid #43435e;

          &:focus {
            border: 2px solid #43435e;
          }

          &:invalid {
            border: 2px solid red;
            animation: invalid 0.3s 2;
          }
        }

        button {
          height: 40px;
          border: none;
          outline: none;
          background-color: #43435e;
          color: #fff;
          border-radius: 5px;
          margin-left: 10px;
          font-size: 16px;
          padding: 0px 10px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;

          &:hover {
            background-color: #fff;
            color: #43435e;
            border: 2px solid #43435e;
          }
        }
      }

      .suggestion {
        position: absolute;
        width: calc(80% - 10px);
        top: 0;
        left: 0;
        margin: 43px 0px;
        border-radius: 5px;
        padding: 10px;
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
          rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
          rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
        z-index: 1;

        .suggest-item {
          cursor: pointer;
          font-size: 16px;
          background: #fff;
          color: #43435e;
          padding: 5px;
          border-radius: 5px;
          margin: 5px 0px;
          transition: all 0.3s ease-in-out;
        }
      }
    }

    .qrgenerate {
      width: 100%;
      height: calc(100% - 110px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 20px;

      .image {
        width: 300px;
        height: 300px;
        border: 2px solid #43435e;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        margin-bottom: 20px;

        img {
          width: 250px;
          height: 250px;
          object-fit: contain;
          border-radius: 5px;
          &:hover {
            transform: scale(1.1);
            transition: all 0.3s ease-in-out;
          }
        }
      }

      .button {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          width: 300px;
          height: 40px;
          border: none;
          outline: none;
          background-color: #43435e;
          color: #fff;
          border-radius: 5px;
          margin-left: 10px;
          font-size: 16px;
          padding: 0px 10px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;

          &:hover {
            background-color: #fff;
            color: #43435e;
            border: 2px solid #43435e;
          }
        }
      }
    }
  }

  @keyframes invalid {
    25% {
      translate: 6px 0;
    }
    50% {
      translate: -6px 0;
    }
    75% {
      translate: 6px 0;
    }
    100% {
      translate: 0 0;
    }
  }

  @media only screen and (max-width: 750px) {
    .wrapper {
      width: 80%;

      .search-container {
        padding: 0 10px;
      }
    }
  }
`;
