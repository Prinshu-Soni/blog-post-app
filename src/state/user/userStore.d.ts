declare interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

declare interface UserStore {
  data: UserData[];
  error?: Error | null;
}
