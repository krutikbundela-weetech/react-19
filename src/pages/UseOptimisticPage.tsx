import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Checkbox,
  Divider,
  Alert,
  Chip,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Tooltip,
  CircularProgress,
  Snackbar,
  Fade
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Define Todo type
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isOptimistic?: boolean;
  isDeleting?: boolean;
}

// Simulated useOptimistic hook
const useOptimistic = <T,>(state: T, updateFn: (state: T, optimisticValue: any) => T): [T, (optimisticValue: any) => void] => {
  // In a real React application, this would be the actual hook
  // For this demo, we'll simulate it with local state
  const [optimisticState, setOptimisticState] = useState<T>(state);
  
  // Update optimistic state when actual state changes
  useEffect(() => {
    setOptimisticState(state);
  }, [state]);
  
  const addOptimistic = (optimisticValue: any) => {
    setOptimisticState(prevState => updateFn(prevState, optimisticValue));
  };
  
  return [optimisticState, addOptimistic];
};

// Simulated server delay
const simulateServerDelay = async (delay: number, shouldFail: boolean = false) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  if (shouldFail) {
    throw new Error('Server operation failed');
  }
};

const UseOptimisticPage: React.FC = () => {
  // State for todos
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React 19 features', completed: false },
    { id: 2, text: 'Try useOptimistic hook', completed: false },
    { id: 3, text: 'Build a demo application', completed: true }
  ]);
  
  // State for new todo input
  const [newTodoText, setNewTodoText] = useState('');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Demo settings
  const [serverDelay, setServerDelay] = useState(1500);
  const [shouldFail, setShouldFail] = useState(false);
  const [optimisticEnabled, setOptimisticEnabled] = useState(true);
  
  // Optimistic state for todos
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[]>(todos, (state, action) => {
    if (action.type === 'add') {
      return [...state, { ...action.todo, isOptimistic: true }];
    } else if (action.type === 'toggle') {
      return state.map(todo => 
        todo.id === action.id ? { ...todo, completed: !todo.completed, isOptimistic: true } : todo
      );
    } else if (action.type === 'delete') {
      return state.map(todo => 
        todo.id === action.id ? { ...todo, isDeleting: true, isOptimistic: true } : todo
      );
    }
    return state;
  });
  
  // Handle adding a new todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText.trim(),
      completed: false
    };
    
    setError(null);
    
    // Apply optimistic update if enabled
    if (optimisticEnabled) {
      addOptimisticTodo({ type: 'add', todo: newTodo });
    } else {
      setIsLoading(true);
    }
    
    try {
      // Simulate server request
      await simulateServerDelay(serverDelay, shouldFail);
      
      // Update actual state after "server" confirms
      setTodos(prev => [...prev, newTodo]);
      setNewTodoText('');
      setSuccess('Todo added successfully!');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle toggling a todo's completed status
  const handleToggleTodo = async (id: number) => {
    setError(null);
    
    // Apply optimistic update if enabled
    if (optimisticEnabled) {
      addOptimisticTodo({ type: 'toggle', id });
    } else {
      setIsLoading(true);
    }
    
    try {
      // Simulate server request
      await simulateServerDelay(serverDelay, shouldFail);
      
      // Update actual state after "server" confirms
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      setSuccess('Todo updated successfully!');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle deleting a todo
  const handleDeleteTodo = async (id: number) => {
    setError(null);
    
    // Apply optimistic update if enabled
    if (optimisticEnabled) {
      addOptimisticTodo({ type: 'delete', id });
    } else {
      setIsLoading(true);
    }
    
    try {
      // Simulate server request
      await simulateServerDelay(serverDelay, shouldFail);
      
      // Update actual state after "server" confirms
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setSuccess('Todo deleted successfully!');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Close snackbar
  const handleCloseSnackbar = () => {
    setSuccess(null);
    setError(null);
  };
  
  // Determine which todos to display based on optimistic mode
  const displayTodos = optimisticEnabled ? optimisticTodos : todos;
  
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
            useOptimistic
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mb: 3, maxWidth: 800 }}>
          The <code>useOptimistic</code> hook allows you to update the UI optimistically before a server response is received.
          This creates a smoother user experience by making the application feel more responsive, as changes appear to happen instantly.
          If the server operation fails, the UI can revert to its previous state.
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
            <code>{`// Define the current state and an update function
const [todos, setTodos] = useState([
  { id: 1, text: 'Learn React', completed: false }
]);

// Define how optimistic updates should be applied
const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (currentTodos, action) => {
    if (action.type === 'add') {
      return [...currentTodos, action.todo];
    } else if (action.type === 'toggle') {
      return currentTodos.map(todo => 
        todo.id === action.id 
          ? { ...todo, completed: !todo.completed } 
          : todo
      );
    }
    return currentTodos;
  }
);

// Use the optimistic state in your UI
return (
  <div>
    {optimisticTodos.map(todo => (
      <div key={todo.id}>
        <input 
          type="checkbox" 
          checked={todo.completed}
          onChange={() => {
            // Apply optimistic update immediately
            addOptimisticTodo({ type: 'toggle', id: todo.id });
            
            // Then perform the actual server update
            updateTodoOnServer(todo.id);
          }}
        />
        {todo.text}
      </div>
    ))}
  </div>
);`}</code>
          </Box>
        </Box>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Note: This is a simulated example. In a real React application, the <code>useOptimistic</code> hook would be imported from <code>'react'</code> and used with actual server requests.
          </Typography>
        </Alert>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Interactive Todo List Demo
        </Typography>
        
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
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
                  <AddIcon sx={{ mr: 1, fontSize: 20 }} /> Todo List
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={optimisticEnabled} 
                        onChange={(e) => setOptimisticEnabled(e.target.checked)} 
                        color="primary"
                      />
                    }
                    label="Optimistic Updates"
                  />
                  
                  <Tooltip title="Toggle to see the difference between optimistic and non-optimistic updates">
                    <IconButton size="small">
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ mb: 3 }}
                  action={
                    <Button color="inherit" size="small" onClick={() => setError(null)}>
                      Dismiss
                    </Button>
                  }
                >
                  {error}
                </Alert>
              )}
              
              <form onSubmit={handleAddTodo}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <TextField
                    label="New Todo"
                    variant="outlined"
                    fullWidth
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    disabled={isLoading && !optimisticEnabled}
                    placeholder="What needs to be done?"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={(isLoading && !optimisticEnabled) || !newTodoText.trim()}
                    sx={{ ml: 1, minWidth: '120px' }}
                    startIcon={isLoading && !optimisticEnabled ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                  >
                    Add
                  </Button>
                </Box>
              </form>
              
              <Divider sx={{ mb: 2 }} />
              
              <List sx={{ width: '100%' }}>
                {displayTodos.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No todos yet. Add one above!
                    </Typography>
                  </Box>
                ) : (
                  displayTodos.map((todo) => (
                    <Fade key={todo.id} in={!todo.isDeleting} timeout={todo.isDeleting ? 500 : 0}>
                      <ListItem
                        sx={{
                          mb: 1,
                          bgcolor: todo.isOptimistic ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: todo.isOptimistic ? 'primary.light' : 'divider',
                          opacity: todo.isDeleting ? 0.5 : 1,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id)}
                            disabled={isLoading && !optimisticEnabled}
                          />
                        </ListItemIcon>
                        
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? 'text.secondary' : 'text.primary'
                              }}
                            >
                              {todo.text}
                            </Typography>
                          }
                          secondary={
                            todo.isOptimistic && (
                              <Chip
                                label="Optimistic Update"
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ height: 20, fontSize: '0.7rem', mt: 0.5 }}
                              />
                            )
                          }
                        />
                        
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteTodo(todo.id)}
                            disabled={isLoading && !optimisticEnabled}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      </ListItem>
                    </Fade>
                  ))
                )}
              </List>
              
              {isLoading && !optimisticEnabled && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <CircularProgress size={24} />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    Processing request...
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
          
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
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
                Demo Settings & Information
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12 }}>
                  <Card variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Current Mode
                      </Typography>
                      <Chip 
                        label={optimisticEnabled ? 'Optimistic Updates ON' : 'Optimistic Updates OFF'} 
                        color={optimisticEnabled ? 'success' : 'default'} 
                        icon={optimisticEnabled ? <CheckCircleIcon /> : undefined}
                        sx={{ fontWeight: 500 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" gutterBottom>
                    Server Delay: {serverDelay}ms
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">500ms</Typography>
                    <Box sx={{ flex: 1, mx: 2 }}>
                      <input 
                        type="range" 
                        min="500" 
                        max="3000" 
                        step="100" 
                        value={serverDelay} 
                        onChange={(e) => setServerDelay(Number(e.target.value))}
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
                    label="Simulate server failure"
                  />
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                How It Works
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Optimistic Updates:</strong> When enabled, the UI updates immediately while the server request is processing in the background.
                </Typography>
              </Alert>
              
              <Alert severity="warning" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Non-Optimistic Updates:</strong> When disabled, the UI waits for the server response before updating, showing a loading state.
                </Typography>
              </Alert>
              
              <Typography variant="body2" paragraph>
                Try toggling the "Optimistic Updates" switch and adjusting the server delay to see the difference in user experience. You can also simulate server failures to see how the UI handles errors in both modes.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UseOptimisticPage;