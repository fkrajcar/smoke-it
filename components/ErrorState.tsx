import { ListItem, ListItemText } from '@mui/material'

export const ErrorState = () => (
  <ListItem
    sx={{
      minWidth: '100%',
      minHeight: '64px',
      justifyContent: 'center',
    }}
  >
    <ListItemText primary="No matches found :(" />
  </ListItem>
)
