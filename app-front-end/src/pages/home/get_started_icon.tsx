


import React from 'react';
import { GitPullRequest, AlertCircle, BoxMultiple, Messages, Share, Database } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';


export interface GetStartedProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    click: ()=>void;
  }
    
export function GetStartedIcon({ icon, color, label, click }: GetStartedProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}


export default GetStartedIcon;

