export enum Status {
    Online = 'Online',
    Offline = 'Offline',
    Busy = 'Busy',
    AppearOffline = 'AppearOffline',
    Away = 'Away'
}

export interface User {
  nick: string;
  subnick?: string;
  age?: number;
  email: string;
  friend: boolean;
  id: any,
  status: Status;
}
