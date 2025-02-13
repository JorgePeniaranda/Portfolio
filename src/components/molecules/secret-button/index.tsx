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

/**
 * Component that displays an interactive button to open a modal for entering a secret code.
 * If the entered code is correct, it shows a success message.
 */
export function SecretButton() {
  // Retrieves the stored secret code and initializes the state for the entered value.
  const { secretCode } = useSecretCodeStore();
  const [value, setValue] = useState(`${secretCode[0]}`);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Hook to display toast messages.
  const { toast } = useToast();

  /**
   * Handles the validation of the entered code.
   * - If the code is incorrect, displays an error message.
   * - If the code is correct, displays a success message.
   */
  const handleSubmit = () => {
    if (secretCode !== value) {
      toast({
        title: 'Código incorrecto',
        description: '¡Arrr! El código secreto no es correcto. ¡Inténtalo de nuevo!',
        variant: 'destructive',
      });

      return;
    }

    toast({
      title: 'Código correcto',
      description: 'Enhorabuena. Has descubierto el código secreto. Bienvenido al panel secreto.',
      variant: 'default',
      className: 'bg-green-500 text-black',
    });

    setIsUnlocked(true);
  };

  return (
    <Dialog>
      {/* Button to open the modal */}
      <DialogTrigger className='hover: flex items-center gap-2 rounded-lg bg-[#580001] px-3 py-2 text-white shadow-sm dark:bg-[#780001]'>
        Acá se esconde algo
        <ScanFace />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>¡Aventura en alta mar!</DialogTitle>
          <DialogDescription className='text-center'>
            Para abrir las puertas del dashboard secreto, necesitas el número clave. Ingresa el
            código y accede a toda la información oculta en las profundidades. ¡Prepárate para
            navegar por un mar de datos exclusivos!
          </DialogDescription>
        </DialogHeader>
        <form
          className='flex w-full flex-col gap-5'
          onSubmit={(event) => {
            handleSubmit();
            event.preventDefault(); // Prevents the default form behavior.
          }}
        >
          {/* Input field for the secret code */}
          <div className='mx-auto'>
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              value={value}
              onChange={(value) => setValue(value)} // Updates the state with the entered value.
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
              className='inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              href='/vault'
            >
              Ir al panel secreto
            </a>
          ) : (
            <Button className='bg-[#282828] text-white hover:bg-[#323232]' type='submit'>
              Probar Código Secreto
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
