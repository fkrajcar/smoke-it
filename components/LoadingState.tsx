import { Box, CircularProgress, ListItem } from '@mui/material'
import { useTheme } from '@mui/material'

export const LoadingState = () => {
  const theme = useTheme()

  return (
    <ListItem
      sx={{
        minWidth: '100%',
        justifyContent: 'center',
      }}
      disablePadding
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '129px',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CircularProgress />
      </Box>
    </ListItem>
  )
}
