import { useState } from "react";
import { AlertCircle, MapPin, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoomHeaderProps } from "@/types/filter-props.types";
import { RoomQrCode } from "./RoomQrCode";

export const RoomHeader: React.FC<RoomHeaderProps> = ({ room, isAuthenticated, onReportIssue }) => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const roomUrl = `${window.location.origin}/room-details/${room.id}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{room.officeRoomName}</h1>
          <p className="text-muted-foreground flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {room.building}, Floor {room.floor}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {isAuthenticated && (
            <Button variant="outline" onClick={onReportIssue} className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Report Issue
            </Button>
          )}
          <Button variant="outline" onClick={() => setIsQrOpen(true)} className="gap-2">
            <QrCode className="h-4 w-4" />
            Get QR Code
          </Button>
          <Badge variant="secondary" className="text-lg px-4 py-1">
            ${room.pricePerHour}/hour
          </Badge>
        </div>
      </div>
      <Separator />

      <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-center">Room QR Code</DialogTitle>
          </DialogHeader>
          <RoomQrCode roomUrl={roomUrl} roomName={room.officeRoomName} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
