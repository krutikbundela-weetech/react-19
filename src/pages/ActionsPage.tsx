import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Tooltip,
  List
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CodeIcon from '@mui/icons-material/Code';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Simulated server-side action
const submitFormAction = async (formData: { name: string; email: string; message: string }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate validation
  if (!formData.name || !formData.email || !formData.message) {
    throw new Error('All fields are required');
  }
  
  if (!formData.email.includes('@')) {
    throw new Error('Invalid email address');
  }
  
  // Simulate successful submission
  return {
    success: true,
    id: Math.floor(Math.random() * 1000),
    timestamp: new Date().toISOString(),
    data: formData
  };
};

// Simulated messages list
const initialMessages = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'React Actions are amazing!', timestamp: '2023-06-15T10:30:00Z' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'I love the new React features.', timestamp: '2023-06-14T14:45:00Z' },
];

const ActionsPage: React.FC = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await submitFormAction({ name, email, message });
      
      // Update messages list with new message
      setMessages([{ 
        id: result.id, 
        name, 
        email, 
        message, 
        timestamp: result.timestamp 
      }, ...messages]);
      
      // Show success message
      setSuccess('Message submitted successfully!');
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle message deletion
  const handleDelete = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
    setSuccess('Message deleted successfully!');
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
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(255, 159, 67, 0.05) 100%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <RocketLaunchIcon sx={{ mr: 2, color: 'primary.main', fontSize: 30 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 0 }}>
            React Actions
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mb: 3, maxWidth: 800 }}>
          React Actions provide a way to handle form submissions and server-side data mutations with progressive enhancement.
          They allow you to define functions that can be called directly from forms or other UI events, abstracting away the underlying data fetching logic.
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
            <code>{`// Define a server action
async function submitForm(formData) {
  'use server'; // This marks the function as a server action
  
  // Validate the form data
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  if (!name || !email || !message) {
    return { error: 'All fields are required' };
  }
  
  // Process the data (e.g., save to database)
  await saveToDatabase({ name, email, message });
  
  // Return success response
  return { success: true };
}

// In your React component
function ContactForm() {
  return (
    <form action={submitForm}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Send Message</button>
    </form>
  );
}`}</code>
          </Box>
        </Box>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Note: This is a simulated example. In a real React application with server components, you would use the <code>'use server'</code> directive to mark functions as server actions.
          </Typography>
        </Alert>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Interactive Demo
        </Typography>
        
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
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
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
                <SendIcon sx={{ mr: 1, fontSize: 20 }} /> Contact Form
              </Typography>
              
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  sx={{ mt: 3 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Message'}
                </Button>
              </form>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <InfoIcon sx={{ mr: 1, fontSize: 16 }} /> How it works:
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  1. Fill out the form and submit
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  2. The form data is processed by a simulated server action
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  3. On success, the message appears in the list on the right
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                border: '1px solid', 
                borderColor: 'divider',
                height: '100%',
                maxHeight: 500,
                overflow: 'auto'
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
                Messages ({messages.length})
              </Typography>
              
              {messages.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No messages yet. Be the first to submit one!
                  </Typography>
                </Box>
              ) : (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {messages.map((msg) => (
                    <Card key={msg.id} sx={{ mb: 2, borderRadius: 2 }}>
                      <CardContent sx={{ pb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {msg.name}
                          </Typography>
                          <Chip 
                            size="small" 
                            label={new Date(msg.timestamp).toLocaleDateString()} 
                            color="default" 
                            variant="outlined"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {msg.email}
                        </Typography>
                        <Typography variant="body1">
                          {msg.message}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                        <Tooltip title="Delete message">
                          <IconButton size="small" onClick={() => handleDelete(msg.id)} color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  ))}
                </List>
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

export default ActionsPage;