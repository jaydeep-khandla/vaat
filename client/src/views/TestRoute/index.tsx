import { MailIcon } from '@/components/icons';
import Input from '@/components/ui/Input';

function TestRoute() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--primary-color)',
      }}
    >
      <div style={{ width: '50%' }}>
        <Input
          label="Email"
          variant="filled"
          type="text"
          size="md"
          state={null}
          helperText="This is a warning"
          // leftIcon={<MailIcon />}
          rightIcon={<MailIcon />}
        />
      </div>
    </div>
  );
}

export default TestRoute;
