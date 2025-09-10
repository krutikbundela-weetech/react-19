import React, { createContext, useState, useContext, use } from 'react';
import {
  Box, Typography, Paper, Button, TextField, Stack,
  Card, CardContent, Switch, FormControlLabel,
  Alert, Chip, IconButton, List, ListItem, ListItemText,
  MenuItem, Select, FormControl,
  InputLabel
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CodeIcon from '@mui/icons-material/Code';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

// Create theme context with light/dark mode and accent color
type ThemeContextType = {
  mode: 'light' | 'dark';
  accentColor: string;
  toggleMode: () => void;
  setAccentColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  accentColor: '#2196f3',
  toggleMode: () => {},
  setAccentColor: () => {}
});

// Create user context with user preferences
type UserPreference = {
  id: number;
  name: string;
  value: string;
};

type UserContextType = {
  preferences: UserPreference[];
  addPreference: (name: string, value: string) => void;
  updatePreference: (id: number, value: string) => void;
  deletePreference: (id: number) => void;
};

const UserContext = createContext<UserContextType>({
  preferences: [],
  addPreference: () => {},
  updatePreference: () => {},
  deletePreference: () => {}
});

// Traditional component using useContext
const TraditionalThemeConsumer: React.FC = () => {
  const { mode, accentColor, toggleMode } = useContext(ThemeContext);
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2,
        bgcolor: mode === 'dark' ? 'grey.900' : 'grey.100',
        color: mode === 'dark' ? 'white' : 'inherit'
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Traditional useContext Consumer
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Current theme: <Chip size="small" label={mode} color="primary" />
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Accent color: <Box component="span" sx={{ 
            display: 'inline-block', 
            width: 16, 
            height: 16, 
            bgcolor: accentColor,
            borderRadius: '50%',
            verticalAlign: 'text-bottom',
            ml: 1
          }} />
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={toggleMode}
          sx={{ borderColor: accentColor, color: accentColor }}
        >
          Toggle Theme
        </Button>
      </CardContent>
    </Card>
  );
};

// Modern component using use() hook
const ModernThemeConsumer: React.FC<{ showControls?: boolean }> = ({ showControls = true }) => {
  // Using use() hook instead of useContext
  const { mode, accentColor, toggleMode, setAccentColor } = use(ThemeContext);
  
  // Available accent colors
  const accentColors = [
    { name: 'Blue', value: '#2196f3' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Green', value: '#4caf50' },
    { name: 'Orange', value: '#ff9800' },
    { name: 'Red', value: '#f44336' },
  ];
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2,
        bgcolor: mode === 'dark' ? 'grey.900' : 'grey.100',
        color: mode === 'dark' ? 'white' : 'inherit',
        borderColor: accentColor,
        borderWidth: 2
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Modern use() Hook Consumer
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Current theme: <Chip 
            size="small" 
            label={mode} 
            sx={{ bgcolor: accentColor, color: 'white' }} 
          />
        </Typography>
        
        {showControls && (
          <Stack spacing={2} sx={{ mt: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="accent-color-label">Accent Color</InputLabel>
              <Select
                labelId="accent-color-label"
                value={accentColor}
                label="Accent Color"
                onChange={(e) => setAccentColor(e.target.value)}
                sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
              >
                {accentColors.map((color) => (
                  <MenuItem key={color.value} value={color.value}>
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      bgcolor: color.value,
                      borderRadius: '50%',
                      mr: 1 
                    }} />
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button 
              variant="contained" 
              size="small" 
              onClick={toggleMode}
              sx={{ bgcolor: accentColor, '&:hover': { bgcolor: accentColor, opacity: 0.9 } }}
            >
              Toggle to {mode === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

// Component using use() hook conditionally
const ConditionalContextConsumer: React.FC = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            Conditional Context Usage
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<SettingsIcon />}
            onClick={() => setShowPreferences(!showPreferences)}
          >
            {showPreferences ? 'Hide' : 'Show'} Preferences
          </Button>
        </Stack>
        
        {/* Conditionally use the context */}
        {showPreferences && <PreferenceManager />}
      </CardContent>
    </Card>
  );
};

// Component that uses context only when rendered
const PreferenceManager: React.FC = () => {
  // Context is only consumed when this component is rendered
  const { preferences, addPreference, updatePreference, deletePreference } = use(UserContext);
  const [newName, setNewName] = useState('');
  const [newValue, setNewValue] = useState('');
  
  const handleAddPreference = () => {
    if (newName && newValue) {
      addPreference(newName, newValue);
      setNewName('');
      setNewValue('');
    }
  };
  
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        User Preferences
      </Typography>
      
      <List dense sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
        {preferences.length === 0 ? (
          <ListItem>
            <ListItemText primary="No preferences set" secondary="Add some preferences below" />
          </ListItem>
        ) : (
          preferences.map((pref) => (
            <ListItem key={pref.id}>
              <ListItemText 
                primary={pref.name} 
                secondary={
                  <TextField
                    size="small"
                    variant="standard"
                    value={pref.value}
                    onChange={(e) => updatePreference(pref.id, e.target.value)}
                    sx={{ mt: 1 }}
                  />
                } 
              />
              secondaryAction={
                <IconButton edge="end" onClick={() => deletePreference(pref.id)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
            </ListItem>
          ))
        )}
      </List>
      
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <TextField
          size="small"
          label="Preference Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <TextField
          size="small"
          label="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <Button 
          variant="contained" 
          size="small"
          startIcon={<AddIcon />}
          onClick={handleAddPreference}
          disabled={!newName || !newValue}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

// Main page component that provides contexts
const UseWithContextPage: React.FC = () => {
  // Theme state
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [accentColor, setAccentColor] = useState('#2196f3');
  
  // User preferences state
  const [preferences, setPreferences] = useState<UserPreference[]>([
    { id: 1, name: 'Notifications', value: 'enabled' },
    { id: 2, name: 'Language', value: 'English' }
  ]);
  
  // Theme context value
  const themeContextValue: ThemeContextType = {
    mode: themeMode,
    accentColor,
    toggleMode: () => setThemeMode(prev => prev === 'light' ? 'dark' : 'light'),
    setAccentColor: (color: string) => setAccentColor(color)
  };
  
  // User context value
  const userContextValue: UserContextType = {
    preferences,
    addPreference: (name, value) => {
      const newId = preferences.length > 0 
        ? Math.max(...preferences.map(p => p.id)) + 1 
        : 1;
      setPreferences([...preferences, { id: newId, name, value }]);
    },
    updatePreference: (id, value) => {
      setPreferences(preferences.map(p => 
        p.id === id ? { ...p, value } : p
      ));
    },
    deletePreference: (id) => {
      setPreferences(preferences.filter(p => p.id !== id));
    }
  };
  
  // Code example state
  const [showCode, setShowCode] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <UserContext.Provider value={userContextValue}>
        <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            use() with Context
          </Typography>
          
          <Typography variant="body1" paragraph>
            The <code>use()</code> hook in React 19 can be used with Context, allowing for more flexible context consumption in conditional branches and loops.
            This provides a more direct way to access context values compared to the traditional <code>useContext</code> hook.
          </Typography>
          
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              mb: 4,
              bgcolor: themeMode === 'dark' ? 'grey.800' : 'white',
              color: themeMode === 'dark' ? 'white' : 'inherit'
            }}
          >
            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center" 
              sx={{ mb: 3 }}
            >
              <Typography variant="h6">
                Interactive Demo
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CompareArrowsIcon />}
                  onClick={() => setCompareMode(!compareMode)}
                  sx={{ borderColor: accentColor, color: accentColor }}
                >
                  {compareMode ? 'Single View' : 'Compare View'}
                </Button>
              </Stack>
            </Stack>
            
            {compareMode ? (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    Traditional useContext
                  </Typography>
                  <TraditionalThemeConsumer />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    Modern use() hook
                  </Typography>
                  <ModernThemeConsumer />
                </Grid>
              </Grid>
            ) : (
              <>
                <ModernThemeConsumer />
                <ConditionalContextConsumer />
              </>
            )}
            
            <Alert 
              severity="info" 
              sx={{ 
                mt: 2,
                bgcolor: themeMode === 'dark' ? 'rgba(41, 182, 246, 0.2)' : undefined,
                color: themeMode === 'dark' ? 'white' : undefined,
                '& .MuiAlert-icon': {
                  color: themeMode === 'dark' ? 'white' : undefined
                }
              }}
            >
              Try toggling the theme and changing preferences to see how the <code>use()</code> hook allows components to access context values only when they're rendered.
            </Alert>
          </Paper>
          
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
{`// Create a context
const ThemeContext = createContext({ mode: 'light', toggleMode: () => {} });

// Traditional approach with useContext
const TraditionalConsumer = () => {
  // Context is always consumed when component renders
  const { mode, toggleMode } = useContext(ThemeContext);
  
  return (
    <div>
      <p>Current theme: {mode}</p>
      <button onClick={toggleMode}>Toggle Theme</button>
    </div>
  );
};

// Modern approach with use() hook
const ModernConsumer = ({ showControls }) => {
  // Context is consumed with use() hook
  const { mode, toggleMode } = use(ThemeContext);
  
  return (
    <div>
      <p>Current theme: {mode}</p>
      {showControls && (
        <button onClick={toggleMode}>Toggle Theme</button>
      )}
    </div>
  );
};

// Conditional usage example
const ConditionalConsumer = () => {
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowSettings(!showSettings)}>
        {showSettings ? 'Hide' : 'Show'} Settings
      </button>
      
      {/* Context is only consumed when this part renders */}
      {showSettings && <Settings />}
    </div>
  );
};

const Settings = () => {
  // Context is only consumed when this component renders
  const { mode, toggleMode } = use(ThemeContext);
  
  return (
    <div>
      <p>Settings for {mode} mode</p>
      <button onClick={toggleMode}>Switch Mode</button>
    </div>
  );
};`}
              </Typography>
            )}
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              The <code>use()</code> hook provides several advantages over <code>useContext</code>:
              <ul>
                <li>It can be used conditionally, allowing context to be consumed only when needed</li>
                <li>It works in loops and conditional branches</li>
                <li>It provides a more consistent API with other data fetching mechanisms</li>
                <li>It can potentially improve performance by avoiding unnecessary context subscriptions</li>
              </ul>
            </Typography>
          </Paper>
        </Box>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default UseWithContextPage;