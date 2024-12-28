import {ScanFace} from "lucide-react";
import {useState} from "react";

import {Button} from "../ui/button";
import {ENV} from "../../constants/env";

export function SecretCodeHint({position}: {position: number}) {
  const secretCode = ENV.secret_code;
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const handleScanFaceClick = () => {
    setIsCodeVisible(true);
  };

  if (isCodeVisible) {
    return (
      <div className="flex w-fit items-center justify-center rounded-md border-2 border-primary p-2 text-center animate-in">
        <p className="size-6">{secretCode[position]}</p>
      </div>
    );
  }

  return (
    <Button className="flex aspect-square items-center p-2" onClick={handleScanFaceClick}>
      <ScanFace />
    </Button>
  );
}
