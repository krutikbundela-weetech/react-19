import React from 'react';
import { Typography, Container, Box, Paper, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import FeatureCard from '../components/FeatureCard';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';

const Home: React.FC = () => {
  const features = [
    {
      id: 'useTransition',
      title: 'useTransition',
      description: 'Learn how to use the useTransition hook to mark state updates as transitions.',
      navigateTo: '/use-transition'
    },
    {
      id: 'actions',
      title: 'Actions',
      description: 'Explore React Actions, a new way to handle form submissions and other interactions.',
      navigateTo: '/actions'
    },
    {
      id: 'useActionState',
      title: 'useActionState',
      description: 'Learn how to use the useActionState hook to track the state of an action.',
      navigateTo: '/use-action-state'
    },
    {
      id: 'useFormStatus',
      title: 'useFormStatus',
      description: 'Discover how to use the useFormStatus hook to track form submission status.',
      navigateTo: '/use-form-status'
    },
    {
      id: 'useOptimistic',
      title: 'useOptimistic',
      description: 'Learn how to use the useOptimistic hook for optimistic UI updates.',
      navigateTo: '/use-optimistic'
    },
    {
      id: 'refsAsProps',
      title: 'Refs as Props',
      description: 'Explore the new capability to pass refs as props in React 19.',
      navigateTo: '/refs-as-props'
    },
    {
      id: 'useWithPromises',
      title: 'use() with Promises',
      description: 'Learn how to use the use() hook with Promises for data fetching.',
      navigateTo: '/use-with-promises'
    },
    {
      id: 'useWithContext',
      title: 'use() with Context',
      description: 'Discover how to use the use() hook with Context for cleaner code.',
      navigateTo: '/use-with-context'
    }
  ];

  return (
    <Box className="page-transition-enter">
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          mb: 6,
          borderRadius: { xs: 0, md: '0 0 20px 20px' },
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              React 19 Features Explorer
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4, 
                opacity: 0.9,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Discover and learn about the powerful new features introduced in React 19 with interactive examples and code samples.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<CodeIcon />}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  color: '#2575fc',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'white'
                  },
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
                href="https://react.dev/"
                target="_blank"
              >
                React Documentation
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<GitHubIcon />}
                sx={{ 
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  },
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
                href="https://github.com/facebook/react"
                target="_blank"
              >
                GitHub Repository
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            mb: 6, 
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
              mb: 3,
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 60,
                height: 4,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)'
              }
            }}
          >
            Explore New Features
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: 800 }}>
            React 19 introduces several powerful features that make building interactive UIs easier and more efficient. 
            Click on any card below to learn more about each feature with practical examples.
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ 
                display: 'flex',
                animation: 'fadeIn 0.5s ease-out',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
                height: '100%'
              }}>
                <FeatureCard 
                  id={feature.id}
                  title={feature.title} 
                  description={feature.description} 
                  navigateTo={feature.navigateTo} 
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;