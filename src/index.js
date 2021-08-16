import React, { useState, useEffect } from 'react';
import ee from 'event-emitter';
import uuid from 'uuid/v1';
import checkIcon from './assets/check.svg';
import errorIcon from './assets/error.svg';
import infoIcon from './assets/info.svg';
import warningIcon from './assets/warning.svg';
import './style.scss';

const emitter = new ee();

const notify = (msg, type) => {
  emitter.emit('notification', msg, type);
}

const Notification = () => {

  useEffect(() => {
    const handler = (msg, type) => {
      showToast(msg, type);
    };

    emitter.on('notification', handler);

    return () => emitter.off('notification', handler);
  }, []);

  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        toastList.forEach(element => {
          if (element.type === 'success') {
            deleteToast(element.id);
            return false;
          }
        });
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    }

  }, [toastList]);

  const deleteToast = (id) => {
    const toastListItem = toastList.findIndex((e) => e.id === id);
    toastList.splice(toastListItem, 1);
    setToastList([...toastList]);
  }

  const showToast = (msg, type) => {
    const id = `toast-${uuid()}`;
    let toastProperties;
    switch(type) {
      case 'success':
        toastProperties = {
          id,
          description: msg,
          backgroundColor: '#57A671',
          icon: checkIcon,
          type,
        }
        break;
      case 'danger':
        toastProperties = {
          id,
          description: msg,
          backgroundColor: '#F56060',
          icon: errorIcon,
          type,
        }
        break;
      case 'info':
        toastProperties = {
          id,
          description: msg,
          backgroundColor: '#58CAF8',
          icon: infoIcon,
          type,
        }
        break;
      case 'warning':
        toastProperties = {
          id,
          description: msg,
          backgroundColor: '#EBBD36',
          icon: warningIcon,
          type,
        }
        break;

      default:
        setToastList([]);
    }

    setToastList((list) => [...list, toastProperties]);
  }

  return (
    <div className="notifications-parent">
      {
        toastList.map((toast) =>
          <div
            key={toast.id}
            className="notification"
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <div className="toaster">
              <div className="notification-image">
                <img src={toast.icon} alt="" />
              </div>
              <div className="notification-message">
                  {toast.description}
              </div>
            </div>
            <button onClick={() => deleteToast(toast.id)}>
              x
            </button>
          </div>
        )
      }
    </div>
  );
}

export {
  Notification,
  notify,
};
