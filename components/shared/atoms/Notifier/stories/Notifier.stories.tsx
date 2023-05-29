import { ComponentMeta, ComponentStory } from '@storybook/react';

import useNotifier from 'hooks/useNotifier';

import Button from 'components/shared/atoms/Button';

import Notifier from '../index';

export default {
  title: 'atoms/Notifier',
  component: Notifier,
} as ComponentMeta<typeof Notifier>;

export const Demo: ComponentStory<typeof Notifier> = () => {
  const { setSuccess, setError, setInfo } = useNotifier();

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button label="setSuccess" onClick={() => setSuccess('success message')} />
      <Button label="setError" onClick={() => setError('error message')} />
      <Button label="setInfo" onClick={() => setInfo('info')} />
    </div>
  );
};
