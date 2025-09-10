import React, { useState, useTransition } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
  Slider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TimerIcon from "@mui/icons-material/Timer";
import CodeIcon from "@mui/icons-material/Code";
import SpeedIcon from "@mui/icons-material/Speed";

// Generate a large list of items for demonstration
const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));
};

const UseTransitionPage: React.FC = () => {
  // State for the search input
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState(generateItems(1000));

  // State for controlling the artificial delay
  const [delay, setDelay] = useState(200);

  // State for toggling between transition and regular state updates
  const [useTransitionEnabled, setUseTransitionEnabled] = useState(true);

  // useTransition hook
  const [isPending, startTransition] = useTransition();

  // Function to filter items with artificial delay
  const filterItems = async (text: string): Promise<any[]> => {
    // Simulate expensive computation without blocking the main thread
    await new Promise(resolve => setTimeout(resolve, delay));

    return generateItems(1000).filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.description.toLowerCase().includes(text.toLowerCase())
    );
  };

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    // Always update the input field immediately (urgent update)
    setSearchText(text);

    if (useTransitionEnabled) {
      // Use transition for the expensive filtering operation
      startTransition(async () => {
        const results = await filterItems(text);
        setFilteredList(results);
      });
    } else {
      // Without transition - will block the UI
      filterItems(text).then(results => {
        setFilteredList(results);
      });
    }
  };

  return (
    <Box className="page-transition-enter">
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          mb: 4,
          background:
            "linear-gradient(135deg, rgba(106, 17, 203, 0.05) 0%, rgba(37, 117, 252, 0.05) 100%)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TimerIcon sx={{ mr: 2, color: "primary.main", fontSize: 30 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 0 }}>
            useTransition
          </Typography>
        </Box>

        <Typography variant="body1" paragraph sx={{ mb: 3, maxWidth: 800 }}>
          The <code>useTransition</code> hook allows you to mark state updates
          as transitions, which helps to keep the UI responsive during
          potentially slow re-renders. Non-transition updates are treated as
          urgent, while transition updates are interruptible and do not block
          the main thread.
        </Typography>

        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            mb: 4,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CodeIcon sx={{ mr: 1, fontSize: 20 }} /> Example Code
          </Typography>
          <Box
            component="pre"
            sx={{
              p: 2,
              bgcolor: "#1e1e1e",
              color: "#d4d4d4",
              borderRadius: 1,
              overflow: "auto",
              fontSize: "0.875rem",
              fontFamily: "monospace",
            }}
          >
            <code>{`import { useState, useTransition } from 'react';

function SearchableList() {
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(initialItems);
  
  // useTransition hook
  const [isPending, startTransition] = useTransition();
  
  const handleSearchChange = (e) => {
    const text = e.target.value;
    
    // Always update the input field immediately (urgent update)
    setSearchText(text);
    
    // Use transition for the expensive filtering operation
    startTransition(() => {
      setFilteredList(filterItems(text));
    });
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={searchText} 
        onChange={handleSearchChange} 
        placeholder="Search items..."
      />
      
      {isPending ? (
        <div>Loading results...</div>
      ) : (
        <ul>
          {filteredList.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</code>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Interactive Demo
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
                Controls
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={useTransitionEnabled}
                    onChange={(e) => setUseTransitionEnabled(e.target.checked)}
                    color="primary"
                  />
                }
                label="Enable useTransition"
                sx={{ mb: 3, display: "block" }}
              />

              <Typography gutterBottom>Artificial Delay: {delay}ms</Typography>
              <Slider
                value={delay}
                onChange={(_, newValue) => setDelay(newValue as number)}
                min={0}
                max={5000}
                step={500}
                marks
                valueLabelDisplay="auto"
                sx={{ mb: 4 }}
              />

              <TextField
                label="Search Items"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Type to filter..."
                helperText="Try typing with and without useTransition enabled"
              />

              {isPending && (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Updating list...
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <SpeedIcon sx={{ mr: 1, fontSize: 16 }} /> Performance Tips:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Increase the delay to see a more pronounced difference
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Try typing quickly to see how the UI remains responsive
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Toggle useTransition on/off to compare the experience
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
                maxHeight: 500,
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Results ({filteredList.length} items)
                </Typography>
                <Chip
                  label={
                    useTransitionEnabled
                      ? "Using Transition"
                      : "Without Transition"
                  }
                  color={useTransitionEnabled ? "success" : "default"}
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              <Divider sx={{ mb: 2 }} />

              {isPending ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                    gap: 2,
                  }}
                >
                  <CircularProgress size={40} />
                  <Typography variant="body1" color="text.secondary">
                    Filtering items...
                  </Typography>
                </Box>
              ) : (
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {filteredList.slice(0, 50).map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={item.name}
                          secondary={item.description}
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                  {filteredList.length > 50 && (
                    <ListItem>
                      <ListItemText
                        primary={`${
                          filteredList.length - 50
                        } more items not shown...`}
                        slotProps={{ primary: { color: "text.secondary", variant: "body2", align: "center" } }}
                      />
                    </ListItem>
                  )}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UseTransitionPage;
