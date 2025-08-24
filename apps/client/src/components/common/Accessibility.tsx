import { useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { 
  ZoomIn, 
  ZoomOut, 
  Contrast, 
  Accessibility as AccessibilityIcon,
  Keyboard
} from '@mui/icons-material';

interface AccessibilityProps {
  className?: string;
}

const Accessibility = ({ className }: AccessibilityProps) => {
  useEffect(() => {
    // Add keyboard navigation support
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content
      if (event.key === 'Tab' && event.altKey) {
        event.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
          (mainContent as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const increaseFontSize = () => {
    const html = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(html).fontSize);
    html.style.fontSize = `${Math.min(currentSize + 2, 24)}px`;
  };

  const decreaseFontSize = () => {
    const html = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(html).fontSize);
    html.style.fontSize = `${Math.max(currentSize - 2, 12)}px`;
  };

  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
  };

  const toggleFocusIndicator = () => {
    document.body.classList.toggle('focus-visible');
  };

  return (
    <Box 
      className={`accessibility-toolbar ${className || ''}`}
      sx={{
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 1,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: '8px 0 0 8px',
        boxShadow: 2,
      }}
      role="toolbar"
      aria-label="כלי נגישות"
    >
      <Tooltip title="הגדל טקסט" placement="left">
        <IconButton
          onClick={increaseFontSize}
          size="small"
          aria-label="הגדל גודל טקסט"
        >
          <ZoomIn />
        </IconButton>
      </Tooltip>

      <Tooltip title="הקטן טקסט" placement="left">
        <IconButton
          onClick={decreaseFontSize}
          size="small"
          aria-label="הקטן גודל טקסט"
        >
          <ZoomOut />
        </IconButton>
      </Tooltip>

      <Tooltip title="ניגודיות גבוהה" placement="left">
        <IconButton
          onClick={toggleHighContrast}
          size="small"
          aria-label="החלף ניגודיות גבוהה"
        >
          <Contrast />
        </IconButton>
      </Tooltip>

      <Tooltip title="הדגש מיקוד" placement="left">
        <IconButton
          onClick={toggleFocusIndicator}
          size="small"
          aria-label="הדגש מיקוד מקלדת"
        >
          <Keyboard />
        </IconButton>
      </Tooltip>

      <Tooltip title="מידע נגישות" placement="left">
        <IconButton
          size="small"
          aria-label="מידע על נגישות"
          onClick={() => {
            alert(`
              כלי נגישות:
              
              🔍 הגדל/הקטן טקסט - שנה את גודל הטקסט באתר
              🎨 ניגודיות גבוהה - הפעל ניגודיות גבוהה לקריאה נוחה יותר
              ⌨️ הדגש מיקוד - הדגש את המיקוד בעת ניווט במקלדת
              
              קיצורי מקלדת:
              Alt + Tab - קפוץ לתוכן הראשי
              Tab - ניווט בין אלמנטים
              Enter/Space - הפעל כפתורים
            `);
          }}
        >
          <AccessibilityIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Accessibility;
