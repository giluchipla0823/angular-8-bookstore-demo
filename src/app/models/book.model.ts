import { Author } from './author.model';
export interface Book {
    id: number;
    authorId: string;
    publisherId: string;
    title: string;
    summary: string;
    description: string;
    price: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    author?: Author;
    publisher?: any;
    genres?: any[];
}