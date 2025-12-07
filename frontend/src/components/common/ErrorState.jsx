import { Button } from '../ui/button.jsx';

const ErrorState = ({ message = 'Something went wrong.', onRetry }) => (
  <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center text-red-100">
    <p className="text-lg font-semibold">{message}</p>
    {onRetry && (
      <Button variant="ghost" className="mt-4 border border-red-200/30 text-red-100" onClick={onRetry}>
        Retry
      </Button>
    )}
  </div>
);

export default ErrorState;


