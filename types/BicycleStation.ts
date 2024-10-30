export interface BicycleStation {
  number: number;
  contractName: string;
  name: string;
  address: string;
  position: {
      latitude: number; 
      longitude: number;
  };
  banking: boolean;
  bonus: boolean;
  status: string;
  lastUpdate: string; 
  connected: boolean;
  overflow: boolean;
  totalStands: {
      availabilities: {
          bikes: number;
          stands: number;
          mechanicalBikes: number;
          electricalBikes: number;
          electricalInternalBatteryBikes: number;
          electricalRemovableBatteryBikes: number;
      };
      capacity: number; 
  };
  mainStands: {
      availabilities: {
          bikes: number;
          stands: number;
          mechanicalBikes: number;
          electricalBikes: number;
          electricalInternalBatteryBikes: number;
          electricalRemovableBatteryBikes: number;
      };
      capacity: number;
  };
  overflowStands: null | any; 
}
