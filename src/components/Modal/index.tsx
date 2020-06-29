import * as React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { MIN_LARGE_WIDTH } from '../../constants';

const { useEffect } = React;
const transition = { ease: 'easeIn', duration: 0.6, delay: 0.2 };
const exitTransition = { ease: 'easeOut', duration: 0.4, delay: 0 };

const variants = {
  mobile: {
    out: {
      y: '100vh',
      transition: exitTransition,
    },
    in: {
      y: '0',
      transition,
    },
    exit: {
      y: '100vh',
      transition: exitTransition,
    },
  },
  desktop: {
    out: {
      y: '16px',
      opacity: 0,
      transition: exitTransition,
    },
    in: {
      y: '0',
      opacity: 100,
      transition,
    },
    exit: {
      y: '16px',
      opacity: 0,
      transition: exitTransition,
    },
  },
};

const overlayTransition = {
  ...transition,
  duration: 0.4,
  delay: 0,
};

const Overlay: React.SFC<
  React.PropsWithChildren<
    JSX.IntrinsicAttributes & {
      onCloseClick: () => void; isOpen?: boolean | undefined;
    } & {
      children?: React.ReactNode;
    }
  >
> = ({
  onCloseClick: handleCloseClick = () => null,
  isOpen = false,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial="out"
        animate="in"
        exit="exit"
        variants={{
          out: {
            opacity: 0,
            transition: {
              ...exitTransition,
              delay: 0.4,
            },
          },
          in: {
            opacity: 0.5,
            transition: overlayTransition,
          },
          exit: {
            opacity: 0,
            transition: {
              ...exitTransition,
              delay: 0.4,
            },
          },
        }}
        onClick={handleCloseClick}
        className="fixed inset-0 w-full h-full bg-black opacity-50"
      />
    )}
  </AnimatePresence>
);

interface PortalProps {
  children: React.Component | React.Component[] | JSX.Element | JSX.Element[] | React.SFC;
}

const ModalPortal: (props: PortalProps) => React.ReactPortal = ({ children }) => {
  let modalContainer = document.querySelector('#modal-container');

  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    (document.querySelector('body') as HTMLBodyElement).appendChild(modalContainer);
  }

  return ReactDOM.createPortal(
    children,
    modalContainer,
  );
};

const bodyScroll = {
  enable() {
    document.body.style.overflow = 'auto';
  },
  disable() {
    document.body.style.overflow = 'hidden';
  },
};

const Modal: React.SFC<{
  className?: string;
  children: React.Component | React.Component[] | JSX.Element | JSX.Element[] | React.SFC;
  isOpen: boolean;
  onCloseClick: () => void;
}> = ({
  className = '',
  children,
  isOpen,
  onCloseClick: handleCloseClick,
}) => {
  useEffect(() => {
    bodyScroll[isOpen ? 'disable' : 'enable']();

    return bodyScroll.enable;
  }, [isOpen]);

  const isSmallScreen = useMediaQuery({
    query: `(max-width: ${MIN_LARGE_WIDTH}px)`,
  });

  return (
    <ModalPortal>
      <div
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        className={`fixed inset-0 z-10 flex items-center justify-center w-full h-full ${className} ${isOpen ? '' : 'pointer-events-none'}`}
      >
        <AnimatePresence>
          {isOpen && (
            <>
              <Overlay onCloseClick={handleCloseClick} isOpen={isOpen} />
              <motion.div
                initial="out"
                animate="in"
                exit="exit"
                variants={variants[isSmallScreen ? 'mobile' : 'desktop']}
                className="w-full h-full mt-32 overflow-y-auto scrolling-touch bg-white rounded-lg z-1 shadow-3xl lg:w-9/12 lg:my-0 lg:rounded-md"
              >
                {children}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </ModalPortal>
  );
};

export default Modal;
