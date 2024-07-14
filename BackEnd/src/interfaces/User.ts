import { Todo } from "./Todo";

export interface User {
    id: number;
    name: string;
    email: string;
    todos?: Todo[];
  }