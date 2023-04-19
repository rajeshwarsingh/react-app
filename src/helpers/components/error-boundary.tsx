import { Component, ReactNode } from 'react';

import debug from 'debug';
import { Link } from 'react-router-dom';

import { IErrorBoundaryProps, IErrorBoundaryState, TLogType } from '../../interfaces';

const log = debug('data:errorBoundary');

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  public state: IErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    this.setState({ hasError: true });
    let emailContent = error.stack;
    const params: TLogType = {
      type: 'error',
      body: emailContent?.toString(),
      subject: 'Triggered by error boundary',
      action: 'ErrorBoundary',
    };
    log('Triggered by error boundary', params);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h2>OOps! something went wrong.</h2>
          <span>
            Hang tight - we have notified the team, and we are taking you back to the homepage.
            <br />
            <Link to="/">Click here to bbe redirectd now</Link>
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}
