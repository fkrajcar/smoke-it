import { Box, ListItemText, useTheme } from '@mui/material'
import Image from 'next/future/image'
import React from 'react'

import {
  IMAGE_DIMENSIONS,
  PERFORMANCE_THRESHOLDS,
} from '@/src/constants/config'

interface PlayerStatsItemProps {
  avatar?: string
  kills: number
  kd: number
  nickname: string
  ADR: number
}

export const PlayerStatsItem: React.FC<PlayerStatsItemProps> = ({
  avatar,
  kills,
  kd,
  nickname,
  ADR,
}) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: '6px',
        justifyContent: 'flex-start',
      }}
    >
      {avatar && (
        <Image
          src={avatar}
          width={IMAGE_DIMENSIONS.PLAYER_AVATAR.width}
          height={IMAGE_DIMENSIONS.PLAYER_AVATAR.height}
          alt={`${nickname} avatar`}
          style={{ borderRadius: '50%' }}
        />
      )}
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
            width={IMAGE_DIMENSIONS.DEATH_ICON.width}
            height={IMAGE_DIMENSIONS.DEATH_ICON.height}
          />
        </Box>
        <ListItemText
          sx={{
            fontWeight: 'bold',
            color:
              kd < PERFORMANCE_THRESHOLDS.MIN_KD
                ? theme.palette.error.main
                : theme.palette.success.main,
            borderRight: `1px solid ${theme.palette.divider}`,
            paddingRight: '6px',
          }}
          disableTypography
          primary={typeof kd === 'number' ? kd.toFixed(2) : kd}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <ListItemText
            sx={{
              color:
                ADR < PERFORMANCE_THRESHOLDS.MIN_ADR
                  ? theme.palette.error.main
                  : theme.palette.success.main,
              marginLeft: '6px',
              fontSize: '1rem',
            }}
            disableTypography
            primary={ADR}
          />
          <ListItemText
            sx={{
              color:
                ADR < PERFORMANCE_THRESHOLDS.MIN_ADR
                  ? theme.palette.error.main
                  : theme.palette.success.main,
              marginLeft: '2px',
              fontSize: '.75rem',
            }}
            disableTypography
            primary="ADR"
          />
        </Box>
      </Box>
    </Box>
  )
}
