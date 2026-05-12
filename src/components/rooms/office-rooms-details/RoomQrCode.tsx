import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoomQrCodeProps {
  roomUrl: string;
  roomName: string;
}

export const RoomQrCode: React.FC<RoomQrCodeProps> = ({ roomUrl, roomName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${roomName.replace(/\s+/g, "-").toLowerCase()}-qr-code.png`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <div className="rounded-2xl border bg-white p-5 shadow-md">
        <QRCodeCanvas
          ref={canvasRef}
          value={roomUrl}
          size={200}
          level="H"
          marginSize={2}
          title={`QR code for ${roomName}`}
        />
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-[220px]">
        Scan to view or book{" "}
        <span className="font-semibold text-foreground">{roomName}</span>
      </p>

      <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
        <Download className="h-4 w-4" />
        Download QR
      </Button>
    </div>
  );
};