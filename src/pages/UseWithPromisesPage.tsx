import React, { use, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  TextField, 
  CircularProgress, 
  Card, 
  CardContent, 
  Divider,
  Chip,
  Avatar
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';

// Simulated API fetch function
const fetchUserData = (userId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'Developer',
        projects: [
          { id: 1, name: 'React 19 Migration', status: 'In Progress' },
          { id: 2, name: 'API Integration', status: 'Completed' },
          { id: 3, name: 'UI Redesign', status: 'Planning' }
        ]
      });
    }, 1500); // Simulate network delay
  });
};

// Component that uses the use() hook
const UserProfile = ({ userId }: { userId: string }) => {
  // The use() hook directly consumes the Promise
  const userData = use(fetchUserData(userId));
  
  return (
    <Card 
      elevation={3} 
      sx={{ 
        overflow: 'visible',
        position: 'relative',
        borderRadius: 3,
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: -20, 
          left: 20, 
          bgcolor: 'background.paper',
          borderRadius: '50%',
          p: 1,
          boxShadow: 3
        }}
      >
        <Avatar 
          src={userData.avatar} 
          alt={userData.name} 
          sx={{ width: 80, height: 80 }}
        />
      </Box>
      <CardContent sx={{ pt: 6, mt: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          {userData.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {userData.email}
        </Typography>
        <Chip 
          label={userData.role} 
          size="small" 
          sx={{ 
            bgcolor: 'primary.light', 
            color: 'primary.contrastText',
            fontWeight: 500,
            mb: 2
          }} 
        />
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Projects
        </Typography>
        
        {userData.projects.map((project: any) => (
          <Box 
            key={project.id} 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 1,
              p: 1,
              borderRadius: 1,
              bgcolor: 'background.default'
            }}
          >
            <Typography variant="body2">{project.name}</Typography>
            <Chip 
              label={project.status} 
              size="small" 
              color={project.status === 'Completed' ? 'success' : 
                    project.status === 'In Progress' ? 'primary' : 'default'}
              sx={{ fontWeight: 500 }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

// Main component with error handling
const UseWithPromisesPage: React.FC = () => {
  const [userId, setUserId] = useState('user-123');
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleFetchUser = () => {
    setError(null);
    setShowProfile(true);
  };

  return (
    <Box className="page-transition-enter">
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          mb: 4,
          background: 'linear-gradient(135deg, rgba(106, 17, 203, 0.05) 0%, rgba(37, 117, 252, 0.05) 100%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CloudIcon sx={{ mr: 2, color: 'primary.main', fontSize: 30 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 0 }}>
            use() with Promises
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mb: 3, maxWidth: 800 }}>
          React 19 introduces the <code>use()</code> hook, which allows you to directly consume Promises within your components.
          This simplifies asynchronous data fetching and handling, making it more intuitive to integrate data into your UI without complex <code>useEffect</code> patterns.
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
            <code>{`// Component using the use() hook
const UserProfile = ({ userId }) => {
  // The use() hook directly consumes the Promise
  const userData = use(fetchUserData(userId));
  
  return (
    <div>
      <h2>{userData.name}</h2>
      <p>{userData.email}</p>
      {/* Render user data */}
    </div>
  );
};

// Parent component with error handling
const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userId="user-123" />
    </Suspense>
  );
};`}</code>
          </Box>
        </Box>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Interactive Demo
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mr: 2 }}
          />
          <Button 
            variant="contained" 
            onClick={handleFetchUser}
            startIcon={<CloudIcon />}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              px: 3
            }}
          >
            Fetch User Data
          </Button>
        </Box>
        
        <Box sx={{ minHeight: 300 }}>
          {showProfile && (
            <React.Suspense fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading user data...</Typography>
              </Box>
            }>
              <Box sx={{ maxWidth: 400 }}>
                <UserProfile userId={userId} />
              </Box>
            </React.Suspense>
          )}
          
          {error && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                bgcolor: 'error.light', 
                color: 'error.dark',
                borderRadius: 2 
              }}
            >
              <Typography variant="body1">
                Error: {error.message}
              </Typography>
            </Paper>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default UseWithPromisesPage;