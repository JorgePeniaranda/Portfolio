import {REGEXP_ONLY_DIGITS} from "input-otp";
import {ScanFace} from "lucide-react";
import {useMemo, useState} from "react";

import {useToast} from "../../../hooks/use-toast";
import {Button} from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {InputOTP, InputOTPSlot} from "../../ui/input-otp";
import {ENV} from "../../../constants/env";

export function SecretButton() {
  const secretCode = ENV.secret_code;
  const [value, setValue] = useState(`${secretCode[0]}`);
  const {toast} = useToast();

  const handleSubmit = () => {
    if (secretCode !== value) {
      toast({
        title: "Código Incorrecto",
        description: "¡Arrr! El código secreto no es el correcto. ¡Vuelve a intentarlo!",
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "Código Correcto",
      description:
        "¡Felicidades! Has descubierto el código secreto. ¡Bienvenido al dashboard secreto!",
      variant: "default",
    });

    return; // TO-DO: redirect to the secret dashboard
  };

  return (
    <Dialog>
      <DialogTrigger className="hover: flex items-center gap-2 rounded-lg bg-[#580001] px-3 py-2 text-white shadow-sm">
        Acá se esconde algo
        <ScanFace />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">¡Aventura en alta mar!</DialogTitle>
          <DialogDescription className="text-center">
            Para abrir las puertas del dashboard secreto, necesitas el número clave. Ingresa el
            código y accede a toda la información oculta en las profundidades. ¡Prepárate para
            navegar por un mar de datos exclusivos!
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex w-full flex-col gap-5"
          onSubmit={(event) => {
            handleSubmit();
            event.preventDefault();
          }}
        >
          <div className="mx-auto">
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPSlot className="size-11" index={0} />
              <InputOTPSlot className="size-11" index={1} />
              <InputOTPSlot className="size-11" index={2} />
              <InputOTPSlot className="size-11" index={3} />
            </InputOTP>
          </div>
          <Button className="bg-[#282828] text-white hover:bg-[#323232]" type="submit">
            Probar Código Secreto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
