import { MailService } from './mail.service';

const mockSend = vi.hoisted(() =>
  vi.fn().mockResolvedValue({ id: 'mocked-email-id' }),
);

vi.mock('resend', () => {
  return {
    Resend: class {
      emails = { send: mockSend };
    },
  };
});

describe('MailService', () => {
  let service: MailService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new MailService();
  });

  it('should send the email', async () => {
    await service.sendReminderEmail(
      'kevengoulartmm2@gmail.com',
      'Assinatura netflix',
    );
    expect(mockSend).toHaveBeenCalledOnce();
  });
});
