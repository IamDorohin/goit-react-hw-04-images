import PropTypes from 'prop-types';
import { Message } from './MessageContainer.styled';

export const MessageContainer = ({ children }) => {
  return <Message>{children}</Message>;
};

MessageContainer.propTypes = {
  children: PropTypes.string.isRequired,
};
