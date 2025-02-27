import { ScanFace } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSecretCodeStore } from '@/services/storage/secret-code';
import useTranslations from '@/hooks/use-translations';

/**
 * Component that displays an interactive button to reveal a digit of a secret code.
 * If the code has already been fully discovered, it shows a reminder message.
 * @param params - Component props
 * @param params.position - The position of the digit in the secret code
 * @returns A SecretCodeHint component
 */
export function SecretCodeHint({ position }: { position: number }) {
  const { t } = useTranslations();
  const { toast } = useToast();
  const { secretCode, unlockOneNumber, isComplete, checkIfCodeIsCompleteWithNewIndex } =
    useSecretCodeStore();

  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const handleScanFaceClick = () => {
    if (isComplete) {
      toast({
        title: 'Ya has descubierto el código secreto',
        description: `Recuerda, el código secreto es: ${secretCode}!`,
        variant: 'default',
        className: 'bg-orange-500',
      });

      setIsCodeVisible(true);

      return;
    }

    if (checkIfCodeIsCompleteWithNewIndex(position)) {
      toast({
        title: 'Enhorabuena!',
        description: `Has descubierto el código secreto: ${secretCode}!`,
        variant: 'default',
        className: 'bg-green-500 text-black',
      });
    }

    setIsCodeVisible(true);
    unlockOneNumber(position);
  };

  if (isCodeVisible) {
    return null;
  }

  return (
    <Button
      aria-label={t('components.secret-code-hint.aria-label')}
      className='flex aspect-square items-center p-2'
      onClick={handleScanFaceClick}
    >
      <ScanFace />
    </Button>
  );
}
