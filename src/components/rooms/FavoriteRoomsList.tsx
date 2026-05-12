import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { FavoriteService } from "@/services/favoriteService";
import { OfficeRoom } from "@/types/offices.types";
import { RoomCard } from "@/components/rooms/office-rooms/RoomCard";
import { Skeleton } from "@/components/ui/skeleton";

const favoriteService = FavoriteService.getInstance();

const FavoriteRoomsList: React.FC = () => {
  const [rooms, setRooms] = useState<OfficeRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadFavorites = () => {
    setLoading(true);
    favoriteService
      .getFavoriteRooms()
      .then(setRooms)
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleToggle = async (roomId: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
    try {
      await favoriteService.toggleFavoriteRoom(roomId);
    } catch {
      loadFavorites();
    }
  };

  const handleViewDetails = (roomId: string) => {
    navigate(`/room-details/${roomId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Heart className="h-12 w-12 mb-4 opacity-20" />
        <p className="text-lg font-medium">No saved rooms yet</p>
        <p className="text-sm mt-1">
          Browse rooms and click the heart icon to save your favorites here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onViewDetails={handleViewDetails}
          isFavorited={true}
          onToggleFavorite={handleToggle}
        />
      ))}
    </div>
  );
};

export default FavoriteRoomsList;