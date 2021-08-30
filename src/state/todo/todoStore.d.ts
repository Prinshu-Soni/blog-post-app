declare interface TodoData {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

declare interface TodoStore {
  data: TodoData[];
  error?: Error | null;
}
