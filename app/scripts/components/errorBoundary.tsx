import React from 'react';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
