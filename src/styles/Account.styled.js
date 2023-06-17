import styled from "styled-components";

export const AccountContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;

  .title {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .add_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffff;
    width: 500px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    h1 {
      text-align: center;
      margin: 0px 0px 10px 0px;
    }
    .btn {
      button {
        margin-right: 10px;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.5rem;
        background-color: #43435e;
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        :nth-child(2) {
          background-color: #ff6347;
        }
      }
    }
    .form_container {
      display: flex;
      align-items: center;
    }
    label {
      width: 150px;
      font-size: 16px;
    }
    input,
    select {
      outline: none;
      width: 100%;
      font-size: 16px;
      padding: 10px;
      border: none;
      border-radius: 4px;
      border: 1px solid grey;
    }
    input:invalid {
      border: 2px solid red;
      animation: invalid 0.3s 2;
    }
  }

  .edit_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffff;
    width: 500px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    h1 {
      text-align: center;
      margin: 0px 0px 10px 0px;
    }
    .btn {
      button {
        margin-right: 10px;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.5rem;
        background-color: #43435e;
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        :nth-child(2) {
          background-color: #ff6347;
        }
      }
    }
    .form_container {
      display: flex;
      align-items: center;
    }
    label {
      width: 150px;
      font-size: 16px;
    }
    input {
      outline: none;
      width: 100%;
      font-size: 16px;
      padding: 10px;
      border: none;
      border-radius: 4px;
      border: 1px solid grey;
    }
    select {
      outline: none;

      width: 100%;
      font-size: 16px;
      border-radius: 4px;
      padding: 10px;
    }
  }

  .account-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #43435e;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }

    input {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #f0f0f0;
      font-size: 1rem;
      font-weight: 400;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }
  }
  .table {
    width: 100%;
  }

  .account-table {
    width: 100%;
    border-collapse: collapse;

    thead tr th {
      padding: 0.5rem 1rem;
      background-color: #43435e;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      text-align: left;
    }

    tbody tr td {
      padding: 0.5rem 1rem;
      background-color: #fff;
      color: #000;
      font-size: 1rem;
      font-weight: 400;
      text-align: left;
      border-bottom: 1px solid #f0f0f0;
      width: 25%;
    }

    tbody tr td button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      margin-right: 0.5rem;
      cursor: pointer;
    }

    tbody tr td button.edit {
      background-color: #43435e;
      color: #fff;
    }

    tbody tr td button.delete {
      background-color: #ff6347;
      color: #fff;
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
  @media (max-width: 767px) {
    * {
      padding: 0;
      margin: 0;
    }

    position: relative;
    h2 {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .edit_container,
    .add_container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffff;
      width: 300px;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .account-header {
      flex-direction: column;
      width: 100%;
      gap: 6px;
      button,
      input {
        width: 100%;
      }
    }

    .table {
      width: 100%;
      overflow-y: scroll;
    }

    table {
      width: 100%;
      thead {
        display: none;
      }
      tbody {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 5px 10px;
      }
      table tbody tr td {
        padding: 4px 20px;
      }

      tr {
        border-radius: 10px;
        width: 100%;

        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        display: flex;
        flex-direction: column;

        justify-content: center;
        gap: 10px;
        height: fit-content;
        margin: 10px 0px;
      }
      td {
        width: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
`;
