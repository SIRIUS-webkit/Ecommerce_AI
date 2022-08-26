import React, { memo } from "react";

const Modal = ({
  show,
  onHide,
  image,
  header,
  paragraph,
  children,
  styleCustom,
}) => (
  <>
    <div className="modal">
      <div
        className="bg-modal-main"
        role="button"
        onClick={onHide}
        onKeyDown={onHide}
        tabIndex={-1}
      >
        &nbsp
      </div>
      <div className="modal-content">
        <div className="modal-header d-flex justify-content-end">
          {/* <LazyLoadImage
            width="13px"
            height="13px"
            className="pointer"
            src={`${process.env.S3Path}/asset/filter/filter-icon-close.png`}
            onClick={onHide}
            onKeyDown={onHide}
            tabIndex={-1}
            alt="close"
            role="presentation"
          /> */}
        </div>
        <div className={`modal-body ${styleCustom}`}>
          <h4 className="mt-3">{header}</h4>
          {paragraph}
        </div>
        <div className="modal-footer">{children}</div>
      </div>
    </div>

    <style jsx>
      {`
        /* The Modal (background) */

        .modal {
          display: ${show ? "block" : "none"};
          position: fixed;
          padding-top: 100px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0, 0, 0);
          background-color: rgba(0, 0, 0, 0.4);
        }

        .bg-modal-main {
          z-index: 900;
          width: 100%;
          height: calc(100% + 100px);
          background-color: transparent;
          position: absolute;
          top: -100px;
        }

        /* Modal Content */
        .modal-content {
          z-index: 1000;
          position: relative;
          background-color: #fefefe;
          margin: auto;
          padding: 0;
          border: 1px solid #888;
          width: 90%;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
          -webkit-animation-name: animatetop;
          -webkit-animation-duration: 0.4s;
          animation-name: animatetop;
          animation-duration: 0.4s;
        }

        /* Add Animation */
        @-webkit-keyframes animatetop {
          from {
            top: -300px;
            opacity: 0;
          }
          to {
            top: 0;
            opacity: 1;
          }
        }

        @keyframes animatetop {
          from {
            top: -300px;
            opacity: 0;
          }
          to {
            top: 0;
            opacity: 1;
          }
        }

        /* The Close Button */
        .close {
          color: #000;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }

        .modal-body {
          padding: 0px 15px 30px 15px;
          text-align: center;
        }

        .modal-footer {
          padding: 15px 0px 30px;
          margin: auto;
          border-top: none;
        }

        .modal-header {
          padding: 15px;
          border-bottom: none;
        }

        @media screen and (min-width: 768px) {
          .modal-content {
            width: 60%;
          }
        }

        @media screen and (min-width: 992px) {
          .modal-content {
            width: 50%;
          }
        }

        @media screen and (min-width: 1024px) {
          .modal-content {
            width: 40%;
          }
        }

        .modal-reservation-history-detail-custom {
          overflow-y: scroll;
          height: 520px;
        }
      `}
    </style>
  </>
);

export default memo(Modal);
