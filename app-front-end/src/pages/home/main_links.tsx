import React from 'react';
import { GitPullRequest, AlertCircle, BoxMultiple, Messages, Share, Database } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

export interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

export function MainLink({ icon, color, label }: MainLinkProps) {
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

const data = [
  { icon: <BoxMultiple size={16} />, color: 'teal', label: 'Gallery' },
  { icon: <GitPullRequest size={16} />, color: 'blue', label: 'Upload' },
  // { icon: <Share size={16} />, color: 'violet', label: 'Share' },
  { icon: <Database size={16} />, color: 'grape', label: 'Profile' },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}