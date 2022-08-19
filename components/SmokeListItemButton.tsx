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
  pastMatch?: boolean
}

const SmokeListItemButton = ({
  counter,
  divider,
  matchId,
  danger,
  children,
  pastMatch,
}: SmokeListItemButtonProps) => {
  const theme = useTheme()

  return (
    <ListItem
      divider={divider}
      disablePadding={!counter}
      sx={{
        ...(counter && {
          position: 'sticky',
          top: 0,
          backgroundColor: theme.palette.background.default,
          zIndex: 1,
        }),
      }}
    >
      <ListItemButton
        component="a"
        target="_blank"
        rel="noreferrer"
        href={`https://www.faceit.com/en/csgo/room/${matchId}${
          pastMatch ? '/scoreboard' : ''
        }`}
        sx={{
          ...(counter
            ? {
                border: `1px solid ${
                  danger
                    ? theme.palette.error.main
                    : theme.palette.primary.light
                }`,
                borderRadius: 1,
              }
            : {
                borderBottom: `1px solid ${theme.palette.divider}`,
              }),
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
