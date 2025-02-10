import {ScanFace} from "lucide-react";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {useSecretCodeStore} from "@/services/storage/secret-code";

/**
 * Component that displays an interactive button to reveal a digit of a secret code.
 * If the code has already been fully discovered, it shows a reminder message.
 */
export function SecretCodeHint({position}: {position: number}) {
  // Access the secret code and functions to unlock a digit.
  const {secretCode, unlockOneNumber, isComplete, checkIfCodeIsCompleteWithNewIndex} =
    useSecretCodeStore();

  // State to control if the secret code digit is visible.
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  // Hook to display toast messages.
  const {toast} = useToast();

  /**
   * Handles the click on the scan button.
   * - If the code is complete, it displays a message with the full code.
   * - If not complete, it reveals the corresponding digit.
   */
  const handleScanFaceClick = () => {
    if (isComplete) {
      toast({
        title: "Ya has descubierto el código secreto",
        description: `Recuerda, el código secreto es: ${secretCode}!`,
        variant: "default",
        className: "bg-orange-500",
      });

      setIsCodeVisible(true);

      return;
    }

    if (checkIfCodeIsCompleteWithNewIndex(position)) {
      toast({
        title: "Enhorabuena!",
        description: `Has descubierto el código secreto: ${secretCode}!`,
        variant: "default",
        className: "bg-green-500 text-black",
      });
    }

    setIsCodeVisible(true);
    unlockOneNumber(position);
  };

  // If the code is visible, display the corresponding digit.
  if (isCodeVisible) {
    return;
  }

  // If not visible, display the scan button.
  return (
    <Button className="flex aspect-square items-center p-2" onClick={handleScanFaceClick}>
      <ScanFace />
    </Button>
  );
}
