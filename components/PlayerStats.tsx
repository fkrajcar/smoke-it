import { Box, ListItemText, useTheme } from '@mui/material'
import Image from 'next/future/image'

import { PlayerWithStats } from './PastMatch'

export const PlayerStatsItem = ({
  avatar,
  kills,
  assists,
  deaths,
  kd,
  nickname,
}: PlayerWithStats) => {
  const theme = useTheme()
  return (
    <Box
      key={nickname}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '10px',
        paddingRight: '6px',
        justifyContent: 'flex-start',
      }}
    >
      <Image
        src={avatar}
        width={28}
        height={28}
        alt={`${nickname} avatar`}
        style={{ borderRadius: '50%' }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRight: `1px solid ${theme.palette.divider}`,
            paddingRight: '6px',
            marginRight: '6px',
          }}
        >
          <ListItemText
            sx={{
              flex: 'unset',
              marginRight: '4px',
              fontWeight: 'bold',
              minWidth: '19px',
              textAlign: 'right',
            }}
            disableTypography
            primary={kills}
          />
          <Image
            alt="death icon"
            src={'/death.svg'}
            width={18}
            height={18}
          ></Image>
        </Box>
        <ListItemText
          sx={{
            fontWeight: 'bold',
            color:
              kd < 1 ? theme.palette.error.main : theme.palette.success.main,
          }}
          disableTypography
          primary={`${kd}`}
        />
      </Box>
    </Box>
  )
}
