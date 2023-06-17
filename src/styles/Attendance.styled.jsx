import styled from "styled-components";

export const AttendanceSection = styled.div`
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  position: relative;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #43435e;
    margin-top: 10px;
  }
  @media (max-width: 767px) {
    .header {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .search {
      margin-top: 10px;
      width: 100%;
    }
  }
  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;

    form {
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        padding: 10px;
        font-size: 13px;
        width: 70%;
        border: 1px solid #43435e;
        border-radius: 10px;
        margin-right: 5px;
        outline: none;

        ::placeholder {
          color: rgba(0, 0, 0, 0.4);
        }
      }
      button {
        width: 120px;
        border: none;
        padding: 5px 10px;
        margin-right: 5px;
        border-radius: 10px;
        background-color: #43435e;
        color: #fff;
        cursor: pointer;
      }
    }
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 300px;

    input {
      padding: 10px;
      font-size: 13px;
      width: 100%;
      border: 1px solid #43435e;
      border-radius: 10px;
      margin-right: 5px;
      outline: none;

      ::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }

    svg {
      position: absolute;
      right: 10px;
      font-size: 20px;
    }
  }

  .edit_att {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: fit-content;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 30px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #43435e;
      margin-top: 10px;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .edit_name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;

    label {
      font-size: 12px;
      font-weight: 600;
      color: #43435e;
      width: 30%;
    }
    span {
      font-size: 14px;
      font-weight: 600;
      color: #43435e;
      width: 70%;
    }
  }

  .edit_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;

    label {
      font-size: 13px;
      font-weight: 600;
      color: #43435e;
      width: 30%;
    }

    input,
    select {
      padding: 10px;
      font-size: 13px;
      width: 70%;
      border: 1px solid #43435e;
      border-radius: 10px;
      outline: none;

      ::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .item_btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 10px;

    button {
      width: 100%;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;

      cursor: pointer;
      :first-child {
        background-color: #43435e;
        color: #fff;
      }
      :last-child {
        background-color: #fff;
        color: #43435e;
        border: 1px solid #43435e;
      }

      :hover {
        transform: scale(0.98);
      }
    }
  }

  .table {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    overflow-x: auto;
  }

  .table table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: auto;
  }

  .table table thead tr th {
    background-color: #43435e;
    color: #fff;
    padding: 10px;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    height: 50px;
  }
  .table table td,
  .table table th {
    padding: 20px;
  }

  .table table tbody tr td {
    font-size: 13px;
    font-weight: 500;
    color: #131313;

    /* border-bottom: 1px solid #43435e; */
  }

  .table table tbody tr td:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    button {
      width: fit-content;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      background: transparent;
      cursor: pointer;

      svg {
        font-size: 20px;
      }
    }
  }
  .table table tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  .inside,
  .outside {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    width: 100%;
    height: 100%;
  }

  .inside {
    background-color: #77dd77;
  }
  .outside {
    background-color: #ff6961;
  }

  .filter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
  }

  .tab_menu {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    overflow-x: scroll;
    padding: 10px 15px;
  }

  .tab_menu::-webkit-scrollbar {
    display: none;
  }

  .tab_menu .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: fit-content;
    padding: 10px 20px;
    gap: 5px;
    border-radius: 10px;
    cursor: pointer;
    color: #43435e;
  }
  .tab_menu .tab .title {
    font-size: 14px;
    font-weight: 600;
  }
  .tab_menu .tab .count {
    font-size: 10px;
    font-weight: 600;
    color: #131313;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid #fff;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .tab_menu .tab.active {
    color: #0492c2;

    .count {
      background-color: #0492c2;
      color: #fff;
    }
  }
  .left,
  .right {
    position: absolute;
    color: #0492c2;
    cursor: pointer;
    z-index: 5;
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    svg {
      font-size: 20px;
      border-radius: 50%;
      /* background-color: #fff; */
      width: 30px;
      height: 30px;
    }
  }
  .left {
    left: 0;
    display: none;
    background: linear-gradient(to left, transparent, #f5f5f5 80%);
    /* border-radius: 10px 0 0 10px; */
  }
  .right {
    right: 0;
    background: linear-gradient(to right, transparent, #f5f5f5 80%);
    /* border-radius: 0 10px 10px 0; */
  }
  @media (max-width: 767px) {
    * {
      padding: 0;
      margin: 0;
    }
    .edit_att {
      width: 330px;
    }
    .content {
      overflow: hidden;
    }
    .header {
      align-items: center;
      justify-content: center;
    }
    .search {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .table {
      width: 100%;

      table thead {
        display: none;
      }
      tbody {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 5px 10px;
      }
      table tbody tr td {
        padding: 4px 20px;
      }
      table tbody tr {
        border-radius: 10px;
        width: 100%;
        align-items: center;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        height: fit-content;
        margin: 10px 0px;
      }
    }
  }
`;
