interface BuddyRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  user: {
    name: string;
    avatarUrl: string;
  };
}
