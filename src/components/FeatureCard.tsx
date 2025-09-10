import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // useTransition
import CodeIcon from '@mui/icons-material/Code'; // Default
import ApiIcon from '@mui/icons-material/Api'; // Actions
import UpdateIcon from '@mui/icons-material/Update'; // useFormStatus
import SpeedIcon from '@mui/icons-material/Speed'; // useOptimistic
import LinkIcon from '@mui/icons-material/Link'; // Refs as Props
import LoopIcon from '@mui/icons-material/Loop'; // use() with Promises
import MemoryIcon from '@mui/icons-material/Memory'; // useActionState
import { useTheme } from '@mui/material/styles';

interface FeatureCardProps {
  id?: string;
  title: string;
  description: string;
  navigateTo: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ id, title, description, navigateTo }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const featureId = id || title.toLowerCase().replace(/\s+/g, '-');
  
  // Function to get icon based on feature ID
  const getFeatureIcon = () => {
    switch(featureId) {
      case 'use-transition':
        return <AutoAwesomeIcon />;
      case 'actions':
        return <ApiIcon />;
      case 'use-action-state':
        return <MemoryIcon />;
      case 'use-form-status':
        return <UpdateIcon />;
      case 'use-optimistic':
        return <SpeedIcon />;
      case 'refs-as-props':
        return <LinkIcon />;
      case 'use-with-promises':
        return <LoopIcon />;
      case 'use-with-context':
        return <CodeIcon />;
      default:
        return <AutoAwesomeIcon />;
    }
  };
  
  // Function to get gradient based on feature ID
  const getGradientColors = () => {
    const gradients = {
      'use-transition': 'linear-gradient(135deg, #073b4c 0%, #3a6978 100%)',
      'actions': 'linear-gradient(135deg, #3a86ff 0%, #6ea8ff 100%)',
      'use-action-state': 'linear-gradient(135deg, #8338ec 0%, #a56ef5 100%)',
      'use-form-status': 'linear-gradient(135deg, #ff006e 0%, #ff5e78 100%)',
      'use-optimistic': 'linear-gradient(135deg, #fb5607 0%, #ff8e3c 100%)',
      'refs-as-props': 'linear-gradient(135deg, #ffbe0b 0%, #ffd166 100%)',
      'use-with-promises': 'linear-gradient(135deg, #06d6a0 0%, #4dd4ac 100%)',
      'use-with-context': 'linear-gradient(135deg, #118ab2 0%, #52b2d1 100%)'
    };
    
    return gradients[featureId as keyof typeof gradients] || 'linear-gradient(135deg, #3a86ff 0%, #6ea8ff 100%)';
  };
  
  const handleNavigate = () => {
    navigate(navigateTo);
  };
  return (
    <Card 
      className="feature-card"
      sx={{ 
        height: '100%', 
        width: '100%',
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        borderRadius: 3,
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: getGradientColors(),
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, pt: 3.5, px: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              mr: 2, 
              background: getGradientColors(),
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: 48,
              height: 48
            }}
          >
            {getFeatureIcon()}
          </Avatar>
          <Typography gutterBottom variant="h5" component="div" sx={{ mb: 0, fontWeight: 600, lineHeight: 1.2 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, minHeight: '4.8rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, pb: 2.5 }}>
        <Button 
          className="learn-more-btn"
          size="medium" 
          onClick={handleNavigate}
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            background: getGradientColors(),
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              background: getGradientColors(),
              opacity: 0.9,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default FeatureCard;