const calculateRoomOccupancy = (
  potentialGuests: Array<number>,
  freePremiumRooms: number,
  freeEconomyRooms: number
) => {
  let occupiedEconomyRooms = 0;
  let occupiedPremiumRooms = 0;
  let economyProfit = 0;
  let premiumProfit = 0;

  potentialGuests
    .sort((a, b) => b - a)
    .forEach((payment, index) => {
      if(payment < 100) {
        const remainingGuests = potentialGuests.length - index;
        if(remainingGuests <= freeEconomyRooms - occupiedEconomyRooms) {
          occupiedEconomyRooms++;
          economyProfit += payment;
        } else {
          if (occupiedPremiumRooms < freePremiumRooms) {
            occupiedPremiumRooms++;
            premiumProfit += payment;
          }
          else if(occupiedEconomyRooms < freeEconomyRooms) {
            occupiedEconomyRooms++;
            economyProfit += payment;
          }
        }
      } else {
        if (occupiedPremiumRooms < freePremiumRooms) {
          occupiedPremiumRooms++;
          premiumProfit += payment;
        }
      }
    });

  return {
    occupiedEconomyRooms,
    occupiedPremiumRooms,
    premiumProfit,
    economyProfit
  }
}

export default calculateRoomOccupancy;
