import { configure } from 'mobx';
import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import { OccupancyStore } from './occupancyStore';

configure({
  enforceActions: 'always'
});

const occupancyStore = new OccupancyStore();

export type Stores = ReturnType<typeof getStores>;

export function getStores() {
  return {
    occupancyStore,
  };
}

export function useStores(): Stores {
  return React.useContext<Stores>(MobXProviderContext as unknown as React.Context<Stores>);
}
