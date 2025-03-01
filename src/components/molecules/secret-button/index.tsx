import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ScanFace } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { useSecretCodeStore } from '@/services/storage/secret-code';
import useTranslations from '@/hooks/use-translations';

/**
 * Component that displays an interactive button to open a modal for entering a secret code.
 * If the entered code is correct, it shows a success message.
 * @returns A SecretButton component
 */
export function SecretButton() {
  const { t } = useTranslations();
  const { toast } = useToast();
  const { secretCode } = useSecretCodeStore();

  const [value, setValue] = useState(`${secretCode[0]}`);
  const [isUnlocked, setIsUnlocked] = useState(false);

  /**
   * Handles the validation of the entered code.
   * - If the code is incorrect, displays an error message.
   * - If the code is correct, displays a success message.
   */
  const handleSubmit = () => {
    if (secretCode !== value) {
      toast({
        title: t('components.secret-button.error-message'),
        description: t('components.secret-button.error-description'),
        variant: 'destructive',
      });

      return;
    }

    toast({
      title: t('components.secret-button.success-message'),
      description: t('components.secret-button.success-description'),
      variant: 'default',
      className: 'bg-green-500 text-black',
    });

    setIsUnlocked(true);
  };

  return (
    <Dialog>
      {/* Button to open the modal */}
      <DialogTrigger className='hover: flex items-center gap-2 rounded-lg bg-[#580001] px-3 py-2 text-white shadow-sm dark:bg-[#780001]'>
        <span>{t('components.secret-button.button-text')}</span>
        <ScanFace />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>
            {t('components.secret-button.modal-title')}
          </DialogTitle>
          <DialogDescription className='text-center'>
            {t('components.secret-button.modal-description')}
          </DialogDescription>
        </DialogHeader>
        <form
          className='flex w-full flex-col gap-5'
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            handleSubmit();
          }}
        >
          {/* Input field for the secret code */}
          <div className='mx-auto'>
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPSlot className='size-11' index={0} />
              <InputOTPSlot className='size-11' index={1} />
              <InputOTPSlot className='size-11' index={2} />
              <InputOTPSlot className='size-11' index={3} />
            </InputOTP>
          </div>
          {/* Button to submit the form */}
          {isUnlocked ? (
            <a
              className='ring-offset-background focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md bg-green-700 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
              href='/vault'
            >
              {t('components.secret-button.modal-unlock-button')}
            </a>
          ) : (
            <Button className='bg-[#282828] text-white hover:bg-[#323232]' type='submit'>
              {t('components.secret-button.modal-submit-button')}
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
