import React, { useRef, useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, TextField, Stack,
  Slider, Switch, FormControlLabel,
  Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CodeIcon from '@mui/icons-material/Code';

// Child component that receives a ref directly as a prop
const FancyInput = ({ inputRef, label, ...props }: { inputRef: React.RefObject<HTMLInputElement | null>, label: string, [key: string]: unknown }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>
      <TextField
        inputRef={inputRef}
        fullWidth
        variant="outlined"
        size="small"
        {...props}
      />
    </Box>
  );
};

// Animation component that uses refs for DOM manipulation
const AnimatedBox = ({ boxRef, color, animationSpeed }: {
  boxRef: React.RefObject<HTMLDivElement | null>,
  color: string,
  animationSpeed: number
}) => {
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    
    let position = 0;
    let direction = 1;
    
    const animate = () => {
      if (!box) return;
      
      position += direction * animationSpeed;
      
      // Reverse direction when reaching edges
      if (position >= 100 || position <= 0) {
        direction *= -1;
      }
      
      box.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [boxRef, animationSpeed]);
  
  return (
    <Box 
      ref={boxRef}
      sx={{ 
        width: 50, 
        height: 50, 
        bgcolor: color,
        borderRadius: 1,
        transition: 'transform 0.05s linear'
      }}
    />
  );
};

const RefsAsPropsPage: React.FC = () => {
  // Create refs for direct manipulation
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const redBoxRef = useRef<HTMLDivElement>(null);
  const blueBoxRef = useRef<HTMLDivElement>(null);
  
  // State for animation speed
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showCode, setShowCode] = useState(false);
  
  // Focus the name input on mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);
  
  // Handle focusing different inputs
  const focusInput = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Access values directly from refs
    const formData = {
      name: nameInputRef.current?.value || '',
      email: emailInputRef.current?.value || '',
      message: messageInputRef.current?.value || ''
    };
    
    alert(`Form submitted with values:\n${JSON.stringify(formData, null, 2)}`);
  };
  
  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Refs as Props
      </Typography>
      
      <Typography variant="body1" paragraph>
        In React 19, you can now pass <code>refs</code> directly as props to components, making it more flexible to access DOM nodes or component instances.
        This simplifies patterns like forwarding refs and allows for more direct control over child components from a parent.
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Form with Direct Ref Access
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <FancyInput 
                inputRef={nameInputRef} 
                label="Name" 
                placeholder="Enter your name"
              />
              
              <FancyInput 
                inputRef={emailInputRef} 
                label="Email" 
                placeholder="Enter your email"
                type="email"
              />
              
              <FancyInput 
                inputRef={messageInputRef} 
                label="Message" 
                placeholder="Enter your message"
                multiline
                rows={3}
              />
              
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => focusInput(nameInputRef)}
                >
                  Focus Name
                </Button>
                
                <Button 
                  variant="outlined" 
                  onClick={() => focusInput(emailInputRef)}
                >
                  Focus Email
                </Button>
                
                <Button 
                  variant="outlined" 
                  onClick={() => focusInput(messageInputRef)}
                >
                  Focus Message
                </Button>
              </Stack>
              
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                sx={{ mt: 3 }}
                fullWidth
              >
                Submit Form
              </Button>
            </form>
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Animation with Ref Props
            </Typography>
            
            <Box sx={{ mb: 4, height: 100, display: 'flex', alignItems: 'center' }}>
              <AnimatedBox 
                boxRef={redBoxRef} 
                color="#f44336" 
                animationSpeed={animationSpeed}
              />
              
              <Box sx={{ mx: 2 }} />
              
              <AnimatedBox 
                boxRef={blueBoxRef} 
                color="#2196f3" 
                animationSpeed={animationSpeed * 1.5}
              />
            </Box>
            
            <Typography id="animation-speed" gutterBottom>
              Animation Speed: {animationSpeed.toFixed(1)}
            </Typography>
            
            <Slider
              value={animationSpeed}
              onChange={(_, value) => setAnimationSpeed(value as number)}
              aria-labelledby="animation-speed"
              valueLabelDisplay="auto"
              step={0.1}
              min={0.1}
              max={3}
              sx={{ mb: 3 }}
            />
            
            <Alert severity="info" sx={{ mt: 2 }}>
              The animation is controlled by directly manipulating DOM elements through refs passed as props.
            </Alert>
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <CodeIcon color="primary" />
              <Typography variant="h6">
                Example Code
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={showCode}
                    onChange={(e) => setShowCode(e.target.checked)}
                    size="small"
                  />
                }
                label="Show Code"
                sx={{ ml: 'auto' }}
              />
            </Stack>
            
            {showCode && (
              <Typography variant="body2" component="pre" sx={{ 
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.default',
                overflowX: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.875rem'
              }}>
{`// Child component that receives a ref directly as a prop
const FancyInput = ({ inputRef, label, ...props }) => {
  return (
    <TextField
      inputRef={inputRef}
      label={label}
      {...props}
    />
  );
};

// In parent component
const ParentComponent = () => {
  // Create ref
  const inputRef = useRef(null);
  
  // Use ref for direct manipulation
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <>
      {/* Pass ref directly as a prop */}
      <FancyInput 
        inputRef={inputRef} 
        label="Name" 
      />
      
      <Button onClick={focusInput}>
        Focus Input
      </Button>
    </>
  );
};`}
              </Typography>
            )}
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              In React 19, you can pass refs directly as props without using <code>forwardRef</code>, making component composition more straightforward.
              This example demonstrates how parent components can directly control child DOM elements through ref props.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RefsAsPropsPage;