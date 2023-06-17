import styled from "styled-components";
import qrimage from "./images/QR_Code01.png";
import qrimage2 from "./images/QR_Code02.png";

export const QrScanSection2 = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px;
  gap: 8px;

  .studentinfo {
    background: #f5f5f5;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 70%;
    width: 50%;
    /* padding: 10px; */
    border-radius: 10px;
    /* box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px; */

    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      justify-items: center;
      h2 {
        color: #43435e;
        font-size: 32px;
        margin: 8px 0px;
        width: 100%;
        text-align: center;
      }
    }
    .info .image {
      width: 100%;
      height: 150px;
      border: 2px solid #43435e;
    display:flex;
      align-items:center;
      justify-content:center;
      img {
        display:fill
        width: 100%;
        height: 100%;
      }
    }
    .info .details {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      div {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 0 10px 0 10px;
        p {
          width: 500%;
          color: #131313;
          font-size: 18px;
          margin: 8px 0px;
        }

        span {
          width: 500%;

          color: #131313;
          font-size: 18px;
          margin: 8px 0px;
          border-bottom: 1px solid #43435e;
          text-align: center;
        }
      }
    }
  }
  .scanner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #43435e;
    background: transparent;
    height: 70%;
    width: 50%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px;

    .scan {
      position: relative;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }
    .scan .qrcode {
      position: relative;
      width: 300px;
      height: 300px;
      background: url(${qrimage});
      background-size: 300px;
    }
    .scan .qrcode::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      height: 100%;
      background: url(${qrimage2});
      background-size: 300px;
      animation: animate 4s ease-in-out infinite;
      overflow: hidden;
    }

    .scan .qrcode::after {
      content: "";
      position: absolute;
      top: 0;
      width: calc(100% - 40px);
      height: 4px;
      inset: 20px;
      background: #35fd5c;
      filter: drop-shadow(0 0 20px #35fd5c) drop-shadow(0 0 60px #35fd5c);
      animation: animateline 4s ease-in-out infinite;
    }

    h2 {
      color: #131313;
      margin-top: 20px;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .manualform {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      padding: 10px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px;
      gap: 8px;
      select {
        width: 30%;
        max-width: 150px;
        height: 40px;
        padding: 0px 10px;
        border-radius: 10px;
        border: 1px solid #43435e;
        outline: none;
        font-size: 16px;
        color: #43435e;
      }

      form {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        input {
          width: 100%;
          height: 40px;
          padding: 0px 10px;
          border-radius: 10px;
          border: 1px solid #43435e;
          outline: none;
          font-size: 16px;
          color: #43435e;
        }

        .btn {
          width: 150px;
          height: 40px;
          background: #43435e;
          color: #fff;
          border-radius: 10px;
          border: none;
          outline: none;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
  }
  @keyframes animate {
    0%,
    100% {
      height: 0;
    }
    50% {
      height: 100%;
    }
  }
  @keyframes animateline {
    0% {
      top: 20px;
    }
    50% {
      top: calc(100% - 20px);
    }
  }

  @media only screen and (max-width:780px){
    padding:0;
    margin:0;
    display:flex;
    flex-direction:column;
    width:100%;
    overflow-y:scroll;
   .scanner,.studentinfo{
    width:100%;
   }
   .content{
    overflow-y:scroll;
   }
   .scanner{
    height:30%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .manualform{
    width:100%;
   }
    .scan{
      padding-top:50px;
    height:100px;
    width:100px;
    .qrcode, .qrcode::before{
      height:100px;
      width:100px;
      background-size:100px;
    }
    .qrcode::after{
      position: absolute;
      top: 0;
      width:100%
      inset:0px;
    }
    
   }
   }
   
  
   
  }
`;
