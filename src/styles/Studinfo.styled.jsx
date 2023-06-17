import { ko } from "date-fns/locale";
import styled from "styled-components";

export const StudentSection = styled.div`
  height: 100%;
  width: 100%;

  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  .filter_nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 40px);
    position: relative;
    /* padding-bottom: 5px; */
  }
  .tabs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    overflow-x: scroll;
    /* width: 100%; */
    padding: 10px 15px;
  }
  .arrow_left,
  .arrow_right {
    position: absolute;
    font-size: 1.8rem;
    color: #0492c2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    z-index: 1;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  .arrow_left {
    left: 0;
    display: none;
    background: linear-gradient(to left, transparent, #f5f5f5 80%);
    /* border-radius: 30px 0 0 30px; */
    border-radius: 5px;
  }
  .arrow_right {
    right: 0;
    background: linear-gradient(to right, transparent, #f5f5f5 80%);
    /* border-radius: 0 30px 30px 0; */
    border-radius: 5px;
  }
  .tabs::-webkit-scrollbar {
    display: none;
  }

  .filter_item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-width: fit-content;
    height: fit-content;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    /* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1); */

    label {
      font-size: 14px;
      font-weight: 600;
    }
    .count {
      width: fit-content;
      background-color: #c0bdbd;
      color: #fff;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      padding: 0 5px;
    }
  }
  .filter_item.active {
    color: #0492c2;
    position: relative;
    .count {
      background-color: #0492c2;
      color: #fff;
    }
  }
  .filter_item.active::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2px;
    background-color: #0492c2;
  }
  .tablee {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    overflow-y: auto;

    padding: 5px 10px;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;

    thead {
      background-color: #43435e;
      color: #fff;
    }
  }
  tr {
    height: 50px;
  }
  td,
  th {
    /* border: 1px solid #dddddd; */
    text-align: left;
    padding: 10px;
    font-size: 12px;
  }
  thead tr {
    height: 50px;
    padding: 20px;
  }

  th {
    font-size: 14px;
    font-weight: 600;
  }
  tbody tr:nth-child(odd) {
    background-color: #f5f5f5;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 40px);

    .button {
      border: none;
      padding: 10px 20px;
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 4px;
      background-color: #43435e;
      color: #fff;
      cursor: pointer;
      outline: none;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: scale(0.98);
      }
    }
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
    position: relative;
    width: 350px;

    input {
      border: none;
      outline: none;
      padding: 10px 20px;
      border-radius: 10px;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.2);
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      color: #131313;

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }

    svg {
      position: absolute;
      right: 20px;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.4);
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    button {
      border: none;
      outline: none;
      cursor: pointer;
      border-radius: 4px;
      background: transparent;

      svg {
        font-size: 20px;
      }
    }
  }

  .view {
    color: #0492c2;
  }

  .delete {
    margin-right: 10px;
  }

  @media only screen and (max-width: 500px) {
    padding: 10px 4px;
    h2 {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    * {
      pading: 0;
      margin: 0;
    }
    .header {
      flex-direction: column;
    }

    .filter_nav,
    .header,
    .tablee {
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

    .header {
      height: 15%;
      .actions,
      .search {
        padding: 0px 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
