import React, { useState, useTransition } from 'react';
import {
  Box, Typography, Paper, TextField, Button, CircularProgress,
  Slider, FormControlLabel,
  Switch, Alert, Card, CardContent, Stack
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CodeIcon from '@mui/icons-material/Code';

// Simulated useActionState hook implementation
function useActionState(action: any, initialState: any = null) {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();

  const dispatch = async (...args: any[]) => {
    setError(null);
    startTransition(() => {});
    try {
      const result = await action(...args);
      setState(result);
      return result;
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  };

  return [state, dispatch, { isPending, error }];
}

// Simulated server action
async function submitFeedback(formData: { name: string; email: string; message: string }, options: { delay: number; shouldFail: boolean }) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, options.delay));
  
  // Simulate failure if requested
  if (options.shouldFail) {
    throw new Error('Submission failed! (This is a simulated error)');
  }
  
  // Return success response
  return {
    success: true,
    id: Math.floor(Math.random() * 1000),
    timestamp: new Date().toISOString(),
    data: formData
  };
}

const UseActionStatePage: React.FC = () => {
  // Demo settings
  const [delay, setDelay] = useState(1000);
  const [shouldFail, setShouldFail] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Use our simulated useActionState hook
  const [result, submitAction, { isPending, error }] = useActionState(submitFeedback, null);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitAction({ name, email, message }, { delay, shouldFail });
      // Clear form on success
      setName('');
      setEmail('');
      setMessage('');
    } catch (e) {
      // Error is already captured by useActionState
    }
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        useActionState
      </Typography>
      
      <Typography variant="body1" paragraph>
        The <code>useActionState</code> hook simplifies state management for actions, providing a more streamlined way to handle form states and server responses compared to <code>useReducer</code>.
        It integrates directly with React's action system to manage pending states, errors, and data returned from actions.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Feedback Form Example
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isPending}
              />
              
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
              
              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={isPending}
              />
              
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isPending}
                sx={{ mt: 2, position: 'relative' }}
                fullWidth
              >
                {isPending ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1, color: 'inherit' }} />
                    Submitting...
                  </>
                ) : 'Submit Feedback'}
              </Button>
            </form>
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error.message}
              </Alert>
            )}
            
            {result && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Feedback submitted successfully! (ID: {result.id})
              </Alert>
            )}
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Demo Settings
            </Typography>
            
            <Typography id="delay-slider" gutterBottom>
              Submission Delay: {delay}ms
            </Typography>
            <Slider
              value={delay}
              onChange={(_, value) => setDelay(value as number)}
              aria-labelledby="delay-slider"
              valueLabelDisplay="auto"
              step={500}
              marks
              min={0}
              max={3000}
              sx={{ mb: 3 }}
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={shouldFail}
                  onChange={(e) => setShouldFail(e.target.checked)}
                />
              }
              label="Simulate Submission Failure"
            />
            
            {result && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Last Submission Result:
                </Typography>
                <Card variant="outlined" sx={{ mt: 2, bgcolor: 'background.default' }}>
                  <CardContent>
                    <Typography variant="body2" component="pre" sx={{ 
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem'
                    }}>
                      {JSON.stringify(result, null, 2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <CodeIcon color="primary" />
              <Typography variant="h6">
                Example Code
              </Typography>
            </Stack>
            
            <Typography variant="body2" component="pre" sx={{ 
              p: 2,
              borderRadius: 1,
              bgcolor: 'background.default',
              overflowX: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.875rem'
            }}>
{`// Using useActionState hook with a server action
const [result, submitAction, { isPending, error }] = 
  useActionState(submitFeedback);

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await submitAction({ name, email, message });
    // Clear form on success
    resetForm();
  } catch (e) {
    // Error is already captured by useActionState
  }
};

// In your JSX
{isPending && <CircularProgress />}
{error && <Alert severity="error">{error.message}</Alert>}
{result && <Alert severity="success">Success!</Alert>}`}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Note: This is a simulated implementation of the <code>useActionState</code> hook for demonstration purposes.
              The actual React 19 implementation may differ in details but follows similar patterns.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UseActionStatePage;