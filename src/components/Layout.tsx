import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Link,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Link as RouterLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

const Layout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hooksAnchorEl, setHooksAnchorEl] = useState<null | HTMLElement>(null);
  const [featuresAnchorEl, setFeaturesAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleHooksMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setHooksAnchorEl(event.currentTarget);
  };

  const handleFeaturesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFeaturesAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setHooksAnchorEl(null);
    setFeaturesAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const groupedNavItems = [
    { group: "Core", items: [{ name: "Home", path: "/", icon: <HomeIcon /> }] },
    {
      group: "Hooks",
      items: [
        { name: "useTransition", path: "/use-transition", icon: <CodeIcon /> },
        { name: "Actions", path: "/actions", icon: <CodeIcon /> },
        {
          name: "useActionState",
          path: "/use-action-state",
          icon: <CodeIcon />,
        },
        { name: "useFormStatus", path: "/use-form-status", icon: <CodeIcon /> },
        { name: "useOptimistic", path: "/use-optimistic", icon: <CodeIcon /> },
      ],
    },
    {
      group: "Features",
      items: [
        { name: "Refs as Props", path: "/refs-as-props", icon: <CodeIcon /> },
        {
          name: "use() with Promises",
          path: "/use-with-promises",
          icon: <CodeIcon />,
        },
        {
          name: "use() with Context",
          path: "/use-with-context",
          icon: <CodeIcon />,
        },
        {
          name: "Meta Data",
          path: "/react-19-features",
          icon: <CodeIcon />,
        },
      ],
    },
  ];

  const drawer = (
    <Box
      sx={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 2 }}
        >
          React 19 Features
        </Typography>
        <TextField
          placeholder="Search features..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "rgba(0, 0, 0, 0.05)",
            },
          }}
        />
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflow: "auto", px: 1 }}>
        {groupedNavItems.map((group) => (
          <Accordion
            key={group.group}
            defaultExpanded
            disableGutters
            sx={{
              boxShadow: "none",
              border: "none",
              "&:before": { display: "none" },
              "&.Mui-expanded": { margin: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: 48,
                "& .MuiAccordionSummary-content": {
                  margin: "8px 0",
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                {group.group}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0, pb: 1 }}>
              <List dense>
                {group.items
                  .filter(
                    (item) =>
                      searchQuery === "" ||
                      item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((item) => (
                    <ListItem key={item.name}>
                      <ListItemButton
                        selected={location.pathname === item.path}
                        onClick={() => {
                          navigate(item.path);
                          setMobileOpen(false);
                        }}
                        sx={{
                          borderRadius: 2,
                          mb: 0.5,
                          "&.Mui-selected": {
                            bgcolor: "rgba(25, 118, 210, 0.08)",
                            "&:hover": {
                              bgcolor: "rgba(25, 118, 210, 0.12)",
                            },
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.name}
                          slotProps={{ primary: { fontSize: "0.875rem" } }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GitHubIcon />}
          onClick={() =>
            window.open("https://github.com/facebook/react", "_blank")
          }
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          View on GitHub
        </Button>
      </Box>
    </Box>
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              <Link component={RouterLink} to="/" underline="none">
                React 19 Features Explorer
              </Link>
            </Typography>

            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  ml: 2,
                }}
              >
                <Button
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  size="small"
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    textTransform: "none",
                    fontWeight: location.pathname === "/" ? 600 : 400,
                    fontSize: "0.875rem",
                    borderRadius: 2,
                    backgroundColor:
                      location.pathname === "/"
                        ? "rgba(106, 17, 203, 0.08)"
                        : "transparent",
                  }}
                >
                  Home
                </Button>

                <Button
                  color="inherit"
                  size="small"
                  onClick={handleHooksMenuOpen}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    borderRadius: 2,
                  }}
                >
                  Hooks
                </Button>
                <Menu
                  anchorEl={hooksAnchorEl}
                  open={Boolean(hooksAnchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 180,
                      borderRadius: 2,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {groupedNavItems[1].items.map((item) => (
                    <MenuItem
                      key={item.name}
                      onClick={() => handleMenuItemClick(item.path)}
                      selected={location.pathname === item.path}
                      sx={{
                        py: 1,
                        px: 2,
                        fontSize: "0.875rem",
                        borderRadius: 1,
                        mx: 0.5,
                        my: 0.25,
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>

                <Button
                  color="inherit"
                  size="small"
                  onClick={handleFeaturesMenuOpen}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    borderRadius: 2,
                  }}
                >
                  Features
                </Button>
                <Menu
                  anchorEl={featuresAnchorEl}
                  open={Boolean(featuresAnchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 180,
                      borderRadius: 2,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {groupedNavItems[2].items.map((item) => (
                    <MenuItem
                      key={item.name}
                      onClick={() => handleMenuItemClick(item.path)}
                      selected={location.pathname === item.path}
                      sx={{
                        py: 1,
                        px: 2,
                        fontSize: "0.875rem",
                        borderRadius: 1,
                        mx: 0.5,
                        my: 0.25,
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>

                <IconButton
                  color="inherit"
                  aria-label="GitHub Repository"
                  onClick={() =>
                    window.open("https://github.com/facebook/react", "_blank")
                  }
                  sx={{ ml: 0.5, p: 0.75 }}
                  size="small"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          py: 4,
          mt: "auto",
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            React 19 Features Explorer - Built with ❤️ -{" "}
            {new Date().getFullYear()}
          </Typography>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Link href="https://react.dev/" target="_blank" color="inherit">
              React Documentation
            </Link>
            <Link
              href="https://github.com/facebook/react"
              target="_blank"
              color="inherit"
            >
              GitHub
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
