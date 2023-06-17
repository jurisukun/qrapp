import styled from "styled-components";

export const AddSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  padding: 30px;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 767px) {
    .inputs {
      height: 20px;
      margin: 6px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    position: relative;
    width: 100%;

    h2 {
      text-align: center;

      color: #131313;
      align-self: center;

      margin-top: 30px;
    }
  }

  .image {
    width: 80px;
    height: 80px;
    border: 1px solid #131313;
    border-radius: 12px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 100%;
    label {
      width: 30%;
      color: #131313;
      font-size: 12px;
      font-weight: 600;
    }

    input,
    select {
      width: 70%;
      padding: 10px;
      border: 1px solid #131313;
      border-radius: 5px;
      outline: none;
      font-size: 12px;

      &:focus {
        border: 2px solid #131313;
      }

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    button {
      width: 100%;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;

      &:first-child {
        background: #43435e;
        color: #fff;
      }

      &:last-child {
        background: #fff;
        color: #43435e;
        border: 1px solid #43435e;
      }

      &:hover {
        transform: scale(0.98);
      }
    }
  }
  @media only screen and (max-width: 500px) {
    * {
      padding: 0;
      margin: 0;
    }
    width: 80%;
    #stform {
      display: flex;
    }
  }
`;
