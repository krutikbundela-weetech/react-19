import React, { useState } from 'react';
import {
  Box, Typography, Paper, Button, Alert, Card, CardContent,
  Divider, Chip, Stack, TextField,
  List, ListItem, ListItemText, ListItemIcon, Tabs, Tab,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import StyleIcon from '@mui/icons-material/Style';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const React19FeaturesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [documentTitle, setDocumentTitle] = useState('React 19 Features Demo');
  const [metaDescription, setMetaDescription] = useState('Exploring new React 19 features');
  const [stylesheetLoaded, setStylesheetLoaded] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);

  const applyMetadata = () => {
    document.title = documentTitle;
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.setAttribute('content', metaDescription);
    }
    setShowMetadata(true);
    setTimeout(() => setShowMetadata(false), 3000);
  };

  const loadStylesheet = () => {
    setStylesheetLoaded(true);
    setTimeout(() => setStylesheetLoaded(false), 3000);
  };

  return (
    <Box className="page-transition-enter">
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 4, background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(233, 30, 99, 0.05) 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoIcon sx={{ mr: 2, color: 'primary.main', fontSize: 30 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 0 }}>
            React 19 New Features
          </Typography>
        </Box>
        <Typography variant="body1" paragraph sx={{ mb: 3, maxWidth: 800 }}>
          React 19 introduces several powerful features including built-in support for document metadata,
          stylesheet and script loading, resource preloading, and enhanced error handling.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto" sx={{ px: 2 }}>
            <Tab icon={<DescriptionIcon />} label="Document Metadata" iconPosition="start" />
            <Tab icon={<StyleIcon />} label="Stylesheets & Scripts" iconPosition="start" />
            <Tab icon={<SpeedIcon />} label="Resource Preloading" iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Document Metadata
            </Typography>
            <Typography variant="body1" paragraph>
              React 19 allows you to render <code>&lt;title&gt;</code>, <code>&lt;meta&gt;</code>, and 
              <code>&lt;link&gt;</code> tags directly in components. React automatically hoists them to the document head.
            </Typography>

            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
                <CodeIcon sx={{ mr: 1, fontSize: 20 }} /> Example Code
              </Typography>
              <Box component="pre" sx={{ p: 2, bgcolor: '#1e1e1e', color: '#d4d4d4', borderRadius: 1, overflow: 'auto', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                <code>{`function BlogPost({ post }) {
  return (
    <article>
      {/* React 19 automatically hoists these to <head> */}
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <link rel="canonical" href={\`https://example.com/\${post.slug}\`} />
      
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}</code>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                      Update Document Metadata
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      <TextField label="Document Title" fullWidth value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} />
                      <TextField label="Meta Description" fullWidth multiline rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                      <Button variant="contained" onClick={applyMetadata} fullWidth>Apply Metadata</Button>
                      {showMetadata && <Alert severity="success">Metadata updated! Check your browser tab.</Alert>}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>Benefits</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Component-level SEO" secondary="Define metadata where it's relevant" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Automatic deduplication" secondary="React handles duplicate tags" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="SSR friendly" secondary="Works with server-side rendering" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Stylesheets & Scripts Loading
            </Typography>
            <Typography variant="body1" paragraph>
              React 19 provides built-in support for loading stylesheets and scripts with better control over loading states.
            </Typography>

            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
                <CodeIcon sx={{ mr: 1, fontSize: 20 }} /> Example Code
              </Typography>
              <Box component="pre" sx={{ p: 2, bgcolor: '#1e1e1e', color: '#d4d4d4', borderRadius: 1, overflow: 'auto', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                <code>{`function ComponentWithStyles() {
  return (
    <div>
      <link rel="stylesheet" href="/styles/component.css" />
      <link rel="stylesheet" href="/styles/theme.css" precedence="high" />
      <div className="styled-component">Content</div>
    </div>
  );
}

function ComponentWithScript() {
  return (
    <div>
      <script async src="https://example.com/widget.js" />
      <script async src="https://example.com/analytics.js"
        onLoad={() => console.log('Loaded')}
        onError={() => console.error('Failed')} />
      <div id="widget-container"></div>
    </div>
  );
}`}</code>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>Stylesheet Loading</Typography>
                    <Button variant="contained" onClick={loadStylesheet} fullWidth startIcon={<StyleIcon />} sx={{ my: 2 }}>
                      Load Custom Stylesheet
                    </Button>
                    {stylesheetLoaded && <Alert severity="success">Stylesheet loaded!</Alert>}
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>Features</Typography>
                    <List dense>
                      <ListItem><ListItemText primary="• Deduplication of stylesheets" /></ListItem>
                      <ListItem><ListItemText primary="• Loading state management" /></ListItem>
                      <ListItem><ListItemText primary="• Precedence control" /></ListItem>
                      <ListItem><ListItemText primary="• Async script loading" /></ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Resource Preloading
            </Typography>
            <Typography variant="body1" paragraph>
              React 19 introduces APIs for preloading resources to improve performance.
            </Typography>

            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
                <CodeIcon sx={{ mr: 1, fontSize: 20 }} /> Example Code
              </Typography>
              <Box component="pre" sx={{ p: 2, bgcolor: '#1e1e1e', color: '#d4d4d4', borderRadius: 1, overflow: 'auto', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                <code>{`import { preload, preinit } from 'react-dom';

function ProductList() {
  const handleHover = (id) => {
    preload(\`/styles/product-\${id}.css\`, { as: 'style' });
  };
  
  return (
    <div>
      {products.map(p => (
        <div key={p.id} onMouseEnter={() => handleHover(p.id)}>
          {p.name}
        </div>
      ))}
    </div>
  );
}

function Navigation() {
  const handleLinkHover = (route) => {
    preload(\`/styles/\${route}.css\`, { as: 'style' });
  };
  
  return (
    <nav>
      <Link to="/products" onMouseEnter={() => handleLinkHover('products')}>
        Products
      </Link>
    </nav>
  );
}`}</code>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                      <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      preload() vs preinit()
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip label="preload()" color="primary" sx={{ mb: 2 }} />
                      <Typography variant="body2" paragraph>
                        Downloads resource but doesn't execute. Use for ahead-of-time fetching.
                      </Typography>
                      <Chip label="preinit()" color="secondary" sx={{ mb: 2 }} />
                      <Typography variant="body2">
                        Downloads AND executes. Use for critical resources.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>Use Cases</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Route prefetching" secondary="Preload next page resources" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Hover interactions" secondary="Load on hover" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Critical resources" secondary="Load important assets early" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default React19FeaturesPage;
