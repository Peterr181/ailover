import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./WebsiteModal.css";

type WebsiteModalProps = {
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

const WebsiteModal: React.FC<WebsiteModalProps> = ({
  onClose,
  children,
  title,
}) => {
  const handleCloseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {title && <h1>{title}</h1>}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  );
};

export default WebsiteModal;
