import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Chip,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
  Snackbar
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CodeIcon from '@mui/icons-material/Code';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Simulated useFormStatus hook - commented out to avoid unused variable
// const useFormStatus = () => {
//   // In a real React application, this would be the actual hook
//   // For this demo, we'll simulate it with local state
//   const [isPending, setIsPending] = useState(false);
//   
//   return { pending: isPending, data: null, method: 'POST', action: '/api/submit' };
// };

// Simulated form submission function
const simulateFormSubmission = async (data: any, delay: number, shouldFail: boolean) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Simulate validation
  if (shouldFail) {
    throw new Error('Form submission failed. Please try again.');
  }
  
  // Simulate successful submission
  return {
    success: true,
    id: Math.floor(Math.random() * 1000),
    timestamp: new Date().toISOString(),
    data
  };
};

// Submit Button Component that uses the form status
const SubmitButton = ({ isPending, isDisabled }: { isPending: boolean; isDisabled: boolean }) => {
  // In a real React application, we would use the useFormStatus hook here
  // const { pending } = useFormStatus();
  
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      disabled={isPending || isDisabled}
      startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
      sx={{ mt: 3 }}
    >
      {isPending ? 'Submitting...' : 'Submit Form'}
    </Button>
  );
};

const UseFormStatusPage: React.FC = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // UI state
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmission, setLastSubmission] = useState<any>(null);
  
  // Demo settings
  const [submissionDelay, setSubmissionDelay] = useState(1500);
  const [shouldFail, setShouldFail] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    try {
      const formData = { name, email, message };
      const result = await simulateFormSubmission(formData, submissionDelay, shouldFail);
      
      // Show success message
      setSuccess('Form submitted successfully!');
      setSubmissionCount(prev => prev + 1);
      setLastSubmission({
        ...formData,
        timestamp: result.timestamp,
        id: result.id
      });
      
      // Reset form if successful
      if (!shouldFail) {
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsPending(false);
    }
  };
  
  // Close snackbar
  const handleCloseSnackbar = () => {
    setSuccess(null);
  };
  
  return (
    <Box className="page-transition-enter">
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          mb: 4,
          background: 'linear-gradient(135deg, rgba(63, 81, 181, 0.05) 0%, rgba(100, 181, 246, 0.05) 100%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoIcon sx={{ mr: 2, color: 'primary.main', fontSize: 30 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 0 }}>
            useFormStatus
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mb: 3, maxWidth: 800 }}>
          The <code>useFormStatus</code> hook provides information about the submission status of the parent form.
          It can be used to display loading indicators, disable submission buttons to prevent double submissions, or show feedback messages based on the form's pending state.
        </Typography>
        
        <Box 
          sx={{ 
            p: 3, 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            mb: 4
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
            <CodeIcon sx={{ mr: 1, fontSize: 20 }} /> Example Code
          </Typography>
          <Box 
            component="pre" 
            sx={{ 
              p: 2, 
              bgcolor: '#1e1e1e', 
              color: '#d4d4d4', 
              borderRadius: 1,
              overflow: 'auto',
              fontSize: '0.875rem',
              fontFamily: 'monospace'
            }}
          >
            <code>{`// Define a server action for form submission
async function submitForm(formData) {
  'use server';
  // Process form data...
  return { success: true };
}

// Form component with submit button
function ContactForm() {
  return (
    <form action={submitForm}>
      <input name="name" />
      <input name="email" type="email" />
      <textarea name="message" />
      <SubmitButton />
    </form>
  );
}

// Submit button that uses form status
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`}</code>
          </Box>
        </Box>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Note: This is a simulated example. In a real React application with server components, the <code>useFormStatus</code> hook would be imported from <code>'react-dom'</code> and used within a form that has a server action.
          </Typography>
        </Alert>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Interactive Demo
        </Typography>
        
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                border: '1px solid', 
                borderColor: 'divider',
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <SendIcon sx={{ mr: 1, fontSize: 20 }} /> Contact Form
                </Typography>
                
                <Tooltip title="This form simulates the behavior of useFormStatus hook">
                  <IconButton size="small">
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isPending}
                />
                
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isPending}
                />
                
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={isPending}
                />
                
                {/* This component would use useFormStatus in a real app */}
                <SubmitButton isPending={isPending} isDisabled={!name || !email || !message} />
              </form>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Demo Settings
              </Typography>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" gutterBottom>
                    Submission Delay: {submissionDelay}ms
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">500ms</Typography>
                    <Box sx={{ flex: 1, mx: 2 }}>
                      <input 
                        type="range" 
                        min="500" 
                        max="3000" 
                        step="100" 
                        value={submissionDelay} 
                        onChange={(e) => setSubmissionDelay(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">3000ms</Typography>
                  </Box>
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={shouldFail} 
                        onChange={(e) => setShouldFail(e.target.checked)} 
                        color="error"
                      />
                    }
                    label="Simulate submission failure"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                border: '1px solid', 
                borderColor: 'divider',
                height: '100%'
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
                Form Status Information
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 6 }}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Current Status
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={isPending ? 'Pending' : 'Idle'} 
                          color={isPending ? 'warning' : 'success'} 
                          size="small" 
                          sx={{ mr: 1 }}
                        />
                        {isPending && <CircularProgress size={16} />}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 6 }}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Submission Count
                      </Typography>
                      <Typography variant="h4">
                        {submissionCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                useFormStatus Hook Data
              </Typography>
              
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: 2,
                  mb: 3,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }}
              >
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  {JSON.stringify({
                    pending: isPending,
                    data: null,
                    method: 'POST',
                    action: '/api/submit'
                  }, null, 2)}
                </pre>
              </Box>
              
              {lastSubmission && (
                <>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Last Submission Data
                  </Typography>
                  
                  <Box 
                    sx={{ 
                      p: 2, 
                      bgcolor: '#f5f5f5', 
                      borderRadius: 2,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem'
                    }}
                  >
                    <pre style={{ margin: 0, overflow: 'auto' }}>
                      {JSON.stringify(lastSubmission, null, 2)}
                    </pre>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <CheckCircleIcon sx={{ mr: 1 }} />
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UseFormStatusPage;