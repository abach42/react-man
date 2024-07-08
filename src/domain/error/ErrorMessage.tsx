import React from 'react';

type Props = {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <div className="error-message">
    <p>{message}</p>
  </div>
);

export default ErrorMessage;