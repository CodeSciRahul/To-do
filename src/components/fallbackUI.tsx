

import { Button, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material'; // Error icon from MUI

function FallbackUI() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-800">
      <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <ErrorOutline className="text-primary text-6xl" />
        </div>

        {/* Error Message */}
        <Typography variant="h6" className="text-xl font-semibold text-center mb-2">
          Something went wrong
        </Typography>

        <Typography variant="body2" className="text-sm text-center text-gray-600 mb-4">
          We’re unable to load the app right now. Please try refreshing the page or come back later. Our team has been notified of this issue.
        </Typography>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            onClick={() => window.location.reload()}
            variant="contained"
            color="primary"
            fullWidth
            className="px-4 py-2 hover:bg-opacity-90 transition duration-200"
          >
            Refresh Page
          </Button>
          <Button
            onClick={() => window.location.href = "/"}
            variant="contained"
            color="primary"
            fullWidth
            className="px-4 py-2 hover:bg-opacity-90 transition duration-200"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FallbackUI;
