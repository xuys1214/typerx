import { Document } from 'mongoose';

export interface Article extends Document {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  author: string;
  sort: number;
  disable: boolean;
  meta: string;
  content: string;
  template: string;
}
