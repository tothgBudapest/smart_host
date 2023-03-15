// Using Mobx Store as a state management and single source of truth

import { makeAutoObservable } from 'mobx';
import ROOM_TYPE from '@/constants/room-types.constant';

interface UsageData {
    usage: number;
    profit: number;
}

interface OccupancyData {
    economy: UsageData;
    premium: UsageData;
}

interface OccupancyResult extends UsageData {
    freeRooms: number;
}

interface OccupancyTableData extends OccupancyResult {
    type: keyof typeof ROOM_TYPE;
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
            };
        }
        return null;
    }


    private get getEconomyOccupancy(): OccupancyResult | null {
        if (this.occupancyResult && this.freeEconomyRooms) {
            return {
                freeRooms: this.freeEconomyRooms,
                usage: this.occupancyResult.economy.usage,
                profit: this.occupancyResult.economy.profit
            };
        }
        return null;
    }

    public get getOccupancyData(): OccupancyTableData[] | null {
        if (this.occupancyResult && this.freePremiumRooms && this.freeEconomyRooms) {
            const premium = { type: ROOM_TYPE.PREMIUM, ...this.getPremiumOccupancy };
            const economy = { type: ROOM_TYPE.ECONOMY, ...this.getEconomyOccupancy };
            return [premium as OccupancyTableData, economy as OccupancyTableData];
        }
        return null;
    }
}

export default OccupancyStore;
