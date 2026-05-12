import { AxiosResponse } from "axios";
import { api } from "@/lib/axios";
import { API_CONFIG } from "@/config/api.config";
import { OfficeRoom, GetOfficeRoomsResponse } from "@/types/offices.types";
import { BaseResponse } from "@/types/base-api.type";

interface FavoriteToggleResult {
  roomId: string;
  favorited: boolean;
}

type FavoriteToggleResponse = BaseResponse<FavoriteToggleResult>;

export class FavoriteService {
  private static instance: FavoriteService;

  private constructor() {}

  public static getInstance(): FavoriteService {
    if (!FavoriteService.instance) {
      FavoriteService.instance = new FavoriteService();
    }
    return FavoriteService.instance;
  }

  public async toggleFavoriteRoom(roomId: string): Promise<FavoriteToggleResult> {
    try {
      const response: AxiosResponse<FavoriteToggleResponse> = await api.post(
        `${API_CONFIG.ENDPOINTS.FAVORITES.TOGGLE}${roomId}`
      );

      if (response.data.status === "OK" && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.errorDescription || "Failed to toggle favorite");
    } catch (error: any) {
      throw new Error(
        error.response?.data?.errorDescription || error.message || "Failed to toggle favorite"
      );
    }
  }

  public async getFavoriteRooms(): Promise<OfficeRoom[]> {
    try {
      const response: AxiosResponse<GetOfficeRoomsResponse> = await api.get(
        API_CONFIG.ENDPOINTS.FAVORITES.GET_ALL
      );

      if (response.data.status === "OK") {
        return response.data.data ?? [];
      }

      return [];
    } catch {
      return [];
    }
  }
}