import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import { useTheme } from '@mui/material/styles'
import React from 'react'

interface SmokeListItemButtonProps {
  children: React.ReactNode
  matchId: string
  divider?: boolean
  counter?: boolean
  danger?: boolean
}

const SmokeListItemButton = ({
  counter,
  divider,
  matchId,
  danger,
  children,
}: SmokeListItemButtonProps) => {
  const theme = useTheme()

  return (
    <ListItem divider={divider}>
      <ListItemButton
        component="a"
        target="_blank"
        rel="noreferrer"
        href={`https://www.faceit.com/en/csgo/room/${matchId}`}
        sx={{
          borderRadius: 1,
          border: `1px solid ${
            counter
              ? danger
                ? theme.palette.error.main
                : theme.palette.primary.light
              : theme.palette.divider
          }`,
          '&:hover': {
            borderColor: theme.palette.primary.light,
          },
          justifyContent: 'center',
          flexDirection: counter ? 'column' : 'row',
        }}
      >
        {children}
      </ListItemButton>
    </ListItem>
  )
}

export default SmokeListItemButton