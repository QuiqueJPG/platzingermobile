export enum Status {
    Online = 'Online',
    Offline = 'Offline',
    Busy = 'Busy',
    AppearOffline = 'Appear_Offline',
    Away = 'Away'
}

export interface User {
  nick: string;
  subnick?: string;
  age?: number;
  email: string;
  password: string;
  secondPassword: string;
  friend: boolean;
  id: any,
  status: string;
}
