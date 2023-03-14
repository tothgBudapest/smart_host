import { makeAutoObservable } from 'mobx';
import ROOM_TYPE from '@/constants/room-types.constant';

interface RoomData {
  economy: number;
  premium: number;
}

interface UsageData {
  usage: number;
  profit: number;
}

interface OccupancyData {
  economy: UsageData;
  premium: UsageData;
}

interface OccupancyResult extends UsageData{
  freeRooms: number
}

export class OccupancyStore {
  constructor() {
    makeAutoObservable(this);
  }

  public occupancyResult?: OccupancyData | null = null;
  public freeEconomyRooms?: number | null = null;
  public freePremiumRooms?: number | null = null;


  public setPremiumFreeRooms(value: number): void {
    this.freePremiumRooms = value;
  }
  public setEconomyFreeRooms(value: number): void {
    this.freeEconomyRooms = value;
  }

  public setOccupancyData(data: OccupancyData): void {
    this.occupancyResult = data;
  }


  public clear(): void {
    this.freeEconomyRooms = null;
    this.freePremiumRooms = null;
    this.occupancyResult = null;
  }


  private get getPremiumOccupancy(): OccupancyResult | null {
    if (this.occupancyResult && this.freePremiumRooms) {
      return {
        freeRooms: this.freePremiumRooms,
        usage: this.occupancyResult.premium.usage,
        profit: this.occupancyResult.premium.profit
      }
    }
    return null;
  }


  private get getEconomyOccupancy(): OccupancyResult | null {
    if (this.occupancyResult && this.freeEconomyRooms) {
      return {
        freeRooms: this.freeEconomyRooms,
        usage: this.occupancyResult.economy.usage,
        profit: this.occupancyResult.economy.profit
      }
    }
    return null;
  }

  public getOccupancyByRoomType(roomType: keyof typeof ROOM_TYPE): OccupancyResult | null {
    switch (roomType) {
      case ROOM_TYPE.PREMIUM:
        return this.getPremiumOccupancy;
      case ROOM_TYPE.ECONOMY:
        return this.getEconomyOccupancy;
      default:
          return null;
    }
  }

  public getFreeRooms() {
    return {
      freePremiumRooms: this.freePremiumRooms,
      freeEconomyRooms: this.freeEconomyRooms
    }
  }
}

export default OccupancyStore;
