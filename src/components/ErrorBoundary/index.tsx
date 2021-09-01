import { Typography } from '@material-ui/core';
import React from 'react';
import './style.scss';

interface IErrorBoundaryProps {}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <Typography variant="h4">
            Something went wrong. Please try refreshing the page.
          </Typography>
        </div>
      );
    }

    return this.props.children;
  }
}
